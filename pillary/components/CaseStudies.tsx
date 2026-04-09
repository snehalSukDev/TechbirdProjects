"use client";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const industryColors: Record<string, string> = {
  "Food & Health": "#06B6D4",
  "Home Building": "#7C3AED",
  "Aged Care": "#EC4899",
  "Fashion & Retail": "#06B6D4",
  Education: "#7C3AED",
  Agriculture: "#EC4899",
  "Home Services": "#06B6D4",
  "Trade Services": "#7C3AED",
  Energy: "#EC4899",
  Services: "#06B6D4",
  Heritage: "#7C3AED",
  Furniture: "#EC4899",
  "Real Estate": "#06B6D4",
  "Office Furniture": "#7C3AED",
  Tourism: "#EC4899",
  Finance: "#06B6D4",
  "Pest Control": "#7C3AED",
};

const caseStudies = [
  { name: "My Muscle Chef", result: "300% revenue increase in 12 months", industry: "Food & Health" },
  { name: "Metricon", result: "Leads! Leads! Leads! Outstanding results", industry: "Home Building" },
  { name: "Let's Get Care", result: "$4M to $25M+ in 18 months", industry: "Aged Care" },
  { name: "New Sensation Homes", result: "$0 to $18M in 18 months (during recession)", industry: "Home Building" },
  { name: "Original UGG Australia", result: "Doubled in staff numbers", industry: "Fashion & Retail" },
  { name: "Gold Key Homes", result: "$3M to $50M in 12 months", industry: "Home Building" },
  { name: "Breathe Education", result: "Tripled sales, expanded to 3 states", industry: "Education" },
  { name: "Little Big Dairy", result: "Cold-calling to 200 new customers in 12 months", industry: "Agriculture" },
  { name: "Enso Homes", result: "Target: 8 sales. Actual: 23 sales = $7M revenue", industry: "Home Building" },
  { name: "Ultimate Windows", result: "3 weeks booked to 6 months in advance", industry: "Home Services" },
  { name: "Fisher Roofing", result: "Generated 95-100 closed jobs", industry: "Trade Services" },
  { name: "Polaron", result: "$2M+ generated since partnering", industry: "Energy" },
  { name: "NSR Australia", result: "Astronomical growth, transformed our lives", industry: "Services" },
  { name: "Scotland Titles", result: "International expansion success", industry: "Heritage" },
  { name: "Koala", result: "Explosive digital growth campaign", industry: "Furniture" },
  { name: "Purple Bricks", result: "Market penetration and brand awareness", industry: "Real Estate" },
  { name: "Hurdleys Office", result: "50% revenue increase", industry: "Office Furniture" },
  { name: "Discover Stradbroke", result: "35-40% revenue increase", industry: "Tourism" },
  { name: "Aged Care Financial", result: "49% increase in leads after 18 months", industry: "Finance" },
  { name: "Moxie Pest Control", result: "Dominant market leader in their region", industry: "Pest Control" },
];

const allIndustries = [
  "All",
  ...Array.from(new Set(caseStudies.map((c) => c.industry))),
];

// ─── Success story card data ───────────────────────────────────────────────────

const successStories = [
  {
    name: "Insurance Solutions Australia",
    industry: "Insurance",
    accentColor: "#7C3AED",
    bg: "linear-gradient(160deg, #0f0520 0%, #1a083a 100%)",
  },
  {
    name: "Masseuse Massage",
    industry: "Health & Wellness",
    accentColor: "#EC4899",
    bg: "linear-gradient(160deg, #1a0020 0%, #3a0840 100%)",
  },
  {
    name: "Let's Get Cars",
    industry: "Automotive",
    accentColor: "#06B6D4",
    bg: "linear-gradient(160deg, #001a2a 0%, #00304a 100%)",
  },
  {
    name: "Glenvill Homes",
    industry: "Real Estate",
    accentColor: "#7C3AED",
    bg: "linear-gradient(160deg, #081a00 0%, #143800 100%)",
  },
  {
    name: "Human Training",
    industry: "Education",
    accentColor: "#EC4899",
    bg: "linear-gradient(160deg, #1a0808 0%, #3a1008 100%)",
  },
];

// Card config: base height/width and final expanded dimensions, plus rotation
const cardConfigs = [
  { initH: 200, fullH: 290, initW: 145, fullW: 195, rotate: -5, yOffset: 30 },
  { initH: 215, fullH: 315, initW: 155, fullW: 210, rotate: -2, yOffset: 15 },
  { initH: 230, fullH: 345, initW: 165, fullW: 228, rotate: 0, yOffset: 0 },
  { initH: 215, fullH: 315, initW: 155, fullW: 210, rotate: 2, yOffset: 15 },
  { initH: 200, fullH: 290, initW: 145, fullW: 195, rotate: 5, yOffset: 30 },
];

// ─── Individual success card (hooks called per-component, not in a loop) ──────

