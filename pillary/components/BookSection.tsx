"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function BookSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // 3D tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      className="py-28 bg-[#050c1a] relative overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#06B6D4]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating particles in violet/cyan */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 13) % 70}%`,
            backgroundColor: i % 2 === 0 ? "#7C3AED44" : "#06B6D444",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Book visual with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{ rotateX, rotateY, perspective: 800 }}
                className="relative w-64 h-80 float"
              >
                {/* Stacked books behind */}
                <div className="absolute w-64 h-80 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-xl"
                  style={{ transform: "translate(8px, 8px) rotate(3deg)", zIndex: 0 }} />
                <div className="absolute w-64 h-80 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#06B6D4] to-[#4F46E5] shadow-xl"
                  style={{ transform: "translate(4px, 4px) rotate(1.5deg)", zIndex: 1 }} />

                {/* Shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-[#7C3AED]/30 blur-xl rounded-full" style={{ zIndex: 2 }} />

                {/* Book cover */}
                <div className="w-64 h-80 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden" style={{ zIndex: 3 }}>
                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-xs font-black [writing-mode:vertical-rl] rotate-180 tracking-widest">
                      SELL LIKE CRAZY
                    </span>
                  </div>

                  {/* Content */}
                  <div className="ml-8 p-5 h-full flex flex-col justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">
                        #1 Amazon Bestseller
                      </p>
                      <h3 className="text-white font-black text-4xl leading-tight">
                        Sell<br />Like<br />Crazy
                      </h3>
                    </div>

                    <div>
                      <div className="w-12 h-0.5 bg-white/40 mb-3" />
                      <p className="text-white/70 text-xs font-bold tracking-wide uppercase">
                        Sabri Suby
                      </p>
                      <p className="text-white/50 text-xs">Pillary</p>
                    </div>
                  </div>

                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                </div>

                {/* Bestseller badge with continuous spin */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-20 h-20 animated-gradient-bg rounded-full flex items-center justify-center shadow-xl z-10"
                >
                  <div className="text-center">
                    <p className="text-white font-black text-xs leading-none">#1</p>
                    <p className="text-white font-black text-[9px] leading-tight">AMAZON<br />BESTSELLER</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-5">
              We Literally Wrote The Book On It
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              The #1 International Bestseller:{" "}
              <span className="gradient-text">Sell Like Crazy</span>
            </h2>
            <div className="space-y-5 text-white/60 text-lg leading-relaxed mb-8">
              <p>
                Sell Like Crazy shot up from being ranked{" "}
                <span className="text-white font-bold">90,000 on the day of release</span>{" "}
                to a{" "}
                <span className="text-[#06B6D4] font-bold">#1 international Amazon bestseller</span>{" "}
                on its first day.
              </p>
              <p>
                This book is easy to read and wastes no time going straight for
                the jugular. You get{" "}
                <span className="text-white font-bold">
                  actionable strategies you can use RIGHT AWAY
                </span>{" "}
                to dramatically grow sales for your business — in most cases,
                without spending a cent more on advertising.
              </p>
            </div>

            {/* Review row */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#06B6D4]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm">4.9 from 10,000+ readers worldwide</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#book"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="animated-gradient-bg text-white font-black text-base px-8 py-4 rounded-full pulse-glow text-center"
              >
                Get The Book FREE
              </motion.a>
              <motion.a
                href="#reviews"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/20 hover:border-white/40 text-white font-bold text-base px-8 py-4 rounded-full transition-colors text-center"
              >
                Read Reviews
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
