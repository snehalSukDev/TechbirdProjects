"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="contact" className="py-36 bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated gradient background overlay */}
      <motion.div
        className="absolute inset-0 animated-gradient-bg opacity-5 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.08]) }}
      />

      {/* Floating orbs — violet / cyan / pink */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Big background text with glitch */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.04]) }}
          className="text-[20vw] font-black text-white leading-none select-none whitespace-nowrap glitch-text"
          data-text="GROW"
        >
          GROW
        </motion.span>
      </div>

      {/* Gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-6">
            Your Competitors Are Already Working With Us
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-white leading-none mb-6">
            Stop Losing Money.
            <br />
            <span className="gradient-text">Start Dominating.</span>
          </h2>

          <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            There are a lot of so-called &apos;agencies&apos; and &apos;gurus&apos; out there.
            Most are all bark, no bite. We let the $7.8 billion in results speak for itself.
          </p>

          {/* Social proof row */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { label: "4.7★ Average Rating", sub: "4,952 reviews" },
              { label: "Results Guaranteed", sub: "Or we don't get paid" },
              { label: "1,067+ Industries", sub: "Battle-tested strategies" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-white font-black text-lg">{item.label}</div>
                <div className="text-white/40 text-sm">{item.sub}</div>
              </div>
            ))}
          </div>

          <motion.a
            href="#"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(6,182,212,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-block animated-gradient-bg text-white font-black text-2xl px-14 py-6 rounded-full pulse-glow shadow-[0_0_60px_rgba(124,58,237,0.3)]"
          >
            Hit the damn button
          </motion.a>

          <p className="text-white/30 text-sm mt-5">
            Free 30-minute strategy session. No obligation. No BS.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
