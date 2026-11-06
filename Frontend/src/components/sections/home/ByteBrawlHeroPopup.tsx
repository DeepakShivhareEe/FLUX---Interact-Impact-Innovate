import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Zap, Sparkles } from "lucide-react";
import { introManager } from "@/lib/introState";

interface ByteBrawlHeroPopupProps {
  isMobile?: boolean;
}

export default function ByteBrawlHeroPopup({ isMobile = false }: ByteBrawlHeroPopupProps) {
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isWebsiteReady, setIsWebsiteReady] = useState(() => introManager.isDone());
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show ONLY after the landing intro animation completely opens
  useEffect(() => {
    if (introManager.isDone()) {
      setIsWebsiteReady(true);
      return;
    }
    const unsub = introManager.subscribe((st) => {
      if (st === "done") {
        setTimeout(() => setIsWebsiteReady(true), 300);
      }
    });
    return unsub;
  }, []);

  // 3D Mouse Parallax Tilt (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rY = (x / (rect.width / 2)) * 8;
    const rX = -(y / (rect.height / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  if (!isWebsiteReady) {
    return null;
  }

  const containerClasses = isMobile
    ? "relative w-full max-w-[340px] mx-auto pointer-events-auto select-none mb-1 px-2"
    : "hidden lg:block absolute bottom-7 sm:bottom-9 xl:bottom-11 left-[39.5%] xl:left-[39.5%] 2xl:left-[40.5%] z-[30] pointer-events-auto w-[310px] xl:w-[320px] 2xl:w-[330px] select-none";

  const pillContainerClasses = isMobile
    ? "relative flex justify-center w-full pointer-events-auto my-2"
    : "hidden lg:block absolute bottom-7 sm:bottom-9 xl:bottom-11 left-[39.5%] xl:left-[39.5%] 2xl:left-[40.5%] z-[30] pointer-events-auto";

  return (
    <div className={isMobile ? "w-full flex justify-center" : "contents"}>
      <AnimatePresence>
        {!isDismissed ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={containerClasses}
            style={{ perspective: 1000 }}
          >
            {/* 3D Floating & Tilt Container */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              animate={{
                y: isHovered ? [0, -3, 0] : [0, -6, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: !isMobile
                  ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
                  : "none",
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
              }}
              className="relative group"
            >
              {/* Outer Glitch Slices (Signature Hologram Lines on Left/Right Edges) */}
              <div className="absolute -left-3.5 top-9 w-4 h-[2px] bg-white/90 shadow-[0_0_8px_#ffffff] pointer-events-none z-30" />
              <div className="absolute -left-5 top-20 w-6 h-[2.5px] bg-white shadow-[0_0_10px_#ffffff] pointer-events-none z-30" />
              <div className="absolute -left-3 top-36 w-3.5 h-[1.5px] bg-white/80 shadow-[0_0_6px_#ffffff] pointer-events-none z-30" />
              <div className="absolute -left-4 bottom-14 w-4.5 h-[2px] bg-white/90 shadow-[0_0_8px_#ffffff] pointer-events-none z-30" />

              <div className="absolute -right-3 top-12 w-3.5 h-[2px] bg-white/80 shadow-[0_0_8px_#ffffff] pointer-events-none z-30" />
              <div className="absolute -right-5 top-28 w-6 h-[2.5px] bg-white shadow-[0_0_10px_#ffffff] pointer-events-none z-30" />
              <div className="absolute -right-3.5 bottom-16 w-4 h-[2px] bg-white/90 shadow-[0_0_8px_#ffffff] pointer-events-none z-30" />

              {/* Top and Bottom Tech Bar Notches */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full bg-neutral-900 border border-white/30 text-[7px] font-mono text-white/50 z-30 pointer-events-none">
                <span className="w-1 h-1 rounded-full bg-white/80" />
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="w-1 h-1 rounded-full bg-white/80" />
              </div>

              {/* Glossy Metallic Chrome Bevel Frame (Sharp Rectangle) */}
              <div
                className="relative rounded-none p-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(220,240,255,0.18)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(180,195,215,0.35) 25%, rgba(90,105,125,0.5) 50%, rgba(230,242,255,0.8) 75%, rgba(140,155,175,0.4) 100%)",
                }}
              >
                {/* Inner Dark Glass Panel (Sharp Rectangle) */}
                <div className="relative rounded-none bg-[#090b10]/95 backdrop-blur-2xl p-4 sm:p-4.5 overflow-hidden border border-white/15">
                  {/* Cyber Reticle Corner Brackets (White/Chrome) */}
                  <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/80 pointer-events-none z-20" />
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/80 pointer-events-none z-20" />
                  <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/80 pointer-events-none z-20" />
                  <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/80 pointer-events-none z-20" />

                  {/* Ambient Top-Left & Bottom Specular Radial Glows */}
                  <div
                    className="absolute -top-16 -left-16 w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-25"
                    style={{
                      background: "radial-gradient(circle, rgba(230,245,255,0.9) 0%, rgba(140,190,240,0.3) 60%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full pointer-events-none blur-3xl opacity-20"
                    style={{
                      background: "radial-gradient(circle, rgba(160,210,255,0.8) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Subtle Diagonal Carbon Scanline Texture */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 3px)",
                    }}
                    aria-hidden="true"
                  />

                  {/* 3D Perspective Cyber Grid Floor at Bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 pointer-events-none overflow-hidden opacity-25 z-0"
                    aria-hidden="true"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        transform: "perspective(180px) rotateX(62deg) translateY(10px)",
                        maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* ==================== 1. TOP HEADER ROW ==================== */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 relative z-10">
                    {/* Left: "WINNERS DECLARED" Glass Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      {/* Indicator Dot */}
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-black text-amber-300 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-1">
                        WINNERS DECLARED 🏆
                      </span>
                    </div>

                    {/* Center: Glowing White/Ice Heartbeat Trace (ECG Pulse) */}
                    <svg
                      className="w-10 sm:w-11 h-3.5 text-white stroke-current drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] select-none pointer-events-none"
                      viewBox="0 0 50 16"
                      fill="none"
                    >
                      <path
                        d="M0 8h10l3-6 4 12 4-8 3 4h26"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Right: Reticle Close Button with Corner Brackets */}
                    <div className="relative p-0.5">
                      <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/70 pointer-events-none" />
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-white/70 pointer-events-none" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-white/70 pointer-events-none" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/70 pointer-events-none" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDismissed(true);
                        }}
                        aria-label="Minimize ByteBrawl Alert"
                        className="w-6 h-6 min-w-[24px] min-h-[24px] rounded bg-white/5 hover:bg-white/15 border border-white/30 hover:border-white flex items-center justify-center text-white/80 hover:text-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.2)] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ==================== 2. CATEGORY TAG ==================== */}
                  <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase mb-1.5 relative z-10">
                    <span className="text-white font-black">&gt;_</span>
                    <span className="px-2 py-0.5 rounded border border-white/25 bg-white/[0.05] text-white/90 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                      [ FLAGSHIP HACKATHON ]
                    </span>
                  </div>

                  {/* ==================== 3. TITLE ROW ==================== */}
                  <div className="relative z-10 mb-2 text-left">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          ByteBrawl
                        </span>{" "}
                        <span className="text-white/60 font-light mx-0.5">×</span>{" "}
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          Hacktoberfest
                        </span>
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-white/60 select-none">
                        <span>─</span>
                        <span>01</span>
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 line-clamp-2 font-normal leading-relaxed">
                      Final Round Results Declared! Congratulations to Champions 2 Pointer Approach, Quarks, Team nakshatra &amp; all finalists.
                    </p>
                  </div>

                  {/* ==================== 4. METADATA PILLS ==================== */}
                  <div className="relative z-10 flex flex-wrap gap-1.5 mb-3 font-mono text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/25 hover:border-white/45 text-white/90 flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-colors">
                      <Flame className="w-3 h-3 text-white" /> 26-29 Oct 2026
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/25 hover:border-white/45 text-white/90 flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-colors">
                      <Zap className="w-3 h-3 text-white" /> Alan Turing Hall
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/25 hover:border-white/45 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-colors">
                      Free Entry
                    </span>
                  </div>

                  {/* ==================== 5. ACTION BUTTONS ==================== */}
                  <div className="relative z-10 flex items-center gap-2">
                    {/* Primary CTA: Iconic Glossy Liquid Glass / Mercury Button */}
                    <button
                      onClick={() => navigate("/events/bytebrawl-hacktoberfest")}
                      className="relative flex-1 h-12 min-h-[48px] rounded-xl cursor-pointer group overflow-hidden transition-all duration-300 transform active:scale-[0.98]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(252,211,77,0.95) 0%, rgba(245,158,11,0.85) 50%, rgba(217,119,6,0.95) 100%)",
                        boxShadow:
                          "inset 0 1px 1px 0 rgba(255,255,255,1), inset 0 -2px 5px 0 rgba(0,25,50,0.5), inset 0 0 14px 0 rgba(190,230,255,0.6), 0 0 24px 0 rgba(200,235,255,0.4), 0 8px 24px 0 rgba(0,0,0,0.75)",
                        border: "1px solid rgba(255,255,255,0.6)",
                      }}
                    >
                      {/* Top Curved Specular Highlight Reflection */}
                      <div
                        className="absolute inset-x-1.5 top-0.5 h-[50%] rounded-t-lg pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 75%, transparent 100%)",
                        }}
                      />

                      {/* Animated Shimmer Sweep on Hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                      {/* Cyber Button Corner Brackets */}
                      <div className="absolute top-1 left-1.5 w-1.5 h-1.5 border-t border-l border-white/80 pointer-events-none" />
                      <div className="absolute top-1 right-1.5 w-1.5 h-1.5 border-t border-r border-white/80 pointer-events-none" />
                      <div className="absolute bottom-1 left-1.5 w-1.5 h-1.5 border-b border-l border-white/80 pointer-events-none" />
                      <div className="absolute bottom-1 right-1.5 w-1.5 h-1.5 border-b border-r border-white/80 pointer-events-none" />

                      {/* Stacked Button Typography */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full leading-tight">
                        <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.16em] text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] uppercase flex items-center gap-1">
                          VIEW WINNERS 🏆
                        </span>
                        <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.14em] text-neutral-800 uppercase flex items-center gap-0.5 mt-0.5">
                          OFFICIAL PODIUM
                        </span>
                      </div>
                    </button>

                    {/* Secondary CTA: Reticle Wireframe Explore Button */}
                    <button
                      onClick={() => navigate("/events/bytebrawl-hacktoberfest")}
                      className="relative px-4 h-12 min-h-[48px] rounded-xl bg-black/75 hover:bg-white/[0.08] border border-white/30 hover:border-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center text-white font-mono text-xs font-bold tracking-[0.18em] uppercase transition-all cursor-pointer group"
                    >
                      {/* 4 Corner Reticle Crosshairs */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/50 group-hover:border-white transition-colors" />
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/50 group-hover:border-white transition-colors" />
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/50 group-hover:border-white transition-colors" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/50 group-hover:border-white transition-colors" />
                      <span>EXPLORE</span>
                    </button>
                  </div>

                  {/* ==================== 6. BOTTOM RIGHT DECAL ==================== */}
                  <div className="font-mono text-[8px] sm:text-[9px] text-white/50 select-none pointer-events-none text-right mt-2 mr-0.5 tracking-wider">
                    [SYS://BYTEBRAWL_v2]
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Minimized Floating Glossy Chrome Pill */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={pillContainerClasses}
          >
            <button
              onClick={() => setIsDismissed(false)}
              className="group flex items-center gap-2.5 px-4 py-2 min-h-[44px] rounded-full bg-[#0a0c12]/95 border border-white/40 hover:border-white shadow-[0_0_24px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-xl text-white font-mono text-xs tracking-wider transition-all transform hover:scale-105 cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_8px_#ffffff]" />
              </span>
              <span className="text-amber-300 font-bold tracking-wider">BYTEBRAWL WINNERS 🏆</span>
              <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