function SuccessCard({
  story,
  config,
  scrollYProgress,
  isInView,
  index,
}: {
  story: (typeof successStories)[0];
  config: (typeof cardConfigs)[0];
  scrollYProgress: MotionValue<number>;
  isInView: boolean;
  index: number;
}) {
  const rawH = useTransform(scrollYProgress, [0, 1], [config.initH, config.fullH]);
  const rawW = useTransform(scrollYProgress, [0, 1], [config.initW, config.fullW]);
  const cardH = useSpring(rawH, { stiffness: 55, damping: 18 });
  const cardW = useSpring(rawW, { stiffness: 55, damping: 18 });

  return (
    <motion.div
      style={{
        height: cardH,
        width: cardW,
        rotate: config.rotate,
        y: config.yOffset,
        background: story.bg,
      }}
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: config.yOffset, scale: 1 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        y: config.yOffset - 10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
    >
      {/* Phone notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/50 rounded-full z-10" />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-25"
        style={{
          background: `linear-gradient(225deg, ${story.accentColor}, transparent)`,
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 opacity-20"
        style={{
          background: `linear-gradient(to top, ${story.accentColor}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-3 flex flex-col justify-between pt-6">
        <div
          className="inline-block self-start text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: story.accentColor + "30", color: story.accentColor }}
        >
          {story.industry}
        </div>
        <div>
          <p className="text-white font-black text-[11px] leading-tight mb-2">
            {story.name}
          </p>
          <div
            className="w-5 h-0.5 rounded"
            style={{ background: story.accentColor }}
          />
        </div>
      </div>

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${story.accentColor}, transparent)` }}
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.7 }}
      />
    </motion.div>
  );
}

// ─── Success stories strip ────────────────────────────────────────────────────

function SuccessStoriesStrip() {
  const stripRef = useRef(null);
  const isInView = useInView(stripRef, { once: false, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "center center"],
  });

  return (
    <section
      ref={stripRef}
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#7C3AED]/6 rounded-full blur-[140px]" />
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Success Stories
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            BECOME OUR NEXT
            <br />
            <span className="gradient-text">SUCCESS STORY</span>
          </h2>
        </motion.div>

        {/* Cards strip — expand on scroll */}
        <div className="flex items-end justify-center gap-4 overflow-visible py-4">
          {successStories.map((story, i) => (
            <SuccessCard
              key={story.name}
              story={story}
              config={cardConfigs[i]}
              scrollYProgress={scrollYProgress}
              isInView={isInView}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 50px rgba(124,58,237,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            className="animated-gradient-bg text-white font-black text-lg px-12 py-5 rounded-full pulse-glow tracking-widest uppercase"
          >
            Hit The Damn Button
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Case study card ──────────────────────────────────────────────────────────

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = industryColors[study.industry] ?? "#7C3AED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.07 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer bg-white border border-gray-200 group shadow-sm hover:shadow-md"
      style={{ aspectRatio: "4/3" }}
    >
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at bottom right, ${color}, transparent 60%)` }}
      />
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div>
          <div
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{ background: color + "22", color }}
          >
            {study.industry}
          </div>
          <h3 className="text-gray-900 font-black text-lg leading-tight">{study.name}</h3>
        </div>
        <AnimatePresence>
          {hovered ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="backdrop-blur-sm"
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{study.result}&rdquo;
              </p>
              <span className="text-xs font-bold" style={{ color }}>
                View Case Study →
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-8 h-0.5 rounded" style={{ background: color }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ background: `linear-gradient(225deg, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Main CaseStudies export ──────────────────────────────────────────────────

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filtered =
    activeIndustry === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === activeIndustry);

  const visible = showAll ? filtered : filtered.slice(0, 8);

  return (
    <>
      {/* ── Success Stories Strip ── */}
      <SuccessStoriesStrip />

      {/* ── Case Studies Grid ── */}
      <section ref={ref} id="case-studies" className="py-28 bg-[#f4f4f5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-4">
              Real Clients. Real Results.
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Case Studies That{" "}
              <span className="gradient-text">Speak For Themselves</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Don&apos;t take our word for it. Here are just a few of our
              clients&apos; success stories — results we&apos;ve generated
              across 1,067+ industries.
            </p>
          </motion.div>

          {/* Industry filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-10 mb-6"
          >
            {allIndustries.slice(0, 8).map((ind) => (
              <button
                key={ind}
                onClick={() => {
                  setActiveIndustry(ind);
                  setShowAll(false);
                }}
                className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  color: activeIndustry === ind ? "#fff" : "rgba(55,65,81,0.7)",
                  background: activeIndustry === ind ? "#7C3AED" : "transparent",
                  border: `1px solid ${activeIndustry === ind ? "#7C3AED" : "rgba(0,0,0,0.15)"}`,
                }}
              >
                {activeIndustry === ind && (
                  <motion.span
                    layoutId="industryUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#06B6D4] rounded"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {ind}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            <AnimatePresence mode="popLayout">
              {visible.map((study, i) => (
                <CaseStudyCard key={study.name} study={study} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Show more */}
          {!showAll && filtered.length > 8 && (
            <div className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#7C3AED]/50 hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 text-gray-800 hover:text-[#7C3AED] font-bold px-10 py-4 rounded-full transition-all"
              >
                Show All {filtered.length} Case Studies
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
