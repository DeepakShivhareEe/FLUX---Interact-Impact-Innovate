/**
 * Export clean markdown content from the website's source code and data
 * for ingestion into the FLUX AI chatbot knowledge base.
 *
 * Generates ~22 focused .md files into `chatbot-content/`, covering every
 * section of flux.org.in: home, about, faculty, leadership, team, events
 * (timeline, FDP, ByteBrawl incl. tracks/details + winners, Ideathon incl.
 * stages + all 50 problem statements, She Leads incl. session schedule),
 * projects, joining FLUX, contact channels, and a site navigation map.
 *
 * Runs standalone with Node.js (no external dependencies). Data that lives
 * in structured source files (projects.json, teamData.ts,
 * bytebrawlResultsData.ts) is parsed at export time so the exported facts
 * never drift from the website.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'chatbot-content');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ============================================================================
// Helpers
// ============================================================================

/** Files this script is allowed to produce. Anything else is swept away. */
const EXPECTED_FILES = new Set();

/** Write one clean markdown file. */
function writeContent(filename, title, urlPath, source, content) {
  EXPECTED_FILES.add(filename);
  const filePath = path.join(outDir, filename);
  const fileContent = `# ${title}

**URL Path:** ${urlPath}
**Source:** ${source}

${content.trim()}
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated: ${filename}`);
}

/** Read a UTF-8 file, or return '' when missing. */
function readSource(relPath) {
  try {
    return fs.readFileSync(path.join(rootDir, relPath), 'utf-8');
  } catch {
    return '';
  }
}

/** Parse the Ideathon problem bank (50 numbered items) from projects.json. */
function parseProjects() {
  try {
    const raw = fs.readFileSync(path.join(rootDir, 'Frontend', 'src', 'projects.json'), 'utf-8');
    const projects = JSON.parse(raw);
    return projects.map((p, i) => ({
      index: i + 1,
      name: p.name || 'Untitled Problem Statement',
      domain: p.domain || 'Technology & Innovation',
      problemStatement: p.problemStatement || 'N/A',
      expectedSolution: p.expectedSolution || 'N/A',
    }));
  } catch (err) {
    console.warn('Could not parse projects.json, Ideathon problem bank will be skipped:', err.message);
    return [];
  }
}

/** Parse team members (name/role/branch/batch) out of teamData.ts. */
function parseTeam() {
  const src = readSource('Frontend/src/pages/team/teamData.ts');
  if (!src) return [];
  // Quote characters are matched via backreference so batch values like "'27" parse cleanly.
  const re = /name:\s*(['"])([\s\S]+?)\1,\s*\n\s*role:\s*(['"])([\s\S]+?)\3,\s*\n\s*branch:\s*(['"])([\s\S]+?)\5,\s*\n\s*batch:\s*(['"])([\s\S]+?)\7/g;
  const members = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    members.push({ name: m[2].trim(), role: m[4].trim(), branch: m[6].trim(), batch: m[8].trim() });
  }
  return members;
}

/** Parse ByteBrawl problem statements (psNo/title/track/allottedTo) out of bytebrawlResultsData.ts. */
function parseBytebrawlProblemStatements() {
  const src = readSource('Frontend/src/data/bytebrawlResultsData.ts');
  if (!src) return [];
  const re = /\{\s*"psNo":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"track":\s*"([^"]+)",\s*"allottedTo":\s*"([^"]+)"\s*\}/g;
  const items = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    items.push({ psNo: m[1], title: m[2], track: m[3], allottedTo: m[4] });
  }
  return items;
}

/** Remove previously generated files that are no longer part of the export. */
function sweepStaleFiles() {
  if (!fs.existsSync(outDir)) return;
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.md') && !EXPECTED_FILES.has(f)) {
      fs.rmSync(path.join(outDir, f));
      console.log(`Removed stale file: ${f}`);
    }
  }
}

// ============================================================================
// 1. Home / Overview
// ============================================================================

writeContent(
  'home.md',
  'FLUX - Future Leaders of Unbound Xperiments',
  '/',
  'flux.org.in home page',
  `
FLUX (Future Leaders of Unbound Xperiments) is the premier research, development, and innovation society at Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur, affiliated with the Department of Computer Science and Engineering.

### Motto
**Interact. Impact. Innovate.**

### What FLUX Does
- **Innovate:** Building production-grade software architectures, open-source tools, and research-backed prototypes that solve acute technological and societal challenges.
- **Interact:** Connecting curious minds, experienced faculty researchers, alumni industry leaders, and global technology communities through conferences, workshops, and peer learning.
- **Impact:** Translating student research into registered patents, peer-reviewed publications, hackathon victories, and deployable systems.

### Focus Domains
- **Artificial Intelligence & Machine Learning:** Deep learning, NLP, computer vision, mechanistic interpretability, and generative models.
- **Full-Stack Software Engineering:** Scalable distributed web systems, cloud architecture, and modern frontend design.
- **Cyber-Physical & IoT Systems:** Sensor networks, smart agriculture, automated campus systems, and early-warning safety devices.
- **Algorithmic Problem Solving:** Data structures, advanced algorithms, and competitive programming excellence.

### Quick Facts
- Home university: MMMUT, Deoria Road, Gorakhpur, Uttar Pradesh - 273010, India.
- Official website: https://flux.org.in
- Official email: flux@mmmut.ac.in
- Opens global participation: Hacktoberfest (ByteBrawl), national ideation (Ideathon), women-in-tech leadership (She Leads), and AICTE ATAL FDPs.

### Explore
See navigation.md for the complete page map of the website.
`
);

