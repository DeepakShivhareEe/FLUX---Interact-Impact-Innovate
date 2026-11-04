/**
 * Behavior battery for the FLUX AI chatbot knowledge engine.
 *
 * It loads the COMPILED build of `Frontend/src/components/chatbot/knowledge.ts`
 * (plain CommonJS) and checks that every intent case routes to the correct
 * knowledge item and that off-topic queries stay rejected by the guardrail.
 *
 * Usage:
 *   1. Compile the knowledge engine (no bundler needed):
 *      cd Frontend
 *      npx tsc --module commonjs --target es2020 --skipLibCheck ^
 *        --outDir C:\Users\<you>\AppData\Local\Temp\chatbot-kb-test ^
 *        src\components\chatbot\knowledge.ts
 *   2. Run this battery:
 *      node scripts/test-chatbot-knowledge.cjs C:\Users\<you>\AppData\Local\Temp\chatbot-kb-test
 *
 * Exit code is non-zero on failure, so it can be wired into CI.
 */

const path = require('node:path');

const compiledDir = process.argv[2];
if (!compiledDir) {
  console.error('Usage: node scripts/test-chatbot-knowledge.cjs <compiled-knowledge-dir>');
  console.error('Compile first with:');
  console.error('  cd Frontend');
  console.error('  npx tsc --module commonjs --target es2020 --skipLibCheck --outDir <dir> src\\components\\chatbot\\knowledge.ts');
  process.exit(1);
}

const k = require(path.join(path.resolve(compiledDir), 'knowledge.js'));

if (k.KNOWLEDGE_BASE.length < 15) {
  console.error(`KB unexpectedly small: ${k.KNOWLEDGE_BASE.length} items`);
  process.exit(1);
}

/** Mirrors findKnowledgeAnswer's scoring to identify which item wins. */
function bestItem(query) {
  const normalized = query.toLowerCase().trim();
  let best = null;
  let high = 0;
  for (const item of k.KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const low = kw.toLowerCase();
      if (normalized.includes(low)) {
        score += low.length * 2;
        if (normalized === low) score += 20;
      }
    }
    if (score > high) {
      high = score;
      best = item.id;
    }
  }
  return { best, high };
}

