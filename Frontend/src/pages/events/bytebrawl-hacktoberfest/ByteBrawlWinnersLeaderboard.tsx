import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Eye,
  X,
  Phone,
  ShieldCheck,
  Instagram,
  Sparkles,
} from "lucide-react";
import Container from "@/components/layout/Container";
import {
  FINAL_WINNERS,
  FINAL_SPECIAL_APPRECIATIONS,
  FINAL_RESULT_META,
} from "@/data/bytebrawlResultsData";
import resultCircularImg from "@/assets/images/bytebrawl/bytebrawl_result_circular.png";
import "@/pages/Ideathon/ResultHeader.css";

// ─── College Registrations Data (from Official Event Metrics) ────────────────
const COLLEGE_REGISTRATIONS = {
  stats: [
    { label: "REG. TEAMS", value: "179" },
    { label: "PARTICIPANTS", value: "300+" },
    { label: "COLLEGES", value: "5" },
  ],
  colleges: [
    { rank: "01", name: "MMMUT", isHighlighted: true },
    { rank: "02", name: "ITM", isHighlighted: false },
    { rank: "03", name: "DDU", isHighlighted: true },
    { rank: "04", name: "MPIT", isHighlighted: false },
    { rank: "05", name: "REC Basti", isHighlighted: false },
  ],
};

