// ─────────────────────────────────────────────────────────────────────────────
// guardrail.js — strict FLUX-only topic classifier + canned conversational
// replies. Mirrors Frontend/src/components/chatbot/knowledge.ts so the backend
// LLM answers and the frontend offline fallback behave identically. Keep the
// pattern lists in sync with knowledge.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = {
  GREETING: "GREETING",
  CLOSING: "CLOSING",
  IDENTITY: "IDENTITY",
  OFF_TOPIC: "OFF_TOPIC",
  FLUX_TOPIC: "FLUX_TOPIC",
};

const GREETING_PATTERNS = [
  /^(hi|hello|hey|hola|namaste|yo|sup|greetings)\b/i,
  /^good\s+(morning|afternoon|evening|day)\b/i,
  /^hey\s+there\b/i,
  /^hi\s+there\b/i,
  /^hello\s+there\b/i,
];

const CLOSING_PATTERNS = [
  /^(thanks|thank\s+you|thx|ty|bye|goodbye|see\s+you|cya)\b/i,
  /^(ok\s+thanks|okay\s+thanks|thanks\s+a\s+lot|thank\s+you\s+so\s+much)\b/i,
];

const IDENTITY_PATTERNS = [
  /who\s+are\s+you\b/i,
  /what\s+are\s+you\b/i,
  /what\s+is\s+your\s+name\b/i,
  /what\s+can\s+you\s+do\b/i,
  /how\s+can\s+you\s+help\b/i,
  /how\s+can\s+you\s+help\s+me\b/i,
  /who\s+made\s+you\b/i,
  /who\s+created\s+you\b/i,
  /^help$/i,
  /^help\s+me$/i,
];

const FLUX_EXPLICIT_SIGNALS = [
  /\bflux\b/i,
  /\bmmmut\b/i,
  /\bcsed\b/i,
  /\bideathon\b/i,
  /\bbytebrawl\b/i,
  /\bbyte\s*brawl\b/i,
  /\bhacktoberfest\b/i,
  /\batal\s*(fdp)?\b/i,
  /\bshe\s*leads\b/i,
  /\banupama\s*(kaushik)?\s*(sharma)?\b/i,
  /\bshivesh\s*(sinha)?\b/i,
  /\bfuture\s+leaders\s+of\s+unbound\s+xperiments\b/i,
  /\binteract[\s,.]+impact[\s,.]+innovate\b/i,
  /\btessy\s*thomas\b/i,
  /\bnitya\s*anand\b/i,
  /\bipshita\s*gupta\b/i,
  /\barpita\s*varshneya\b/i,
  /\banjali\s*sharma\b/i,
  /\bzene?\s*techs?\b/i,
  /\btrinetra(\s*\.\s*exe)?\b/i,
  /\bspiralforge\b/i,
  /\b2\s*pointer\s*approach\b/i,
  /\bquarks\b/i,
  /\bnakshatra\b/i,
  /\brakesh\s+kumar\b/i,
  /\bsatya\s+prakash\s+yadav\b/i,
  /\bsatvik\s+vats\b/i,
  /\bshwet\s+ketu\b/i,
];