// ============================================================================
// 2. About Page
// ============================================================================

writeContent(
  'about.md',
  'About FLUX Society',
  '/about',
  '/about page (AboutPage + utils/constants/aboutData.ts)',
  `
### Overview
FLUX is a student-driven research and innovation society affiliated with the Department of Computer Science and Engineering at MMMUT Gorakhpur. We turn ideas into products, research publications, and real-world impact through hands-on development, hackathons, and industry mentorship.

### Patron & Leadership Vision
- **Patron:** Prof. Anupama Kaushik Sharma, Hon'ble Vice Chancellor, MMMUT Gorakhpur.
- **Vision:** "FLUX represents our commitment to fostering innovation and research excellence, creating leaders who will drive technological advancement and meaningful societal impact."

### Mission
FLUX is dedicated to bridging the gap between theoretical computer science and impactful real-world engineering. The society fosters an ecosystem of research excellence, hands-on software development, machine learning innovation, and competitive algorithmic problem-solving.

### Core Values
1. **Innovation:** We build what others only imagine - from early-stage prototypes to production-ready scalable systems.
2. **Collaboration:** Great work happens at intersections. We connect students, faculty, and industry leaders to tackle complex problems together.
3. **Excellence:** We ship clean code, publish rigorous research papers, and hold ourselves to production-grade engineering standards.
4. **Impact:** Technology is a vehicle for change. We measure success by the tangible problems our solutions solve in society.

### Impact Areas
- **For Students:** Authentic experience before graduation through research publications, live technical projects, hackathon mentorship, and leadership roles.
- **For Faculty:** Amplifying academic research through dedicated student engineering teams, collaborative research grants, and industry tie-ups.
- **For Industry:** Access to vetted technical talent, sponsored R&D experiments, and collaborative technological solutions.
`
);

// ============================================================================
// 3. Faculty & Mentorship
// ============================================================================

writeContent(
  'faculty.md',
  'Faculty Mentors and Academic Guidance',
  '/faculty',
  '/faculty page (pages/faculty/facultyData.ts)',
  `
### Academic Mentorship & Leadership
FLUX operates under the guidance of distinguished faculty members of the Department of Computer Science and Engineering (CSED) and university executive leadership at MMMUT Gorakhpur.

### University Leadership
- **Prof. Anupama Kaushik Sharma**
  - **Role:** Hon'ble Vice Chancellor of MMMUT Gorakhpur & Chief Patron of FLUX.
  - **Focus areas:** Interdisciplinary research, innovation hubs, academic leadership, institutional vision.
  - **Email:** vc@mmmut.ac.in
  - **Vision:** Driving university-wide research culture, innovation incubation, and societal impact.

### CSED Leadership
- **Prof. Rakesh Kumar**
  - **Role:** Professor & Head of Department, Computer Science and Engineering.
  - **Qualification:** PhD, IIT Roorkee. Recipient of the Best Teacher Award.
  - **Specializations:** Mobile & distributed computing, Internet of Things, sensor networks, network security.
  - He also served as **Convener** of the ATAL Faculty Development Programme on Mechanistic Interpretability (rkcs@mmmut.ac.in).

### Faculty Coordinators
- **Dr. Satvik Vats**
  - **Role:** Assistant Professor, CSE.
  - **Specializations:** Big Data, deep learning, machine learning, AI.
  - **Achievements:** 2700+ citations, 20+ patents, 75+ project publications, 4+ books, 18+ international publications.
  - **Email:** svcse@mmmut.ac.in | Website: https://svats.in
- **Dr. Shwet Ketu**
  - **Role:** Assistant Professor, CSE.
  - **Specializations:** Internet of Things (IoT), Internet of Healthcare Things (IoHT), wireless networks, smart systems.
  - **Achievements:** 1000+ citations, 6+ patents, 13+ international publications.
  - **Email:** skcse@mmmut.ac.in
- **Dr. Satya Prakash Yadav**
  - **Role:** Associate Professor, CSE; Coordinator of the ATAL FDP (spycs@mmmut.ac.in).
  - **Specializations:** Computer vision, NLP, robotics, neural networks.

### How Faculty Support FLUX
- Faculty members from CSED guide the six FLUX student wings on research methodology, patent filing, algorithm design, and system architecture.
- Regular academic sessions, research paper reading groups, and ATAL Faculty Development Programmes (FDP) connect students directly with professors and global technical experts.

### Research Collaboration Areas
- Mechanistic Interpretability & AI explainability.
- Natural Language Processing & automated information synthesis.
- Computer vision for health screening & agriculture.
- Distributed systems, cloud architecture, and cyber-physical systems.
`
);

// ============================================================================
// 4. Student Leadership (core)
// ============================================================================

const allTeamMembers = parseTeam();
const BATCH_LABELS = { "'27": 'Final Year', "'28": 'Pre-Final Year', "'29": 'Sophomore Year' };

if (allTeamMembers.length === 0) {
  console.warn('Warning: teamData.ts parsing produced 0 members - leadership/team pages will be thin.');
}

const leadershipOrder = [
  'President',
  'Vice President',
  'Head of Operations',
  'Additional Coordinator',
  'Treasurer',
  'Joint Secretary',
  'Development Head',
  'Design Head',
  'Photography & Video Head',
  'Algorithms Head',
  'AI & ML Head',
  'Content & Social Media Head',
];
const leadershipByRole = new Map();
for (const mem of allTeamMembers) {
  if (!leadershipByRole.has(mem.role)) leadershipByRole.set(mem.role, []);
  leadershipByRole.get(mem.role).push(mem);
}

