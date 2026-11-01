import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ByteBrawlHero from "./ByteBrawlHero";
import ByteBrawlWinnersLeaderboard from "./ByteBrawlWinnersLeaderboard";
import AboutByteBrawl from "./AboutByteBrawl";
import AboutHacktoberfest from "./AboutHacktoberfest";
import RulesAndFAQ from "./RulesAndFAQ";
import PaintEdgeDivider from "@/components/ui/PaintEdgeDivider";
import Container from "@/components/layout/Container";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

interface ByteBrawlPageProps {
  isMobile?: boolean;
}

export default function ByteBrawlPage({ isMobile: _isMobile }: ByteBrawlPageProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(!BYTEBRAWL_CONFIG.isRegistrationClosed);
  const isRegistrationOpen = isOpen && !BYTEBRAWL_CONFIG.isRegistrationClosed;

  // Check event status on mount
  useEffect(() => {
    let isMounted = true;
    fetch("/api/events/bytebrawl-hacktoberfest/status")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.open === "boolean") {
          setIsOpen(data.open);
        }
      })
      .catch((err) => {
        console.warn("Could not query server status; defaulting to local config:", err);
        const isClosedLocally = BYTEBRAWL_CONFIG.isRegistrationClosed || new Date() > new Date(BYTEBRAWL_CONFIG.registrationDeadline);
        setIsOpen(!isClosedLocally);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGoToRegister = () => {
    navigate("/events/bytebrawl-hacktoberfest/register");
  };

  return (
    <div className="relative min-h-screen bg-[#060606] text-white selection:bg-white selection:text-black overflow-x-clip">
      
      {/* 1. Hero Section */}
      <ByteBrawlHero onRegisterClick={handleGoToRegister} isOpen={isOpen} />

      {/* Paint Edge Divider */}
      <PaintEdgeDivider topColor="#060606" bottomColor="#080808" />

      {/* 2. Official Results & Round 2 Problem Statement Allotments */}
      <ByteBrawlWinnersLeaderboard />

      {/* Paint Edge Divider */}
      <PaintEdgeDivider topColor="#080808" bottomColor="#0a0a0a" flip />

      {/* 3. About ByteBrawl Section */}
      <AboutByteBrawl />

      {/* Paint Edge Divider */}
      <PaintEdgeDivider topColor="#0a0a0a" bottomColor="#080808" flip />

      {/* 3. About Hacktoberfest Section (Accurate 2026 Theme) */}
      <AboutHacktoberfest />

      {/* Paint Edge Divider */}
      <PaintEdgeDivider topColor="#080808" bottomColor="#090909" flip />

      {/* 4. Rules & Directives + FAQ Accordion */}
      <RulesAndFAQ />

      {/* Paint Edge Divider */}
      <PaintEdgeDivider topColor="#090909" bottomColor="#0a0a0a" />

      {/* 6. Registration Gateway Section */}
      <section id="registration-section" className="relative py-20 sm:py-28 bg-[#0a0a0a] text-white">
        <Container>
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/15 bg-[#111111]/90 backdrop-blur-xl p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] mb-5">
              <span className={`w-2 h-2 rounded-full ${isRegistrationOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-300">
                // {isRegistrationOpen ? "REGISTRATIONS OPEN" : "REGISTRATIONS CLOSED"} //
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
              {isRegistrationOpen ? (
                <>
                  Secure Your{" "}
                  <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-white/90">
                    slot
                  </span>
                </>
              ) : (
                <>
                  Registration{" "}
                  <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-white/90">
                    closed
                  </span>
                </>
              )}
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              {isRegistrationOpen
                ? "Registrations are open for MMMUT students. Pick Team of 2 or Individual format to compete under strict production-grading constraints."
                : "Registrations for ByteBrawl x Hacktoberfest are now officially closed. All registered teams will receive further instructions via their registered email."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isRegistrationOpen ? (
                <Link
                  to="/events/bytebrawl-hacktoberfest/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-neutral-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300 cursor-pointer"
                >
                  <span>Proceed to Registration Form</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-neutral-900 border border-white/20 text-neutral-400 font-mono text-xs uppercase tracking-widest font-semibold cursor-not-allowed select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
                  <span>Registration Closed</span>
                </div>
              )}
            </div>

            <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider mt-6">
              One registration per participant. Database transaction secured by FLUX.
            </p>
          </div>
        </Container>
      </section>

    </div>
  );
}
