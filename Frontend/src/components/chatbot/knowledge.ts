import type { KnowledgeItem, QuickChip, QueryCategory } from './types';

export const QUICK_CHIPS: QuickChip[] = [
  {
    id: 'events',
    label: 'Upcoming events',
    iconName: 'calendar',
    prompt: 'What are the upcoming events and hackathons organized by FLUX?',
  },
  {
    id: 'faculty',
    label: 'Meet the faculty',
    iconName: 'compass',
    prompt: 'Who are the faculty mentors and patrons guiding FLUX?',
  },
  {
    id: 'join',
    label: 'How to join',
    iconName: 'search',
    prompt: 'How can I join the FLUX society and what are the student wings?',
  },
  {
    id: 'about',
    label: 'About FLUX',
    iconName: 'info',
    prompt: 'Tell me about FLUX, its mission, and its core pillars.',
  },
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'about',
    keywords: [
      'about',
      'flux',
      'what is flux',
      'overview',
      'motto',
      'mission',
      'vision',
      'pillars',
      'principles',
      'core pillars',
      'interact',
      'innovate',
      'impact',
      'future leaders',
      'unbound xperiments',
    ],
    title: 'About FLUX Society',
    answer: `**FLUX** (*Future Leaders of Unbound Xperiments*) is the premier research, development, and innovation society at **Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur**, affiliated with the Department of Computer Science and Engineering.

### Motto
**Interact. Impact. Innovate.**

### Core Pillars
- Innovate: Building production-grade software architectures, open-source tools, and research prototypes that solve real-world challenges.
- Interact: Connecting curious minds, experienced faculty, industry leaders, and alumni through conferences, workshops, and peer learning.
- Impact: Translating student research into registered patents, peer-reviewed publications, and hackathon victories.

### Focus Domains
- Artificial Intelligence & Machine Learning (Deep learning, NLP, computer vision, mechanistic interpretability)
- Full-Stack Software Engineering (Distributed web systems, cloud architecture)
- Cyber-Physical & IoT Systems (Automated campus devices, sensor systems)
- Algorithmic Problem Solving (Data structures & competitive programming)`
  },
  {
    id: 'bytebrawl',
    keywords: [
      'bytebrawl',
      'byte brawl',
      'hacktoberfest',
      'coding showdown',
      'resilience',
      'production-grading',
      'hacktober',
      'brawl',
    ],
    title: 'ByteBrawl — Hacktoberfest Edition',
    answer: `### ByteBrawl — Hacktoberfest Edition ⚔️
**ByteBrawl** is FLUX's high-intensity competitive coding showdown where architectural resilience meets rapid implementation under strict production-grading constraints.

Organized by **FLUX**, Department of Computer Science & Engineering, **MMMUT Gorakhpur**, ByteBrawl is engineered for developers who take pride in shipping robust, production-ready software.

### Core Highlights:
- Architectural Resilience: Systems are pushed to edge limits, testing reliability, concurrency boundaries, and graceful degradation.
- Production-Grading Constraints: Automated test suites, clean API contract validation, and rigorous performance metrics.
- Rapid Implementation: Turning concepts into functional, hardened prototypes in hours.
- CSE Ecosystem Mentorship: Mentored and evaluated by senior builders and faculty from CSED, MMMUT.

*Check the website menu or registration popups for live ByteBrawl schedules and participation details!*`
  },
  {
    id: 'ideathon',
    keywords: [
      'ideathon',
      'ideation',
      'prototype competition',
      'flagship event',
      'cash prize',
      'team size',
      'female member',
      'rules',
    ],
    title: 'FLUX Ideathon Guidelines',
    answer: `### FLUX Ideathon Flagship 💡
The **FLUX Ideathon** is MMMUT's signature annual innovation competition where student cohorts conceive, architect, and prototype solutions for acute societal and technological challenges.

### Rules & Guidelines:
- Team Size: 3 to 4 undergraduate engineering students.
- Diversity Mandate: To foster inclusive innovation, every team must include at least one female team member.
- Format: Hybrid / Offline rounds held on the MMMUT Gorakhpur campus.
- Focus Areas: AI, IoT, sustainability, healthcare, and campus automation.
- Evaluation Criteria: Originality & novelty, technical feasibility & architecture, societal impact, and clarity of final pitch demonstration.
- Rewards: Technical goodies, certificates of excellence, and patent-grant incubation support for the strongest ideas.
- Problem Bank: The Ideathon publishes 50 curated problem statements across AI, IoT, HealthTech, agriculture, education, safety, sustainability, and an Open Innovation Challenge - browse them all on the Ideathon page.

### Ideathon 2025 Winners
- 1st Place: Team ZenTechs - Devansh Ranjan, Bhavesh Agrawal, Asmit Srivastav, Ashutosh Kumar Nigam, Ishika Saroj.
- 2nd Place: Team TRINETRA - Aniket Sahu, Amit Kumar Patel, Manish Verma.
- 3rd Place: Team SpiralForge - Kavya Saxena, Siddhant Singh, Nyasi, Pranav Sharma.`
  },
  {
    id: 'events',
    keywords: [
      'events',
      'event',
      'upcoming events',
      'hackathon',
      'hackathons',
      'bootcamp',
      'bootcamps',
      'workshop',
      'workshops',
      'expert talk',
      'talk series',
      'shivesh',
    ],
    title: 'FLUX Events & Hackathons',
    answer: `FLUX organizes high-impact technical events, national hackathons, and expert masterclasses throughout the academic calendar:

1. **ByteBrawl (Hacktoberfest Edition)**
   - High-intensity competitive coding showdown testing architectural resilience and production-grade engineering.

2. **FLUX Ideathon (Annual Flagship)**
   - Multi-stage ideation and prototype competition engaging 500+ participants across multidisciplinary domains (AI, IoT, HealthTech, Sustainability) with cash prizes and incubation support.

3. **ATAL Faculty Development Programme (FDP)**
   - Advanced technical deep dive into *Mechanistic Interpretability*, transformer internals, and circuit analysis with over 300 faculty & researchers.

4. **Expert Talk Series**
   - Interactive sessions with global engineering leaders, such as Er. Shivesh Sinha (*Senior Technical Program Manager at Intel, USA*), on modern neural architectures and cloud deployment.

5. **Hands-on Technical Bootcamps**
   - Regular masterclasses in full-stack web development, Git/GitHub workflows, AI model training, and competitive programming.`
  },
  {
    id: 'join',
    keywords: [
      'join',
      'how to join',
      'how can i join',
      'how do i join',
      'join flux',
      'induction',
      'inductions',
      'recruit',
      'recruitment',
      'apply',
      'eligibility',
      'first year',
      '1st year',
      'mca',
      'branches',
      'membership',
      'selection',
      'drive',
    ],
    title: 'How to Join FLUX',
    answer: `### Annual Induction Process 🤝
FLUX conducts its open induction drive for students of MMMUT Gorakhpur at the beginning of each academic session:

### Eligibility
- Open to undergraduate students across **all engineering branches** (CSE, IT, ECE, EE, ME, CE, Chemical) as well as **MCA** students. Passion for building and problem-solving is the primary qualification!

### Selection Stages
1. **Online Application:** Submit your portfolio, GitHub profile, or domain interests.
2. **Technical / Creative Task:** Practical problem statement based on your chosen wing (coding, design prompt, or research question).
3. **Personal Interaction:** Conversation with senior members and faculty coordinators to assess passion, curiosity, and teamwork.

### 6 Student Wings You Can Join:
1. **AI & Machine Learning Wing**
2. **Software Development Wing** (Full-Stack & Cloud)
3. **Algorithms & Competitive Programming Wing**
4. **Design & UI/UX Wing**
5. **Content & Media Wing**
6. **Executive Leadership & Operations**`
  },
  {
    id: 'wings',
    keywords: [
      'wing',
      'wings',
      'student wings',
      'domains',
      'sub-teams',
      'ai wing',
      'ml wing',
      'software wing',
      'dev wing',
      'web wing',
      'cp wing',
      'competitive programming',
      'design wing',
      'ui/ux',
      'media wing',
      'content wing',
      'operations wing',
      'leadership wing',
    ],
    title: 'FLUX Student Wings',
    answer: `### FLUX Student Wings 🏛️
FLUX operates through 6 specialized student wings working synergistically under faculty guidance:

1. **AI & Machine Learning Wing:**
   - Spearheads research in deep learning, NLP, computer vision, and mechanistic interpretability. Conducts reading groups and builds intelligent AI applications.

2. **Software Development Wing:**
   - Develops and maintains web platforms, mobile utilities, and internal systems using modern technologies (React, Node.js, TypeScript, cloud infrastructure).

3. **Algorithms & Competitive Programming Wing:**
   - Conducts algorithmic training, problem-solving workshops, and prepares student cohorts for national coding contests and ICPC.

4. **Design & UI/UX Wing:**
   - Crafts design systems, user interfaces, 3D graphics, and visual identity for digital products and events.

5. **Content & Media Wing:**
   - Documents technical activities, publishes research digests, manages social outreach, and coordinates photography and video production.

6. **Executive Leadership & Operations Wing:**
   - Oversees strategic planning, event logistics, inter-departmental collaboration, and external industry partnerships.`
  },
  {
    id: 'faculty',
    keywords: [
      'faculty',
      'mentor',
      'mentors',
      'patron',
      'patrons',
      'anupama',
      'sharma',
      'vice chancellor',
      'vc',
      'advisory',
      'advisors',
      'professors',
      'teachers',
      'csed faculty',
      'guidance',
      'rakesh kumar',
      'rakesh',
      'hod',
      'head of the department',
      'head of department',
      'satvik vats',
      'satvik',
      'shwet ketu',
      'ketu',
      'satya prakash yadav',
    ],
    title: 'Faculty Mentors & Leadership',
    answer: `### Faculty Mentors & Academic Guidance 🎓
FLUX operates under the visionary guidance of distinguished faculty members and university executive leadership at MMMUT Gorakhpur:

- Chief Patron: Prof. Anupama Kaushik Sharma, Hon'ble Vice Chancellor of MMMUT Gorakhpur.
  - Vision: Fostering an interdisciplinary culture of research excellence, patent development, and technological entrepreneurship.

- Faculty Advisors & Mentors:
  - Prof. Rakesh Kumar - Professor & Head of Department, CSE. PhD (IIT Roorkee), Best Teacher Award recipient.
  - Dr. Satvik Vats - Assistant Professor, CSE (Big Data, Deep Learning, ML, AI; 20+ patents, 2700+ citations).
  - Dr. Shwet Ketu - Assistant Professor, CSE (IoT, IoHT, wireless networks, smart systems; 6+ patents).
  - Dr. Satya Prakash Yadav - Associate Professor, CSE (Computer Vision, NLP, robotics); Coordinator of the ATAL FDP.
  - Senior professors and faculty from CSED mentor FLUX wings in research methodology, algorithmic optimization, distributed systems, and patent documentation.
  - Faculty regularly collaborate with student teams on funded research grants, ATAL FDPs, and paper reading circles.`
  },
  {
    id: 'she-leads',
    keywords: [
      'she leads',
      'sheleads',
      'women',
      'girls',
      'diversity',
      'female',
      'women in tech',
      'empowerment',
    ],
    title: 'She Leads — Women in Technology',
    answer: `### She Leads — Women in Technology 👩‍💻
She Leads is a premier FLUX empowerment initiative dedicated to elevating, mentoring, and championing women students in engineering, research, and technical leadership.

### Key Objectives & Programs:
- Breaking Barriers: Eliminating gender disparity in technical leadership, open-source contribution, and competitive programming.
- Visionary Keynotes & AMAs: Sessions with distinguished female tech industry leaders and accomplished alumni.
- Hands-on Technical Masterclasses: Practical workshops spanning AI/ML, web dev, and UI/UX design.
- 1-on-1 Mentorship Circles: Pairing junior women students with experienced senior mentors for academic and career guidance.
- Hackathon Incubation: Sponsorship and dedicated mentorship for female-led hackathon teams.`
  },
  {
    id: 'projects',
    keywords: [
      'project',
      'projects',
      'research',
      'work',
      'patent',
      'patents',
      'publication',
      'publications',
      'mechanistic interpretability',
      'smart campus',
      'iot',
    ],
    title: 'FLUX Projects & Research',
    answer: `### FLUX Projects & Research 🔬
FLUX members work on cutting-edge research, open-source utilities, and production systems:

- Mechanistic Interpretability: Circuit exploration and attention head probing in transformer architectures.
- Smart Campus Automation: IoT-based resource monitoring and automated attendance infrastructure at MMMUT.
- HealthTech Diagnostic Tools: Deep learning-based early screening prototypes using computer vision.
- Production Web Platforms: High-concurrency platforms, real-time judge scoring systems, and modern digital platforms for MMMUT.`
  },
  {
    id: 'contact',
    keywords: [
      'contact',
      'email',
      'location',
      'address',
      'where',
      'social',
      'instagram',
      'linkedin',
      'phone',
      'reach',
      'room',
      'department room',
      'office',
    ],
    title: 'Contact Information & Location',
    answer: `### Contact FLUX 📬
- Official Email: \`flux@mmmut.ac.in\`
- Campus Location: Department of Computer Science & Engineering (CSED), Madan Mohan Malaviya University of Technology (MMMUT), Deoria Road, Gorakhpur, UP - 273010.
- Official Website: [flux.org.in](https://flux.org.in)
- LinkedIn: [FLUX MMMUT](https://www.linkedin.com/company/flux-mmm/)
- Instagram: [@flux.mmmut](https://www.instagram.com/flux.mmmut)`
  },
  {
    id: 'bytebrawl-details',
    keywords: [
      'when is bytebrawl',
      'when is the hackathon',
      'where is bytebrawl',
      'bytebrawl date',
      'bytebrawl dates',
      'bytebrawl when',
      'bytebrawl where',
      'bytebrawl venue',
      'bytebrawl location',
      'bytebrawl timing',
      'bytebrawl schedule',
      'bytebrawl registration',
      'bytebrawl register',
      'register for bytebrawl',
      'bytebrawl rules',
      'bytebrawl fee',
      'bytebrawl free',
      'bytebrawl eligibility',
      'bytebrawl capacity',
      'bytebrawl seats',
      'seats in bytebrawl',
      'seats available',
      'seats',
      'bytebrawl team size',
      'bytebrawl whatsapp',
      'bytebrawl prize',
      'bytebrawl prizes',
      'prize for bytebrawl',
      'registration closed',
      'is registration open',
      'alan turing',
      'bbh26',
      'capacity',
    ],
    title: 'ByteBrawl — Logistics, Registration & Rules',
    answer: `### ByteBrawl — When, Where, How ⚙️
Event: ByteBrawl x Hacktoberfest (ByteBrawl '26) by FLUX, Department of Computer Science & Engineering, MMMUT Gorakhpur.

### Key Logistics
- Dates: 26 - 29 October 2026.
- Venue: Alan Turing Hall, MMMUT Gorakhpur campus (in-person with live leaderboard updates).
- Entry: Completely free for MMMUT students; capacity 500 seats, processed first-come first-served.
- Team: Team of 2, or Individual (solo developers may be paired with another solo participant during the opening networking session).
- Eligibility: All enrolled MMMUT students across branches and years; both members need valid university roll numbers.

### Registration Status
Registration for the 2026 edition is CLOSED. Every confirmed participant received a unique Registration ID formatted as BBH26-XXXXXX, displayed on screen and emailed after form submission.

### Rules Snapshot
- All code must be authored during the hackathon window; plagiarism means immediate disqualification.
- Judged on architectural resilience, latency under load, and comprehensive test coverage — not just features.
- Hacktoberfest 2026 theme: "AI belongs to everyone" (open-weight models, agents, AI tooling). Pull requests no longer count toward 2026 rewards — MLH/DEV digital badges and sticker packs instead.
- Projects must be published under an OSI-approved open-source license on GitHub.

### Stay Updated
- Event WhatsApp group: https://chat.whatsapp.com/CEQxUE7IS485dCgckzTNjm
- Event email: flux@mmmut.ac.in
- Student coordinators: Aditya Gupta (CSE) and Khushi Patel (IT).`
  },
  {
    id: 'results',
    keywords: [
      'winner',
      'winners',
      'results',
      'result',
      'runner up',
      'runners up',
      '1st place',
      'first place',
      '2nd place',
      'second place',
      '3rd place',
      'third place',
      'trophy',
      'leaderboard',
      'who won',
      'who won bytebrawl',
      'who won ideathon',
      'bytebrawl results',
      'bytebrawl result',
      'bytebrawl winner',
      'bytebrawl winners',
      'bytebrawl winners list',
      'ideathon results',
      'ideathon result',
      'ideathon winner',
      'ideathon winners',
      'bytebrawl final results',
      'zen techs',
      'zentechs',
      'trinetra',
      'spiralforge',
      '2 pointer approach',
      'quarks',
      'nakshatra',
      'special appreciation',
      'appreciation',
      'ranker',
      'ranking',
    ],
    title: 'FLUX Event Results — Ideathon 2025 & ByteBrawl 2026',
    answer: `### Latest Published Results 🏆

### Ideathon 2025 (December 2025)
- 1st Place: Team ZenTechs - Devansh Ranjan, Bhavesh Agrawal, Asmit Srivastav, Ashutosh Kumar Nigam, Ishika Saroj.
- 2nd Place: Team TRINETRA - Aniket Sahu, Amit Kumar Patel, Manish Verma.
- 3rd Place: Team SpiralForge - Kavya Saxena, Siddhant Singh, Nyasi, Pranav Sharma.
- Special appreciation: TEAM NAVTECH, Team BLITZ, Kavach Nexus, W.I.S.E, VISIONARY VANGUARDS, NexSight, QuadCore.

### ByteBrawl x Hacktoberfest (October 2026)
- 1st Place - Grand Champions: Team 2 Pointer Approach - Satyam Prajapati & Nitish Kumar (MMMUT).
- 2nd Place - 1st Runner Up: Team Quarks - Utkarsh Shukla & Mansi Singh (ITM).
- 3rd Place - 2nd Runner Up: Team nakshatra - Nitin Kumar & Swati Kushwaha (MMMUT).
- Special appreciation: P2 (Priyanshu Mishra & Priyanshu Rai) and Supic (Epshita Somani & Shaurya Bhatt), both MMMUT.

25 shortlisted teams contested the ByteBrawl final round across 5 India-first tracks after a Round 1 field of 26 teams (MMMUT, ITM, MPIT, DDU). Complete standings and the full track/problem statement map are published on the Events page!`
  },
  {
    id: 'ideathon-stages',
    keywords: [
      'ideathon stage',
      'ideathon stages',
      'ideathon date',
      'ideathon dates',
      'ideathon schedule',
      'ideathon when',
      'ideathon december',
      'ideathon timeline',
      'stages of ideathon',
      'stages of competition',
      'stage 1',
      'stage 2',
      'stage 3',
      'how many stage',
      'ppt submission',
      'ppt format',
      'submission format',
      'december 10',
      'december 17',
      'december 18',
    ],
    title: 'Ideathon 2025 — Dates & Stages',
    answer: `### Ideathon 2025 — Dates & Stages 📅
The FLUX Ideathon ran **December 10-19, 2025**, in offline rounds on the MMMUT Gorakhpur campus, with registration and PPT submission through the Ideathon page.

### Timeline of the 3 Stages
1. Stage 1 - Registration & PPT Submission: December 10-15, 2025. Teams uploaded their idea deck covering problem selection and rationale, technical architecture and flowchart, tech-stack feasibility, and patent/research scope.
2. Stage 2 - Shortlisting & Mentorship: December 17, 2025. Shortlisted teams received mentorship to strengthen their proposals.
3. Stage 3 - Final Presentation & Winners: December 18, 2025, with the closing showcase on December 19.

### Ground Rules
- Team size: 3-4 undergraduate members, including at least one female member (mandatory).
- Submission format: PPT.
- Mode: Offline, on campus.
- Prizes: Goodies, certificates, and patent grants.

All 50 curated problem statements for the competition are listed on the Ideathon page.`
  },
  {
    id: 'fdp',
    keywords: [
      'fdp',
      'atal',
      'faculty development',
      'faculty development programme',
      'mechanistic interpretability',
      'mechanistic',
      'interpretability',
      'interpretable',
      'f d p',
      'january 19',
    ],
    title: 'ATAL Faculty Development Programme (FDP)',
    answer: `### ATAL Faculty Development Programme 🧠
An AICTE Training and Learning (ATAL) Academy sponsored FDP organized by the Department of Computer Science & Engineering, MMMUT Gorakhpur.

- Theme: Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability.
- Dates: January 19-24, 2026 (6 days), fully online (ATAL Online).
- Fee: Completely FREE — no charge for registration, course, or certification.
- Audience: Faculty members, research scholars, and PG scholars of AICTE-approved institutions; industry personnel may also apply.

### 8 Key Topics
1. Core mathematical tools for AI: linear algebra, calculus, and probability.
2. Understanding deep neural networks through information theory.
3. Visualizing neural activations and interpreting model attributions.
4. Mechanistic understanding of transformers and attention mechanisms.
5. Bayesian and probabilistic approaches to interpreting neural models.
6. Tools for identifying circuits and structures within large language models.
7. Global and sparse explanations in interpretability.
8. Ethics, explainability, and responsible AI governance.

### Registration (via AICTE ATAL Portal)
Create a Participant account on the official ATAL Academy portal, verify your email, complete your profile, then browse FDP > ATAL Online > January 2026 > select this FDP and submit. Certificates are issued only to registered participants who meet attendance requirements.

### Coordinators
- Dr. Rakesh Kumar — Convener (Professor & HOD, CSE): rkcs@mmmut.ac.in
- Dr. Satya Prakash Yadav — Coordinator (Associate Professor, CSE): spycs@mmmut.ac.in
- Dr. Shwet Ketu — Co-Coordinator (Assistant Professor, CSE): skcse@mmmut.ac.in`
  },
  {
    id: 'she-leads-schedule',
    keywords: [
      'she leads speaker',
      'she leads speakers',
      'she leads schedule',
      'she leads session',
      'she leads sessions',
      'she leads when',
      'when is she leads',
      'she leads date',
      'speaker',
      'speakers',
      'session',
      'sessions',
      'nitya anand',
      'ipshita gupta',
      'arpita varshneya',
      'anjali sharma',
      'tessy thomas',
      'conclave',
      'alumni speaker',
    ],
    title: 'She Leads — Speakers & Session Schedule',
    answer: `### She Leads — Speakers & Schedule 👩‍💻
She Leads, FLUX's Women in Technology & Leadership Summit (presented on the home page as the annual Dr. Tessy Thomas Conclave), featured four online sessions:

1. Session 1 - Nitya Anand (Chief Speaker), Strategy Consultant at Monitor Deloitte (IIM Udaipur MBA '24, MMMUT B.Tech '21).
   - 12 September 2026, 02:00 PM onwards. Talk: Keynote & Strategic Career Navigation.
2. Session 2 - Ipshita Gupta (Alumni Speaker), SDE 1 at Amazon (MMMUT B.Tech '26).
   - 13 September 2026, 02:00 PM onwards. Talk: Software Engineering at Amazon Scale.
3. Session 3 - Arpita Varshneya (Alumni Speaker), SDE 1 at Flipkart (MMMUT B.Tech '24).
   - 13 September 2026, 03:00 PM onwards. Talk: Building Scalable Systems at Flipkart.
4. Session 4 - Anjali Sharma, SDE 1 at Microsoft (MNNIT Allahabad B.Tech '26).
   - 4 October 2026, 02:30 PM onwards. Talk: Engineering Excellence at Microsoft.

All sessions were completely free and open to every MMMUT student, with official FLUX certificates of participation for attendees.`
  },
  {
    id: 'ideathon-problems',
    keywords: [
      'problem statement',
      'problem statements',
      'problem bank',
      'problem list',
      'ideathon problems',
      '50 problem',
      'choose a problem',
      'pick a problem',
      'which problem',
      'project ideas',
      'ideas for project',
      'ps list',
      'open innovation',
    ],
    title: 'The 50-Problem Ideathon Bank',
    answer: `### The 50-Problem Ideathon Bank 📋
FLUX curates 50 problem statements spanning AI, IoT, healthcare, agriculture, education, safety, sustainability, robotics, fintech, smart cities, and an Open Innovation Challenge (open to hardware, software, or hybrid builds).

### Sample Problems
- PS-01: Automated Scientific Literature Synthesis Engine (AI for Research / NLP).
- PS-13: AI-Driven Multi-Sensor Smart Cane for Visually Impaired (Assistive Tech / Embedded Systems).
- PS-16: IoT + AI Based Smart Water Quality Guardian (Rural Development / Environmental IoT).
- PS-23: AI-Based Smart Drowsiness Detector for Workers (Industrial Safety / Biomedical AI).
- PS-30: Smart Attendance & Face Analytics System for Rural Schools (EdTech / Computer Vision).
- PS-43: Predictive Women Safety Alert & Risk Detection System (Public Safety / Mobile AI).
- PS-50: Open Innovation Challenge (Hardware / Software / Hybrid).

### How to Explore
The complete numbered list PS-01 to PS-50 — each with its domain, detailed problem statement, and expected solution direction — is published on the Ideathon page. These statements power the Ideathon competition, but they also double as portfolio-ready project ideas for research and hackathons.`
  },
  {
    id: 'team',
    keywords: [
      'team',
      'team members',
      'core team',
      'committee',
      'who leads',
      'who runs',
      'president',
      'vice president',
      'treasurer',
      'secretary',
      'joint secretary',
      'head of operations',
      'development head',
      'design head',
      'algorithms head',
      'content & social media head',
      'ai & ml head',
      'shivam mishra',
      'yashasvi sharma',
      'who are the members',
      'leadership',
    ],
    title: 'FLUX Student Leadership & Team',
    answer: `### FLUX Student Leadership 👑
- President: **Shivam Mishra** (CSE).
- Vice President: **Yashasvi Sharma** (CSE).
- Head of Operations: Aviral Omar (ChE). Treasurer: Shubham Rai (CSE).

FLUX's six student wings (AI/ML, Dev, CP, Design, Media, Operations) are each run by dedicated wing heads under CSED faculty mentorship.

*Ask "full FLUX team roster" for the complete member list, or open the Team page (/team).*`
  },
  {
    id: 'team-roster',
    keywords: [
      'full team',
      'full roster',
      'team roster',
      'roster',
      'all team members',
      'all team',
      'all members',
      'batch 2028 members',
      'batch 2029 members',
      'wing heads',
      'wing head',
      'joint secretaries',
      'complete team',
      'entire team',
    ],
    title: 'Full FLUX Team Roster',
    answer: `### Full FLUX Team Roster 📋

- Core Committee (2027): President **Shivam Mishra** (CSE) · Vice President **Yashasvi Sharma** (CSE) · Head of Operations Aviral Omar (ChE) · Additional Coordinator Yashvardhan Ojha (CSE) · Treasurer Shubham Rai (CSE).
- Development Heads: Aryan S. Shandilya & Pradyumn Agrahari (CSE).
- Design Head: Tamanna Sharma (EE).
- Algorithms Heads: Ashish Kumar Yadav & Shivam Singh (CSE).
- AI & ML Heads: Riya Verma & Vishesh Mishra (CSE).
- Photography & Video Head: Aman Kumar Rawat (ME).
- Content & Social Media Head: Anushka Singh (CSE).
- Joint Secretaries (2028): Jai Kumar Singh & Priya Singh (CSE).
- Leadership Bench: 20 pre-final-year Leads (Operations, Development, Design, Algorithms, AI/ML, Content & Media) + 18 sophomore Executive Members (batch 2029).

*Every member with role and photo is listed on the Team page (/team).*`
  },
  {
    id: 'navigation',
    keywords: [
      'navigation',
      'navigate',
      'site map',
      'sitemap',
      'which page',
      'what page',
      'where can i find',
      'how do i find',
      'take me to',
      'show me the',
      'deep link',
      'judge panel',
      'gallery',
      'events page',
      'team page',
      'contact page',
      'ideathon page',
      'bytebrawl page',
      'she leads page',
    ],
    title: 'Website Navigation — Page Map',
    answer: `### Site Map — Where to Find Everything 🧭
- Home (/): Society overview, motto, event slider, and highlights.
- About (/about): Mission, patron message, core values, impact areas.
- Faculty (/faculty): Vice Chancellor, HOD, faculty coordinators, research areas.
- Events (/events): Full event timeline with dates and attendance.
- ATAL FDP (/events/fdp): Mechanistic Interpretability FDP details and coordinators.
- ByteBrawl (/events/bytebrawl-hacktoberfest): Event details, rules, 5 tracks, and final results.
- ByteBrawl Registration (/events/bytebrawl-hacktoberfest/register): Portal — closed for the 2026 edition.
- Ideathon (/ideathon): Guidelines, stages, 50 problem statements, 2025 winners.
- She Leads (/she-leads or /sheleads): Women-in-tech summit with speakers and schedule.
- Team (/team): Complete roster across batches 2027, 2028, and 2029.
- Gallery (/gallery): Event photos.
- Contact (/contact): Email, address, social channels, WhatsApp community.
- Judge Panel (/judge-panel): Judge selection and assignment panel.

### Quick Findings
- Event winners? Just ask me "who won Ideathon" or "who won ByteBrawl"!
- The official site is https://flux.org.in — every section above lives there.`
  },
];