let leadershipBody = `
### Current Student Leadership
FLUX is led by a core student committee spanning development, design, algorithms, AI/ML, media, and operations. The final-year team (batch 2027) provides overall direction, supported by Joint Secretaries from batch 2028 and executive members from batch 2029.

`;
for (const role of leadershipOrder) {
  const people = leadershipByRole.get(role);
  if (!people) continue;
  for (const p of people) {
    leadershipBody += `- **${p.name}** - ${p.role} (${p.branch}, batch ${p.batch})\n`;
  }
}
leadershipBody += `
The complete roster across all three batches is documented in team.md.
`;
writeContent(
  'leadership.md',
  'FLUX Student Leadership',
  '/team',
  '/team page (pages/team/teamData.ts)',
  leadershipBody
);

// ============================================================================
// 5. Team & Wing Structure (complete)
// ============================================================================

const groupsByBatch = {};
for (const m of allTeamMembers) {
  if (!groupsByBatch[m.batch]) groupsByBatch[m.batch] = [];
  groupsByBatch[m.batch].push(m);
}

let teamBody = `
### Organization Overview
FLUX operates through six specialized student wings working synergistically under faculty guidance:
1. **AI & Machine Learning Wing:** Deep learning, NLP, computer vision, and mechanistic interpretability research; reading groups and intelligent AI applications.
2. **Software Development Wing:** Web platforms, mobile utilities, and internal systems built with React, Node.js, TypeScript, and cloud services.
3. **Algorithms & Competitive Programming Wing:** Algorithmic training, problem-solving workshops, and national/global contest preparation (ICPC).
4. **Design & UI/UX Wing:** Design systems, user interfaces, 3D graphics, branding, and motion graphics.
5. **Content & Media Wing:** Technical documentation, article publishing, social outreach, photography, and video production.
6. **Executive Leadership & Operations Wing:** Strategic planning, event logistics, inter-departmental collaboration, and industry partnerships.

### Team Roster
`;
for (const batch of ["'27", "'28", "'29"]) {
  const label = BATCH_LABELS[batch] || batch;
  const list = groupsByBatch[batch] || [];
  teamBody += `\n#### ${label} (batch ${batch}) - ${list.length} members\n`;
  for (const m of list) {
    teamBody += `- ${m.name} - ${m.role} (${m.branch})\n`;
  }
}
teamBody += `
### Roles Hierarchy
- Final year: President, Vice President, Head of Operations, Additional Coordinator, Treasurer, and wing Heads (Development, Design, Photography & Video, Algorithms, AI & ML, Content & Social Media).
- Pre-final year: Joint Secretaries, Operations Coordinators, Development/Design/Algorithms/AI-ML/Content Leads.
- Sophomore year: Executive Members driving events, outreach, and internal systems.
`;
writeContent(
  'team.md',
  'FLUX Team and Wing Structure',
  '/team',
  '/team page (pages/team/teamData.ts)',
  teamBody
);

// ============================================================================
// 6. Events Overview (timeline + upcoming)
// ============================================================================

writeContent(
  'events.md',
  'Events, Hackathons, and Technical Workshops',
  '/events',
  '/events page (pages/events/events.tsx timeline)',
  `
### Event Timeline (featured on the Events page)

1. **Artificial Intelligence Evolution and Future - Expert Talk (November 16, 2025)**
   - Session with **Er. Shivesh Sinha**, Senior Technical Program Manager at Intel, USA.
   - Deep insights into the evolution of AI, emerging technological shifts, and the future shaped by intelligent systems.
   - Approx. **300 attendees**.

2. **FLUX Ideathon 2025 (December 17-19, 2025; full cycle December 10-19)**
   - The flagship innovation competition: enthusiastic participation, innovative ideas, and collaborative problem-solving.
   - Approx. **500 attendees**. Winners of Ideathon 2025: **ZenTechs** (1st), **Team TRINETRA** (2nd), **SpiralForge** (3rd).

3. **ATAL Faculty Development Programme (January 19-24, 2026)**
   - "Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability", a six-day online ATAL/AICTE-sponsored FDP.
   - Approximately **300 faculty members, researchers, and scholars**.

4. **Freshmen Orientation (September 10, 2026)**
   - Welcome session for new students at Aryabhatta Hall: introduction of FLUX's core pillars (Innovate - Interact - Impact) and the FLUX family.
   - Approx. **350 attendees**.

5. **She Leads - Women in Technology & Leadership Summit (September 12-13 and October 4, 2026)**
   - An empowering summit for women in engineering with keynotes and sessions by industry leaders (Deloitte, Amazon, Flipkart, Microsoft).
   - Approx. **250 attendees**.

### Upcoming / Continued
6. **ByteBrawl x Hacktoberfest (October 26-29, 2026, Alan Turing Hall)**
   - High-intensity competitive coding showdown under Hacktoberfest 2026 ("AI belongs to everyone").
   - Results are released on the events page: see events-bytebrawl.md and events-bytebrawl-results.md.

### Event Family at a Glance
- Hackathons & competitions: Ideathon, ByteBrawl x Hacktoberfest.
- Conferences & FDPs: ATAL FDP on Mechanistic Interpretability.
- Summits: She Leads (women in tech).
- Regular sessions: technical bootcamps, expert talks, orientations.
`
);

// ============================================================================
// 7. ATAL FDP
// ============================================================================

