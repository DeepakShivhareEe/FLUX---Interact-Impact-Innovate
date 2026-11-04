// ─────────────────────────────────────────────────────────────────────────────
// chat.js — POST /api/chat (FLUX AI chatbot)
//
// Contract with Frontend/src/components/chatbot/chatClient.ts:
//   • POST JSON { messages: ChatMessage[], stream?: boolean }
//   • default response: streamed plain text (success = 200, raw text chunks)
//   • optional JSON mode: { stream: false } → { reply }
//   • any non-2xx makes the frontend fall back to its local knowledge engine
//
// Pipeline: zod validation → strict FLUX-only guardrail (canned replies, no
// LLM tokens) → BM25-lite retrieval over chatbot-content/ → Groq streaming.
// ─────────────────────────────────────────────────────────────────────────────
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

import { groqChatComplete, groqChatStream, groqPrimaryModel, GroqError, groqConfigured } from "../services/groqClient.js";
import { corpusReady, corpusStats, retrieve } from "../services/knowledge.js";
import { buildGroqMessages } from "../services/prompt.js";
import { cannedResponseFor, classifyQuery } from "../services/guardrail.js";

const router = Router();

// ── Rate limiting (protects the free Groq quota) ─────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 15,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: (req) => req.method === "OPTIONS",
  message: {
    reply: "You're sending messages a little too quickly 🙏 Please wait a few seconds and try again.",
  },
});
router.use(chatLimiter);

const MAX_HISTORY = 12;
const MAX_MESSAGE_CHARS = 1000;
const REPLY_MAX_TOKENS = 700;

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(MAX_MESSAGE_CHARS),
      })
    )
    .min(1)
    .max(MAX_HISTORY),
  stream: z.boolean().default(true),
});

/** Drops client-visible system prompts (frontend sends one), tool roles,
 *  oversized/blank messages, and caps the transcript length server-side. */
function sanitizeClientMessages(raw) {
  if (!Array.isArray(raw)) return [];
  const clean = [];
  for (const message of raw) {
    if (!message || typeof message !== "object") continue;
    if (message.role !== "user" && message.role !== "assistant") continue;
    const content =
      typeof message.content === "string" ? message.content.trim().slice(0, MAX_MESSAGE_CHARS) : "";
    if (!content) continue;
    clean.push({ role: message.role, content });
  }
  return clean.slice(-MAX_HISTORY);
}

function setStreamHeaders(res) {
  res.status(200).set({
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store, no-transform",
    "X-Accel-Buffering": "no",
  });
}

/** Emits canned text with the same word-pace the frontend uses offline. */
async function streamSlowly(res, text, isClosed) {
  const words = text.split(" ");
  const pace = Math.min(22, 400 / Math.max(words.length, 24));
  for (let i = 0; i < words.length; i++) {
    if (isClosed() || res.writableEnded) return;
    res.write(i === 0 ? words[i] : ` ${words[i]}`);
    if (i < words.length - 1) await new Promise((resolve) => setTimeout(resolve, pace));
  }
  if (!res.writableEnded) res.end();
}

function logGroqError(err) {
  const detail =
    err instanceof GroqError
      ? `${err.status}/${err.code}: ${err.message}`
      : (err && err.message) || String(err);
  console.error("🤖 FLUX AI chat failure:", detail);
}

const CONNECTION_ISSUE_REPLY = "FLUX AI is having trouble connecting right now. Please try again in a moment. 💛";

// ── RAG helpers ──────────────────────────────────────────────────────────────
const MAX_CONTEXT_CHARS = 8000; // ~2k tokens — keeps prompt inside the 7k ITPM budget

/** Keeps chunks so the total context stays inside the token budget, and drops
 *  chunks whose relevance is far below the current top hit (noise floor). */
function capContext(chunks, maxChars = MAX_CONTEXT_CHARS) {
  const topScore = chunks.length ? chunks[0].score : 0;
  const floor = topScore * 0.3;
  const usable = chunks.filter((c) => c.score >= floor);
  const kept = [];
  let used = 0;
  for (const chunk of usable) {
    const room = maxChars - used;
    if (chunk.text.length <= room) {
      kept.push(chunk);
      used += chunk.text.length;
    } else {
      if (room < 220) break; // a truncated sliver is useless
      kept.push({ ...chunk, text: `${chunk.text.slice(0, room)}…` });
      break;
    }
  }
  return kept;
}

/**
 * Follow-ups ("tell me more", "who else?") carry little retrieval signal on
 * their own, so prior user turns are folded into the expanded query.
 * Self-contained questions return unchanged.
 */