// ============================================================================
// Topic Classification & Strict Guardrail Engine
// ============================================================================

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
  /\b(upcoming\s+)?events\b/i,
  /\bhackathon(s)?\b/i,
  /\bbootcamp(s)?\b/i,
  /\bworkshop(s)?\b/i,
  /\bideation\b/i,
  /\bhow\s+(can\s+i|to)\s+join\b/i,
  /\binduction(s)?\b/i,
  /\brecruitment\b/i,
  /\beligibility\b/i,
  /\bhow\s+to\s+apply\b/i,
  /\bwho\s+can\s+join\b/i,
  /\bcan\s+.*join\b/i,
  /\bjoin\s+(the\s+)?(club|society|team|flux)\b/i,
  /\bstudent\s+wing(s)?\b/i,
  /\bwings?\b/i,
  /\bfaculty(\s+mentor(s)?)?\b/i,
  /\bmentor(s)?\b/i,
  /\bpatron(s)?\b/i,
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
  /\bprojects\b/i,
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
  /\b(who\s+won|who\s+is\s+the\s+richest|net\s*worth)\b/i,
  /\b(write\s+(a\s+)?(code|script|program|function|component))\b/i,
  /\b(solve|calculate|equation|integral|derivative|math\s+problem)\b/i,
  /\b(elon\s*musk|trump|modi|biden|putin|gates|jobs|zuckerberg)\b/i,
  /\b(google|microsoft|amazon|apple|facebook|netflix|tesla|openai|chatgpt)\b/i,
  /\b(iit|nit|bits\s*pilani|harvard|stanford|mit|oxford|cambridge)\b/i,
  /\b(homework|exam|test\s+paper)\b/i,
];