writeContent(
  'events-fdp.md',
  'ATAL Faculty Development Programme - Mechanistic Interpretability',
  '/events/fdp',
  '/events/fdp page (components/sections/events/UpcomingEvents/fdp.tsx)',
  `
### Overview
The **ATAL Faculty Development Programme (FDP)** is an AICTE Training and Learning (ATAL) Academy sponsored programme organized by the Department of Computer Science & Engineering at MMMUT Gorakhpur.

- **Theme:** Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability.
- **Dates:** January 19-24, 2026 (6 days).
- **Mode:** Online (ATAL Online).
- **Fee:** Completely FREE - no charge for registration, course, or certification.
- **Audience:** Faculty members, research scholars, and PG scholars of AICTE-approved institutions; industry personnel may also apply.

### Key Topics (8 sessions)
1. Core mathematical tools for AI: linear algebra, calculus, and probability.
2. Understanding deep neural networks through information theory.
3. Techniques to visualize neural activations and interpret model attributions.
4. Mechanistic understanding of transformers and attention mechanisms.
5. Bayesian and probabilistic approaches to interpreting neural models.
6. Tools for identifying circuits and structures within large language models.
7. Global and sparse explanations in interpretability.
8. Ethics, explainability, and responsible AI governance.

### Programme Objectives
1. Gain mathematical clarity on core mechanistic interpretability concepts.
2. Learn practical tools and methods to analyze neural networks at different levels.
3. Understand interpretability's role in AI safety and value alignment.
4. Explore emerging trends in interpretability for large models, RL, and vision.
5. Recognize ethical and governance issues linked to interpretability.

### Eligibility & Guidelines
- Faculty members, research scholars, and PG scholars of AICTE-approved institutions.
- Industry personnel are eligible to apply.
- NO charge for registration, course, and certification.
- Certificates are issued to participants registered on the ATAL Portal.
- Selection is on a first-come, first-served basis.

### Registration Process (5 steps via AICTE ATAL portal)
1. **Visit ATAL Portal:** Access the official AICTE ATAL Academy portal; new users click "Sign Up Now".
2. **Create Account:** Register as a "Participant" with name, institutional email, contact number, institution, and department.
3. **Email Verification:** Click the verification link sent by ATAL Academy to activate the account.
4. **Complete Profile:** Fill all mandatory fields (personal information, qualifications, professional background, institutional details).
5. **Programme Registration:** Go to the FDP section, choose "ATAL Online", select January 2026 and Online mode, then select this FDP and submit.

Note: Certificates of completion are issued exclusively to participants who registered through the official ATAL Portal and meet all attendance requirements.

### Programme Coordinators
- **Dr. Rakesh Kumar** - Convener; Professor & HOD, CSE (rkcs@mmmut.ac.in).
- **Dr. Satya Prakash Yadav** - Coordinator; Associate Professor, CSE (spycs@mmmut.ac.in).
- **Dr. Shwet Ketu** - Co-Coordinator; Assistant Professor, CSE (skcse@mmmut.ac.in).

Hosted by the Department of Computer Science & Engineering, MMMUT Gorakhpur.
`
);

// ============================================================================
// 8. ByteBrawl x Hacktoberfest (event facts)
// ============================================================================

writeContent(
  'events-bytebrawl.md',
  'ByteBrawl x Hacktoberfest',
  '/events/bytebrawl-hacktoberfest',
  '/events/bytebrawl-hacktoberfest (config/eventConfig.ts)',
  `
### About ByteBrawl
**ByteBrawl x Hacktoberfest** (short name ByteBrawl '26) is FLUX's high-intensity competitive coding showdown where architectural resilience meets rapid implementation under strict production-grade constraints. Organized by FLUX, Department of Computer Science & Engineering, MMMUT Gorakhpur.

### Event Logistics (2026 edition)
- **Dates:** 26 - 29 October, 2026.
- **Venue:** Alan Turing Hall, MMMUT Gorakhpur campus.
- **Format:** In-person with live leaderboard updates; automated test suites, clean API contract validation, and rigorous performance metrics.
- **Capacity:** 500 seats (registrations processed first-come, first-served).
- **Team format:** Team of 2, or Individual (solo developers may be paired with another solo participant during the opening networking session).
- **Registration:** Registration is closed for the 2026 edition. Registration IDs are formatted as BBH26-XXXXXX and were emailed upon confirmation.
- **Entry fee:** Completely free for MMMUT students.
- **Eligibility:** Open to all enrolled students across all branches and years at MMMUT Gorakhpur; both members of a team must be verified MMMUT students with valid university roll numbers.

### Rules & Regulations
**Code integrity & originality**
- All code must be authored during the hackathon period.
- Plagiarism, copying closed-source solutions, or passing off pre-built apps leads to disqualification.
- Open-source libraries, open-weight models, and permissive packages are allowed and encouraged.

**Production constraints**
- Submissions are evaluated on architectural resilience, latency under load, and comprehensive test coverage, not just features.
- Teams must provide setup instructions, documentation, and automated tests.

**Hacktoberfest 2026 guidelines**
- Theme: "AI belongs to everyone" - build with open-source AI, open-weight models, autonomous agents, and AI tooling.
- Pull requests no longer count toward 2026 rewards; participants earn digital badges and physical sticker packs through MLH and DEV.
- Projects must be published under an OSI-approved open-source license on GitHub.

**Registration rules**
- Exactly 2 members per team, or 1 for Individual registration.
- Each participant (by roll number and email) may register only once.
- First-come, first-served up to venue capacity.

### FAQs
- **Can I participate without a teammate?** Yes - choose Individual Registration; you compete solo or get paired with another solo participant at the networking session.
- **Do GitHub pull requests count toward Hacktoberfest rewards in 2026?** No - under the 2026 MLH/DEV/DigitalOcean format, PRs no longer count. Instead, register on hacktoberfest.com and add a mailing address to your MyMLH account to convert badges into real sticker packs.
- **What is the 2026 Hacktoberfest theme?** "AI belongs to everyone" - learning, experimenting, and building with open-source AI, open-weight models, agents, and reusable skill systems.
- **Is there any registration fee?** No - ByteBrawl is completely free, hosted by FLUX and CSED.
- **How do I know my registration is confirmed?** A unique Registration ID (BBH26-XXXXXX) is displayed on screen and emailed after form submission.

### Prizes
Winner, runner-up, and 2nd runner-up trophies plus certificates and sponsor swag; a special citation for the Best Open-Weight AI Agent under the 2026 Hacktoberfest theme. Specific cash amounts for 2026 were announced at the event - see events-bytebrawl-results.md for the final standings.

### Stay Connected
- Official event email: flux@mmmut.ac.in
- WhatsApp event group: https://chat.whatsapp.com/CEQxUE7IS485dCgckzTNjm
- Instagram: @flux.mmmut
- Student coordinators for the edition: Aditya Gupta (CSE, 2nd year) and Khushi Patel (IT, 2nd year).
`
);

