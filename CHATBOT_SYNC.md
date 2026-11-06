# Chatbot Knowledge Sync Framework

This document defines the process for keeping the FLUX AI chatbot synchronized with the official website (flux.org.in).

## 🔄 The Sync Pipeline

To prevent the chatbot from providing outdated information, any change to the website content must follow this pipeline:

1. **Website Update** $\rightarrow$ Update HTML/React components in `Frontend/`.
2. **Content Export** $\rightarrow$ Run `node scripts/export-chatbot-content.mjs`.
    - This script scrapes the live site/local build and generates Markdown files in `chatbot-content/`.
3. **Corpus Validation** $\rightarrow$ Verify that new events or team changes are reflected in the `.md` files.
4. **Indexing** $\rightarrow$ The backend `knowledge.js` automatically re-indexes the files on the next server restart or request.
5. **Verification** $\rightarrow$ Test the bot with a query about the updated information.

## 🛠️ Automation Skill: `/sync-chatbot`

The `/sync-chatbot` skill automates the above pipeline.

**Execution Steps:**
- `Bash`: `node scripts/export-chatbot-content.mjs`
- `Bash`: `git add chatbot-content/`
- `Bash`: `git commit -m "chore(chatbot): sync knowledge base with website"`
- `Bash`: `curl http://localhost:PORT/api/chat/health` (Verify `corpus.ready: true`)

## ⚠️ Critical Rules
- **Never** manually edit `.md` files in `chatbot-content/` unless adding custom "Hidden Knowledge" (info not on the site but the bot should know).
- **Always** run the sync after modifying `Frontend/src/components/sections/`.
- **Check Synonyms**: If a new event uses a unique name (e.g., "QuantumQuest"), add it to the `SYNONYMS` object in `backend/services/knowledge.js` to ensure high retrieval scores.