const CASES = [
  // Conversational categories (canned responses)
  ['hi', 'GREETING', null],
  ['thanks a lot', 'CLOSING', null],
  ['who are you', 'IDENTITY', null],
  // About / identity of the society
  ['tell me about flux', 'FLUX_TOPIC', 'about'],
  ['what is the motto', 'FLUX_TOPIC', 'about'],
  // ByteBrawl
  ['what is bytebrawl', 'FLUX_TOPIC', 'bytebrawl'],
  ['when is bytebrawl', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['where is bytebrawl held', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['register for bytebrawl', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['is bytebrawl registration open', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['bytebrawl rules', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['what is the prize for bytebrawl', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['how many seats in bytebrawl', 'FLUX_TOPIC', 'bytebrawl-details'],
  ['what is the hacktoberfest theme for 2026', 'FLUX_TOPIC', 'bytebrawl'],
  // Results
  ['who won bytebrawl', 'FLUX_TOPIC', 'results'],
  ['who won ideathon', 'FLUX_TOPIC', 'results'],
  ['winners?', 'FLUX_TOPIC', 'results'],
  ['bytebrawl results', 'FLUX_TOPIC', 'results'],
  ['give me the ideathon winners names', 'FLUX_TOPIC', 'results'],
  ['zen techs team', 'FLUX_TOPIC', 'results'],
  ['quarks', 'FLUX_TOPIC', 'results'],
  ['nakshatra', 'FLUX_TOPIC', 'results'],
  // Ideathon
  ['team size for ideathon', 'FLUX_TOPIC', 'ideathon'],
  ['ideathon dates', 'FLUX_TOPIC', 'ideathon-stages'],
  ['stages of ideathon', 'FLUX_TOPIC', 'ideathon-stages'],
  ['ppt submission format', 'FLUX_TOPIC', 'ideathon-stages'],
  ['what are the rules of ideathon', 'FLUX_TOPIC', 'ideathon'],
  // Ideathon problem bank
  ['show me the problem statements', 'FLUX_TOPIC', 'ideathon-problems'],
  ['project ideas', 'FLUX_TOPIC', 'ideathon-problems'],
  ['open innovation challenge', 'FLUX_TOPIC', 'ideathon-problems'],
  ['how many problem statements are there', 'FLUX_TOPIC', 'ideathon-problems'],
  // FDP
  ['atal fdp', 'FLUX_TOPIC', 'fdp'],
  ['what is fdp', 'FLUX_TOPIC', 'fdp'],
  ['mechanistic interpretability workshop details', 'FLUX_TOPIC', 'fdp'],
  ['who is the fdp coordinator', 'FLUX_TOPIC', 'fdp'],
  // She Leads
  ['who are the speakers of she leads', 'FLUX_TOPIC', 'she-leads-schedule'],
  ['nitya anand', 'FLUX_TOPIC', 'she-leads-schedule'],
  ['what is she leads', 'FLUX_TOPIC', 'she-leads'],
  ['tessy thomas conclave', 'FLUX_TOPIC', 'she-leads-schedule'],
  ['when does the flipkart session start', 'FLUX_TOPIC', 'she-leads-schedule'],
  // Team / faculty / contact / joining
  ['who is the president of flux', 'FLUX_TOPIC', 'team'],
  ['team members', 'FLUX_TOPIC', 'team'],
  // Full roster (explicit ask)
  ['give me the full team roster', 'FLUX_TOPIC', 'team-roster'],
  ['who are the wing heads', 'FLUX_TOPIC', 'team-roster'],
  ['show me all team members', 'FLUX_TOPIC', 'team-roster'],
  ['how do i join flux', 'FLUX_TOPIC', 'join'],
  ['what are the wings', 'FLUX_TOPIC', 'wings'],
  ['who is the vice chancellor', 'FLUX_TOPIC', 'faculty'],
  ['rakesh kumar', 'FLUX_TOPIC', 'faculty'],
  ['contact email', 'FLUX_TOPIC', 'contact'],
  // Navigation
  ['where can i find the results page', 'FLUX_TOPIC', 'navigation'],
  ['gallery', 'FLUX_TOPIC', 'navigation'],
  ['judge panel', 'FLUX_TOPIC', 'navigation'],
  ['take me to the ideathon page', 'FLUX_TOPIC', 'navigation'],
  // Events
  ['upcoming events', 'FLUX_TOPIC', 'events'],
  ['expert talk series', 'FLUX_TOPIC', 'events'],
  ['shivesh sinha', 'FLUX_TOPIC', 'events'],
  ['projects of flux', 'FLUX_TOPIC', 'projects'],
  // Guardrails — must stay OFF_TOPIC
  ['weather today', 'OFF_TOPIC', null],
  ['who is the president of india', 'OFF_TOPIC', null],
  ['write me a poem', 'OFF_TOPIC', null],
  ['tell me a joke', 'OFF_TOPIC', null],
  ['capital of france', 'OFF_TOPIC', null],
  ['recipe for pizza', 'OFF_TOPIC', null],
  ['how do i prepare for gate exam', 'OFF_TOPIC', null],
  ['iit jee syllabus', 'OFF_TOPIC', null],
  ['elvis presley songs', 'OFF_TOPIC', null],
];

console.log('KB items:', k.KNOWLEDGE_BASE.length, '|', k.KNOWLEDGE_BASE.map((x) => x.id).join(', '));

let pass = 0;
let fail = 0;
for (const [q, expectCat, expectItem] of CASES) {
  const cat = k.classifyQuery(q);
  let ok = cat === expectCat;
  let detail = `cat=${cat}`;
  if (ok && expectItem) {
    const { best, high } = bestItem(q);
    ok = best === expectItem;
    detail += ` item=${best}(${high})`;
  }
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} [target:${expectCat}${expectItem ? '/' + expectItem : ''}] "${q}" -> ${detail}`);
}
console.log(`\nPASS ${pass}/${CASES.length}, FAIL ${fail}`);
process.exit(fail > 0 ? 1 : 0);
