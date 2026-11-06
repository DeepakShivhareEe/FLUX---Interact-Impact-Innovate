import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DomeGallery from "@/components/ui/DomeGallery/DomeGallery";

gsap.registerPlugin(ScrollTrigger);

import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Camera,
  Layers,
  Tag,
  Users,
  Grid3x3,
  Download,
  Share2,
  Heart,
  Bookmark,
  Trophy,
} from "lucide-react";
import { bytebrawlGalleryData } from "@/data/bytebrawlGalleryData";

// ─── Hero Slider Image Imports ────────────────────────────────────────────────
import slider1 from "@/assets/images/ideathoncomp.webp";
import slider3 from "@/assets/images/expert.webp";
import sliderInduction from "@/assets/Flux Induction 2026/IMG_20260321_123723_394.webp";

// ─── Curated Gallery Images ───────────────────────────────────────────────────
import induction01 from "@/assets/Flux Induction 2026/IMG_20260321_123723_394.webp";
import induction02 from "@/assets/Flux Induction 2026/IMG_20260321_112526_036.webp";
import induction03 from "@/assets/Flux Induction 2026/IMG_20260321_110319_767.webp";
import induction04 from "@/assets/Flux Induction 2026/IMG_20260321_164210_645.webp";
import induction05 from "@/assets/Flux Induction 2026/IMG_20260321_112538_287.webp";
import induction06 from "@/assets/Flux Induction 2026/IMG_20260321_110236_368.webp";
import induction07 from "@/assets/Flux Induction 2026/IMG_20260321_110247_762.webp";
import induction08 from "@/assets/Flux Induction 2026/IMG_20260321_110425_625.webp";
import induction09 from "@/assets/Flux Induction 2026/IMG_20260321_152129_802.webp";
import induction10 from "@/assets/Flux Induction 2026/IMG_20260321_123730_697.webp";

import workshop01 from "@/assets/Expert session/10 October 2025/IMG_20251010_153256.jpg";
import workshop02 from "@/assets/Expert session/10 October 2025/IMG_20251010_144538.jpg";
import workshop03 from "@/assets/Expert session/10 October 2025/IMG_20251010_150932693_HDR.jpg";
import workshop04 from "@/assets/Expert session/10 October 2025/IMG_20251010_144350474_HDR.jpg";
import workshop05 from "@/assets/Expert session/10 October 2025/IMG_20251010_144511.jpg";
import workshop06 from "@/assets/Expert session/10 October 2025/IMG_20251010_150704.jpg";
import workshop07 from "@/assets/Expert session/10 October 2025/IMG_20251010_144952.jpg";
import workshop08 from "@/assets/Expert session/10 October 2025/IMG_20251010_150116.jpg";

import ideathon01 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.55 PM.jpeg";
import ideathon02 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.59 PM (3).jpeg";
import ideathon03 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.59 PM.jpeg";
import ideathon04 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.59 PM (2).jpeg";
import ideathon05 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.57 PM.jpeg";
import ideathon06 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.55 PM (2).jpeg";
import ideathon07 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.59 PM (1).jpeg";
import ideathon08 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.54 PM (2).jpeg";
import ideathon09 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.55 PM (1).jpeg";
import ideathon10 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.56 PM (2).jpeg";
import ideathon11 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.53 PM (2).jpeg";
import ideathon12 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.53 PM (1).jpeg";
import ideathon13 from "@/assets/Ideathon 2025/WhatsApp Image 2026-07-28 at 9.15.53 PM.jpeg";

interface GalleryItem {
  id: string;
  title: string;
  category: "ByteBrawl" | "Events" | "Hackathons" | "Workshops" | "Team" | "Induction" | "Ideathon";
  date: string;
  image: string;
  thumbnail?: string;
  aspect?: "tall" | "wide" | "square";
  filename?: string;
}

// ─── Lazy Image ────────────────────────────────────────────────────────────────
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />
);

const inductionGalleryData: GalleryItem[] = [
  { id: "induction-0",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction01, aspect: "wide" },
  { id: "induction-1",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction02, aspect: "square" },
  { id: "induction-2",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction03, aspect: "tall" },
  { id: "induction-3",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction04, aspect: "square" },
  { id: "induction-4",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction05, aspect: "wide" },
  { id: "induction-5",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction06, aspect: "tall" },
  { id: "induction-6",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction07, aspect: "square" },
  { id: "induction-7",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction08, aspect: "wide" },
  { id: "induction-8",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction09, aspect: "tall" },
  { id: "induction-9",  title: "FLUX Induction 2026", category: "Induction", date: "Mar 2026", image: induction10, aspect: "square" },
];

