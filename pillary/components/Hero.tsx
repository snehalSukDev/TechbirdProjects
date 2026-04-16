"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  type Variants,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[#06B6D4]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ParticleField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const colors = ["#7C3AED", "#06B6D4", "#EC4899", "#7C3AED", "#06B6D4"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length] + "4D",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #7C3AED, transparent)",
          top: "10%",
          left: "5%",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #06B6D4, transparent)",
          top: "60%",
          right: "8%",
        }}
        animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #EC4899, transparent)",
          bottom: "20%",
          left: "20%",
        }}
        animate={{ x: [0, 15, 0], y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

// ─── Video Card ─────────────────────────────────────────────────────────────

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

function VideoCard({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const rawW = useTransform(scrollProgress, [0.21, 0.8], [560, 1080]);
  const rawH = useTransform(scrollProgress, [0.21, 0.8], [300, 555]);
  const rawBR = useTransform(scrollProgress, [0.21, 0.8], [24, 8]);
  const rawShadow = useTransform(
    scrollProgress,
    [0.21, 0.8],
    [
      "0 20px 80px rgba(0,0,0,0.9), 0 0 40px rgba(124,58,237,0.18)",
      "0 40px 120px rgba(0,0,0,0.95), 0 0 80px rgba(124,58,237,0.35)",
    ],
  );

  const cardW = useSpring(rawW, { stiffness: 65, damping: 20 });
  const cardH = useSpring(rawH, { stiffness: 65, damping: 20 });
  const cardBR = useSpring(rawBR, { stiffness: 65, damping: 20 });

  return (
    <motion.div
      style={{
        width: cardW,
        height: cardH,
        borderRadius: cardBR,
        boxShadow: rawShadow,
        maxWidth: "90vw",
        maxHeight: "55vw",
        minWidth: 280,
        minHeight: 160,
      }}
      className="relative bg-[#080808] overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.005 }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.6) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-[#7C3AED]/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#06B6D4]/8 rounded-full blur-[50px] pointer-events-none" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center"
          whileHover={{ scale: 1.15, backgroundColor: "rgba(124,58,237,0.35)" }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <div className="w-0 h-0 border-t-[11px] border-b-[11px] border-l-[18px] border-t-transparent border-b-transparent border-l-white ml-1.5" />
        </motion.div>
      </div>

      {/* Growth curve chart */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 560 210"
        preserveAspectRatio="none"
        style={{ height: "58%" }}
      >
        <defs>
          <linearGradient id="vidLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="vidAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,195 C70,185 120,168 200,142 S330,88 440,50 L560,14 L560,210 L0,210Z"
          fill="url(#vidAreaFill)"
        />
        <path
          d="M0,195 C70,185 120,168 200,142 S330,88 440,50 L560,14"
          stroke="url(#vidLineGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {(
          [
            [0, 195],
            [140, 158],
            [280, 112],
            [420, 54],
            [560, 14],
          ] as [number, number][]
        ).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill="#06B6D4" />
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute bottom-14 left-5 text-white/35 text-[10px] leading-relaxed space-y-px select-none pointer-events-none">
        <p>Stress</p>
        <p>Uncertainty</p>
        <p>Guesswork</p>
      </div>
      <div className="absolute bottom-14 right-5 text-white/35 text-[10px] leading-relaxed text-right space-y-px select-none pointer-events-none">
        <p>Certainty</p>
        <p>Confidence</p>
        <p>Execution</p>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/18 text-[9px] whitespace-nowrap select-none pointer-events-none">
        Trial and error (going it alone)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Getting a
        proven roadmap
      </div>

      {/* Top dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-transparent to-transparent pointer-events-none" />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent pointer-events-none"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

const taglineWords = [
  "easier",
  "more predictable",
  "less stressful",
  "more fun",
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [typedTagline, setTypedTagline] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.4]);

  // Typing animation
  useEffect(() => {
    const word = taglineWords[taglineIndex];
    let i = 0;
    setTypedTagline("");
    const interval = setInterval(() => {
      i++;
      setTypedTagline(word.slice(0, i));
      if (i >= word.length) {
        clearInterval(interval);
        setTimeout(
          () => setTaglineIndex((prev) => (prev + 1) % taglineWords.length),
          1800,
        );
      }
    }, 60);
    return () => clearInterval(interval);
  }, [taglineIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-[#0a0a0a]"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 150px), 0% 100%)",
        paddingBottom: "156px",
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 3.35 }}
      >
        <source src="/15517392_1920_1080_60fps.mp4" type="video/mp4" />
      </video>

      {/* Background overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#06B6D4]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <FloatingShapes />
      <ParticleField />

      {/* ── First viewport: hero content ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16  px-6"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          {/* <motion.div variants={item} className="flex justify-center mb-8">
            <div className="gradient-border rounded-full px-5 py-2 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] pulse-glow" />
              <span className="text-white/80 text-sm font-medium">
                $7.8 Billion in reported client revenue
              </span>
            </div>
          </motion.div> */}

          {/* Headline with parallax */}
          <motion.div variants={item} style={{ y: headlineY }}>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-none tracking-tight mb-4">
              <span className="text-white">Like </span>
              <span className="shimmer-text">Steroids</span>
              <span className="text-[#7C3AED] text-4xl md:text-5xl align-super">
                *
              </span>
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-none tracking-tight text-white mb-2">
              For Business
            </h2>
          </motion.div>

          {/* <motion.p
            variants={item}
            className="text-[#7C3AED]/80 text-sm mt-3 mb-6"
          >
            *But it&apos;s 100% legal (pinky promise)
          </motion.p> */}

          {/* Typing subheading */}
          <motion.p
            variants={item}
            className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Growing a business is hard. We make it a whole lot{" "}
            <span className="text-[#7C3AED] font-bold inline-block min-w-[180px] text-left">
              {typedTagline}
              <span className="animate-pulse">|</span>
            </span>
          </motion.p>

          {/* Email form */}
          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email here and we'll send you some 'magic'"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#7C3AED] transition-colors text-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="animated-gradient-bg text-white font-black px-8 py-4 rounded-full text-sm whitespace-nowrap pulse-glow"
                  >
                    Do it
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full bg-[#7C3AED]/20 border border-[#7C3AED]/50 rounded-full px-8 py-4 text-center"
                >
                  <span className="text-[#7C3AED] font-bold">
                    Magic incoming! Check your inbox.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Social proof */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12"
          >
            <div className="flex items-center gap-2">
              <StarRating />
              <span className="text-white/80 text-sm">
                <span className="text-white font-bold">4.8</span> stars out of{" "}
                <span className="text-[#06B6D4] font-bold">7,410</span> reviews
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="text-white/60 text-sm">
              Trusted by{" "}
              <span className="text-white font-bold">200,000+ businesses</span>{" "}
              worldwide
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Sticky video card – grows as hero section scrolls ── */}
      {/* <div className="sticky top-[58vh] w-full flex justify-center px-4 z-20">
        <VideoCard scrollProgress={scrollYProgress} />
      </div> */}
    </section>
  );
}
