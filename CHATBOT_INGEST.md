# FLUX AI Chatbot — Knowledge & Backend Guide

This document explains how the FLUX AI chatbot gets its knowledge: the Groq-powered backend with retrieval grounding, the exported `chatbot-content/` corpus it reads, and the in-bundle offline brain that keeps the widget working when the API is unreachable.

---

## 1. Architecture (current)

| Layer | Location | State |
|-------|----------|-------|
| **Backend LLM brain (Groq RAG)** | `backend/routes/chat.js` + `backend/services/` | **ACTIVE — default.** `POST /api/chat` streams grounded answers from Groq, retrieval-grounded over `chatbot-content/*.md`. |
| **Local offline brain (fallback)** | `Frontend/src/components/chatbot/knowledge.ts` | **FALLBACK.** Bundled keyword-scoring engine with the same guardrail. Used automatically whenever the API errors or is unreachable. |

Request flow:

```
ChatbotPanel.tsx
  → chatClient.ts (POST /api/chat)
      1. zod validation (drop client system roles, cap 12 msgs × 1000 chars)
      2. strict FLUX-only guardrail → canned replies with zero LLM tokens
         (GREETING / CLOSING / IDENTITY / OFF_TOPIC — mirrors knowledge.ts)
      3. RAG retrieval over chatbot-content/: pass 1 scores the question
         verbatim; for short/pronoun follow-ups a second pass folds the last
         two user turns into the query; both passes merge (best score per
         section), a noise floor (score ≥ 0.3 × top) filters weak hits, and
         the context is capped to ~8000 chars
      4. Groq chat streaming → plain text to the client (LLM composes the
         final wording from the retrieved sections)
  → panel renders the streamed markdown (word-by-word, cleanMarkdown-safe)
```

Any non-2xx response makes `chatClient.ts` fall back to the local engine, so the chatbot never goes dark.

---

## 2. Backend reference (`backend/`)

| File | Role |
|------|------|
| `routes/chat.js` | `POST /api/chat` (plain-text streaming by default, `{reply}` JSON with `stream:false`), `GET /api/chat/health`, 15 req/min/IP rate limit |
| `services/groqClient.js` | Zero-dependency Groq client (native fetch), SSE parsing, model failover, `think`-tag stripping |
| `services/knowledge.js` | BM25-lite retriever over `chatbot-content/` (synonym expansion incl. question-words, query-coverage weighting, entity anchoring, `MIN_SCORE` 0.6, per-file URL metadata excluded from scoring) |
| `services/guardrail.js` | Strict FLUX-only classifier + canned responses (keep pattern lists in sync with `knowledge.ts`) |
| `services/prompt.js` | FLUX AI persona / grounding policy prompt template + context builder |
| `brain.js` | Mounts the router at `/api/chat` |

### Environment variables (`backend/.env`)

```bash
# Free API key from https://console.groq.com/keys
GROQ_API_KEY=...
# Model on your Groq account's free tier (defaults to qwen/qwen3.8-27b)
GROQ_MODEL=qwen/qwen3.8-27b
# Optional OpenAI-compatible base override
# GROQ_BASE_URL=https://api.groq.com/openai/v1
```

### Model strategy (free tier)

- **Default: `qwen/qwen3.8-27b`** — fastest measured (~200 ms first answer), clean streaming.
- **Auto-fallback: `openai/gpt-oss-20b`** — used automatically when the default model is
  decommissioned or its rate limit (429) trips; it has a separate free-tier quota.
- `openai/gpt-oss-120b` is the heavier quality option — set `GROQ_MODEL` to switch.
- Free-tier quota is per model per minute (e.g. ITPM 7000 on qwen). When both models are
  exhausted, the route returns `503` and the frontend's local brain takes over.

### Frontend → backend URL selection (`chatClient.ts`)

`chatClient.ts` picks its target **environment-aware** so the LLM answers whenever the
backend is actually reachable:

- `vite serve` (dev) → `http://localhost:4000/api/chat` (local backend carries the key)
- production build → `https://flux-backend-1hmq.onrender.com/api/chat`