const workshopGlobGalleryData: GalleryItem[] = [
  { id: "workshop-0", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop01, aspect: "wide" },
  { id: "workshop-1", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop02, aspect: "square" },
  { id: "workshop-2", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop03, aspect: "tall" },
  { id: "workshop-3", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop04, aspect: "square" },
  { id: "workshop-4", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop05, aspect: "wide" },
  { id: "workshop-5", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop06, aspect: "tall" },
  { id: "workshop-6", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop07, aspect: "square" },
  { id: "workshop-7", title: "Expert Session 2025", category: "Workshops", date: "Oct 2025", image: workshop08, aspect: "wide" },
];

const ideathonGalleryData: GalleryItem[] = [
  { id: "ideathon-0",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon01, aspect: "wide" },
  { id: "ideathon-1",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon02, aspect: "square" },
  { id: "ideathon-2",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon03, aspect: "tall" },
  { id: "ideathon-3",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon04, aspect: "square" },
  { id: "ideathon-4",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon05, aspect: "wide" },
  { id: "ideathon-5",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon06, aspect: "tall" },
  { id: "ideathon-6",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon07, aspect: "square" },
  { id: "ideathon-7",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon08, aspect: "wide" },
  { id: "ideathon-8",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon09, aspect: "tall" },
  { id: "ideathon-9",  title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon10, aspect: "square" },
  { id: "ideathon-10", title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon11, aspect: "wide" },
  { id: "ideathon-11", title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon12, aspect: "tall" },
  { id: "ideathon-12", title: "Ideathon 2025", category: "Ideathon", date: "Dec 2025", image: ideathon13, aspect: "square" },
];

const allGalleryData: GalleryItem[] = [
  ...bytebrawlGalleryData,
  ...ideathonGalleryData,
  ...inductionGalleryData,
  ...workshopGlobGalleryData,
];

// ─── DomeGallery image pool (180+ unique images ensuring zero repetitions across all 175 dome slots) ──
const domeGalleryImages: { src: string; alt: string }[] = (() => {
  const result: { src: string; alt: string }[] = [];
  const otherItems = [
    ...inductionGalleryData,
    ...workshopGlobGalleryData,
    ...ideathonGalleryData,
  ];

  let otherIdx = 0;
  let bbIdx = 0;

  // Interleave other categories with ByteBrawl photos to produce 180 unique tiles
  while (result.length < 180 && (bbIdx < bytebrawlGalleryData.length || otherIdx < otherItems.length)) {
    if (result.length % 5 === 1 && otherIdx < otherItems.length) {
      const item = otherItems[otherIdx++];
      result.push({ src: item.thumbnail || item.image, alt: item.title || item.category });
    } else if (bbIdx < bytebrawlGalleryData.length) {
      const item = bytebrawlGalleryData[bbIdx++];
      result.push({ src: item.thumbnail || item.image, alt: item.title || item.category });
    } else if (otherIdx < otherItems.length) {
      const item = otherItems[otherIdx++];
      result.push({ src: item.thumbnail || item.image, alt: item.title || item.category });
    }
  }

  return result;
})();

// ─── Constants ─────────────────────────────────────────────────────────────────
const categories = ["All", "ByteBrawl", "Ideathon", "Workshops", "Induction"] as const;
const ITEMS_PER_PAGE = 60;

const categoryMeta: Record<
  (typeof categories)[number],
  { icon: React.ReactNode; color: string; gradient: string }
> = {
  All:       { icon: <Layers      size={14} />, color: "#E5E5E5", gradient: "from-white/20 to-gray-400/20" },
  ByteBrawl: { icon: <Trophy      size={14} />, color: "#F59E0B", gradient: "from-amber-400/20 to-yellow-600/20" },
  Ideathon:  { icon: <Sparkles    size={14} />, color: "#E5E5E5", gradient: "from-white/20 to-gray-400/20" },
  Workshops: { icon: <Tag         size={14} />, color: "#E5E5E5", gradient: "from-white/20 to-gray-400/20" },
  Induction: { icon: <Users       size={14} />, color: "#FFFFFF", gradient: "from-white/30 to-gray-300/30" },
};

