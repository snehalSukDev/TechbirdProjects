"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ticker = [
  "Proven Funnels",
  "Scientific Acquisition",
  "Done-For-You Growth",
  "Battle-Tested Frameworks",
  "200K+ Success Stories",
  "7-Figure Playbooks",
  "Guaranteed Results",
  "Zero Guesswork",
];

const barHeights = [30, 52, 40, 68, 55, 80, 62, 90];

function SparklineBars({ inView }: { inView: boolean }) {
  return (
    <div className="flex items-end gap-1.5 h-16">
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-4 rounded-t-md bg-gradient-to-t from-[#7C3AED] to-[#06B6D4]"
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: h, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.06, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function ProgressRing({ inView }: { inView: boolean }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="88" height="88" className="-rotate-90">
      <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
      <motion.circle
        cx="44" cy="44" r={r}
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ * 0.1 } : {}}
        transition={{ duration: 1.4, delay: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function ValueProp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floatY1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      className="relative -mt-[150px] overflow-hidden"
      style={{ clipPath: "polygon(0% 150px, 100% 0%, 100% calc(100% - 150px), 0% 100%)" }}
    >
      <div className="py-28 bg-[#f8f4ee] relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)", y: floatY1 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", y: floatY2 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-20 h-20 opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", y: floatY1 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-6xl mx-auto px-6 pt-12 pb-4">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center text-sm font-bold tracking-[0.25em] text-[#7C3AED] uppercase mb-10"
          >
            Why Choose Pillary
          </motion.p>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* ── Main Hero Tile (spans 2 cols) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              whileHover={{ boxShadow: "0 24px 64px rgba(124,58,237,0.12)" }}
              className="md:col-span-2 bg-white rounded-3xl p-10 relative overflow-hidden border border-gray-100 shadow-md"
            >
              {/* Animated gradient sweep */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "linear-gradient(120deg, rgba(124,58,237,0.04), rgba(6,182,212,0.04), rgba(236,72,153,0.04))", backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Thin gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#EC4899]" />

              <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <motion.h2
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4"
                >
                  Grow <span className="gradient-text">10X Faster</span>,{" "}
                  <span className="gradient-text">Better</span>,{" "}
                  <span className="gradient-text">Smarter</span>.
                </motion.h2>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="text-gray-500 text-lg mb-8 max-w-xl"
                >
                  For the very first time — grow your business with proven client-getting funnels, frameworks and scientific customer acquisition (not hopes and prayers).
                </motion.p>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block animated-gradient-bg text-white font-black text-lg px-10 py-4 rounded-full pulse-glow"
                  >
                    Hit the damn button
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Sparkline in bottom-right */}
              <div className="absolute bottom-8 right-8 opacity-60">
                <SparklineBars inView={inView} />
              </div>
            </motion.div>

            {/* ── Right column: 2 stacked tiles ── */}
            <div className="flex flex-col gap-4">

              {/* ROI Metric Tile */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(124,58,237,0.3)" }}
                className="flex-1 bg-[#0f0520] rounded-3xl p-7 relative overflow-hidden"
              >
                {/* Glow blob */}
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#7C3AED]/30 rounded-full blur-2xl pointer-events-none" />
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 60%)" }}
                />
                <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">Avg. Client ROI</p>
                <motion.div
                  className="text-5xl font-black gradient-text leading-none mb-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  847%
                </motion.div>
                <p className="text-white/40 text-xs mt-1">Across all active clients</p>
                {/* Animated pulse dot */}
                <div className="flex items-center gap-1.5 mt-4">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#4ADE80]"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[#4ADE80] text-xs font-semibold">Live tracking</span>
                </div>
              </motion.div>

              {/* 90-Day Results Tile */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(124,58,237,0.35)" }}
                className="flex-1 animated-gradient-bg rounded-3xl p-7 relative overflow-hidden"
              >
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">Results In</p>
                    <div className="text-4xl font-black text-white leading-none">90 Days</div>
                    <p className="text-white/60 text-xs mt-2">Guaranteed or we work free</p>
                  </div>
                  <div className="relative">
                    <ProgressRing inView={inView} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-black text-sm">90%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ── Marquee ticker ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm py-4 mb-10"
          >
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...ticker, ...ticker].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2.5 text-sm font-bold text-gray-500">
                  <span className="text-[#7C3AED]">✦</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
