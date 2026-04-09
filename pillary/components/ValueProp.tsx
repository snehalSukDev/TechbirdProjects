"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ValueProp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const slideVariants = (direction: "left" | "right") => ({
    hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
    show: { opacity: 1, x: 0 },
  });

  return (
    <section
      ref={ref}
      className="relative -mt-[150px] overflow-hidden"
      style={{
        clipPath:
          "polygon(0% 150px, 100% 0%, 100% calc(100% - 150px), 0% 100%)",
      }}
    >
      <div className="py-28 bg-[#f8f4ee]">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Floating decorative shapes */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-5 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #06B6D4, transparent)",
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 opacity-5 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #EC4899, transparent)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-4xl mx-auto px-6 pt-8 pb-8">
          {/* Big CTA text with animated gradient border */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 p-8 rounded-2xl bg-white border border-gray-200 shadow-lg relative overflow-hidden"
          >
            {/* Animated gradient border overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #7C3AED, #06B6D4, #EC4899, #7C3AED)",
                backgroundSize: "200% auto",
              }}
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Grow <span className="gradient-text">10X Faster</span>,{" "}
              <span className="gradient-text">Better</span>,{" "}
              <span className="gradient-text">Smarter</span>.
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              For the very first time — grow your business with proven
              client-getting funnels, frameworks and scientific customer
              acquisition (not hopes and prayers).
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block animated-gradient-bg text-white font-black text-lg px-10 py-4 rounded-full pulse-glow"
            >
              Hit the damn button
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