const heroSliderData = [
  { id: 's1', image: slider1, title: 'FLUX Ideathon', subtitle: 'The Flagship Event', tag: 'Hackathon' },
  { id: 's2', image: slider3, title: 'Expert Sessions', subtitle: 'Industry Insights & Networking', tag: 'Workshop' },
  { id: 's3', image: sliderInduction, title: 'Induction 2026', subtitle: 'Welcoming the Freshmen', tag: 'Induction' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GalleryPage({ isMobile }: { isMobile?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex]       = useState<number | null>(null);
  const [visibleCount, setVisibleCount]         = useState(ITEMS_PER_PAGE);
  const [isGridView, setIsGridView]             = useState<"masonry" | "grid">("masonry");
  const [likedItems, setLikedItems]             = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems]             = useState<Set<string>>(new Set());
  const containerRef   = useRef<HTMLDivElement>(null);
  const loadMoreRef    = useRef<HTMLDivElement>(null);
  const thumbStripRef  = useRef<HTMLDivElement>(null);

  // ── Hero Slider ─────────────────────────────────────────────────────────────
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlideIndex(p => (p + 1) % heroSliderData.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? allGalleryData
        : allGalleryData.filter(item => item.category === selectedCategory),
    [selectedCategory]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allGalleryData.length };
    for (const cat of categories) {
      if (cat !== "All")
        counts[cat] = allGalleryData.filter(i => i.category === cat).length;
    }
    return counts;
  }, []);

  // ── Reset on filter change ──────────────────────────────────────────────────
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory]);

  // ── IntersectionObserver for load-more ─────────────────────────────────────
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const el = loadMoreRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount(c => c + ITEMS_PER_PAGE);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visibleItems.length]);

  // ── Lightbox helpers ────────────────────────────────────────────────────────
  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex(c =>
        c === null ? null : c === 0 ? filteredItems.length - 1 : c - 1
      );
    },
    [filteredItems.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex(c =>
        c === null ? null : c === filteredItems.length - 1 ? 0 : c + 1
      );
    },
    [filteredItems.length]
  );

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      setLightboxIndex(null);
      if (e.key === "ArrowLeft")   handlePrev();
      if (e.key === "ArrowRight")  handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, handlePrev, handleNext]);

  // Scroll lightbox thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (lightboxIndex === null || !thumbStripRef.current) return;
    const strip = thumbStripRef.current;
    const active = strip.children[lightboxIndex] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [lightboxIndex]);

  // ── ScrollTrigger refresh ──────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [visibleItems.length, selectedCategory]);

  // Aspect-ratio helper for masonry
  const aspectClass = (aspect?: string) => {
    if (aspect === "tall")   return "aspect-[3/4]";
    if (aspect === "wide")   return "aspect-[16/9]";
    if (aspect === "square") return "aspect-[1/1]";
    return "aspect-[4/3]";
  };

  // ── Interactive handlers ────────────────────────────────────────────────────
  const toggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const toggleSave = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#020202] text-white pt-24 pb-20
        px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Ambient blobs */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
          bg-white/5 blur-[120px] pointer-events-none rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-[400px] h-[400px]
          bg-white/5 blur-3xl pointer-events-none rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Modern Page Header ───────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Camera size={14} className="text-white/80" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
              Moments & Memories
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white mb-4"
          >
             FLUX <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-300">
              GALLERY
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
          >
            Hackathons, workshops, inductions, and campus innovation — captured in one visual archive.
          </motion.p>
        </div>

        {/* ── DomeGallery Hero ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="card-outline relative w-full mx-auto h-[350px] sm:h-[500px] lg:h-[600px] mb-12
            rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
        >
          <DomeGallery
            images={domeGalleryImages}
            overlayBlurColor="#020202"
            grayscale={false}
            fit={0.55}
            minRadius={500}
            padFactor={0.2}
            imageBorderRadius="16px"
            openedImageBorderRadius="24px"
            openedImageWidth="450px"
            openedImageHeight="450px"
            dragSensitivity={18}
            segments={35}
          />
        </motion.div>

        {/* ── Category Filters ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 p-1.5 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              const meta = categoryMeta[cat];
              return (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    color: isActive ? "#000" : "#a1a1aa",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCatBg"
                      className="absolute inset-0 rounded-[16px] shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      style={{ background: meta.color }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {meta.icon}
                    {cat}
                    <span
                      className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                      style={{
                        background: isActive ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)",
                        color: isActive ? "#000" : "#a1a1aa",
                      }}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsGridView("masonry")}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isGridView === "masonry" 
                  ? "bg-white/10 border-white/30 text-white" 
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3x3 size={18} />
            </motion.button>
            <motion.button
              onClick={() => setIsGridView("grid")}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isGridView === "grid" 
                  ? "bg-white/10 border-white/30 text-white" 
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Masonry Gallery Grid ─────────────────────────────────────────── */}
        <motion.div
          layout
          className="gap-4 sm:gap-5"
          style={{
            columns: isMobile ? 2 : isGridView === "masonry" ? "3" : "repeat(auto-fill, minmax(280px, 1fr))",
            columnGap: "20px",
          }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid mb-4 sm:mb-5"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: "easeOut" }}
              layout
            >
              <motion.div
                onClick={() => setLightboxIndex(index)}
                className="card-outline group relative rounded-3xl overflow-hidden bg-[#020202]
                  border border-white/5 hover:border-white/30
                  transition-all duration-500 cursor-pointer shadow-lg
                  hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <div className={`relative w-full overflow-hidden bg-black/40 ${aspectClass(item.aspect)}`}>
                  <LazyImage
                    src={item.thumbnail || item.image}
                    alt={item.category}
                    className="w-full h-full object-cover object-center
                      group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent 
                    opacity-60 group-hover:opacity-90 transition-opacity duration-400" />

                  {/* Hover reveal: clean icon and category overlay */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-5
                      opacity-0 group-hover:opacity-100 transition-all duration-400
                      translate-y-4 group-hover:translate-y-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/80 text-[11px] font-bold uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white
                        flex items-center justify-center border border-white/20 shrink-0
                        group-hover:bg-[#E5E5E5] group-hover:text-black transition-colors duration-300">
                        <ZoomIn size={18} />
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                      <motion.button
                        onClick={(e) => toggleLike(e, item.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          likedItems.has(item.id) 
                            ? "bg-white/20 text-white" 
                            : "bg-white/5 text-white/60 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={14} fill={likedItems.has(item.id) ? "currentColor" : "none"} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => toggleSave(e, item.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          savedItems.has(item.id) 
                            ? "bg-white/20 text-white" 
                            : "bg-white/5 text-white/60 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark size={14} fill={savedItems.has(item.id) ? "currentColor" : "none"} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Load More Sentinel ───────────────────────────────────────────── */}
        {hasMore && (
          <div ref={loadMoreRef} className="mt-12 flex justify-center pb-10">
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 text-white text-sm font-medium backdrop-blur-md"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#E5E5E5]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Loading amazing moments...
            </motion.div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-24 text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Camera size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">No photos found in this category.</p>
          </motion.div>
        )}

      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeItem !== null && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col
              items-center justify-center p-4 sm:p-6 lg:p-10 select-none"
          >
            {/* Close */}
            <motion.button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-3.5 rounded-full
                bg-white/10 hover:bg-[#E5E5E5] text-white hover:text-black
                transition-all duration-300 border border-white/20 backdrop-blur-md"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Prev */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full
                bg-white/5 hover:bg-[#E5E5E5] text-white hover:text-black backdrop-blur-md
                border border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={28} />
            </motion.button>

            {/* Next */}
            <motion.button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full
                bg-white/5 hover:bg-[#E5E5E5] text-white hover:text-black backdrop-blur-md
                border border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={28} />
            </motion.button>

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#020202] rounded-[32px] overflow-hidden
                border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]
                flex flex-col max-h-[85vh]"
            >
              {/* Main image */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black/50 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <LazyImage
                      src={activeItem.image}
                      alt={activeItem.category}
                      className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info strip */}
              <div className="px-6 py-5 bg-gradient-to-t from-[#020202] to-transparent
                border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E5E5E5]">
                    {activeItem.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </div>
                  <motion.button 
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => window.open(activeItem.image, "_blank")}
                    title="Open high-resolution original in new tab"
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button 
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(activeItem.image);
                      }
                    }}
                    title="Copy image link"
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                ref={thumbStripRef}
                className="flex gap-3 p-4 bg-[#020202] overflow-x-auto border-t border-white/5"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    onClick={e => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 relative cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <LazyImage src={item.thumbnail || item.image} alt={item.category} className="w-full h-full object-cover" />
                    <motion.div 
                      className={`absolute inset-0 transition-colors duration-300 ${idx === lightboxIndex ? 'border-2 border-[#E5E5E5] bg-transparent' : 'bg-black/50 hover:bg-black/20'}`}
                      animate={idx === lightboxIndex ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
