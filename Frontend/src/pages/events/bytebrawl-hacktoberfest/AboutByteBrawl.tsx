import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Terminal, Zap } from "lucide-react";
import Container from "@/components/layout/Container";

export default function AboutByteBrawl() {
  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: "Architectural Resilience",
      desc: "Code that does not fail when pushed to limits. Your systems will be tested for reliability, error boundaries, and elegant degradation under load.",
    },
    {
      icon: <Terminal className="w-5 h-5 text-white" />,
      title: "Production-Grading Constraints",
      desc: "Submissions undergo automated test suites, concurrency checks, and clean API contract validation — just like senior engineers ship to production.",
    },
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      title: "Rapid Implementation",
      desc: "Turn concepts into functional, hardened prototypes in hours. Speed meets technical rigor without cutting architectural corners.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: "CSE Ecosystem Excellence",
      desc: "Mentored and evaluated by senior builders and faculty from the Department of Computer Science & Engineering, MMMUT Gorakhpur.",
    },
  ];

  return (
    <section id="about-bytebrawl" className="relative py-24 sm:py-32 bg-[#0a0a0a] text-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-6">
            Where Code Meets{" "}
            <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-white/90">
              resilience
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            ByteBrawl is a high-intensity competitive coding showdown where architectural resilience meets rapid implementation under strict production-grading constraints. Organized by <strong className="text-white font-medium">FLUX</strong>, Department of Computer Science & Engineering, <strong className="text-white font-medium">MMMUT Gorakhpur</strong>, ByteBrawl is built for developers who take pride in shipping robust, production-ready software.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 sm:p-7 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-md hover:border-white/25 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg border border-white/15 bg-white/[0.05] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-2.5">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
