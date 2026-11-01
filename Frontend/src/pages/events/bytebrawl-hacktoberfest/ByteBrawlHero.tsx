import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Sparkles, Trophy } from "lucide-react";
import Container from "@/components/layout/Container";
import ChromeLogo3D from "@/components/3d/ChromeLogo3D";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

interface ByteBrawlHeroProps {
  onRegisterClick: () => void;
  isOpen: boolean;
}

export default function ByteBrawlHero({
  onRegisterClick,
  isOpen,
}: ByteBrawlHeroProps) {
  const isRegistrationOpen = isOpen && !BYTEBRAWL_CONFIG.isRegistrationClosed;
  return (
    <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 overflow-hidden bg-[#060606]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-cyan-500/[0.03] rounded-full blur-[128px]" />
        {/* Subtle grid dots overlay */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Text & CTA (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
            {/* Mono caps sub-badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-4 sm:mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
                // FINAL ROUND WINNERS DECLARED //
              </span>
              <span className="text-[10px] text-white/40 font-mono hidden sm:inline">
                | CSE DEPT MMMUT
              </span>
            </motion.div>

            {/* Main Title with Script Accent */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-black text-3xl sm:text-5xl xl:text-6xl uppercase tracking-tight text-white leading-[1.06] mb-3 sm:mb-4"
            >
              ByteBrawl{" "}
              <span className="font-script lowercase font-normal text-3xl sm:text-5xl xl:text-6xl text-white/80 tracking-normal px-1">
                x
              </span>{" "}
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Hacktoberfest
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl mb-6 sm:mb-7"
            >
              {BYTEBRAWL_CONFIG.tagline}
            </motion.p>

            {/* Chips Grid (Team of 2 / Date / Venue) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8 w-full"
            >
              {/* Chip 1: Team Size */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/10 bg-[#0e0e0e]/80 backdrop-blur-sm">
                <Users className="w-4 h-4 text-white/70 flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                    PARTICIPATION
                  </span>
                  <span className="font-mono text-xs font-semibold text-white">
                    {BYTEBRAWL_CONFIG.teamSizeText}
                  </span>
                </div>
              </div>

              {/* Chip 2: Date */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/10 bg-[#0e0e0e]/80 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-white/70 flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                    EVENT DATE
                  </span>
                  <span className="font-mono text-xs font-semibold text-white">
                    {BYTEBRAWL_CONFIG.date}
                  </span>
                </div>
              </div>

              {/* Chip 3: Venue */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/10 bg-[#0e0e0e]/80 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-white/70 flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                    VENUE
                  </span>
                  <span className="font-mono text-xs font-semibold text-white">
                    {BYTEBRAWL_CONFIG.venue}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <a
                href="#results-and-allotments"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-mono text-xs uppercase tracking-widest font-extrabold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:brightness-110 transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                <Trophy className="w-4 h-4 text-black fill-black" />
                <span>View Winners Podium 🏆</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              {isRegistrationOpen ? (
                <Link
                  to="/events/bytebrawl-hacktoberfest/register"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer active:scale-[0.98]"
                >
                  <span>Registration Form</span>
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-neutral-900/80 border border-white/15 text-neutral-400 font-mono text-xs uppercase tracking-widest font-semibold select-none">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
                  <span>Reg Closed</span>
                </div>
              )}

              <a
                href="#about-hacktoberfest"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                <span>Hacktoberfest '26</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Chrome Logo Anchor (5 cols on lg) */}
          {/* Obeying anchor rules: parked safely on the right, >= 40px away from text, never overlapping */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]">
            <div className="w-full h-full max-w-[340px] sm:max-w-[380px] aspect-square relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-dashed border-white/15 pointer-events-none animate-spin-slow" />

              <ChromeLogo3D
                className="w-full h-full"
                scale={1.05}
                positionMode="center"
                enableAutoRotate={true}
                enableMouseFollow={true}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