/**
 * Classifies a user's query into conversational or topic category.
 * Strictly flags any query not related to FLUX as OFF_TOPIC.
 */
export function classifyQuery(query: string): QueryCategory {
  const q = query.trim();
  const lower = q.toLowerCase();

  if (!lower) return 'IDENTITY';

  if (CLOSING_PATTERNS.some((p) => p.test(lower))) return 'CLOSING';
  if (GREETING_PATTERNS.some((p) => p.test(lower))) return 'GREETING';
  if (IDENTITY_PATTERNS.some((p) => p.test(lower))) return 'IDENTITY';

  const hasFluxExplicit = FLUX_EXPLICIT_SIGNALS.some((p) => p.test(lower));
  const hasUnrelated = UNRELATED_TOPIC_PATTERNS.some((p) => p.test(lower));

  // If query explicitly contains unrelated keywords and no explicit FLUX mention, reject immediately
  if (hasUnrelated && !hasFluxExplicit) {
    return 'OFF_TOPIC';
  }

  // Explicit FLUX mention is always valid
  if (hasFluxExplicit) {
    return 'FLUX_TOPIC';
  }

  // Contextual club question asked within website
  const hasClubContext = CLUB_CONTEXT_PATTERNS.some((p) => p.test(lower));
  if (hasClubContext) {
    return 'FLUX_TOPIC';
  }

  // Any other query is considered OFF_TOPIC
  return 'OFF_TOPIC';
}

