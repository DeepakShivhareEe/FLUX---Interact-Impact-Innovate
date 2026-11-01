// ByteBrawl x Hacktoberfest Results & Round 2 Allotment Dataset
// Source 1: Final Res.pdf (Final Round Official Results)
// Source 2: ByteBrawl_Result_with_Teams.xlsx
// Source 3: ByteBrawl_Round2_PS_Allotment_fixed (1).xlsx
// Source 4: secound_round_ps_sha256_014122a9eceb6516028ba05d1f32697836b43e46b63d4ecdc4e270d7e1e49f7a.pdf

export interface FinalWinnerMember {
  name: string;
  college: string;
}

export interface FinalWinner {
  position: string;
  rank: number;
  badge: string;
  teamName: string;
  members: FinalWinnerMember[];
  highlight: string;
  trophyColor: string;
  gradient: string;
  borderGlow: string;
}

export interface FinalSpecialAppreciation {
  position: string;
  rank: number;
  teamName: string;
  members: FinalWinnerMember[];
  badge: string;
}

export const FINAL_WINNERS: FinalWinner[] = [
  {
    position: '1st',
    rank: 1,
    badge: 'Grand Champions // 1st Place',
    teamName: '2 Pointer Approach',
    members: [
      { name: 'Satyam Prajapati', college: 'MMMUT' },
      { name: 'Nitish Kumar', college: 'MMMUT' },
    ],
    highlight: 'Exceptional algorithmic precision, architectural resilience, and production-grade execution under tight constraints.',
    trophyColor: 'text-amber-400',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-[#121008]',
    borderGlow: 'border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)]',
  },
  {
    position: '2nd',
    rank: 2,
    badge: '1st Runner Up // 2nd Place',
    teamName: 'Quarks',
    members: [
      { name: 'Utkarsh Shukla', college: 'ITM' },
      { name: 'Mansi Singh', college: 'ITM' },
    ],
    highlight: 'Stunning innovation, rapid technical prototyping, and comprehensive implementation across Bharat challenges.',
    trophyColor: 'text-slate-300',
    gradient: 'from-slate-400/20 via-slate-600/10 to-[#0e1014]',
    borderGlow: 'border-slate-300/40 shadow-[0_0_30px_rgba(203,213,225,0.2)]',
  },
  {
    position: '3rd',
    rank: 3,
    badge: '2nd Runner Up // 3rd Place',
    teamName: 'Team nakshatra',
    members: [
      { name: 'Nitin Kumar', college: 'MMMUT' },
      { name: 'Swati Kushwaha', college: 'MMMUT' },
    ],
    highlight: 'Impressive domain execution, robust problem-solving strategy, and creative architectural design.',
    trophyColor: 'text-amber-600',
    gradient: 'from-amber-700/20 via-orange-900/10 to-[#130d0a]',
    borderGlow: 'border-amber-600/40 shadow-[0_0_30px_rgba(217,119,6,0.2)]',
  },
];

export const FINAL_SPECIAL_APPRECIATIONS: FinalSpecialAppreciation[] = [
  {
    position: '4th',
    rank: 4,
    teamName: 'P²',
    members: [
      { name: 'Priyanshu Mishra', college: 'MMMUT' },
      { name: 'Priyanshu Rai', college: 'MMMUT' },
    ],
    badge: 'Special Appreciation',
  },
  {
    position: '5th',
    rank: 5,
    teamName: 'Supic',
    members: [
      { name: 'Epshita Somani', college: 'MMMUT' },
      { name: 'Shaurya Bhatt', college: 'MMMUT' },
    ],
    badge: 'Special Appreciation',
  },
];

export const FINAL_RESULT_META = {
  eventName: 'HACKTOBERFEST X BYTEBRAWL',
  announcementTitle: 'FINAL ROUND RESULT',
  announcementText:
    'We are delighted to announce the winners of HACKTOBERFEST X BYTEBRAWL, a celebration of coding, innovation, problem-solving, and technical excellence. The final round witnessed enthusiastic participation, creative thinking, and outstanding efforts from all the teams. Congratulations to all the winners and participants! Your enthusiasm and commitment made HACKTOBERFEST X BYTEBRAWL a memorable and successful event.',
  coordinators: [
    { name: 'Aditya Gupta', role: 'CSE, 2nd Year', phone: '80575 18976' },
    { name: 'Khushi Patel', role: 'IT, 2nd Year', phone: '63888 92891' },
  ],
  institution: 'Madan Mohan Malaviya University of Technology, Gorakhpur, Uttar Pradesh',
  // Official Instagram link for ByteBrawl announcement (update with specific post link when provided)
  instagramUrl: 'https://www.instagram.com/p/DfHywq5z4yb/',
};

export interface LeaderboardTeam {
  teamId: string;
  teamName: string;
  leader: string;
  member: string | null;
  college: string;
  teamType: string;
}

export interface SpecialAppreciationTeam {
  teamId: string;
  teamName: string;
  leader: string;
  member: string;
}

export interface Round2Allotment {
  sno: number;
  teamId: string;
  teamName: string;
  leader: string;
  member: string | null;
  college: string;
  teamType: string;
  psNo: string;
  problemStatement: string;
  track: string;
}

export interface ProblemStatementItem {
  psNo: string;
  title: string;
  track: string;
  allottedTo: string;
}

export interface ProblemStatementDetail {
  psNo: string;
  title: string;
  track: string;
  theme: string;
  principle: string;
  problem: string;
  build: string;
  keyPoint: string;
}

export interface TrackMetadata {
  id: string;
  name: string;
  englishTheme: string;
  description: string;
  gradient: string;
  badgeColor: string;
  borderColor: string;
  accentHex: string;
  bgGlow: string;
}

export const TRACKS_METADATA: Record<string, TrackMetadata> = {
  "Satya & Pramaan Bharat": {
    id: "satya",
    name: "Satya & Pramaan Bharat",
    englishTheme: "Truth & AI Verification",
    description: "Verifiable court judgment citations, reproducible AI test protocols, multi-lingual Indian LLM safety audits, and autonomous payment limit governors.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    borderColor: "border-amber-500/30",
    accentHex: "#f59e0b",
    bgGlow: "rgba(245, 158, 11, 0.15)",
  },
  "Sahayak & Samman Bharat": {
    id: "sahayak",
    name: "Sahayak & Samman Bharat",
    englishTheme: "Civic Support & Dignity",
    description: "Voice-driven unified government applications, gig-worker fatigue & pressure maps, offline emergency health protocol companions, and dynamic consent sandboxes.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    borderColor: "border-emerald-500/30",
    accentHex: "#10b981",
    bgGlow: "rgba(16, 185, 129, 0.15)",
  },
  "Bhoomi & Bharosa Bharat": {
    id: "bhoomi",
    name: "Bhoomi & Bharosa Bharat",
    englishTheme: "Agriculture & Land Trust",
    description: "Sharecropper crop tenancy verification, farmer-owned data trusts, parcel geocode resolution across conflicting surveys, and automated agricultural advisory audits.",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/30",
    borderColor: "border-lime-500/30",
    accentHex: "#84cc16",
    bgGlow: "rgba(132, 204, 22, 0.15)",
  },
  "Shital & Sajag Bharat": {
    id: "shital",
    name: "Shital & Sajag Bharat",
    englishTheme: "Climate & Heat Resilience",
    description: "Unified Heat Action Plan (HAP) intelligence, urban heat risk & missing sensor mapping, heat-safe outdoor labor shift scheduling, and localized threshold modeling.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    borderColor: "border-sky-500/30",
    accentHex: "#0ea5e9",
    bgGlow: "rgba(14, 165, 233, 0.15)",
  },
  "Bhasha & Bol Bharat": {
    id: "bhasha",
    name: "Bhasha & Bol Bharat",
    englishTheme: "Linguistic Equity & Voice",
    description: "Crowdsourced vernacular transcript quality checks, district-level Word Error Rate dashboards, device-optimized Small Language Model ladders, and voice recording ownership.",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    borderColor: "border-purple-500/30",
    accentHex: "#a855f7",
    bgGlow: "rgba(168, 85, 247, 0.15)",
  },
};

export const ROUND1_LEADERBOARD: LeaderboardTeam[] = [
  {
    "teamId": "FLUX-TBA",
    "teamName": "2 Fast 2 Curious",
    "leader": "Aryan Yadav",
    "member": "Aryan Agarwal",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-145",
    "teamName": "2 Pointer Approach",
    "leader": "Satyam Prajapati",
    "member": "Nitish Kumar",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-007",
    "teamName": "404NotFound",
    "leader": "Anubhav Kumar Ray",
    "member": "Akahand Pratap Mishra",
    "college": "ITM",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-015",
    "teamName": "BaseLess",
    "leader": "Pragya Gupta",
    "member": "Riddhima Omar",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-113",
    "teamName": "Bawandar",
    "leader": "Chetan Krishna Srivastav",
    "member": "Devendra Chauhan",
    "college": "MPIT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-108",
    "teamName": "Bugslyer",
    "leader": "Shivam Shukla",
    "member": "Anoop Singh",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-114",
    "teamName": "Byte Me",
    "leader": "Chetna Singh",
    "member": null,
    "college": "MMMUT",
    "teamType": "INDIVIDUAL"
  },
  {
    "teamId": "FLUX-001",
    "teamName": "Cache-Me-Byte",
    "leader": "Aditya Kumar",
    "member": "Vanshika Varshney",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-169",
    "teamName": "Catalyst_byte",
    "leader": "Deepak Yadav",
    "member": "Rituraj Gupta",
    "college": "DDU",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-122",
    "teamName": "CodeVolt",
    "leader": "Nayan Vishnoi",
    "member": "Ved Prakash",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-085",
    "teamName": "CodeVortex",
    "leader": "Prince Singh",
    "member": "Sumit Maurya",
    "college": "MPIT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-129",
    "teamName": "Expecto Debugronum",
    "leader": "Aastha Gupta",
    "member": "Pranav Kumar",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-124",
    "teamName": "P²",
    "leader": "Priyanshu Mishra",
    "member": "Priyanshu Rai",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-044",
    "teamName": "PAIR PROGRAMMERS",
    "leader": "Shreyash Mishra",
    "member": "Pratyaksha Dubey",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-025",
    "teamName": "Prompt Ke Pujari",
    "leader": "Shirish Kashyap",
    "member": "Harsh gautam",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-155",
    "teamName": "Quarks",
    "leader": "Utkarsh Shukla",
    "member": "Mansi Singh",
    "college": "ITM",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-157",
    "teamName": "SqaudX",
    "leader": "Shyam kumar",
    "member": "Yogesh pandey",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-120",
    "teamName": "Supic",
    "leader": "Epshita Somani",
    "member": "Shaurya Bhatt",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-028",
    "teamName": "Team Agastya",
    "leader": "Ayush Mishra",
    "member": null,
    "college": "MMMUT",
    "teamType": "INDIVIDUAL"
  },
  {
    "teamId": "FLUX-016",
    "teamName": "Team Elite",
    "leader": "Upasna",
    "member": "Nidhi",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-002",
    "teamName": "Team Hexacore",
    "leader": "Shraddha Gupta",
    "member": "Kaira singh",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-057",
    "teamName": "Team Nakshatra",
    "leader": "Nitin Kumar",
    "member": "Swati Kushwaha",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-133",
    "teamName": "The Code_ Burner",
    "leader": "Ansh Gupta",
    "member": "Skand Maurya",
    "college": "MPIT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-008",
    "teamName": "ThinkAsCoder",
    "leader": "Sunil Singh",
    "member": "Shivam Srivastava",
    "college": "ITM",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-106",
    "teamName": "Threadrippers",
    "leader": "Anshul Yadav",
    "member": "Aarchveer Singh",
    "college": "MMMUT",
    "teamType": "TEAM"
  },
  {
    "teamId": "FLUX-126",
    "teamName": "White Hats",
    "leader": "Aaditya Srivastava",
    "member": "Chandra Vijay Singh",
    "college": "MMMUT",
    "teamType": "TEAM"
  }
];

export const SPECIAL_APPRECIATION_TEAMS: SpecialAppreciationTeam[] = [
  {
    "teamId": "FLUX-034",
    "teamName": "Challengers",
    "leader": "Prasun Singh",
    "member": "Masoom Alam"
  },
  {
    "teamId": "FLUX-128",
    "teamName": "HackZen",
    "leader": "Satyam Prajapati",
    "member": "Saptarshi Mishra"
  },
  {
    "teamId": "FLUX-103",
    "teamName": "NovaX",
    "leader": "Devashish Mishra",
    "member": "Rishabh Kumar"
  },
  {
    "teamId": "FLUX-026",
    "teamName": "Team Eren",
    "leader": "swayash jharkharia",
    "member": "Harshit Chaurasiya"
  },
  {
    "teamId": "FLUX-018",
    "teamName": "TRINETRA.EXE",
    "leader": "KUSHAGRA SHARMA",
    "member": "Krishna Kant Saroj"
  }
];

export const ROUND2_ALLOTMENTS: Round2Allotment[] = [
  {
    "sno": 1,
    "teamId": "FLUX-180",
    "teamName": "2 Fast 2 Curious",
    "leader": "Aryan Yadav",
    "member": "Aryan Agarwal",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 4.1",
    "problemStatement": "HAP Bhandar — Bring Heat Action Plans Together",
    "track": "Shital & Sajag Bharat"
  },
  {
    "sno": 2,
    "teamId": "FLUX-145",
    "teamName": "2 Pointer Approach",
    "leader": "Satyam Prajapati",
    "member": "Nitish Kumar",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 3.1",
    "problemStatement": "Batayedar Saboot — Record Who Is Growing the Crop",
    "track": "Bhoomi & Bharosa Bharat"
  },
  {
    "sno": 3,
    "teamId": "FLUX-007",
    "teamName": "404NotFound",
    "leader": "Anubhav Kumar Ray",
    "member": "Akahand Pratap Mishra",
    "college": "ITM",
    "teamType": "TEAM",
    "psNo": "PS 3.4",
    "problemStatement": "Krishi Khoj — Turn Farm PDFs into Searchable Data",
    "track": "Bhoomi & Bharosa Bharat"
  },
  {
    "sno": 4,
    "teamId": "FLUX-015",
    "teamName": "BaseLess",
    "leader": "Pragya Gupta",
    "member": "Riddhima Omar",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 3.2",
    "problemStatement": "Khet Data Trust — Farmers Control Their Shared Data",
    "track": "Bhoomi & Bharosa Bharat"
  },
  {
    "sno": 5,
    "teamId": "FLUX-113",
    "teamName": "Bawandar",
    "leader": "Chetan Krishna Srivastav",
    "member": "Devendra Chauhan",
    "college": "MPIT",
    "teamType": "TEAM",
    "psNo": "PS 2.5",
    "problemStatement": "Anumati Sandbox — Test Giving and Cancelling Consent",
    "track": "Sahayak & Samman Bharat"
  },
  {
    "sno": 6,
    "teamId": "FLUX-108",
    "teamName": "Bugslyer",
    "leader": "Shivam Shukla",
    "member": "Anoop Singh",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 3.5",
    "problemStatement": "Salah Auditor — Check If Farm Advice Fits the Area",
    "track": "Bhoomi & Bharosa Bharat"
  },
  {
    "sno": 7,
    "teamId": "FLUX-001",
    "teamName": "Cache-Me-Byte",
    "leader": "Aditya Kumar",
    "member": "Vanshika Varshney",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 4.2",
    "problemStatement": "Bharosa Map — Show Heat Risk and Missing Data",
    "track": "Shital & Sajag Bharat"
  },
  {
    "sno": 8,
    "teamId": "FLUX-169",
    "teamName": "Catalyst_byte",
    "leader": "Deepak Yadav",
    "member": "Rituraj Gupta",
    "college": "DDU",
    "teamType": "TEAM",
    "psNo": "PS 2.2",
    "problemStatement": "Pressure Map — Find Unfair Targets, Not Faulty Workers",
    "track": "Sahayak & Samman Bharat"
  },
  {
    "sno": 9,
    "teamId": "FLUX-122",
    "teamName": "CodeVolt",
    "leader": "Nayan Vishnoi",
    "member": "Ved Prakash",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 5.5",
    "problemStatement": "Awaaz Adhikar — Control How Voice Recordings Are Used",
    "track": "Bhasha & Bol Bharat"
  },
  {
    "sno": 10,
    "teamId": "FLUX-085",
    "teamName": "CodeVortex",
    "leader": "Prince Singh",
    "member": "Sumit Maurya",
    "college": "MPIT",
    "teamType": "TEAM",
    "psNo": "PS 1.5",
    "problemStatement": "Agent Lagam — Keep AI Payments Within Limits",
    "track": "Satya & Pramaan Bharat"
  },
  {
    "sno": 11,
    "teamId": "FLUX-129",
    "teamName": "Expecto Debugronum",
    "leader": "Aastha Gupta",
    "member": "Pranav Kumar",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 2.1",
    "problemStatement": "Ek Baar Bolo — Speak Once, Fill Every Form",
    "track": "Sahayak & Samman Bharat"
  },
  {
    "sno": 12,
    "teamId": "FLUX-028 + FLUX-114",
    "teamName": "Merged: Team Agastya + Byte Me",
    "leader": "Ayush Mishra",
    "member": "Chetna Singh",
    "college": "MMMUT",
    "teamType": "INDIVIDUAL PAIR",
    "psNo": "PS 1.2",
    "problemStatement": "Bol-Kasauti — Test AI Safety in Indian Languages",
    "track": "Satya & Pramaan Bharat"
  },
  {
    "sno": 13,
    "teamId": "FLUX-124",
    "teamName": "P²",
    "leader": "Priyanshu Mishra",
    "member": "Priyanshu Rai",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 5.4",
    "problemStatement": "Lipi Sabha — Let Communities Choose How to Write",
    "track": "Bhasha & Bol Bharat"
  },
  {
    "sno": 14,
    "teamId": "FLUX-044",
    "teamName": "PAIR PROGRAMMERS",
    "leader": "Shreyash Mishra",
    "member": "Pratyaksha Dubey",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 1.3",
    "problemStatement": "Parakh Patra — AI Test Results Others Can Repeat",
    "track": "Satya & Pramaan Bharat"
  },
  {
    "sno": 15,
    "teamId": "FLUX-025",
    "teamName": "Prompt Ke Pujari",
    "leader": "Shirish Kashyap",
    "member": "Harsh gautam",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 4.4",
    "problemStatement": "Promise-to-Proof — Track Heat-Safety Promises",
    "track": "Shital & Sajag Bharat"
  },
  {
    "sno": 16,
    "teamId": "FLUX-155",
    "teamName": "Quarks",
    "leader": "Utkarsh Shukla",
    "member": "Mansi Singh",
    "college": "ITM",
    "teamType": "TEAM",
    "psNo": "PS 2.4",
    "problemStatement": "Meri Marzi — Understand Health-Data Permission",
    "track": "Sahayak & Samman Bharat"
  },
  {
    "sno": 17,
    "teamId": "FLUX-157",
    "teamName": "SqaudX",
    "leader": "Shyam kumar",
    "member": "Yogesh pandey",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 1.1",
    "problemStatement": "Nyaya Pramaan — Check Quotes from Court Judgments",
    "track": "Satya & Pramaan Bharat"
  },
  {
    "sno": 18,
    "teamId": "FLUX-120",
    "teamName": "Supic",
    "leader": "Epshita Somani",
    "member": "Shaurya Bhatt",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 2.3",
    "problemStatement": "Protocol Saathi — Find Official Health Steps Offline",
    "track": "Sahayak & Samman Bharat"
  },
  {
    "sno": 19,
    "teamId": "FLUX-016",
    "teamName": "Team Elite",
    "leader": "Upasna",
    "member": "Nidhi",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 4.5",
    "problemStatement": "Local Threshold Learner — Study Local Heat-Alert Levels",
    "track": "Shital & Sajag Bharat"
  },
  {
    "sno": 20,
    "teamId": "FLUX-002",
    "teamName": "Team Hexacore",
    "leader": "Shraddha Gupta",
    "member": "Kaira singh",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 3.3",
    "problemStatement": "Geocode Setu — Match the Same Place Across Datasets",
    "track": "Bhoomi & Bharosa Bharat"
  },
  {
    "sno": 21,
    "teamId": "FLUX-057",
    "teamName": "Team Nakshatra",
    "leader": "Nitin Kumar",
    "member": "Swati Kushwaha",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 5.2",
    "problemStatement": "District WER Dashboard — Where Speech-to-Text Fails",
    "track": "Bhasha & Bol Bharat"
  },
  {
    "sno": 22,
    "teamId": "FLUX-133",
    "teamName": "The Code_ Burner",
    "leader": "Ansh Gupta",
    "member": "Skand Maurya",
    "college": "MPIT",
    "teamType": "TEAM",
    "psNo": "PS 5.3",
    "problemStatement": "Phone Ladder — Which Language Model Fits Which Phone?",
    "track": "Bhasha & Bol Bharat"
  },
  {
    "sno": 23,
    "teamId": "FLUX-008",
    "teamName": "ThinkAsCoder",
    "leader": "Sunil Singh",
    "member": "Shivam Srivastava",
    "college": "ITM",
    "teamType": "TEAM",
    "psNo": "PS 1.4",
    "problemStatement": "Bhasha Kar — Compare AI Language Costs and Safety",
    "track": "Satya & Pramaan Bharat"
  },
  {
    "sno": 24,
    "teamId": "FLUX-106",
    "teamName": "Threadrippers",
    "leader": "Anshul Yadav",
    "member": "Aarchveer Singh",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 4.3",
    "problemStatement": "Majdoor Shift — Plan Safer Outdoor Work Hours",
    "track": "Shital & Sajag Bharat"
  },
  {
    "sno": 25,
    "teamId": "FLUX-126",
    "teamName": "White Hats",
    "leader": "Aaditya Srivastava",
    "member": "Chandra Vijay Singh",
    "college": "MMMUT",
    "teamType": "TEAM",
    "psNo": "PS 5.1",
    "problemStatement": "Likhit Gaon — Let Local Speakers Check Transcripts",
    "track": "Bhasha & Bol Bharat"
  }
];

export const PROBLEM_STATEMENTS: ProblemStatementItem[] = [
  {
    "psNo": "PS 1.1",
    "title": "Nyaya Pramaan — Check Quotes from Court Judgments",
    "track": "Satya & Pramaan Bharat",
    "allottedTo": "SqaudX"
  },
  {
    "psNo": "PS 1.2",
    "title": "Bol-Kasauti — Test AI Safety in Indian Languages",
    "track": "Satya & Pramaan Bharat",
    "allottedTo": "Merged: Team Agastya + Byte Me"
  },
  {
    "psNo": "PS 1.3",
    "title": "Parakh Patra — AI Test Results Others Can Repeat",
    "track": "Satya & Pramaan Bharat",
    "allottedTo": "PAIR PROGRAMMERS"
  },
  {
    "psNo": "PS 1.4",
    "title": "Bhasha Kar — Compare AI Language Costs and Safety",
    "track": "Satya & Pramaan Bharat",
    "allottedTo": "ThinkAsCoder"
  },
  {
    "psNo": "PS 1.5",
    "title": "Agent Lagam — Keep AI Payments Within Limits",
    "track": "Satya & Pramaan Bharat",
    "allottedTo": "CodeVortex"
  },
  {
    "psNo": "PS 2.1",
    "title": "Ek Baar Bolo — Speak Once, Fill Every Form",
    "track": "Sahayak & Samman Bharat",
    "allottedTo": "Expecto Debugronum"
  },
  {
    "psNo": "PS 2.2",
    "title": "Pressure Map — Find Unfair Targets, Not Faulty Workers",
    "track": "Sahayak & Samman Bharat",
    "allottedTo": "Catalyst_byte"
  },
  {
    "psNo": "PS 2.3",
    "title": "Protocol Saathi — Find Official Health Steps Offline",
    "track": "Sahayak & Samman Bharat",
    "allottedTo": "Supic"
  },
  {
    "psNo": "PS 2.4",
    "title": "Meri Marzi — Understand Health-Data Permission",
    "track": "Sahayak & Samman Bharat",
    "allottedTo": "Quarks"
  },
  {
    "psNo": "PS 2.5",
    "title": "Anumati Sandbox — Test Giving and Cancelling Consent",
    "track": "Sahayak & Samman Bharat",
    "allottedTo": "Bawandar"
  },
  {
    "psNo": "PS 3.1",
    "title": "Batayedar Saboot — Record Who Is Growing the Crop",
    "track": "Bhoomi & Bharosa Bharat",
    "allottedTo": "2 Pointer Approach"
  },
  {
    "psNo": "PS 3.2",
    "title": "Khet Data Trust — Farmers Control Their Shared Data",
    "track": "Bhoomi & Bharosa Bharat",
    "allottedTo": "BaseLess"
  },
  {
    "psNo": "PS 3.3",
    "title": "Geocode Setu — Match the Same Place Across Datasets",
    "track": "Bhoomi & Bharosa Bharat",
    "allottedTo": "Team Hexacore"
  },
  {
    "psNo": "PS 3.4",
    "title": "Krishi Khoj — Turn Farm PDFs into Searchable Data",
    "track": "Bhoomi & Bharosa Bharat",
    "allottedTo": "404NotFound"
  },
  {
    "psNo": "PS 3.5",
    "title": "Salah Auditor — Check If Farm Advice Fits the Area",
    "track": "Bhoomi & Bharosa Bharat",
    "allottedTo": "Bugslyer"
  },
  {
    "psNo": "PS 4.1",
    "title": "HAP Bhandar — Bring Heat Action Plans Together",
    "track": "Shital & Sajag Bharat",
    "allottedTo": "2 Fast 2 Curious"
  },
  {
    "psNo": "PS 4.2",
    "title": "Bharosa Map — Show Heat Risk and Missing Data",
    "track": "Shital & Sajag Bharat",
    "allottedTo": "Cache-Me-Byte"
  },
  {
    "psNo": "PS 4.3",
    "title": "Majdoor Shift — Plan Safer Outdoor Work Hours",
    "track": "Shital & Sajag Bharat",
    "allottedTo": "Threadrippers"
  },
  {
    "psNo": "PS 4.4",
    "title": "Promise-to-Proof — Track Heat-Safety Promises",
    "track": "Shital & Sajag Bharat",
    "allottedTo": "Prompt Ke Pujari"
  },
  {
    "psNo": "PS 4.5",
    "title": "Local Threshold Learner — Study Local Heat-Alert Levels",
    "track": "Shital & Sajag Bharat",
    "allottedTo": "Team Elite"
  },
  {
    "psNo": "PS 5.1",
    "title": "Likhit Gaon — Let Local Speakers Check Transcripts",
    "track": "Bhasha & Bol Bharat",
    "allottedTo": "White Hats"
  },
  {
    "psNo": "PS 5.2",
    "title": "District WER Dashboard — Where Speech-to-Text Fails",
    "track": "Bhasha & Bol Bharat",
    "allottedTo": "Team Nakshatra"
  },
  {
    "psNo": "PS 5.3",
    "title": "Phone Ladder — Which Language Model Fits Which Phone?",
    "track": "Bhasha & Bol Bharat",
    "allottedTo": "The Code_ Burner"
  },
  {
    "psNo": "PS 5.4",
    "title": "Lipi Sabha — Let Communities Choose How to Write",
    "track": "Bhasha & Bol Bharat",
    "allottedTo": "P²"
  },
  {
    "psNo": "PS 5.5",
    "title": "Awaaz Adhikar — Control How Voice Recordings Are Used",
    "track": "Bhasha & Bol Bharat",
    "allottedTo": "CodeVolt"
  }
];

export const PROBLEM_STATEMENTS_DETAILS: Record<string, ProblemStatementDetail> = {
  "PS 1.1": {
    "psNo": "PS 1.1",
    "title": "Nyaya Pramaan — Check Quotes from Court Judgments",
    "track": "Satya & Pramaan Bharat",
    "theme": "Truth & AI Verification",
    "principle": "Verify the claim, preserve the evidence.",
    "problem": "An AI tool may name a real court case but invent or change a paragraph from its judgment. Checking only that the case exists will not catch this. Judges and officers need to know whether the quoted words really appear in the original judgment.",
    "build": "A tool that runs locally and checks both the court case and its quoted text against the original judgment.",
    "keyPoint": "Catch real cases with made-up quotes and save a check report. Possible source: Supreme Court and 25 High Courts on AWS, CC-BY-4.0. Check the usage terms."
  },
  "PS 1.2": {
    "psNo": "PS 1.2",
    "title": "Bol-Kasauti — Test AI Safety in Indian Languages",
    "track": "Satya & Pramaan Bharat",
    "theme": "Truth & AI Verification",
    "principle": "Verify the claim, preserve the evidence.",
    "problem": "AI may give safer answers in one Indian language than in another. Results can also change when people use their own script, English letters, or a mix of both. This matters for health, loans and content about religious or community groups. These differences need careful, private testing.",
    "build": "A shared test kit that tries to find unsafe AI answers about health, loans and community tensions.",
    "keyPoint": "Test local scripts, English-letter spellings and mixed scripts. Score results without a separate AI judge. Never publish harm f ul answers."
  },
  "PS 1.3": {
    "psNo": "PS 1.3",
    "title": "Parakh Patra — AI Test Results Others Can Repeat",
    "track": "Satya & Pramaan Bharat",
    "theme": "Truth & AI Verification",
    "principle": "Verify the claim, preserve the evidence.",
    "problem": "A claim that an AI model works well is hard to check if its test questions , model version , settings and hardware are missing. The same model may give different results in different setups. Others need a clear record so they can repeat the test for the actual task.",
    "build": "A local test tool f or models whose trained weights are available, using the task they will actually do.",
    "keyPoint": "Save a digitally signed test record: model fingerprint ( hash ) , random seed, hardware and prompts. Others should be able to repeat the test. BUILDI NG PRI N CIPLE / Verify the claim, preserve the evidence."
  },
  "PS 1.4": {
    "psNo": "PS 1.4",
    "title": "Bhasha Kar — Compare AI Language Costs and Safety",
    "track": "Satya & Pramaan Bharat",
    "theme": "Truth & AI Verification",
    "principle": "Verify the claim, preserve the evidence.",
    "problem": "AI splits text into small pieces called tokens. Some Indian languages need more pieces, making answers slower and more expensive. Splitting can also hide harmful phrases from safety checks. Developers need to compare speed, cost and safety before choosing a model.",
    "build": "Measure token counts, cost, response time and safety for each language and model.",
    "keyPoint": "Show how cost and safety are linked. Suggest models that fit the chosen language and budget."
  },
  "PS 1.5": {
    "psNo": "PS 1.5",
    "title": "Agent Lagam — Keep AI Payments Within Limits",
    "track": "Satya & Pramaan Bharat",
    "theme": "Truth & AI Verification",
    "principle": "Verify the claim, preserve the evidence.",
    "problem": "An AI payment assistant may read a message containing hidden commands that trick it into spending more than the user allowed. This is called prompt injection. Test whether the assistant follows the user’s limits, including when messages mix Hindi and English. Use fake payments only.",
    "build": "A n open rules system and a fake - payment test space. Test hidden commands and Hinglish. Do not mo v e real money.",
    "keyPoint": "Explain per - payment and monthly limits clearly. Record tests where hidden commands try to cause o v erspending."
  },
  "PS 2.1": {
    "psNo": "PS 2.1",
    "title": "Ek Baar Bolo — Speak Once, Fill Every Form",
    "track": "Sahayak & Samman Bharat",
    "theme": "Frontline Workers and Data Dignity",
    "principle": "Strengthen the system; protect the people in it.",
    "problem": "ASHA community health workers enter the same details in several apps and paper registers. Old phones and weak internet make this slow and increase mistakes, leaving less time to help people. They need a simple way to turn one voice note into entries for different apps and a printed register entry.",
    "build": "Process one voice note on the device. Turn it into the data format each app needs, plus a printable paper-register entry.",
    "keyPoint": "Keep paper records as a main output, not just a backup."
  },
  "PS 2.2": {
    "psNo": "PS 2.2",
    "title": "Pressure Map — Find Unfair Targets, Not Faulty Workers",
    "track": "Sahayak & Samman Bharat",
    "theme": "Frontline Workers and Data Dignity",
    "principle": "Strengthen the system; protect the people in it.",
    "problem": "Health workers may feel pushed to enter false numbers when their pay depends on approvals or unrealistic targets. For example, a report may list more vaccinations than there are children in a village. Find problems in the reporting system using group totals, without tracking or blaming individual workers.",
    "build": "Check group totals for impossible numbers or targets. Combine data in a way that protects privacy. Do not monitor individual workers.",
    "keyPoint": "Use the results to protect workers and improve the system, not punish people. BUILDI NG PRI N CIPLE / S trengthen the system; protect the people in it."
  },
  "PS 2.3": {
    "psNo": "PS 2.3",
    "title": "Protocol Saathi — Find Official Health Steps Offline",
    "track": "Sahayak & Samman Bharat",
    "theme": "Frontline Workers and Data Dignity",
    "principle": "Strengthen the system; protect the people in it.",
    "problem": "Health workers may need official instructions while visiting people, but internet access and training can be limited. A general AI answer may be unsafe. They need an offline assistant that shows the exact official instruction page, refuses questions it cannot safely handle and refers them to a supervising nurse.",
    "build": "Build an offline assistant using a model with available weights. Show the matching official page; refuse questions outside its scope.",
    "keyPoint": "Find existing instructions, not new AI medical advice. Refer unresolved questions to the supervising ANM (Auxiliary Nurse Midwife)."
  },
  "PS 2.4": {
    "psNo": "PS 2.4",
    "title": "Meri Marzi — Understand Health-Data Permission",
    "track": "Sahayak & Samman Bharat",
    "theme": "Frontline Workers and Data Dignity",
    "principle": "Strengthen the system; protect the people in it.",
    "problem": "When people sign up for an ABHA (Ayushman Bharat Health Account), they may not understand who can use their health data or how to cancel permission later. Saying “yes” does not prove they understand. Help them explain the choice in their own words before recording permission.",
    "build": "Build a spoken guide that ASHA community health workers can use during ABHA signup.",
    "keyPoint": "Before saving consent, ask the person to explain in their own words what they are agreeing to."
  },
  "PS 2.5": {
    "psNo": "PS 2.5",
    "title": "Anumati Sandbox — Test Giving and Cancelling Consent",
    "track": "Sahayak & Samman Bharat",
    "theme": "Frontline Workers and Data Dignity",
    "principle": "Strengthen the system; protect the people in it.",
    "problem": "Developers need a safe place to test how users give and cancel data - use permission under the Digital Personal Data Protection (DPDP) framework. Cancelling should be as easy as agreeing. Use mock roles for the service that manages permission and the organisation that uses data. First check what open tools already exist; their absence is not confirmed.",
    "build": "Build an open test setup with fake consent - management and data - use services. It is not a real regulated consent service.",
    "keyPoint": "Automatically check that cancelling permission is as easy as giving it."
  },
  "PS 3.1": {
    "psNo": "PS 3.1",
    "title": "Batayedar Saboot — Record Who Is Growing the Crop",
    "track": "Bhoomi & Bharosa Bharat",
    "theme": "Farmers, Land and the Data Commons",
    "principle": "Make provenance visible and governance collective.",
    "problem": "Land records may name the owner but not the tenant farmer growing crops. First ask affected communities whether this causes problems. If it does, help farmers collect crop evidence even with weak internet. A landlord’s confirmation must be optional. These records do not prove ownership, legal tenancy or entitlement; state laws differ.",
    "build": "An offline tool to collect crop evidence with location tags and optional landlord confirmation.",
    "keyPoint": "Export an evidence bundle, not a legal claim. Tenancy laws differ by state."
  },
  "PS 3.2": {
    "psNo": "PS 3.2",
    "title": "Khet Data Trust — Farmers Control Their Shared Data",
    "track": "Bhoomi & Bharosa Bharat",
    "theme": "Farmers, Land and the Data Commons",
    "principle": "Make provenance visible and governance collective.",
    "problem": "Sharing farm data may help a farmer group, but who can access it, why, and can they sell it? Members need clear rules and a record of use. Test a model led by an FPO (Farmer Producer Organisation), with rules approved by members. This is a proposal, not a claim that FPOs already have a legal trustee role.",
    "build": "A system that controls who can query shared data, records their purpose and logs each use.",
    "keyPoint": "Members vote on rules. Enforce group - summary - only access and a ban on resale."
  },
  "PS 3.3": {
    "psNo": "PS 3.3",
    "title": "Geocode Setu — Match the Same Place Across Datasets",
    "track": "Bhoomi & Bharosa Bharat",
    "theme": "Farmers, Land and the Data Commons",
    "principle": "Make provenance visible and governance collective.",
    "problem": "Soil, weather and crop records may use different names, scripts or IDs for the same village or field. Boundaries and record formats may also differ. Joining the wrong records can lead to advice for the wrong place. A shared matching table can help, but uncertain matches must be clearly marked.",
    "build": "An open matching table linking villages, plots and datasets, including different spellings.",
    "keyPoint": "Match across Indian scripts and show how confident the system is about each match. BUILDI NG PRI N CIPLE / Make provenance visible and governance collective."
  },
  "PS 3.4": {
    "psNo": "PS 3.4",
    "title": "Krishi Khoj — Turn Farm PDFs into Searchable Data",
    "track": "Bhoomi & Bharosa Bharat",
    "theme": "Farmers, Land and the Data Commons",
    "principle": "Make provenance visible and governance collective.",
    "problem": "Official farming advice is often stored in PDFs that are hard to search, combine or update. When facts are copied out, errors are hard to check without the original page and document version. Extract the existing facts into organised fields; do not create new official advice.",
    "build": "A tool that extracts facts from farming PDFs into organised data fields.",
    "keyPoint": "Link every fact to its exact source page and document version so it can be checked."
  },
  "PS 3.5": {
    "psNo": "PS 3.5",
    "title": "Salah Auditor — Check If Farm Advice Fits the Area",
    "track": "Bhoomi & Bharosa Bharat",
    "theme": "Farmers, Land and the Data Commons",
    "principle": "Make provenance visible and governance collective.",
    "problem": "A farm chatbot may give advice that sounds right but is wrong for a district’s season, soil, crop variety or sowing time. General tests can miss these local mistakes. Check its answers against official farming guidance for that district, not just advice that works somewhere else.",
    "build": "An open test tool that compares chatbot advice with official local farming guidance.",
    "keyPoint": "Catch advice that sounds correct in general but is wrong for the local area."
  },
  "PS 4.1": {
    "psNo": "PS 4.1",
    "title": "HAP Bhandar — Bring Heat Action Plans Together",
    "track": "Shital & Sajag Bharat",
    "theme": "Heat-Resilient and Alert India",
    "principle": "Show uncertainty; connect commitments to evidence.",
    "problem": "Heat Action Plans explain how an area will prepare for extreme heat, but they are spread across many documents. It is hard to compare when action starts, which department is responsible, what funding exists and what legal powers support it. A common, searchable format can help cities find gaps before heat waves arrive.",
    "build": "Extract details from 250+ plans: alert conditions, limits, departments and funding.",
    "keyPoint": "Score plans against the World Health Organization’s eight heat-health elements. Flag missing legal authority."
  },
  "PS 4.2": {
    "psNo": "PS 4.2",
    "title": "Bharosa Map — Show Heat Risk and Missing Data",
    "track": "Shital & Sajag Bharat",
    "theme": "Heat-Resilient and Alert India",
    "principle": "Show uncertainty; connect commitments to evidence.",
    "problem": "A heat-risk map can look exact even when there is little local data. This may send cooling or health support to the wrong areas. People need maps for each city ward that show both estimated risk and how reliable the estimate is. When evidence is too weak, say so instead of guessing.",
    "build": "Ward-le v el heat-risk maps with confidence estimates checked against evidence.",
    "keyPoint": "Show “insufficient data” w hen needed. Do not present guesses as exact results. BUILDI NG PRI N CIPLE / Show uncertainty; connect commitments to evidence."
  },
  "PS 4.3": {
    "psNo": "PS 4.3",
    "title": "Majdoor Shift — Plan Safer Outdoor Work Hours",
    "track": "Shital & Sajag Bharat",
    "theme": "Heat-Resilient and Alert India",
    "principle": "Show uncertainty; connect commitments to evidence.",
    "problem": "Heat safety plans do not always turn into safer working hours and rest breaks. Contractors need practical schedules based on weather forecasts. Workers also need a safe way to report times they almost became ill or were harmed by heat, without being identified or monitored.",
    "build": "A shift planner using open weather forecasts, plus an anonymous log of workers’ close calls with heat harm.",
    "keyPoint": "Compare planned schedules with workers’ reports to check whether protections were actually followed."
  },
  "PS 4.4": {
    "psNo": "PS 4.4",
    "title": "Promise-to-Proof — Track Heat-Safety Promises",
    "track": "Shital & Sajag Bharat",
    "theme": "Heat-Resilient and Alert India",
    "principle": "Show uncertainty; connect commitments to evidence.",
    "problem": "A public promise about heat safety does not prove that support was delivered. Money may not be set aside, and several departments may share responsibility. People need a simple way to track each promise and check what actually happened using evidence from the ground.",
    "build": "A pu b lic tracker that turns promises into checkable tasks, with citizen photos as evidence.",
    "keyPoint": "M ake the tool open - source and let people compare what was promised with what was delivered."
  },
  "PS 4.5": {
    "psNo": "PS 4.5",
    "title": "Local Threshold Learner — Study Local Heat-Alert Levels",
    "track": "Shital & Sajag Bharat",
    "theme": "Heat-Resilient and Alert India",
    "principle": "Show uncertainty; connect commitments to evidence.",
    "problem": "One heat - alert limit may not suit every area because local weather and health risks differ. Use past weather and hospital counts of heat illness to suggest possible local alert levels for review. These are candidates, not new medical rules. Health and disaster teams need results they can use together.",
    "build": "Use local hospital heat - illness counts and past weather to suggest possible alert le v els for review.",
    "keyPoint": "Use a shared data format for health and disaster teams. Do not invent medical thresholds."
  },
  "PS 5.1": {
    "psNo": "PS 5.1",
    "title": "Likhit Gaon — Let Local Speakers Check Transcripts",
    "track": "Bhasha & Bol Bharat",
    "theme": "Long-Tail Languages and Voice Sovereignty",
    "principle": "The community is the decision-maker, not just the dataset.",
    "problem": "Voice recordings alone are not enough to train or test speech-to-text tools. The written words must be checked. Automatic speech recognition (ASR) may miss local pronunciations or dialects. People who find reading difficult also need a way to help. Let local speakers review recordings mainly by listening.",
    "build": "Let native speakers check and correct text drafted by an automatic speech-to-text tool.",
    "keyPoint": "Keep dialect differences. Let several speakers agree on corrections. Make listening the main way to review."
  },
  "PS 5.2": {
    "psNo": "PS 5.2",
    "title": "District WER Dashboard — Where Speech-to-Text Fails",
    "track": "Bhasha & Bol Bharat",
    "theme": "Long-Tail Languages and Voice Sovereignty",
    "principle": "The community is the decision-maker, not just the dataset.",
    "problem": "One overall accuracy score can hide speech-to-text errors affecting particular districts , genders or age groups. Some groups may not have enough test data at all. Show where mistakes occur and where evidence is missing so teams know whose speech data to collect next. Do not invent scores for missing groups.",
    "build": "Show word error rate (WER)— how often words are wrong — by district , gender and age.",
    "keyPoint": "Separate poor results from missing test data. Show where more recordings are needed."
  },
  "PS 5.3": {
    "psNo": "PS 5.3",
    "title": "Phone Ladder — Which Language Model Fits Which Phone?",
    "track": "Bhasha & Bol Bharat",
    "theme": "Long-Tail Languages and Voice Sovereignty",
    "principle": "The community is the decision-maker, not just the dataset.",
    "problem": "A language model may work on one phone but be too slow , use too much memory , drain the battery or overheat another. Test languages and models on low-cost phone processors so results can be repeated. One developer ’ s H indi result is only an unverified lead , not proof that a model works everywhere.",
    "build": "Compare speed , memory use , battery drain and heat across languages , models and low-cost phone processors.",
    "keyPoint": "A utomatically check converted models and publish a table showing which models work on which phones. BUILDI NG PRI N CIPLE / The community is the decision-maker, not just the dataset."
  },
  "PS 5.4": {
    "psNo": "PS 5.4",
    "title": "Lipi Sabha — Let Communities Choose How to Write",
    "track": "Bhasha & Bol Bharat",
    "theme": "Long-Tail Languages and Voice Sovereignty",
    "principle": "The community is the decision-maker, not just the dataset.",
    "problem": "Some languages do not have one widely agreed writing system. This makes transcripts, learning materials and digital tools harder to create. Outsiders should not choose a script or spelling system for speakers. Help communities compare options with language experts, checking ease of learning and consistent use.",
    "build": "Let communities try different writing systems and spelling rules.",
    "keyPoint": "The community decides. Measure consistency and ease of learning. Work with linguists; an easy tool does not prove community agreement."
  },
  "PS 5.5": {
    "psNo": "PS 5.5",
    "title": "Awaaz Adhikar — Control How Voice Recordings Are Used",
    "track": "Bhasha & Bol Bharat",
    "theme": "Long-Tail Languages and Voice Sovereignty",
    "principle": "The community is the decision-maker, not just the dataset.",
    "problem": "Voice recordings may be reused in ways speakers did not expect. Speakers and community councils need to see allowed uses and change future permissions. First investigate whether current cancellation tools are inadequate. Be clear: cancelling permission does not automatically remove copies already shared or undo past AI training.",
    "build": "Tools for community consent , licence choices , cancelling permission and logs of how recordings are used.",
    "keyPoint": "E nforce the community council ’ s limits or cancellations within the system , while clearly explaining what cannot be undone."
  }
};
