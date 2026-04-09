"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    company: "Metricon",
    industry: "Home Building",
    quote: "Since partnering with Pillary the results have been nothing short of outstanding. There are three simple words here and that is: Leads! Leads! Leads!",
    person: "Brad Buchanan",
    title: "Marketing Director",
    result: "3x more leads",
    initials: "ME",
  },
  {
    company: "Let's Get Care",
    industry: "Aged Care",
    quote: "From $4 Million to $25,000,000+ in 18 Months. The team at Pillary completely transformed how we acquire clients.",
    person: "Simone Bennett",
    title: "CEO",
    result: "$25M+ in 18 months",
    initials: "LG",
  },
  {
    company: "New Sensation Homes",
    industry: "Construction",
    quote: "From $0 to $18 Million in 18 months, during a recession! I never thought this was possible. Pillary made it happen.",
    person: "Michael Ross",
    title: "Founder",
    result: "$18M in 18 months",
    initials: "NS",
  },
  {
    company: "Gold Key Homes",
    industry: "Home Building",
    quote: "From $3 Million to $50 Million in 12 months with Pillary. The ROI has been absolutely insane.",
    person: "David Chen",
    title: "Owner",
    result: "$50M in 12 months",
    initials: "GK",
  },
  {
    company: "Breathe Education",
    industry: "Online Education",
    quote: "Since starting work with Pillary 9 months ago our sales have tripled and we've expanded into 3 other states. Incredible results.",
    person: "Sarah Mitchell",
    title: "Co-founder",
    result: "3x sales in 9 months",
    initials: "BE",
  },
  {
    company: "Enso Homes",
    industry: "Construction",
    quote: "The goal was to get 8 sales in the first year. It's been 11 months now and we've had 23 sales — which is $7 million in revenue.",
    person: "James Whitmore",
    title: "Director",
    result: "$7M revenue generated",
    initials: "EN",
  },
  {
    company: "NSR Australia",
    industry: "Services",
    quote: "Working with Pillary has transformed our whole lives. The growth that we've experienced has been astronomical. I don't know where we'd be without them.",
    person: "Lisa Park",
    title: "Managing Director",
    result: "Astronomical growth",
    initials: "NR",
  },
  {
    company: "Little Big Dairy",
    industry: "Agriculture",
    quote: "From cold-calling to 200 new customers in 12 months. Pillary helped us completely reinvent our customer acquisition strategy.",
    person: "Tom O'Brien",
    title: "Owner",
    result: "200 new customers",
    initials: "LD",
  },
  {
    company: "Ultimate Windows",
    industry: "Home Services",
    quote: "We went from having 3 weeks of jobs to 6 months booked in advance. Our team is stretched to capacity — in the best way.",
    person: "Steve Hartley",
    title: "Director",
    result: "6 months booked ahead",
    initials: "UW",
  },
];

const AUTO_PLAY_DURATION = 4000;

function TestimonialCard({
  t,
  active,
}: {
  t: (typeof testimonials)[0];
  active: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ rotateX: 30, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      exit={{ rotateX: -20, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl p-7 transition-all duration-300 ${
        active
          ? "bg-white shadow-xl border border-[#7C3AED]/30 shadow-[0_0_40px_rgba(124,58,237,0.1)]"
          : "border border-gray-200 bg-gray-50"
      }`}
      style={{ perspective: 600 }}
    >
      {/* Result badge with animated gradient */}
      <div className="absolute -top-3 left-6">
        <div className="animated-gradient-bg text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
          {t.result}
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-5 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-[#06B6D4]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-[0.95rem] leading-relaxed mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full animated-gradient-bg flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-gray-900 font-bold text-sm">{t.person}</p>
          <p className="text-gray-500 text-xs">
            {t.title} — {t.company}
          </p>
        </div>
        <div className="ml-auto">
          <div className="text-[10px] font-bold text-[#7C3AED]/70 uppercase tracking-wide border border-[#7C3AED]/20 rounded px-2 py-0.5">
            {t.industry}
          </div>
        </div>
      </div>

      {/* Active card animated gradient border glow */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #7C3AED22, #06B6D422, #EC4899 22, #7C3AED22)",
            backgroundSize: "200% auto",
          }}
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / AUTO_PLAY_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        setActive((prev) => (prev + 1) % testimonials.length);
        clearInterval(tick);
      }
    }, 30);
    return () => clearInterval(tick);
  }, [active, autoPlay]);

  const itemsPerPage = 3;
  const visibleIndices = Array.from(
    { length: itemsPerPage },
    (_, i) => (active + i) % testimonials.length
  );

  return (
    <section ref={ref} id="testimonials" className="py-28 bg-[#f0ecff] relative overflow-hidden">
      {/* BG */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Client Love
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            What Our Clients{" "}
            <span className="gradient-text">Are Saying</span>
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            <span className="text-[#06B6D4] font-bold">4.7 stars</span> from
            over <span className="text-white font-bold">4,952 reviews</span> —
            and counting.
          </p>
        </motion.div>

        {/* Auto-play progress bar */}
        <div className="max-w-xs mx-auto mb-8 h-1 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <AnimatePresence mode="popLayout">
            {visibleIndices.map((idx, i) => (
              <motion.div
                key={`${idx}-${active}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TestimonialCard t={testimonials[idx]} active={i === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAutoPlay(false); }}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 h-2 bg-[#7C3AED]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              setAutoPlay(false);
            }}
            className="w-12 h-12 rounded-full border border-gray-300 hover:border-[#7C3AED] flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setActive((prev) => (prev + 1) % testimonials.length);
              setAutoPlay(false);
            }}
            className="w-12 h-12 rounded-full border border-gray-300 hover:border-[#7C3AED] flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
