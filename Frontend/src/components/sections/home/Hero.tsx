import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Marquee from "@/components/ui/Marquee";
import Container from "@/components/layout/Container";

import { introManager } from "@/lib/introState";

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Desktop refs
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  // Mobile refs
  const mLine1Ref = useRef<HTMLSpanElement>(null);
  const mLine2Ref = useRef<HTMLSpanElement>(null);
  const mLine3Ref = useRef<HTMLSpanElement>(null);
  const mDescRef = useRef<HTMLParagraphElement>(null);
  const mButtonsRef = useRef<HTMLDivElement>(null);
  const mCanvasRef = useRef<HTMLDivElement>(null);
  const mRolesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allElements = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      descRef.current,
      buttonsRef.current,
      canvasWrapperRef.current,
      rolesRef.current,
      mLine1Ref.current,
      mLine2Ref.current,
      mLine3Ref.current,
      mDescRef.current,
      mButtonsRef.current,
      mCanvasRef.current,
      mRolesRef.current,
    ].filter(Boolean);

    const resolveFinalState = () => {
      gsap.set(allElements, { clearProps: "transform,opacity" });
    };

    if (!introManager.isSeenInSession()) {
      const unsub = introManager.subscribe((st) => {
        if (st === "done") {
          resolveFinalState();
        }
      });
      return unsub;
    }

    resolveFinalState();
  }, []);

  const paragraphStyle = "text-[clamp(16px,1.15vw,20px)] leading-[1.6] max-w-[52ch] text-white/65 font-light";

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="hero-section-wrapper relative w-full h-[100svh] min-h-[100svh] max-md:h-auto max-md:min-h-[100svh] bg-[#060606] overflow-hidden max-md:overflow-visible select-none flex flex-col justify-center max-md:justify-start"
      style={{
        paddingTop: "calc(clamp(14px, 2vh, 24px) + 52px + 40px)",
        paddingBottom: "calc(var(--ticker-h) + 32px)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. GIANT OVERSIZED BACKGROUND MARQUEE TEXT
      ───────────────────────────────────────────────────────────── */}
      <div className="hero-marquee-wrapper hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-[1] overflow-hidden">
        <Marquee text="WHERE IDEAS MEET IMPACT" outlined={true} speed={1.1} isHero={true} />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PERSISTENT 3D CHROME LOGO DESKTOP ANCHOR (Desktop: lg:block)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={canvasWrapperRef}
        className="hidden lg:block absolute inset-0 pointer-events-none z-[2] overflow-visible"
      >
        {/* Soft silver radial glow on the right side (hardware accelerated gradient without blur) */}
        <div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        {/* Persistent 3D Logo Anchor: right side, centered vertically, clearance from text */}
        <div
          data-logo-anchor="hero"
          data-logo-scale="1.0"
          data-logo-opacity="1.0"
          className="absolute right-[8%] xl:right-[11%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. DESKTOP HERO (lg:flex - 1024px and up)
          12-column grid inside shared Container
          Left text block spans cols 1-8 (headline & description)
          Right column spans cols 9-12 (Role list & Join Us chip)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-full h-full items-center relative z-10 pointer-events-auto">
        <Container className="w-full h-full flex items-center">
          <div className="grid grid-cols-12 gap-8 items-center w-full h-full">
            
            {/* Columns 1-8: Left Text Block (flex column with justify-center for auto-adjustment) */}
            <div className="col-span-8 flex flex-col justify-center text-left h-full">
              
              {/* Headline: enlarged and impactful */}
              <h1
                className="hero-headline hero-gap-headline font-sans font-light tracking-[-0.035em] leading-[1.01] text-white"
              >
                <span className="block overflow-hidden py-0.5">
                  <span ref={line1Ref} className="reveal-line-inner block will-change-transform whitespace-nowrap">
                    The Innovation Core
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span ref={line2Ref} className="reveal-line-inner block will-change-transform whitespace-nowrap">
                    Where Ideas
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span ref={line3Ref} className="reveal-line-inner block will-change-transform whitespace-nowrap">
                    Meet{" "}
                    <span className="text-[#f0f0f0] font-normal drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]">
                      Impact.
                    </span>
                  </span>
                </span>
              </h1>

              {/* Main paragraph: exact same style as bio, 32px gap below */}
              <p
                ref={descRef}
                className={`hero-fade-item hero-paragraph-shared hero-gap-desc ${paragraphStyle}`}
              >
                Empowering students to interact, innovate, and engineer real-world impact.
                Source-first tech conclaves, research mentorship, hackathons, and breakthrough
                student projects built directly into the university ecosystem.
              </p>

              {/* Buttons: min-height 52px, gap 16px */}
              <div
                ref={buttonsRef}
                className="hero-fade-item flex items-center gap-4"
              >
                <button
                  onClick={() => navigate("/about")}
                  className="hero-btn group inline-flex items-center justify-center gap-3 px-7 border border-white/25 hover:border-white text-white text-xs sm:text-sm font-medium tracking-wide uppercase bg-transparent hover:bg-white/[0.04] transition-all duration-200 rounded-none cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 bg-white inline-block flex-shrink-0 transition-transform group-hover:scale-125" />
                  <span>Read Docs</span>
                </button>

                <button
                  onClick={() => navigate("/events")}
                  className="hero-btn group inline-flex items-center justify-center gap-3 px-7 bg-white hover:bg-[#e6e6e6] text-black text-xs sm:text-sm font-semibold tracking-wide uppercase border border-white transition-all duration-200 rounded-none cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <span className="w-1.5 h-1.5 bg-black inline-block flex-shrink-0 transition-transform group-hover:scale-125" />
                  <span>Browse All Events</span>
                </button>
              </div>
            </div>

            {/* Columns 9-12: Empty center space so 3D logo shines through, Bottom-Right Role Stack */}
            <div className="col-span-4 flex flex-col justify-end items-end self-stretch py-2 h-full pointer-events-none overflow-visible">
              
              {/* Bottom-Right Role List */}
              <div className="flex flex-col items-end text-right select-none pointer-events-auto pb-16 xl:pb-20">
                {/* Role List vertical stack with 10px gap */}
                <div
                  id="hero-role-list"
                  ref={rolesRef}
                  className="hero-fade-item flex flex-col items-end gap-[10px] text-[12px] xl:text-[13px] font-mono tracking-[0.12em] text-white/80"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
                    <span>TECH CONCLAVES</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
                    <span>HACKATHONS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
                    <span>RESEARCH MENTORSHIP</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TABLET & MOBILE HERO (lg:hidden - below 1024px)
          Stacked vertically: Bio -> Headline -> Paragraph -> Buttons ->
          3D Logo (~40vh centered) -> Role List (inline wrap row) -> Join Chip
      ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full md:my-auto relative z-10 px-4 pt-1 pb-16">
        <Container className="max-w-xl text-center flex flex-col items-center justify-center">
          
          {/* Headline clamped to 3 lines */}
          <h1 className="font-sans font-light tracking-[-0.035em] text-[clamp(1.75rem,6vw,3.75rem)] leading-[1.08] text-white text-center mb-3 sm:mb-6">
            <span className="block overflow-hidden py-0.5">
              <span ref={mLine1Ref} className="block will-change-transform whitespace-nowrap">
                The Innovation Core
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span ref={mLine2Ref} className="block will-change-transform whitespace-nowrap">
                Where Ideas
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span ref={mLine3Ref} className="block will-change-transform whitespace-nowrap">
                Meet{" "}
                <span className="text-[#f0f0f0] font-normal drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]">
                  Impact.
                </span>
              </span>
            </span>
          </h1>

          {/* Main description paragraph: shared paragraphStyle */}
          <p
            ref={mDescRef}
            className="text-xs sm:text-base leading-relaxed text-white/65 font-light text-center max-w-[44ch] mb-3 sm:mb-6"
          >
            Empowering students to interact, innovate, and engineer real-world impact.
            Source-first tech conclaves, research mentorship, hackathons, and breakthrough
            student projects built directly into the university ecosystem.
          </p>

          {/* Buttons: 44px min tap targets, side-by-side row */}
          <div
            ref={mButtonsRef}
            className="flex flex-row items-center gap-2.5 w-full max-w-sm justify-center mb-3 sm:mb-6"
          >
            <button
              onClick={() => navigate("/about")}
              className="flex-1 group inline-flex items-center justify-center gap-2 h-11 min-h-[44px] px-3 py-2.5 border border-white/25 hover:border-white text-white text-xs font-medium tracking-wide uppercase bg-transparent hover:bg-white/[0.04] transition-all duration-200 rounded-none cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-white inline-block flex-shrink-0" />
              <span>Read Docs</span>
            </button>

            <button
              onClick={() => navigate("/events")}
              className="flex-1 group inline-flex items-center justify-center gap-2 h-11 min-h-[44px] px-3 py-2.5 bg-white hover:bg-[#e6e6e6] text-black text-xs font-semibold tracking-wide uppercase border border-white transition-all duration-200 rounded-none cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-black inline-block flex-shrink-0" />
              <span>Browse Events</span>
            </button>
          </div>


          {/* Persistent 3D Logo Anchor on tablet (hidden on mobile < 768px) */}
          <div
            ref={mCanvasRef}
            className="hidden md:flex relative w-full h-[24vh] min-h-[160px] max-h-[300px] items-center justify-center my-2 overflow-visible"
          >
            <div
              className="absolute inset-0 m-auto w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-white/[0.06] blur-[60px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              data-logo-anchor="hero"
              data-logo-scale="0.75"
              data-logo-opacity="1.0"
              className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] mx-auto pointer-events-none"
            />
          </div>

          {/* Role list hidden on mobile (width < 768px), visible on tablet */}
          <div
            ref={mRolesRef}
            className="hidden md:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-mono tracking-[0.14em] text-white/80 my-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
              <span>TECH CONCLAVES</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
              <span>HACKATHONS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 inline-block flex-shrink-0" />
              <span>RESEARCH MENTORSHIP</span>
            </div>
          </div>

          {/* Hero Join Us chip: hidden on mobile (the navbar already has Join Us) */}
          <div className="hidden md:flex justify-center mt-3 pointer-events-auto">
            <button
              onClick={() => navigate("/team")}
              className="group inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 bg-black/70 hover:bg-white hover:text-black text-white backdrop-blur-md text-xs font-mono tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <span className="font-medium">Join Us ↗</span>
            </button>
          </div>

        </Container>
      </div>


      {/* Subtle bottom fade to seamlessly blend into subsequent sections */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