export function isFluxRelated(query: string): boolean {
  const cat = classifyQuery(query);
  return cat !== 'OFF_TOPIC';
}

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

/**
 * Resolves a user query against the FLUX knowledge base.
 * Strictly denies off-topic questions.
 */
export function findKnowledgeAnswer(query: string): string {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return GREETING_RESPONSE;
  }

  const category = classifyQuery(normalized);

  switch (category) {
    case 'CLOSING':
      return CLOSING_RESPONSE;
    case 'GREETING':
      return GREETING_RESPONSE;
    case 'IDENTITY':
      return IDENTITY_RESPONSE;
    case 'OFF_TOPIC':
      return OFF_TOPIC_RESPONSE;
    case 'FLUX_TOPIC':
    default:
      break;
  }

  // Find best knowledge item match
  let bestItem: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) {
        // Longer matching keywords have higher specificity weight
        score += kwLower.length * 2;
        // Exact match bonus
        if (normalized === kwLower) {
          score += 20;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && highestScore > 0) {
    return bestItem.answer;
  }

  // Fallback if classified as FLUX topic but query was generic (e.g., "tell me about flux")
  const defaultAbout = KNOWLEDGE_BASE.find((k) => k.id === 'about');
  return defaultAbout ? defaultAbout.answer : OFF_TOPIC_RESPONSE;
}
