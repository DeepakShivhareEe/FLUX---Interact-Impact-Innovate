import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ByteBrawlHero from "./ByteBrawlHero";
import ByteBrawlWinnersLeaderboard from "./ByteBrawlWinnersLeaderboard";
import PaintEdgeDivider from "@/components/ui/PaintEdgeDivider";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

interface ByteBrawlPageProps {
  isMobile?: boolean;
}

export default function ByteBrawlPage({ isMobile: _isMobile }: ByteBrawlPageProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(!BYTEBRAWL_CONFIG.isRegistrationClosed);

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

    </div>
  );
}