// ============================================================================
// 9. ByteBrawl Tracks & Problem Statements (parsed from results dataset)
// ============================================================================

const TRACK_METADATA = {
  "Satya & Pramaan Bharat": {
    theme: "Truth & AI Verification",
    desc: "Verifiable court judgment citations, reproducible AI test protocols, multi-lingual Indian LLM safety audits, and autonomous payment limit governors.",
  },
  "Sahayak & Samman Bharat": {
    theme: "Civic Support & Dignity",
    desc: "Voice-driven unified government applications, gig-worker fatigue & pressure maps, offline emergency health protocol companions, and dynamic consent sandboxes.",
  },
  "Bhoomi & Bharosa Bharat": {
    theme: "Agriculture & Land Trust",
    desc: "Sharecropper crop tenancy verification, farmer-owned data trusts, parcel geocode resolution across conflicting surveys, and automated agricultural advisory audits.",
  },
  "Shital & Sajag Bharat": {
    theme: "Climate & Heat Resilience",
    desc: "Unified Heat Action Plan (HAP) intelligence, urban heat risk & missing sensor mapping, heat-safe outdoor labor shift scheduling, and localized threshold modeling.",
  },
  "Bhasha & Bol Bharat": {
    theme: "Linguistic Equity & Voice",
    desc: "Crowdsourced vernacular transcript quality checks, district-level Word Error Rate dashboards, device-optimized Small Language Model ladders, and voice recording ownership.",
  },
};

const bbProblemStatements = parseBytebrawlProblemStatements();

let tracksBody = `
### ByteBrawl Tracks & Problem Statement Details
The 2026 edition ran **25 verified problem statements across 5 India-first tracks**. Each team was allotted one problem statement for the final round.

`;
for (const [trackName, meta] of Object.entries(TRACK_METADATA)) {
  tracksBody += `#### Track: ${trackName} (${meta.theme})\n${meta.desc}\n\n`;
  const items = bbProblemStatements.filter((p) => p.track === trackName);
  for (const p of items) {
    tracksBody += `- **${p.psNo}: ${p.title}** - built by *${p.allottedTo}*\n`;
  }
  tracksBody += '\n';
}
tracksBody += `
The teams were allotted these statements in the final round after shortlisting from Round 1 (26 participating teams). Round 2 featured 25 teams including one merged pairing (Team Agastya + Byte Me).
`;
writeContent(
  'events-bytebrawl-tracks.md',
  'ByteBrawl Tracks and Problem Statements',
  '/events/bytebrawl-hacktoberfest',
  'Frontend/src/data/bytebrawlResultsData.ts (TRACKS_METADATA + PROBLEM_STATEMENTS)',
  tracksBody
);

// ============================================================================
// 10. ByteBrawl Final Results
// ============================================================================

writeContent(
  'events-bytebrawl-results.md',
  'ByteBrawl x Hacktoberfest - Final Results',
  '/events/bytebrawl-hacktoberfest',
  'Frontend/src/data/bytebrawlResultsData.ts (FINAL_WINNERS + FINAL_RESULT_META)',
  `
### Final Round Results - HACKTOBERFEST X BYTEBRAWL
FLUX announced the winners of HACKTOBERFEST X BYTEBRAWL, a celebration of coding, innovation, problem-solving, and technical excellence. The final round saw enthusiastic participation from 25 shortlisted teams.

- **1st Place - Grand Champions:** Team **2 Pointer Approach** (Satyam Prajapati & Nitish Kumar, MMMUT). Highlighted for exceptional algorithmic precision, architectural resilience, and production-grade execution under tight constraints.
- **2nd Place - 1st Runner Up:** Team **Quarks** (Utkarsh Shukla & Mansi Singh, ITM). Highlighted for stunning innovation, rapid prototyping, and comprehensive implementation across Bharat challenges.
- **3rd Place - 2nd Runner Up:** Team **nakshatra** (Nitin Kumar & Swati Kushwaha, MMMUT). Highlighted for impressive domain execution, robust problem-solving, and creative architectural design.

### Special Appreciation
- **P2** - Priyanshu Mishra & Priyanshu Rai (MMMUT).
- **Supic** - Epshita Somani & Shaurya Bhatt (MMMUT).

### Participation Snapshot
- Round 1 leaderboard featured 26 teams from MMMUT, ITM, MPIT, and DDU.
- 25 teams advanced to the final round with allotted problem statements across 5 tracks (see events-bytebrawl-tracks.md).
- One merged pairing: Team Agastya + Byte Me (both originally solo participants).

### Organizing Authority
Event organized by FLUX, Madan Mohan Malaviya University of Technology, Gorakhpur, Uttar Pradesh. Student coordinators: Aditya Gupta (CSE, 2nd Year) and Khushi Patel (IT, 2nd Year). Additional special-appreciation editions of earlier rounds included HackZen, NovaX, Team Eren, TRINETRA.EXE, and Challengers.

Official announcement: https://www.instagram.com/p/DfHywq5z4yb/
`
);