export default function ByteBrawlWinnersLeaderboard() {
  const [isCircularModalOpen, setIsCircularModalOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setTimeStr(
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <section
      id="results-and-allotments"
      className="relative py-20 sm:py-28 bg-[#050505] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <Container>
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest font-semibold mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>// FINAL ROUND RESULT // HACKTOBERFEST X BYTEBRAWL //</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase mb-4"
          >
            Winners of the{" "}
            <span className="font-script lowercase font-normal text-4xl sm:text-6xl lg:text-7xl text-amber-300">
              arena
            </span>{" "}
            & Official Podium
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We are delighted to announce the official winners of{" "}
            <strong className="text-white font-medium">
              HACKTOBERFEST X BYTEBRAWL
            </strong>
            , a celebration of coding, innovation, and technical excellence!
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* ── 1. Ideathon-Style Bash Terminal Window ────────────────────── */}
          <div className="rh-terminal-window">
            <div className="rh-title-bar">
              <div className="rh-traffic-lights">
                <div className="rh-dot rh-red" />
                <div className="rh-dot rh-yellow" />
                <div className="rh-dot rh-green" />
              </div>
              <div className="rh-title-label">results@bytebrawl2026 — bash</div>
              <div className="rh-live-badge">
                <div className="rh-live-dot" />
                LIVE
              </div>
            </div>

            <div className="rh-terminal-body">
              <div className="rh-prompt-row">
                <span className="rh-prompt-user">results</span>
                <span className="rh-prompt-at">@</span>
                <span className="rh-prompt-host">bytebrawl2026</span>
                <span className="rh-prompt-colon">:</span>
                <span className="rh-prompt-path">~</span>
                <span className="rh-prompt-dollar">$</span>
              </div>

              <div className="rh-cmd-display">
                <span className="rh-cmd-text">$ cat ./winners.txt</span>
              </div>

              <div className="rh-output-banner">
                <span className="rh-hash">#</span>
                <span className="rh-out-text">
                  HACKTOBERFEST X BYTEBRAWL —&nbsp;
                  <span className="rh-out-hl">Final Round Winners & Podium</span>
                </span>
              </div>

              <div className="rh-status-bar">
                <div className="rh-status-item">
                  <div className="rh-status-pulse" />
                  CONNECTED
                </div>
                <div className="rh-status-item">SESSION · BYTEBRAWL_2026</div>
                <div className="rh-status-item">{timeStr || "12:00"} IST</div>
              </div>
            </div>
          </div>

          {/* ── 2. Top 3 Grand Winners Podium Grid (Ideathon Style) ──────── */}
          <div className="rh-podium-grid">
            {/* 1st Place (Gold) */}
            <div className="rh-winner-card rh-gold">
              <div className="rh-rank-bar" />
              <div className="rh-card-inner">
                <div className="rh-card-cmd">
                  <span className="rh-g">▸</span> echo $PLACE_01
                </div>
                <div className="rh-team-rank">🥇 01</div>
                <div className="rh-team-name">2 Pointer Approach</div>
                <div className="rh-card-divider" />
                <div className="rh-members-label">TEAM_MEMBERS=2</div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Satyam Prajapati</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">MMMUT</span>
                  </div>
                </div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Nitish Kumar</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">MMMUT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd Place (Silver) */}
            <div className="rh-winner-card rh-silver">
              <div className="rh-rank-bar" />
              <div className="rh-card-inner">
                <div className="rh-card-cmd">
                  <span className="rh-g">▸</span> echo $PLACE_02
                </div>
                <div className="rh-team-rank">🥈 02</div>
                <div className="rh-team-name">Quarks</div>
                <div className="rh-card-divider" />
                <div className="rh-members-label">TEAM_MEMBERS=2</div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Utkarsh Shukla</span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">ITM</span>
                  </div>
                </div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Mansi Singh</span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">ITM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="rh-winner-card rh-bronze">
              <div className="rh-rank-bar" />
              <div className="rh-card-inner">
                <div className="rh-card-cmd">
                  <span className="rh-g">▸</span> echo $PLACE_03
                </div>
                <div className="rh-team-rank">🥉 03</div>
                <div className="rh-team-name">Team nakshatra</div>
                <div className="rh-card-divider" />
                <div className="rh-members-label">TEAM_MEMBERS=2</div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Nitin Kumar</span>
                    <span className="font-mono text-xs text-amber-500 font-semibold">MMMUT</span>
                  </div>
                </div>
                <div className="rh-member">
                  <span className="rh-mdot" />
                  <div className="flex items-center justify-between w-full">
                    <span>Swati Kushwaha</span>
                    <span className="font-mono text-xs text-amber-500 font-semibold">MMMUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Special Appreciation Honors (4th & 5th Position) ────── */}
          <div className="rh-appreciation-section">
            <div className="rh-section-header">
              <div className="rh-section-title">Special Appreciation Honors</div>
              <div className="rh-section-rule" />
              <div className="rh-section-count">4th & 5th Position</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 4th: P2 */}
              <div className="rh-appr-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="rh-appr-label text-purple-300 font-mono">
                    ★ 4TH POSITION
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400">
                    FLUX-124
                  </span>
                </div>
                <div className="rh-appr-name text-lg font-black text-white mb-3">
                  P²
                </div>
                <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span>• Priyanshu Mishra</span>
                    <span className="text-purple-300 text-[11px]">MMMUT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Priyanshu Rai</span>
                    <span className="text-purple-300 text-[11px]">MMMUT</span>
                  </div>
                </div>
              </div>

              {/* 5th: Supic */}
              <div className="rh-appr-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="rh-appr-label text-purple-300 font-mono">
                    ★ 5TH POSITION
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400">
                    FLUX-120
                  </span>
                </div>
                <div className="rh-appr-name text-lg font-black text-white mb-3">
                  Supic
                </div>
                <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span>• Epshita Somani</span>
                    <span className="text-purple-300 text-[11px]">MMMUT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Shaurya Bhatt</span>
                    <span className="text-purple-300 text-[11px]">MMMUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Two-Column Grid: College Registrations + Official Circular Snapshot ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-6">
            
            {/* 4A. College Registrations Widget (Exact User Spec) */}
            <div className="p-6 sm:p-7 rounded-2xl border border-cyan-500/35 bg-[#07131b]/95 backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.12)] flex flex-col justify-between">
              <div>
                <h3 className="font-mono font-black text-lg sm:text-xl text-white tracking-wider uppercase mb-5 flex items-center gap-2">
                  <span>COLLEGE REGISTRATIONS</span>
                </h3>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                  {COLLEGE_REGISTRATIONS.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 sm:p-3.5 rounded-lg border border-cyan-500/40 bg-[#081c28]/90 text-center shadow-[inset_0_0_15px_rgba(6,182,212,0.12)]"
                    >
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-200/70 block mb-0.5">
                        {stat.label}
                      </span>
                      <span className="font-mono text-xl sm:text-2xl font-black text-cyan-400 block tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Table Header */}
                <div className="flex items-center gap-4 px-3 mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-300/50">
                  <span className="w-8">#</span>
                  <span>COLLEGE / UNIVERSITY</span>
                </div>

                {/* Colleges List */}
                <div className="space-y-2">
                  {COLLEGE_REGISTRATIONS.colleges.map((col) => (
                    <div
                      key={col.rank}
                      className="flex items-center gap-4 px-4 py-2.5 rounded-md border border-cyan-500/30 bg-[#081622]/90 shadow-[0_2px_10px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-colors"
                    >
                      <span
                        className={`w-8 font-mono text-sm font-black ${
                          col.isHighlighted ? "text-amber-400" : "text-cyan-200/60"
                        }`}
                      >
                        {col.rank}
                      </span>
                      <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-cyan-200/60">
                <span>VERIFIED PARTICIPATION</span>
                <span>EASTERN UP TECH REGION</span>
              </div>
            </div>

            {/* 4B. Official Circular Snapshot Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0e0e13]/95 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VERIFIED OFFICIAL CIRCULAR</span>
                </div>

                <h4 className="font-sans font-black text-xl sm:text-2xl text-white mb-3">
                  Official Result Notification Circular
                </h4>

                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  The official final round results circular issued by FLUX and
                  Department of Computer Science & Engineering, Madan Mohan
                  Malaviya University of Technology. You can examine the certified
                  result snapshot or check the official announcement on the FLUX
                  Instagram handle.
                </p>

                {/* Circular Snapshot Thumbnail */}
                <div
                  onClick={() => setIsCircularModalOpen(true)}
                  className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden border border-white/15 bg-white/5 shadow-xl cursor-pointer group mb-6"
                >
                  <img
                    src={resultCircularImg}
                    alt="Official Final Result Circular"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>View Snapshot</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsCircularModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Expand Snapshot</span>
                </button>
                <a
                  href={FINAL_RESULT_META.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/35 hover:border-pink-500/60 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(236,72,153,0.2)] group"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>View on Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* ── 5. Coordinators & Endorsement Strip ───────────────────────── */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-neutral-300">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                FOR ANY QUERIES, CONTACT THE UNDERSIGNED:
              </span>
              <div className="flex flex-wrap items-center gap-4 text-white font-medium">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <strong>Aditya Gupta</strong> (CSE, 2nd Year) · 80575 18976
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <strong>Khushi Patel</strong> (IT, 2nd Year) · 63888 92891
                </span>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                POWERED BY:
              </span>
              <span className="text-white font-semibold block">
                Madan Mohan Malaviya University of Technology
              </span>
              <span className="text-neutral-400 text-[11px]">
                Gorakhpur, Uttar Pradesh
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Fullscreen Circular Snapshot Modal ──────────────────────────── */}
      <AnimatePresence>
        {isCircularModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCircularModalOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl border border-white/20 bg-[#0e0e13] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col"
            >
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Official Final Round Result Circular
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={FINAL_RESULT_META.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:text-pink-300"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                  <button
                    onClick={() => setIsCircularModalOpen(false)}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex items-center justify-center bg-black/60">
                <img
                  src={resultCircularImg}
                  alt="Official Final Round Result Circular"
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