function buildExpandedQuery(messages) {
  const userTurns = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.trim())
    .filter(Boolean);
  if (userTurns.length < 2) return "";
  const last = userTurns[userTurns.length - 1];
  const needsHistory =
    last.split(/\s+/).length <= 5 ||
    /\b(more|who else|other|they|them|hes?|shes?|hes|that|this)\b/i.test(last);
  if (!needsHistory) return "";
  const prior = userTurns.slice(0, -1).reverse().slice(0, 2); // newest first
  return [last, ...prior].join(" ");
}

/** Merges two retrieval passes: best score per section, re-ranked. */
function mergeChunks(primary, secondary) {
  const byKey = new Map();
  for (const chunk of [...primary, ...secondary]) {
    const key = `${chunk.title} §${chunk.heading || ""}`;
    const existing = byKey.get(key);
    if (!existing || chunk.score > existing.score) byKey.set(key, chunk);
  }
  return [...byKey.values()].sort((a, b) => b.score - a.score);
}

router.post("/", async (req, res) => {
  const requestedStream = req.body && typeof req.body.stream === "boolean" ? req.body.stream : undefined;
  const parsed = chatRequestSchema.safeParse({
    messages: sanitizeClientMessages(req.body && req.body.messages),
    stream: requestedStream,
  });

  if (!parsed.success) {
    return res.status(400).json({ reply: "That message didn't come through cleanly — please try sending it again." });
  }

  const { stream } = parsed.data;
  const lastUser = [...parsed.data.messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return res.status(400).json({ reply: "That message didn't come through cleanly — please try sending it again." });
  }

  // ── 1) Strict FLUX-only guardrail + conversational canned replies ──
  // (mirrors knowledge.ts semantics; zero LLM tokens spent here)
  const category = classifyQuery(lastUser.content);
  const canned = cannedResponseFor(category);
  if (canned) {
    if (stream) {
      setStreamHeaders(res);
      let closed = false;
      res.on("close", () => {
        closed = true;
      });
      await streamSlowly(res, canned, () => closed);
    } else {
      res.status(200).json({ reply: canned });
    }
    return;
  }

  // ── 2) RAG retrieval over the official FLUX corpus ──
  // Pass 1 scores the question verbatim; when that pass looks thin or the
  // question is a follow-up, pass 2 retries with history folded into the
  // query. Both passes are merged (best score per section) and capped to the
  // context token budget before they are handed to the LLM to compose from.
  let contextChunks = [];
  if (corpusReady()) {
    const directChunks = retrieve(lastUser.content, { topK: 6 });
    const directStrong = directChunks.length >= 2 && directChunks[0].score >= 3;
    const expanded = directStrong ? "" : buildExpandedQuery(parsed.data.messages);
    contextChunks = expanded
      ? capContext(mergeChunks(directChunks, retrieve(expanded, { topK: 6 })))
      : capContext(directChunks);
  }
  const payload = buildGroqMessages({
    history: parsed.data.messages,
    contextChunks,
  });

  // ── 3) Groq completion ──
  if (!stream) {
    try {
      const reply = await groqChatComplete({
        messages: payload,
        maxCompletionTokens: REPLY_MAX_TOKENS,
      });
      res.status(200).json({ reply });
    } catch (err) {
      logGroqError(err);
      res.status(503).json({ reply: CONNECTION_ISSUE_REPLY });
    }
    return;
  }

  // Streaming mode (default). The upstream call is primed BEFORE headers are
  // sent, so a Groq outage can still yield a clean 503 → frontend fallback.
  let closed = false;
  res.on("close", () => {
    closed = true;
  });
  const upstreamAbort = new AbortController();
  const iterator = groqChatStream({
    messages: payload,
    maxCompletionTokens: REPLY_MAX_TOKENS,
    signal: upstreamAbort.signal,
  });

  try {
    const first = await iterator.next();
    if (closed) {
      upstreamAbort.abort();
      return;
    }
    setStreamHeaders(res);
    if (first.value) res.write(first.value);

    while (true) {
      if (closed) {
        upstreamAbort.abort(); // client left: stop consuming paid tokens
        return;
      }
      const next = await iterator.next();
      if (next.done) break;
      if (next.value) res.write(next.value);
    }
    if (!res.writableEnded) res.end();
  } catch (err) {
    upstreamAbort.abort();
    if (!res.headersSent) {
      logGroqError(err);
      return res.status(503).json({ reply: CONNECTION_ISSUE_REPLY });
    }
    // Mid-stream failure: close gracefully with a short notice.
    if (!closed && !res.writableEnded) {
      res.write("\n\n⚠️ The connection hiccuped — ask me again for the full answer.");
      res.end();
    }
  }
});

// Ops/health introspection (no secrets exposed)
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    model: groqPrimaryModel(),
    groqConfigured: groqConfigured(),
    corpus: corpusStats(),
  });
});

export default router;