// ============================================================================
// 11. Ideathon (event details)
// ============================================================================

writeContent(
  'events-ideathon.md',
  'FLUX Ideathon - Details & Results',
  '/ideathon',
  '/ideathon page (pages/ideathon)',
  `
### About
The **FLUX Ideathon** is MMMUT's signature annual innovation competition where student cohorts conceive, architect, and prototype solutions for acute societal and technological challenges.

### Key Highlights
- **Event dates:** December 10-19, 2025 (final showcase December 17-19).
- **Mode:** Offline rounds on the MMMUT Gorakhpur campus; registration and PPT submission happen online through the Ideathon page.
- **Prize pool:** Exciting goodies, certificates, and patent grants, etc.
- **Team size:** 3-4 members.
- **Submission format:** PPT (PowerPoint presentation).
- **Eligibility rule:** Every team must include at least one female member to foster inclusive innovation.

### Stages of Competition
1. **Stage 1 - Registration & PPT Submission:** December 10-15, 2025. Teams register on the website and upload their idea deck (problem selection and rationale, technical architecture and flowchart, tech-stack feasibility, and patent/research scope).
2. **Stage 2 - Shortlisting & Mentorship:** December 17, 2025. Shortlisted teams receive mentorship to strengthen their proposals.
3. **Stage 3 - Final Presentation & Winners:** December 18, 2025. Final pitch and prototype demonstration before an expert evaluation panel; winners announced at the closing event on December 19.

### Evaluation Criteria
- Innovation & originality (novelty of the proposed approach).
- Technical feasibility (soundness of system architecture and implementation viability).
- Societal & industrial impact (practical value and market/community relevance).
- Presentation & defense (clarity during panel Q&A and prototype validation).

### Rewards
Technical goodies, certificates of excellence, and patent-grant incubation support for the strongest ideas (patent filing mentorship and research publication support).

### Ideathon 2025 Winners
- **1st Place:** Team **ZenTechs** - Devansh Ranjan, Bhavesh Agrawal, Asmit Srivastav, Ashutosh Kumar Nigam, Ishika Saroj.
- **2nd Place:** Team **TRINETRA** - Aniket Sahu, Amit Kumar Patel, Manish Verma.
- **3rd Place:** Team **SpiralForge** - Kavya Saxena, Siddhant Singh, Nyasi, Pranav Sharma.
- **Special appreciation:** TEAM NAVTECH, Team BLITZ, Kavach Nexus, W.I.S.E, VISIONARY VANGUARDS, NexSight, QuadCore.

### Problem Statement Bank
The Ideathon also publishes a curated bank of **50 problem statements** spanning AI/ML, IoT hardware, healthcare, agriculture, education, safety, sustainability, and an open innovation challenge. See events-ideathon-problems-01.md through events-ideathon-problems-05.md (10 statements per file, PS-01 to PS-50).
`
);

// ============================================================================
// 12. Ideathon Problem Bank (50 statements, chunked 10 per file)
// ============================================================================

const projects = parseProjects();
const CHUNK_SIZE = 10;
const chunkCount = Math.ceil(projects.length / CHUNK_SIZE) || 5;

for (let i = 0; i < projects.length; i += CHUNK_SIZE) {
  const chunk = projects.slice(i, i + CHUNK_SIZE);
  const fileNum = String(Math.floor(i / CHUNK_SIZE) + 1).padStart(2, '0');
  const startIdx = chunk[0].index;
  const endIdx = chunk[chunk.length - 1].index;

  let body = `
### FLUX Ideathon Problem Statement Bank - Part ${Number(fileNum)} of ${chunkCount}
Problems PS-${String(startIdx).padStart(2, '0')} to PS-${String(endIdx).padStart(2, '0')} out of ${projects.length} curated statements. These problems are published for Ideathon teams, but they double as portfolio-ready project ideas across AI, IoT, healthcare, agriculture, education, safety, sustainability, and open innovation.

`;
  for (const p of chunk) {
    body += `#### PS-${String(p.index).padStart(2, '0')}. ${p.name}
- **Domain:** ${p.domain}
- **Problem Statement:** ${p.problemStatement}
- **Expected Solution:** ${p.expectedSolution}

`;
  }
  body += 'Explore the complete ideation section on the Ideathon page of the website.\n';
  writeContent(
    `events-ideathon-problems-${fileNum}.md`,
    `FLUX Ideathon Problem Statements (Part ${Number(fileNum)}/5)`,
    '/ideathon',
    'Frontend/src/projects.json',
    body
  );
}

