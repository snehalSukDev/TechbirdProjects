"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

// ─── Continent paths (same seamless loop) ─────────────────────────────────────
const continentPaths = [
  "M10,60 L52,52 L90,60 L102,80 L94,125 L72,162 L48,180 L20,176 L4,155 L0,115 L3,80Z",
  "M32,205 L72,198 L105,210 L112,240 L106,290 L88,338 L65,355 L40,342 L22,308 L18,260 L22,222Z",
  "M158,46 L200,38 L232,46 L242,64 L230,86 L205,98 L170,92 L153,74Z",
  "M150,108 L202,98 L255,112 L268,140 L264,202 L245,258 L218,298 L192,305 L163,280 L147,238 L143,182 L147,138Z",
  "M238,112 L275,105 L280,125 L268,158 L245,168 L232,150 L233,125Z",
  "M222,38 L318,25 L385,32 L400,45 L400,110 L380,125 L342,135 L302,126 L258,112 L225,98 L215,72 L218,48Z",
  "M276,130 L320,122 L342,138 L338,172 L318,192 L293,185 L274,162Z",
  "M340,130 L398,118 L400,148 L362,158 L340,145Z",
  "M328,242 L390,232 L400,248 L400,288 L385,305 L355,312 L328,295 L320,268Z",
];

const glowDots = [
  { top: "36%", left: "30%", delay: 0 },
  { top: "45%", left: "52%", delay: 0.6 },
  { top: "28%", left: "62%", delay: 1.1 },
  { top: "55%", left: "42%", delay: 0.3 },
  { top: "38%", left: "72%", delay: 1.5 },
  { top: "62%", left: "22%", delay: 0.9 },
];

// ─── Rotating Earth — light green theme ───────────────────────────────────────
function RotatingEarth({ inView }: { inView: boolean }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const globeY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ y: globeY, width: 560, height: 560 }}
      className="relative mx-auto"
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Subtle outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 80px rgba(100,170,90,0.18)" }}
      />

      {/* Globe sphere */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 35% 32%, #f8fbf6 0%, #e2f0dc 50%, #cce5c4 100%)",
        }}
      >
        {/* Rotating continent map */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ width: "200%" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {continentPaths.map((d, i) => (
              <path key={`l${i}`} d={d} fill="rgba(80,130,75,0.45)" />
            ))}
            <g transform="translate(400,0)">
              {continentPaths.map((d, i) => (
                <path key={`r${i}`} d={d} fill="rgba(80,130,75,0.45)" />
              ))}
            </g>
            {[80, 160, 200, 240, 320].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="800"
                y2={y}
                stroke="rgba(80,130,75,0.12)"
                strokeWidth="0.8"
              />
            ))}
          </svg>
        </motion.div>

        {/* Sphere shading — soft */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.5) 0%, transparent 48%), radial-gradient(circle at 68% 68%, rgba(0,0,0,0.06) 0%, transparent 55%)",
          }}
        />
        {/* Subtle atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "inset 0 0 40px rgba(100,160,90,0.15)" }}
        />
      </div>

      {/* Pulsing rings around the globe */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 rounded-full border border-[#5a9455]/20 pointer-events-none"
          animate={{ scale: [1, 1.08 + ring * 0.06, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: ring * 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Green glow dots */}
      {glowDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ top: dot.top, left: dot.left, backgroundColor: "#5a9455" }}
          animate={{
            opacity: [0.9, 0.3, 0.9],
            scale: [1, 2.2, 1],
            boxShadow: [
              "0 0 6px #5a9455",
              "0 0 16px #5a9455",
              "0 0 6px #5a9455",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── Stat Card — clean white card with green accent line ──────────────────────
function StatCard({
  prefix = "",
  value,
  suffix = "",
  label,
  description,
  delay,
  started,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  delay: number;
  started: boolean;
}) {
  const count = useCountUp(value, 2200, started);

  const display =
    value >= 1_000_000_000
      ? (count / 1_000_000_000).toFixed(1)
      : value >= 1_000_000
        ? (count / 1_000_000).toFixed(0)
        : value >= 1_000
          ? count.toLocaleString()
          : count;

  const unit = value >= 1_000_000_000 ? "B" : value >= 1_000_000 ? "M" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(90,148,85,0.2)" }}
      className="bg-white rounded-2xl p-7 shadow-md cursor-default"
    >
      <p className="text-gray-700 font-semibold text-sm mb-2">{label}</p>
      <div className="w-8 h-[3px] bg-[#5a9455] rounded mb-5" />
      <motion.div
        className="text-5xl font-black text-[#1a5228] mb-3 leading-none"
        animate={started ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 0.4, delay: delay + 2.2 }}
      >
        {prefix}{display}{unit}{suffix}
      </motion.div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const stats = [
  {
    prefix: "$",
    value: 7_800_000_000,
    suffix: "",
    label: "Revenue Generated",
    description:
      "We let our numbers do the talking. $7.8 Billion in reported client revenue and counting.",
  },
  {
    prefix: "",
    value: 200_000,
    suffix: "",
    label: "Size Of Our Platform",
    description:
      "200,000 customers and counting make up our diverse and ever growing platform.",
  },
  {
    prefix: "",
    value: 136,
    suffix: "",
    label: "Our Reach",
    description: "Serving customers in over 136 different countries.",
  },
  {
    prefix: "",
    value: 1067,
    suffix: "",
    label: "Battle Tested",
    description:
      "Our strategies have been battle tested in over 1067 different industries and niches.",
  },
];

// ─── Stats Section ─────────────────────────────────────────────────────────────
export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative -mt-[150px] overflow-hidden"
      style={{
        clipPath: "polygon(0% 150px, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="pt-40 pb-24 bg-[#edf7e8]">
        {/* Sweeping gradient animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(90,148,85,0.08) 0%, transparent 60%)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle wave bg shape */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(200,230,195,0.4), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-[#5a9455] text-sm font-bold tracking-[0.3em] uppercase mb-4">
              The Numbers Don&apos;t Lie
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900">
              Marketers lie.{" "}
              <span className="text-[#2d7a2d]">Numbers don&apos;t.</span>
            </h2>
          </motion.div>

          {/* Globe — large, centered, overlapping cards */}
          <div className="flex justify-center mb-[-284px] relative z-0">
            <RotatingEarth inView={inView} />
          </div>

          {/* Stat cards — 4 in a row, float in front of globe bottom */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={i * 0.12}
                started={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
