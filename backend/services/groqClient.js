// ─────────────────────────────────────────────────────────────────────────────
// groqClient.js — minimal OpenAI-compatible Groq client (zero new deps).
//
// Uses Node ≥18 native fetch + WHATWG streams for SSE parsing.
// dotenv is configured here (idempotent) so that GROQ_* variables are also
// available in serverless contexts where route modules are evaluated before
// brain.js body code runs.
// ─────────────────────────────────────────────────────────────────────────────
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

const GROQ_BASE_URL = (process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/+$/, "");

// Primary model must exist on the free tier. Fallbacks are tried automatically
// if the primary is decommissioned / unavailable (Groq rotates models over time).
const GROQ_PRIMARY = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
const FALLBACK_MODELS = [...new Set([GROQ_PRIMARY, "openai/gpt-oss-20b"])].filter(Boolean);

const REQUEST_TIMEOUT_MS = 60_000;   // whole-request timeout (stream included)

export class GroqError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "GroqError";
    this.status = status;
    this.code = code;
  }
}

export function groqPrimaryModel() {
  return GROQ_PRIMARY;
}

export function groqConfigured() {
  return Boolean(process.env.GROQ_API_KEY);
}

function getApiKey() {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new GroqError(500, "missing_api_key", "GROQ_API_KEY is not configured on the server.");
  }
  return key.trim();
}

function mergeSignals(signals) {
  const list = signals.filter(Boolean);
  if (list.length === 0) return undefined;
  if (list.length === 1) return list[0];
  return AbortSignal.any(list);
}

async function groqRequest({ messages, model, temperature = 0.35, topP = 0.9, maxCompletionTokens = 700, stream = false, signal }) {
  const body = {
    model,
    messages,
    temperature,
    top_p: topP,
    max_completion_tokens: maxCompletionTokens,
    stream: Boolean(stream),
  };
  // gpt-oss models expose reasoning via a separate delta; keep it tiny & fast.
  if (String(model).startsWith("openai/gpt-oss") || String(model).includes("gpt-oss")) {
    body.reasoning_effort = "low";
  }

  const fetchAbort = mergeSignals([AbortSignal.timeout(REQUEST_TIMEOUT_MS), signal]);
  return fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify(body),
    signal: fetchAbort,
  });
}

async function readGroqError(resp) {
  let code = `http_${resp.status}`;
  let message = resp.statusText || "Groq request failed";
  try {
    const parsed = await resp.json();
    const err = parsed.error || parsed;
    if (err && err.message) message = String(err.message);
    if (err && err.code) code = String(err.code);
  } catch {
    // keep defaults
  }
  return new GroqError(resp.status, code, message);
}

function isModelIssue(err) {
  if (!(err instanceof GroqError)) return false;
  if (err.status === 404) return true;               // decommissioned model id
  if (err.status === 429) return true;               // free-tier ITPM/TPM per-model quota → try the fallback model
  if (err.status >= 500) return true;                // per-model infra blip
  if (err.status === 400 && /model/i.test(err.message || "")) return true;
  return false;
}

/** Removes inline reasoning blocks some open models may emit. */
function stripThinkBlocks(text) {
  return String(text)
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<\/think>/gi, "")
    .trim();
}

/**
 * Streaming chat completion.
 * Yields plain text deltas (reasoning deltas are consumed and dropped).
 * Automatically retries with fallback models when the error happens before
 * any token was emitted.
 */
export async function* groqChatStream(options) {
  let lastErr = null;
  let emitted = false;

  for (let attempt = 0; attempt < FALLBACK_MODELS.length; attempt++) {
    let resp;
    try {
      resp = await groqRequest({ ...options, model: FALLBACK_MODELS[attempt], stream: true });
    } catch (err) {
      throw err; // network outage — other models won't help
    }

    if (!resp.ok || !resp.body) {
      lastErr = resp.body ? await readGroqError(resp) : new GroqError(resp.status || 502, `http_${resp.status}`, "Empty Groq response");
      if (isModelIssue(lastErr) && attempt < FALLBACK_MODELS.length - 1) continue;
      throw lastErr;
    }

    try {
      for await (const piece of sseContentStream(resp.body)) {
        if (!piece) continue;
        emitted = true;
        yield piece;
      }
      return;
    } catch (err) {
      if (emitted || attempt === FALLBACK_MODELS.length - 1) throw err;
      lastErr = err;
      continue;
    }
  }

  if (lastErr) throw lastErr;
  throw new GroqError(503, "no_models", "No Groq model is currently available.");
}

/** Non-streaming chat completion → full text reply. */
export async function groqChatComplete(options) {
  let lastErr = null;
  for (let attempt = 0; attempt < FALLBACK_MODELS.length; attempt++) {
    let resp;
    try {
      resp = await groqRequest({ ...options, model: FALLBACK_MODELS[attempt], stream: false });
    } catch (err) {
      throw err;
    }

    if (!resp.ok) {
      lastErr = await readGroqError(resp);
      if (isModelIssue(lastErr) && attempt < FALLBACK_MODELS.length - 1) continue;
      throw lastErr;
    }

    const data = await resp.json();
    const content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
    return stripThinkBlocks(content);
  }
  if (lastErr) throw lastErr;
  throw new GroqError(503, "no_models", "No Groq model is currently available.");
}

/**
 * Parses Groq SSE frames, yields only delta.content pieces and defensively
 * drops any inline "<think>…</think>" reasoning blocks that may appear in
 * content from open-weight models.
 */
async function* sseContentStream(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let hold = "";          // hold-back window so "<think>" can't be split across frames
  let inThink = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") return;

        let frame;
        try {
          frame = JSON.parse(payload);
        } catch {
          continue; // ignore malformed frames
        }

        const delta = (frame.choices && frame.choices[0] && frame.choices[0].delta) || {};
        const raw = typeof delta.content === "string" ? delta.content : "";
        if (!raw) continue;

        hold += raw;
        let out = "";
        while (hold.length) {
          if (inThink) {
            const end = hold.indexOf("</think>");
            if (end === -1) {
              hold = hold.slice(-8); // keep tail in case the closing tag is split
              break;
            }
            hold = hold.slice(end + "</think>".length);
            inThink = false;
            continue;
          }
          const start = hold.toLowerCase().indexOf("<think>");
          if (start === -1) {
            const keepFrom = Math.max(0, hold.length - 6);
            out += hold.slice(0, keepFrom);
            hold = hold.slice(keepFrom);
            break;
          }
          if (start > 0) out += hold.slice(0, start);
          hold = hold.slice(start + "<think>".length);
          inThink = true;
        }
        if (out) yield out;
      }
    }
    if (!inThink && hold) yield hold;
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // stream already cancelled
    }
  }
}