const CLUB_CONTEXT_PATTERNS = [
  /\b(upcoming\s+)?events?\b/i,
  /\bhackathons?\b/i,
  /\bbootcamps?\b/i,
  /\bworkshops?\b/i,
  /\bideation\b/i,
  /\bhow\s+(can\s+i|to)\s+join\b/i,
  /\binductions?\b/i,
  /\brecruitment\b/i,
  /\beligibility\b/i,
  /\bhow\s+to\s+apply\b/i,
  /\bwho\s+can\s+join\b/i,
  /\bcan\s+.*join\b/i,
  /\bjoin\s+(the\s+)?(club|society|team|flux)\b/i,
  /\bstudent\s+wings?\b/i,
  /\bwings?\b/i,
  /\bfaculty(\s+mentors?)?\b/i,
  /\bmentors?\b/i,
  /\bpatrons?\b/i,
  /\bvice\s+chancellor\b/i,
  /\bvc\s*(ma'?am|mam|sir)?\b/i,
  /\babout\s+(the\s+)?(club|society)\b/i,
  /\bmotto\b/i,
  /\bcore\s+pillars\b/i,
  /\bpillars\b/i,
  /\bmission\b/i,
  /\bvision\b/i,
  /\bcontact(\s+(info|us|details))?\b/i,
  /\bofficial\s+email\b/i,
  /\bclub\s+email\b/i,
  /\bsociety\s+email\b/i,
  /\bclub\s+location\b/i,
  /\bsociety\s+room\b/i,
  /\bdepartment\s+room\b/i,
  /\bprojects?\b/i,
  /\bmechanistic\s+interpretability\b/i,
  /\bregisters?\b/i,
  /\bregistration\b/i,
  /\bresults?\b/i,
  /\bwinners?\b/i,
  /\brunner\s?up\b/i,
  /\bleaderboard\b/i,
  /\bappreciation\b/i,
  /\bfaculty\s+development\b/i,
  /\bmechanistic\b/i,
  /\binterpretability\b/i,
  /\bspeakers?\b/i,
  /\bsessions?\b/i,
  /\bschedule\b/i,
  /\btimings?\b/i,
  /\bprizes?\b/i,
  /\btroph(y|ies)\b/i,
  /\bproblem\s+statements?\b/i,
  /\bproblem\s+bank\b/i,
  /\bopen\s+innovation\b/i,
  /\bproject\s+ideas?\b/i,
  /\bppts?\b/i,
  /\bfdp\b/i,
  /\bexpert\s+talk\b/i,
  /\btalk\s+series\b/i,
  /\bteam\s+members?\b/i,
  /\brosters?\b/i,
  /\bmembers?\b/i,
  /\bcore\s+team\b/i,
  /\bwing\s+heads?\b/i,
  /\b(president|vice\s+president|treasurer|secretary)\b/i,
  /\bwho\s+(leads|runs|heads)\b/i,
  /\b(site\s*map|sitemap|navigation)\b/i,
  /\bgallery\b/i,
  /\bjudge\s*panel\b/i,
];

const UNRELATED_TOPIC_PATTERNS = [
  /\b(weather|forecast|temperature)\b/i,
  /\b(cricket|football|soccer|fifa|ipl|world\s*cup|match|score)\b/i,
  /\b(recipe|cook|cooking|cake|pizza|burger|pasta|food)\b/i,
  /\b(movie|film|actor|actress|cinema|bollywood|hollywood)\b/i,
  /\b(song|music|singer|lyrics)\b/i,
  /\b(joke|riddle|funny|meme)\b/i,
  /\b(poem|poetry|story|essay|love\s*letter)\b/i,
  /\b(president\s+of|prime\s+minister\s+of|capital\s+of|currency\s+of)\b/i,
  /\b(who\s+is\s+the\s+richest|net\s*worth)\b/i,
  /\b(write\s+(a\s+)?(code|script|program|function|component))\b/i,
  /\b(solve|calculate|equation|integral|derivative|math\s+problem)\b/i,
  /\b(elon\s*musk|trump|modi|biden|putin|gates|jobs|zuckerberg)\b/i,
  /\b(google|microsoft|amazon|apple|facebook|netflix|tesla|openai|chatgpt)\b/i,
  /\b(iit|nit|bits\s*pilani|harvard|stanford|mit|oxford|cambridge)\b/i,
  /\b(homework|exam|test\s+paper)\b/i,
];

/**
 * Classifies a query. Semantics intentionally identical to
 * knowledge.ts#classifyQuery:
 *   GREETING | CLOSING | IDENTITY | OFF_TOPIC | FLUX_TOPIC
 */
export function classifyQuery(query) {
  const q = String(query || "").toLowerCase().trim();

  if (!q) return CATEGORIES.IDENTITY;

  if (CLOSING_PATTERNS.some((p) => p.test(q))) return CATEGORIES.CLOSING;
  if (GREETING_PATTERNS.some((p) => p.test(q))) return CATEGORIES.GREETING;
  if (IDENTITY_PATTERNS.some((p) => p.test(q))) return CATEGORIES.IDENTITY;

  const hasFluxExplicit = FLUX_EXPLICIT_SIGNALS.some((p) => p.test(q));
  const hasUnrelated = UNRELATED_TOPIC_PATTERNS.some((p) => p.test(q));

  if (hasUnrelated && !hasFluxExplicit) return CATEGORIES.OFF_TOPIC;
  if (hasFluxExplicit) return CATEGORIES.FLUX_TOPIC;

  if (CLUB_CONTEXT_PATTERNS.some((p) => p.test(q))) return CATEGORIES.FLUX_TOPIC;

  return CATEGORIES.OFF_TOPIC;
}

// ── Canned replies (identical copy to knowledge.ts) ──────────────────────────

export const OFF_TOPIC_RESPONSE = `I am FLUX AI, the official virtual assistant dedicated exclusively to FLUX (*Future Leaders of Unbound Xperiments*) at MMMUT Gorakhpur.

I am not programmed to answer queries about other subjects, general programming assignments, or outside topics. Please feel free to ask me anything about FLUX:

- About FLUX: Mission, core pillars (*Interact, Impact, Innovate*), and domains.
- Events & Hackathons: FLUX Ideathon, ByteBrawl (Hacktoberfest Edition), ATAL FDP, and technical bootcamps.
- Results: Ideathon 2025 winners (ZenTechs, TRINETRA, SpiralForge) and ByteBrawl final standings.
- Student Wings & Inductions: How to join, eligibility across all engineering branches/MCA, and our 6 wings (AI/ML, Dev, CP, Design, Media, Operations).
- Faculty Leadership: Chief Patron Prof. Anupama Kaushik Sharma (Hon'ble Vice Chancellor) and CSED faculty advisors.
- Key Initiatives: She Leads (women in tech) and student research/patent projects.
- Contact: Official email (\`flux@mmmut.ac.in\`), campus location, and social channels.

You can also click any of the suggestion chips below to explore!`;

export const GREETING_RESPONSE = `Hello! 👋 I'm FLUX AI, your dedicated assistant for FLUX (*Future Leaders of Unbound Xperiments*) at MMMUT Gorakhpur.

I can assist you exclusively with all queries regarding FLUX society:
- Events & Hackathons: FLUX Ideathon, ByteBrawl, and ATAL FDP
- Results & Standings: Ideathon 2025 and ByteBrawl winner teams
- Student Wings & Inductions: How to join, eligibility across branches, and student wings
- Faculty Mentors: Leadership under Prof. Anupama Kaushik Sharma and CSED faculty
- Initiatives: She Leads (women in tech) and student research projects

How can I help you explore FLUX today?`;

export const IDENTITY_RESPONSE = `I am **FLUX AI**, the virtual assistant for **FLUX** (*Future Leaders of Unbound Xperiments*), the departmental society of Computer Science & Engineering at **MMMUT Gorakhpur**.

My purpose is strictly dedicated to answering inquiries about **FLUX**:
- Answering questions about our hackathons (Ideathon, ByteBrawl) and technical bootcamps.
- Explaining how to join FLUX during annual inductions and detailing our 6 student wings.
- Providing information about our faculty leadership and mentors.
- Guiding you through our She Leads initiative and student research projects.
- Sharing event results (Ideathon 2025 and ByteBrawl winner teams) and our student leadership roster.

*Note: I do not respond to questions outside the scope of FLUX.*

What would you like to know about FLUX?`;

export const CLOSING_RESPONSE = `You're very welcome! If you ever have more questions about FLUX events, student wings, or inductions, feel free to ask anytime.

Keep innovating with **FLUX**! 🚀`;

const CANNED_RESPONSES = {
  [CATEGORIES.GREETING]: GREETING_RESPONSE,
  [CATEGORIES.CLOSING]: CLOSING_RESPONSE,
  [CATEGORIES.IDENTITY]: IDENTITY_RESPONSE,
  [CATEGORIES.OFF_TOPIC]: OFF_TOPIC_RESPONSE,
};

/** Returns the canned reply for a category, or null when the LLM must answer. */
export function cannedResponseFor(category) {
  return CANNED_RESPONSES[category] || null;
}
