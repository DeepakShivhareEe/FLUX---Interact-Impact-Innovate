# /sync-chatbot skill

## Description
Synchronizes the FLUX AI knowledge base with the current website content to ensure the chatbot provides accurate and up-to-date information.

## Workflow
1. **Export Content**: Run the extraction script to convert website sections into Markdown.
   - Command: `node scripts/export-chatbot-content.mjs`
2. **Verify Corpus**: Check `chatbot-content/` for updated files.
3. **Update Repo**: Commit the changes to ensure the production server picks them up.
   - Command: `git add chatbot-content/ && git commit -m "chore(chatbot): sync knowledge base with website"`
4. **Health Check**: Verify the backend has indexed the new data.
   - Command: `curl http://localhost:5000/api/chat/health` (or actual port)
   - Expected: `{ "status": "ok", "corpus": { "ready": true, ... } }`

## Usage
Run this skill whenever:
- A new event is added to the site.
- The team roster or faculty mentors are updated.
- Any text change is made to `Frontend/src/components/sections/`.