⚠️ **Never set `VITE_CHAT_API_URL` in `Frontend/.env.local` permanently** — Vite inlines
`.env.local` values into production bundles as string constants, and the minifier then
deletes the real prod fallback (a localhost URL got baked into a prod build this way).
Uncomment an override there only temporarily.

Swift client contract recap: `POST { messages: [{role, content}], stream? }` → plain-text
chunks (`text/plain`) or, with `"stream": false`, `{ "reply": "..." }`.

---

## 3. The Local Live Brain (offline fallback, secondary maintenance target)

`knowledge.ts` currently contains:

- **19 knowledge items**, each with keywords, a title, and a markdown answer:
  `about, bytebrawl, bytebrawl-details, ideathon, ideathon-stages, ideathon-problems, events, fdp, she-leads, she-leads-schedule, results, join, wings, faculty, team, team-roster, projects, contact, navigation`
- **4 quick chips** (events / faculty / join / about) rendered in the panel's 2×2 grid — keep the list at 4 to preserve the layout.
- **Guardrail engine** (`classifyQuery`): categories `GREETING | CLOSING | IDENTITY | FLUX_TOPIC | OFF_TOPIC`, built from `FLUX_EXPLICIT_SIGNALS`, `CLUB_CONTEXT_PATTERNS`, and `UNRELATED_TOPIC_PATTERNS`. Off-topic questions are refused regardless of knowledge matches.
- **4 canned responses** (`GREETING_RESPONSE`, `IDENTITY_RESPONSE`, `OFF_TOPIC_RESPONSE`, `CLOSING_RESPONSE`).

### Editing rules
1. Add new facts to the matching item's `answer` (source-of-truth files: `config/eventConfig.ts`, `data/bytebrawlResultsData.ts`, `pages/sheLeads/SheLeadsPage.tsx`, `pages/ideathon/`, `components/sections/events/UpcomingEvents/fdp.tsx`, `pages/faculty/facultyData.ts`, `pages/team/teamData.ts`, `pages/events/events.tsx`, `src/projects.json`). For backend-served facts, also regenerate the corpus (section 4).
2. Add classification coverage for any new topic:
   - explicit recognized names → `FLUX_EXPLICIT_SIGNALS`
   - common subject words → `CLUB_CONTEXT_PATTERNS`
   - mirror the same patterns into `backend/services/guardrail.js`