// If projects.json failed to parse, emit placeholder files so the set stays complete.
if (projects.length === 0) {
  for (let part = 1; part <= chunkCount; part++) {
    const fileNum = String(part).padStart(2, '0');
    writeContent(
      `events-ideathon-problems-${fileNum}.md`,
      `FLUX Ideathon Problem Statements (Part ${part}/5)`,
      '/ideathon',
      'Frontend/src/projects.json',
      `
The problem statement bank (PS-01 to PS-50) could not be exported this run because projects.json was unavailable. Please re-run the export script.
`
    );
  }
}

// ============================================================================
// 13. She Leads (overview)
// ============================================================================

writeContent(
  'events-she-leads.md',
  'She Leads - Women in Technology & Leadership Summit',
  '/she-leads',
  '/she-leads page + home EventSlider',
  `
### Overview
**She Leads** (tagline: Innovate - Inspire - Empower) is FLUX's flagship empowerment initiative dedicated to elevating, mentoring, and championing women students in engineering, research, and technical leadership. On the home page it is presented as the annual **Dr. Tessy Thomas Conclave**, honoring excellence in technology leadership.

### Key Highlights
1. **Visionary Keynotes:** Interactive sessions with accomplished women tech leaders and alumni sharing career journeys, industry lessons, and navigation strategies.
2. **Hands-on Workshops:** Step-by-step masterclasses spanning AI, modern web stacks, and design workflows.
3. **1-on-1 Mentorship:** Direct interaction with experienced senior students and faculty mentors for academic and technical growth.
4. **Certificates & Perks:** Official FLUX certificates of participation, exclusive swag, networking sessions, and project spotlights.

### Mission
- Providing dedicated platforms for female engineering students to build, lead, and publish.
- Eliminating gender gaps in technical leadership, open-source contribution, and competitive programming.
- Fostering long-term mentorship between women students, faculty, and accomplished women in tech.

### Eligibility & Logistics
- **Who can attend:** All students currently enrolled at MMMUT Gorakhpur, any branch and any year (B.Tech, MCA, M.Tech, etc.).
- **Registration fee:** None - 100% free, organized by FLUX to foster diversity and leadership in computing.
- **Mode:** Online sessions.
- **Certificate:** Every registered attendee who participates receives an official Certificate of Participation from FLUX, MMMUT.
- **Prior experience:** Not required - sessions are designed for all experience levels.
- **Schedule:** Four sessions across September 12, September 13, and October 4, 2026 - see events-she-leads-speakers.md for speakers and timings.
`
);

// ============================================================================
// 14. She Leads Speakers & Schedule
// ============================================================================

writeContent(
  'events-she-leads-speakers.md',
  'She Leads Speakers and Session Schedule',
  '/she-leads',
  '/she-leads page (pages/sheLeads/SheLeadsPage.tsx)',
  `
### Session Schedule (all sessions online)
1. **Session 1 - Nitya Anand (Chief Speaker)**
   - **Role:** Strategy Consultant, Monitor Deloitte.
   - **Education:** IIM Udaipur MBA '24 and MMMUT B.Tech '21.
   - **Date & time:** 12th September, 2026, 02:00 PM onwards.
   - **Talk:** "Keynote & Strategic Career Navigation" - navigating consulting and management paths from MMMUT to IIM Udaipur and Deloitte.
2. **Session 2 - Ipshita Gupta (Alumni Speaker)**
   - **Role:** Software Development Engineer (SDE 1), Amazon.
   - **Education:** MMMUT B.Tech '26.
   - **Date & time:** 13th September, 2026, 02:00 PM onwards.
   - **Talk:** "Software Engineering at Amazon Scale" - cracking tech interviews, system fundamentals, and competitive programming.
3. **Session 3 - Arpita Varshneya (Alumni Speaker)**
   - **Role:** Software Development Engineer (SDE 1), Flipkart.
   - **Education:** MMMUT B.Tech '24.
   - **Date & time:** 13th September, 2026, 03:00 PM onwards.
   - **Talk:** "Building Scalable Systems at Flipkart" - high-volume distributed architecture and career transitions.
4. **Session 4 - Anjali Sharma**
   - **Role:** Software Development Engineer (SDE 1), Microsoft.
   - **Education:** MNNIT Allahabad B.Tech '26.
   - **Date & time:** 4th October, 2026, 02:30 PM onwards.
   - **Talk:** "Engineering Excellence at Microsoft" - cloud architectures, interview insights, and stepping into top-tier tech roles.

### Speaker Alumni Note
Ipshita Gupta and Arpita Varshneya are MMMUT alumni (FLUX's own) now working at Amazon and Flipkart respectively - a proof point of FLUX's mentorship pipeline.
`
);

// ============================================================================
// 15. Projects & Research
// ============================================================================

writeContent(
  'projects.md',
  'FLUX Projects and Innovation Problem Statements',
  '/projects (research focus); /ideathon (full problem bank)',
  'Research pages; Frontend/src/projects.json for the full bank',
  `
### Welcome
FLUX curates high-impact problem statements spanning AI, IoT, healthcare, agriculture, and campus automation. Students and research teams develop functional prototypes and publication-ready solutions around these challenges during the flagship Ideathon and across the year.

### Core Research & Development Focus (2025-2026)
- **Mechanistic Interpretability:** Circuit exploration and attention head probing in transformer architectures (aligned with the ATAL FDP theme).
- **Smart Campus Automation:** IoT-based resource monitoring and automated attendance infrastructure at MMMUT.
- **HealthTech Diagnostic Tools:** Deep learning-based early screening prototypes using computer vision.
- **Production Web Platforms:** High-concurrency platforms, real-time judge scoring systems, and modern digital platforms for MMMUT.

### The 50-Problem Ideathon Bank
The complete, numbered problem bank ships in five companion files:
- events-ideathon-problems-01.md - PS-01 to PS-10
- events-ideathon-problems-02.md - PS-11 to PS-20
- events-ideathon-problems-03.md - PS-21 to PS-30
- events-ideathon-problems-04.md - PS-31 to PS-40
- events-ideathon-problems-05.md - PS-41 to PS-50 (including the Open Innovation Challenge)

Each problem includes the domain, the detailed problem statement, and the expected solution direction.
`
);

