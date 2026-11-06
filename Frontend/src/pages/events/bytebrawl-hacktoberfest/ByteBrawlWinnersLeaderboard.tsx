import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  ShieldCheck,
  Eye,
  X,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  CheckCircle2,
  Phone,
  Instagram,
  Cpu,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { FINAL_RESULT_META } from "@/data/bytebrawlResultsData";
import resultCircularImg from "@/assets/images/bytebrawl/bytebrawl_result_circular.png";
import championThumb from "@/assets/bytebrawl_winners/rank_1_champion.webp";
import runnerUpThumb from "@/assets/bytebrawl_winners/rank_2_runner_up.webp";
import secondRunnerUpThumb from "@/assets/bytebrawl_winners/rank_3_second_runner_up.webp";
import "./ByteBrawlWinnersLeaderboard.css";

// ─── Authentic College Registrations Metrics (Eastern UP Region) ────────────
const COLLEGE_REGISTRATIONS = {
  stats: [
    { label: "REG. TEAMS", value: "179" },
    { label: "HACKERS", value: "300+" },
    { label: "COLLEGES", value: "5" },
  ],
  colleges: [
    { rank: "01", name: "MMMUT", fullName: "Madan Mohan Malaviya University of Tech", isHighlighted: true },
    { rank: "02", name: "ITM", fullName: "Institute of Technology & Management", isHighlighted: false },
    { rank: "03", name: "DDU", fullName: "Deen Dayal Upadhyaya Gorakhpur Univ", isHighlighted: true },
    { rank: "04", name: "MPIT", fullName: "Maharana Pratap Institute of Tech", isHighlighted: false },
    { rank: "05", name: "REC Basti", fullName: "Rajkiya Engineering College Basti", isHighlighted: false },
  ],
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

export default function ByteBrawlWinnersLeaderboard() {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isCircularModalOpen, setIsCircularModalOpen] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Canvas Ref for celebration particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Helper: Web Audio Tone Synthesizer
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSynthTone = (
    freq: number,
    type: OscillatorType = "sine",
    duration = 0.25
  ) => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context may be restricted by browser policy
    }
  };

  const playFanfareTone = () => {
    if (!audioEnabled) return;
    playSynthTone(330, "triangle", 0.2);
    setTimeout(() => playSynthTone(440, "triangle", 0.25), 110);
    setTimeout(() => playSynthTone(554.37, "sawtooth", 0.3), 230);
    setTimeout(() => playSynthTone(659.25, "sine", 0.65), 370);
  };

  // Canvas particle burst
  const triggerCelebrationParticles = (
    colorHex = "#ffd700",
    particleCount = 65
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.4;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        color: Math.random() > 0.4 ? colorHex : "#00f0ff",
        size: Math.random() * 4 + 2,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
      });
    }
  };

  // Setup canvas animation loop & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.16; // gravity
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => { });
      }
    };
  }, []);

  // Individual card unveil
  const handleReveal = (rank: number) => {
    if (revealed[rank]) return;

    setRevealed((prev) => ({ ...prev, [rank]: true }));

    if (rank === 1) {
      playFanfareTone();
      triggerCelebrationParticles("#ffd700", 110);
    } else if (rank === 2) {
      playSynthTone(480, "triangle", 0.35);
      triggerCelebrationParticles("#e2e8f0", 50);
    } else if (rank === 3) {
      playSynthTone(380, "sine", 0.35);
      triggerCelebrationParticles("#cd7f32", 45);
    }
  };

  // Unveil all sequentially (Ceremony Overdrive)
  const handleRevealAll = () => {
    handleReveal(3);
    setTimeout(() => handleReveal(2), 240);
    setTimeout(() => handleReveal(1), 540);
  };

  const revealedCount =
    (revealed[1] ? 1 : 0) + (revealed[2] ? 1 : 0) + (revealed[3] ? 1 : 0);

  return (
    <section
      id="results-and-allotments"
      className="relative py-16 sm:py-24 bg-[#08080f] text-[#e4e1ed] bb-cyber-grid-bg bb-radial-vignette overflow-hidden selection:bg-[#00f0ff] selection:text-[#00363a]"
    >
      {/* Celebration Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <Container>
        {/* ── TOP LIVE BANNER & INTRO ────────────────────────────────────── */}
        <div className="relative z-10 max-w-6xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121124] border border-[#231f42] text-xs font-mono mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span className="text-[#00f0ff] font-bold uppercase tracking-wider">
              BYTEBRAWL FLUX · GRAND CHAMPIONSHIP STAGE
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-4">
            Holographic Reveal{" "}
            <span className="bg-gradient-to-r from-[#ffaa00] via-[#ffd700] to-[#00f0ff] bg-clip-text text-transparent">
              Arena
            </span>{" "}
            &amp; Official Podium
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-2xl mx-auto leading-relaxed">
            179 Teams, 300+ Hackers, and 5 Universities converged for an electrifying
            coding tournament. Decrypt the double-blind cryptographic vault to unveil the official champions.
          </p>

          {/* ── CEREMONIAL CONTROL DECK ──────────────────────────────────── */}
          <div className="mt-8 p-4 rounded-2xl bg-[#121124]/90 border border-[#231f42] backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
            {/* Audio Toggle & Equalizer */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAudioEnabled(!audioEnabled);
                  playSynthTone(audioEnabled ? 300 : 520, "sine", 0.15);
                }}
                className="w-10 h-10 rounded-xl bg-[#1a1926] hover:bg-[#232238] flex items-center justify-center border border-[#ffaa00]/40 text-[#ffaa00] transition-colors cursor-pointer"
                title={audioEnabled ? "Mute SFX" : "Enable SFX"}
              >
                {audioEnabled ? (
                  <Volume2 className="w-5 h-5 text-[#ffaa00]" />
                ) : (
                  <VolumeX className="w-5 h-5 text-[#849495]" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    {audioEnabled ? "SFX: ACTIVE" : "SFX: MUTED"}
                  </span>
                  <div
                    className={`flex items-center gap-0.5 h-4 ${audioEnabled ? "" : "opacity-30"
                      }`}
                  >
                    <span className="bb-eq-bar w-1 bg-[#ffaa00] rounded-full inline-block" />
                    <span className="bb-eq-bar w-1 bg-[#00f0ff] rounded-full inline-block" />
                    <span className="bb-eq-bar w-1 bg-[#10b981] rounded-full inline-block" />
                    <span className="bb-eq-bar w-1 bg-[#ffd700] rounded-full inline-block" />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#849495] block">
                  SYNTHESIZED STAGE SFX
                </span>
              </div>
            </div>

            {/* Decryption Counter Status */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#849495] uppercase tracking-wider hidden md:inline">
                STATUS:
              </span>
              <span
                className={`font-mono text-xs px-3 py-1 rounded-lg border font-bold transition-all ${revealedCount === 3
                    ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-[#1a1926] text-[#ffaa00] border-[#231f42]"
                  }`}
              >
                {revealedCount === 3
                  ? "✓ 3 / 3 DECRYPTED · ALL TIERS UNVEILED"
                  : `${revealedCount} / 3 DECRYPTED`}
              </span>
            </div>

            {/* Unveil Action Triggers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleReveal(3)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${revealed[3]
                    ? "bg-[#1a1926] text-[#cd7f32] border border-[#cd7f32]/40"
                    : "bg-[#1a1926] hover:bg-[#232238] text-white border border-[#231f42] hover:border-[#cd7f32]/50"
                  }`}
              >
                {revealed[3] ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-[#cd7f32]" />
                )}
                <span>{revealed[3] ? "3RD UNVEILED" : "UNVEIL 3RD"}</span>
              </button>

              <button
                onClick={() => handleReveal(2)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${revealed[2]
                    ? "bg-[#1a1926] text-[#e2e8f0] border border-[#e2e8f0]/40"
                    : "bg-[#1a1926] hover:bg-[#232238] text-white border border-[#231f42] hover:border-[#00f0ff]/50"
                  }`}
              >
                {revealed[2] ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-[#00f0ff]" />
                )}
                <span>{revealed[2] ? "RUNNER UP UNVEILED" : "UNVEIL RUNNER UP"}</span>
              </button>

              <button
                onClick={() => handleReveal(1)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${revealed[1]
                    ? "bg-[#ffaa00]/20 text-[#ffd700] border border-[#ffaa00]/60 shadow-[0_0_15px_rgba(255,170,0,0.3)]"
                    : "bg-gradient-to-r from-[#ffaa00] to-[#ffd700] text-black font-extrabold hover:brightness-110 shadow-[0_0_15px_rgba(255,170,0,0.3)]"
                  }`}
              >
                {revealed[1] ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Trophy className="w-3.5 h-3.5" />
                )}
                <span>{revealed[1] ? "CHAMPION UNVEILED" : "UNVEIL CHAMPION"}</span>
              </button>

              <button
                onClick={handleRevealAll}
                className="px-3.5 py-1.5 rounded-xl bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CEREMONY OVERDRIVE</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 3-TIER HOLOGRAPHIC PODIUM STAGE (MAIN ATTRACTION) ─────────── */}
        <div className="relative z-10 max-w-6xl mx-auto mt-16 sm:mt-24 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:items-end">

            {/* ── 2ND PLACE PODIUM (Left Slot - Cols 1-4) ──────────────── */}
            <div
              className={`lg:col-span-4 rounded-2xl bg-[#121124] border border-[#231f42] p-5 sm:p-6 shadow-2xl transition-all duration-500 order-2 lg:order-1 flex flex-col justify-between overflow-hidden relative group ${revealed[2]
                  ? "holo-border-cyan shadow-[0_0_35px_rgba(0,240,255,0.25)]"
                  : ""
                }`}
            >
              {/* Laser scanline */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-30 animate-scanline pointer-events-none" />

              {/* ENCRYPTED MYSTERY OVERLAY */}
              <AnimatePresence>
                {!revealed[2] && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="!absolute inset-0 z-20 bg-[#121124]/98 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#e2e8f0]/40 animate-spin"
                        style={{ animationDuration: "12s" }}
                      />
                      <span className="font-heading text-3xl font-black text-[#e2e8f0]">
                        2
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#e2e8f0] tracking-widest uppercase font-bold">
                      2ND PLACE // 1ST RUNNER UP
                    </span>

                    <div className="font-mono text-[11px] text-[#849495] my-2 bg-[#151520] px-2.5 py-1 rounded border border-[#231f42]">
                      VAULT_HASH: 0x8F..E24A
                    </div>

                    <p className="font-sans text-xs text-[#b9cacb] max-w-xs mb-5">
                      Double-blind technical evaluation sealed. Comprehensive Bharat challenge implementation.
                    </p>

                    <button
                      onClick={() => handleReveal(2)}
                      className="px-4 py-2 rounded-xl bg-[#1a1926] hover:bg-[#232238] text-[#00f0ff] font-mono text-xs font-bold border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all flex items-center gap-1.5 cursor-pointer group-hover:scale-105"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>DECRYPT REVEAL</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* REVEALED CONTENT */}
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#231f42]/70">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#1a1926] flex items-center justify-center font-heading text-xl text-[#e2e8f0] font-black border border-[#e2e8f0]/40 shadow-[0_0_12px_rgba(226,232,240,0.15)]">
                      2
                    </span>
                    <div>
                      <span className="font-mono text-[11px] text-[#e2e8f0] font-bold uppercase tracking-wider block">
                        1ST RUNNER UP
                      </span>
                      <span className="font-mono text-[10px] text-[#849495]">
                        BYTEBRAWL 2026
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-3 py-1 rounded-lg bg-[#1a1926] text-[#00f0ff] font-extrabold border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                    2ND PLACE
                  </span>
                </div>

                {/* Event Photo Preview */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#151520] border border-[#231f42] group-hover:border-[#00f0ff]/40 transition-colors">
                  <img
                    src={runnerUpThumb}
                    alt="ByteBrawl Runner Up Hackathon Presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121124] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#08080f]/90 font-mono text-[10px] text-[#00f0ff] border border-[#00f0ff]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                    <span>TRACK: SAHAYAK &amp; SAMMAN</span>
                  </div>
                </div>

                {/* Team Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#849495] uppercase">
                      SQUAD
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-black text-white">
                    Quarks
                  </h3>

                  <div className="space-y-1.5 font-mono text-xs pt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#231f42]">
                      <span className="text-white font-medium">• Utkarsh Shukla</span>
                      <span className="text-[#00f0ff] font-bold">ITM GKP</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#231f42]">
                      <span className="text-white font-medium">• Mansi Singh</span>
                      <span className="text-[#00f0ff] font-bold">ITM GKP</span>
                    </div>
                  </div>

                  {/* Verdict citation */}
                  <div className="p-3 rounded-xl bg-[#08080f] border border-[#231f42] text-xs text-[#b9cacb] italic mt-2">
                    "Stunning innovation, rapid technical prototyping, and comprehensive implementation across Bharat challenges."
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#00f0ff] font-bold">
                    FULL-STACK ARCHITECTURE
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#00f0ff] font-bold">
                    CROSS-COLLEGE EXCELLENCE
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#00f0ff] font-bold">
                    RAPID PROTOTYPE
                  </span>
                </div>
              </div>
            </div>

            {/* ── 1ST PLACE GRAND CHAMPION (Center Slot - Towering & Glowing) ── */}
            <div
              className={`lg:col-span-4 rounded-2xl bg-[#121124] border-2 border-[#ffaa00]/50 p-5 sm:p-6 shadow-2xl transition-all duration-500 order-1 lg:order-2 lg:-translate-y-5 flex flex-col justify-between overflow-hidden relative group ${revealed[1] ? "holo-border-gold podium-revealed-1" : ""
                }`}
            >
              {/* Top Gold Laser Scanline */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ffaa00] via-[#ffd700] to-[#00f0ff]" />
              <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-40 animate-scanline pointer-events-none" />

              {/* ENCRYPTED MYSTERY OVERLAY */}
              <AnimatePresence>
                {!revealed[1] && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="!absolute inset-0 z-20 bg-[#121124]/98 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl border-2 border-[#ffaa00]/60 animate-pulse shadow-[0_0_25px_rgba(255,170,0,0.5)]" />
                      <Trophy className="w-10 h-10 text-[#ffd700]" />
                    </div>

                    <span className="font-mono text-xs text-[#ffd700] tracking-widest uppercase font-black drop-shadow-[0_0_10px_rgba(255,170,0,0.6)]">
                      TOP SECRET // GRAND CHAMPION
                    </span>

                    <div className="font-mono text-xs text-[#ffd700] my-2 bg-[#151520] px-3 py-1 rounded-md border border-[#ffaa00]/40">
                      VAULT_HASH: 0x9D..F41C
                    </div>

                    <p className="font-sans text-xs text-[#b9cacb] max-w-xs mb-6">
                      Zero-trust multi-jury verified consensus. Unprecedented code precision and architecture.
                    </p>

                    <button
                      onClick={() => handleReveal(1)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffaa00] to-[#ffd700] text-black font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,170,0,0.4)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer group-hover:scale-105"
                    >
                      <Lock className="w-4 h-4 text-black" />
                      <span>DECRYPT GRAND CHAMPION</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* REVEALED CONTENT */}
              <div className="space-y-4">
                {/* Header Banner */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#231f42]/80">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffaa00] to-[#ffd700] text-black flex items-center justify-center font-heading text-2xl font-black shadow-[0_0_20px_rgba(255,170,0,0.5)]">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-[#ffd700]" />
                        <span className="font-mono text-xs text-[#ffd700] font-black uppercase tracking-wider">
                          GRAND CHAMPION
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#ffaa00]">
                        OVERALL BRAWL LAUREATE
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ffaa00] to-[#ffd700] text-black font-black shadow-[0_0_15px_rgba(255,170,0,0.4)]">
                    1ST PLACE
                  </span>
                </div>

                {/* Event Photo Preview */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#151520] border-2 border-[#ffaa00]/40 group-hover:border-[#ffaa00] transition-colors">
                  <img
                    src={championThumb}
                    alt="ByteBrawl Grand Champion Hackathon Coding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121124] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08080f]/90 border border-[#10b981]/40 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                    <span className="font-mono text-[10px] text-[#00f0ff] font-bold">
                      TRACK: BHOOMI &amp; BHAROSA
                    </span>
                  </div>
                </div>

                {/* Team Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#849495] uppercase">
                      SQUAD
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
                    2 Pointer Approach
                  </h3>

                  <div className="space-y-1.5 font-mono text-xs pt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#ffaa00]/30 shadow-[inset_0_0_10px_rgba(255,170,0,0.1)]">
                      <span className="text-white font-medium">• Satyam Prajapati</span>
                      <span className="text-[#ffd700] font-bold">MMMUT</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#ffaa00]/30 shadow-[inset_0_0_10px_rgba(255,170,0,0.1)]">
                      <span className="text-white font-medium">• Nitish Kumar</span>
                      <span className="text-[#ffd700] font-bold">MMMUT</span>
                    </div>
                  </div>

                  {/* Verdict citation */}
                  <div className="p-3 rounded-xl bg-[#08080f] border border-[#ffaa00]/30 text-xs text-[#ffd700] italic mt-2">
                    "Exceptional algorithmic precision, architectural resilience, and production-grade execution under tight constraints."
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ffaa00]/20 text-[#ffd700] font-bold">
                    ALGORITHMIC PRECISION
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ffaa00]/20 text-[#ffd700] font-bold">
                    RESILIENT SYSTEM
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ffaa00]/20 text-[#ffd700] font-bold">
                    PRODUCTION GRADE
                  </span>
                </div>
              </div>
            </div>

            {/* ── 3RD PLACE PODIUM (Right Slot - Cols 9-12) ─────────────── */}
            <div
              className={`lg:col-span-4 rounded-2xl bg-[#121124] border border-[#231f42] p-5 sm:p-6 shadow-2xl transition-all duration-500 order-3 flex flex-col justify-between overflow-hidden relative group ${revealed[3]
                  ? "holo-border-bronze shadow-[0_0_35px_rgba(205,127,50,0.25)]"
                  : ""
                }`}
            >
              {/* Laser scanline */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#cd7f32] to-transparent opacity-30 animate-scanline pointer-events-none" />

              {/* ENCRYPTED MYSTERY OVERLAY */}
              <AnimatePresence>
                {!revealed[3] && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="!absolute inset-0 z-20 bg-[#121124]/98 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#cd7f32]/40 animate-spin"
                        style={{ animationDuration: "14s" }}
                      />
                      <span className="font-heading text-3xl font-black text-[#cd7f32]">
                        3
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#cd7f32] tracking-widest uppercase font-bold">
                      3RD PLACE // 2ND RUNNER UP
                    </span>

                    <div className="font-mono text-[11px] text-[#849495] my-2 bg-[#151520] px-2.5 py-1 rounded border border-[#231f42]">
                      VAULT_HASH: 0x3C..89B1
                    </div>

                    <p className="font-sans text-xs text-[#b9cacb] max-w-xs mb-5">
                      Double-blind technical evaluation sealed. Robust problem-solving strategy and creative architecture.
                    </p>

                    <button
                      onClick={() => handleReveal(3)}
                      className="px-4 py-2 rounded-xl bg-[#1a1926] hover:bg-[#232238] text-[#cd7f32] font-mono text-xs font-bold border border-[#cd7f32]/40 shadow-[0_0_15px_rgba(205,127,50,0.2)] transition-all flex items-center gap-1.5 cursor-pointer group-hover:scale-105"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>DECRYPT REVEAL</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* REVEALED CONTENT */}
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#231f42]/70">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#1a1926] flex items-center justify-center font-heading text-xl text-[#cd7f32] font-black border border-[#cd7f32]/40 shadow-[0_0_12px_rgba(205,127,50,0.15)]">
                      3
                    </span>
                    <div>
                      <span className="font-mono text-[11px] text-[#cd7f32] font-bold uppercase tracking-wider block">
                        2ND RUNNER UP
                      </span>
                      <span className="font-mono text-[10px] text-[#849495]">
                        BYTEBRAWL 2026
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-3 py-1 rounded-lg bg-[#1a1926] text-[#cd7f32] font-extrabold border border-[#cd7f32]/30 shadow-[0_0_10px_rgba(205,127,50,0.2)]">
                    3RD PLACE
                  </span>
                </div>

                {/* Event Photo Preview */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#151520] border border-[#231f42] group-hover:border-[#cd7f32]/40 transition-colors">
                  <img
                    src={secondRunnerUpThumb}
                    alt="ByteBrawl 2nd Runner Up Team Collaboration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121124] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#08080f]/90 font-mono text-[10px] text-[#cd7f32] border border-[#cd7f32]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cd7f32] animate-pulse" />
                    <span>TRACK: SATYA &amp; PRAMAAN</span>
                  </div>
                </div>

                {/* Team Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#849495] uppercase">
                      SQUAD
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-black text-white">
                    Team nakshatra
                  </h3>

                  <div className="space-y-1.5 font-mono text-xs pt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#231f42]">
                      <span className="text-white font-medium">• Nitin Kumar</span>
                      <span className="text-[#cd7f32] font-bold">MMMUT</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#151520] border border-[#231f42]">
                      <span className="text-white font-medium">• Swati Kushwaha</span>
                      <span className="text-[#cd7f32] font-bold">MMMUT</span>
                    </div>
                  </div>

                  {/* Verdict citation */}
                  <div className="p-3 rounded-xl bg-[#08080f] border border-[#231f42] text-xs text-[#b9cacb] italic mt-2">
                    "Impressive domain execution, robust problem-solving strategy, and creative architectural design."
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#cd7f32] font-bold">
                    DOMAIN EXECUTION
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#cd7f32] font-bold">
                    TRANSPARENCY PIPELINE
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#232238] text-[#cd7f32] font-bold">
                    CREATIVE DESIGN
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── SPECIAL APPRECIATION HONORS (4TH & 5TH POSITION) ──────────── */}
        <div className="relative z-10 max-w-6xl mx-auto my-12">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#121124] border border-[#231f42] shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#231f42]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-wide">
                  Special Appreciation Honors
                </h3>
              </div>
              <span className="font-mono text-xs text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full w-fit">
                4TH &amp; 5TH POSITION // OFFICIAL MERIT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 4th Position: P2 */}
              <div className="p-5 rounded-xl bg-[#151520] border border-[#231f42] hover:border-[#00f0ff]/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#ffd700] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                    ★ 4TH POSITION
                  </span>
                  <span className="font-mono text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/20">
                    Swasthya &amp; Seva
                  </span>
                </div>

                <div className="font-heading text-2xl font-black text-white mb-3">
                  P²
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#08080f] border border-[#231f42]">
                    <span className="text-[#e4e1ed]">• Priyanshu Mishra</span>
                    <span className="text-[#00f0ff] font-bold">MMMUT</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#08080f] border border-[#231f42]">
                    <span className="text-[#e4e1ed]">• Priyanshu Rai</span>
                    <span className="text-[#00f0ff] font-bold">MMMUT</span>
                  </div>
                </div>
              </div>

              {/* 5th Position: Supic */}
              <div className="p-5 rounded-xl bg-[#151520] border border-[#231f42] hover:border-[#00f0ff]/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#ffd700] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                    ★ 5TH POSITION
                  </span>
                  <span className="font-mono text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/20">
                    Suraksha &amp; Shasan
                  </span>
                </div>

                <div className="font-heading text-2xl font-black text-white mb-3">
                  Supic
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#08080f] border border-[#231f42]">
                    <span className="text-[#e4e1ed]">• Epshita Somani</span>
                    <span className="text-[#00f0ff] font-bold">MMMUT</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#08080f] border border-[#231f42]">
                    <span className="text-[#e4e1ed]">• Shaurya Bhatt</span>
                    <span className="text-[#00f0ff] font-bold">MMMUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN HUB: COLLEGE REGISTRATIONS + OFFICIAL CIRCULAR ──── */}
        <div className="relative z-10 max-w-6xl mx-auto my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* 1. College Registrations & Regional Representation */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#00f0ff]/30 bg-[#081622]/95 backdrop-blur-md shadow-[0_0_35px_rgba(0,240,255,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono font-black text-lg sm:text-xl text-white tracking-wider uppercase flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#00f0ff]" />
                  <span>COLLEGE REGISTRATIONS</span>
                </h3>
                <span className="font-mono text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-1 rounded-full border border-[#00f0ff]/30">
                  EASTERN UP TECH REGION
                </span>
              </div>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                {COLLEGE_REGISTRATIONS.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 sm:p-3.5 rounded-lg border border-[#00f0ff]/40 bg-[#081c28]/90 text-center shadow-[inset_0_0_15px_rgba(0,240,255,0.12)]"
                  >
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#b9cacb] block mb-0.5">
                      {stat.label}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#00f0ff] block tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Table Header */}
              <div className="flex items-center gap-4 px-3 mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#849495]">
                <span className="w-8">#</span>
                <span>COLLEGE / UNIVERSITY</span>
              </div>

              {/* Colleges List */}
              <div className="space-y-2">
                {COLLEGE_REGISTRATIONS.colleges.map((col) => (
                  <div
                    key={col.rank}
                    className="flex items-center gap-4 px-4 py-2.5 rounded-md border border-[#00f0ff]/30 bg-[#081622]/90 shadow-[0_2px_10px_rgba(0,240,255,0.15)] hover:border-[#00f0ff] transition-colors"
                  >
                    <span
                      className={`w-8 font-mono text-sm font-black ${col.isHighlighted ? "text-[#ffd700]" : "text-[#b9cacb]"
                        }`}
                    >
                      {col.rank}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                        {col.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#849495] hidden sm:inline">
                        — {col.fullName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#00f0ff]/20 flex items-center justify-between text-[11px] font-mono text-[#b9cacb]">
              <span>VERIFIED PARTICIPATION</span>
              <span>CERTIFIED EVENT TALLY</span>
            </div>
          </div>

          {/* 2. Official Circular Snapshot Card */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#231f42] bg-[#121124]/95 backdrop-blur-md flex flex-col justify-between shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#b9cacb] font-mono text-xs mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>VERIFIED OFFICIAL CIRCULAR</span>
              </div>

              <h4 className="font-heading font-black text-xl sm:text-2xl text-white mb-3">
                Official Result Notification Circular
              </h4>

              <p className="font-sans text-xs sm:text-sm text-[#b9cacb] font-light leading-relaxed mb-6">
                The official final round results circular issued by FLUX and
                Department of Computer Science &amp; Engineering, Madan Mohan
                Malaviya University of Technology. You can examine the certified
                result snapshot or check the official announcement on the FLUX
                Instagram handle.
              </p>

              {/* Circular Snapshot Thumbnail */}
              <div
                onClick={() => setIsCircularModalOpen(true)}
                className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden border border-[#231f42] bg-white/5 shadow-xl cursor-pointer group mb-6"
              >
                <img
                  src={resultCircularImg}
                  alt="Official Final Result Circular"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4 text-[#ffd700]" />
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

        {/* ── COORDINATORS & ENDORSEMENT FOOTER STRIP ───────────────────── */}

      </Container>

      {/* ── FULLSCREEN CIRCULAR SNAPSHOT MODAL ─────────────────────────── */}
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
              className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl border border-[#231f42] bg-[#0e0e13] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col"
            >
              <div className="p-4 sm:p-5 border-b border-[#231f42] flex items-center justify-between gap-4 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#ffd700]" />
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