3. Prefer **compound keywords** (`'bytebrawl rules'`) over bare words to keep scoring (`keyword length × 2`, full-match +20 bonus) predictable.
4. Markdown constraints (the panel's `cleanMarkdown()`):
   - No `**bold**` at the start of a line (it gets stripped while streaming).
   - Use `###` sections, numbered lists, and plain bullets.
5. Keep answers streaming-friendly (the panel renders word-by-word).
6. Lead every canned answer with the direct fact for the question asked; keep the answer sized to the question (a simple who/what/when/where question gets the one fact, not a section dump). Full enumerations (complete team roster, full winner lists) live in dedicated explicit-ask items (e.g. `team-roster`, keywords like `full team`, `team roster`, `all members`, `wing heads`) and are returned only when the user explicitly asks for the full list — a bare "who is the president" must stay on `team`, never on the roster.

### Regression testing
A committed battery checks routing + guardrails on 67 intent cases:

```powershell
cd Frontend
npx tsc --module commonjs --target es2020 --skipLibCheck --outDir C:\Users\<you>\AppData\Local\Temp\chatbot-kb-test src\components\chatbot\knowledge.ts
cd ..
node scripts/test-chatbot-knowledge.cjs C:\Users\<you>\AppData\Local\Temp\chatbot-kb-test
```

The script exits non-zero on failure, so it can be wired into CI. Current state: **67/67 cases pass** (greetings/closing/identity, per-topic routing for ByteBrawl details & results, Ideathon stages & problem bank, FDP, She Leads schedule, team & full team roster, navigation, events, faculty, contact, and off-topic rejections).

---

## 4. The Knowledge Corpus (`chatbot-content/`)

The corpus is what the backend's retriever reads. It **ships inside the repository** (un-ignored) so git-based deploys serve grounded answers, and it is regenerated — never hand-edited — from site sources:

```bash
node scripts/export-chatbot-content.mjs
```

This regenerates `chatbot-content/` (22 focused Markdown files). Structured data (the 50-problem Ideathon bank, full team roster, ByteBrawl tracks & results) is **parsed directly from source files** at export time, so facts never drift from the website. The script also **sweeps stale files** so the set always mirrors the current generator.

| File | URL Path | Content |
|------|----------|---------|
| `home.md` | / | Society overview, motto, pillars, domains |
| `about.md` | /about | Mission, patron vision, core values, impact areas |
| `faculty.md` | /faculty | VC Prof. Anupama Kaushik Sharma, HOD Prof. Rakesh Kumar, Dr. Satvik Vats, Dr. Shwet Ketu, Dr. Satya Prakash Yadav |
| `leadership.md` | /team | Core student leadership (President, VP, Heads, Joint Secretaries) |
| `team.md` | /team | 6 wings + every member & role across batches '27/'28/'29 |
| `events.md` | /events | Event timeline (Expert Talk, Ideathon 2025, ATAL FDP, Orientation, She Leads, ByteBrawl) |
| `events-fdp.md` | /events/fdp | ATAL FDP: dates, 8 topics, objectives, 5 registration steps, coordinators |
| `events-bytebrawl.md` | /events/bytebrawl-hacktoberfest | Logistics, rules, FAQs, prize structure, contacts |
| `events-bytebrawl-tracks.md` | (same page) | 5 India-first tracks + all 25 allottees' problem statements |
| `events-bytebrawl-results.md` | (same page) | Winners: 2 Pointer Approach (1st), Quarks (2nd), Team nakshatra (3rd), P² & Supic (special appreciation) |
| `events-ideathon.md` | /ideathon | Dates Dec 10-19 2025, 3 stages, rules, prizes, 2025 winners (ZenTechs, Team TRINETRA, SpiralForge) |
| `events-ideathon-problems-01..05.md` | /ideathon | The full 50-problem bank, 10 per file (PS-01 … PS-50) |
| `events-she-leads.md` | /she-leads | Summit overview, highlights, eligibility, free entry, certificates |
| `events-she-leads-speakers.md` | /she-leads | All 4 sessions: Deloitte, Amazon, Flipkart, Microsoft speakers with dates & times |
| `projects.md` | /projects | Research focus + index of the 50-problem bank files |
| `join.md` | (main site) | Induction process, eligibility, 6 student wings |
| `contact.md` | /contact | flux@mmmut.ac.in, address, socials, WhatsApp community |
| `navigation.md` | (all) | Complete page map of flux.org.in with deep links |

Each file starts with `**URL Path:**` / `**Source:**` metadata lines. The backend keeps those lines visible to the LLM (so it can cite exact deep links) but excludes them from retrieval scoring.

Sensitive data is sanitized by design: no student personal emails, no phone numbers — only official institutional emails (`@mmmut.ac.in`) and public social links.

---

## 5. Update workflows

### Website content changed → backend answers
1. `node scripts/export-chatbot-content.mjs`
2. Commit the refreshed `chatbot-content/` files. The backend indexes the corpus on first
   request after restart, so knowledge is live as soon as the deploy lands.

### Guardrail / canned-response changes
1. Edit `Frontend/src/components/chatbot/knowledge.ts` **and** mirror patterns/canned
   replies into `backend/services/guardrail.js`.
2. Re-run the 64-case battery (section 3).
3. Restart the backend.

### Frontend build/app mode
`chatClient.ts` defaults to the production backend
(`https://flux-backend-1hmq.onrender.com/api/chat`) when no env override exists.
`Frontend/.env.local` can pin `VITE_CHAT_API_URL` (e.g. `http://localhost:4000/api/chat`
during backend development). No env file is needed for the production build.