// ============================================================================
// 16. How to Join FLUX
// ============================================================================

writeContent(
  'join.md',
  'How to Join FLUX - Induction & Eligibility',
  '/ (main site; recruitment banners during induction season)',
  '/about + join knowledge content',
  `
### Annual Induction Process
FLUX conducts its open induction drive for students of MMMUT Gorakhpur at the beginning of each academic session.

### Eligibility
- Open to undergraduate students across all engineering branches (CSE, IT, ECE, EE, ME, CE, Chemical) as well as MCA students.
- Passion for building and problem-solving is the primary qualification; no prior club experience is required.

### Selection Stages
1. **Online Application:** Submit your portfolio, GitHub profile, or domain interests through the FLUX application form.
2. **Technical / Creative Task:** Practical problem statement based on your chosen wing (coding, design prompt, or research question).
3. **Personal Interaction:** Conversation with senior members and faculty coordinators to assess passion, curiosity, and teamwork.

### The 6 Student Wings You Can Join
1. **AI & Machine Learning Wing** - deep learning, NLP, computer vision, interpretability research.
2. **Software Development Wing** - full-stack web, mobile, and cloud systems.
3. **Algorithms & Competitive Programming Wing** - contests, problem-solving, ICPC prep.
4. **Design & UI/UX Wing** - interfaces, branding, 3D graphics, motion design.
5. **Content & Media Wing** - writing, documentation, social media, photography, video.
6. **Executive Leadership & Operations** - logistics, partnerships, event management.

### Tips for Applicants
- Freshmen should attend the Freshmen Orientation (September 10, 2026 edition) to meet the team.
- Watch the website and @flux.mmmut social channels for the official induction announcement each session.
`
);

// ============================================================================
// 17. Contact
// ============================================================================

writeContent(
  'contact.md',
  'Contact FLUX',
  '/contact',
  '/contact page + site Footer',
  `
### Contact Information & Location
- **Official Email:** flux@mmmut.ac.in
- **Location:** Department of Computer Science & Engineering (CSED), Madan Mohan Malaviya University of Technology (MMMUT), Deoria Road, Gorakhpur, Uttar Pradesh, India - 273010.
- **Official Website:** https://flux.org.in

### Community & Social Media Channels
- **LinkedIn:** https://www.linkedin.com/company/flux-mmm/ (FLUX MMMUT)
- **Instagram:** https://www.instagram.com/flux.mmmut (@flux.mmmut)
- **WhatsApp Community:** https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t

### Event-Specific Contacts
- ByteBrawl: event WhatsApp group https://chat.whatsapp.com/CEQxUE7IS485dCgckzTNjm or flux@mmmut.ac.in.
- FDP: Dr. Rakesh Kumar (rkcs@mmmut.ac.in, Convener), Dr. Satya Prakash Yadav (spycs@mmmut.ac.in), Dr. Shwet Ketu (skcse@mmmut.ac.in).
`
);

// ============================================================================
// 18. Site Navigation Map
// ============================================================================

writeContent(
  'navigation.md',
  'Website Navigation - Complete Page Map',
  '(applies to all URLs)',
  'App.tsx route table',
  `
### Complete Page Map of flux.org.in

| Page | URL Path | What you will find |
|------|----------|--------------------|
| Home | / | Society overview, event slider (Ideathon, She Leads, FDP, ByteBrawl), highlights |
| About | /about | Mission, patron message, core values, impact areas |
| Faculty | /faculty | Vice Chancellor, HOD, faculty coordinators, research collaboration areas |
| Events | /events | Full event timeline with dates and attendance figures |
| ATAL FDP | /events/fdp | Mechanistic Interpretability FDP details, topics, registration steps, coordinators |
| ByteBrawl | /events/bytebrawl-hacktoberfest | Event details, rules, FAQs, tracks, and final results |
| ByteBrawl Registration | /events/bytebrawl-hacktoberfest/register | Registration form portal (closed for the 2026 edition) |
| Ideathon | /ideathon | Key highlights, guidelines, 5 stages, 50 problem statements, 2025 winners |
| She Leads | /she-leads (alias /sheleads) | Women-in-tech summit: speakers, schedule, FAQs, registration |
| Team | /team | All members and roles across batches 2027, 2028, and 2029 |
| Gallery | /gallery | Event photo gallery |
| Contact | /contact | Email, address, social channels, WhatsApp community |
| Judge Panel | /judge-panel | Judge selection & assignment panel |

### Finding Things Quickly
- Looking for a specific event? Open /events and scroll the timeline.
- Looking for the Hacktoberfest problem statements or winners? Everything lives on /events/bytebrawl-hacktoberfest.
- Want the 50 Ideathon problem statements, guidelines, or results? Open /ideathon.
- Who runs FLUX? /team lists every member and role.
- How to reach FLUX? /contact lists email, address, and socials.
`
);

// ============================================================================
// Sweep stale files & finish
// ============================================================================

sweepStaleFiles();

console.log(`Successfully exported ${EXPECTED_FILES.size} chatbot knowledge markdown files into chatbot-content/`);
