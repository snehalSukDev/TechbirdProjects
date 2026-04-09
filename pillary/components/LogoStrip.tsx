"use client";
import { motion } from "framer-motion";

const awards = [
  "#1 Fastest Growing Agency",
  "AFR Fast 100 #17",
  "Google Premier Partner",
  "4.8★ Google Reviews",
  "Facebook Marketing Partner",
  "#1 Agency 3 Years Running",
  "38 Millionaires Created",
  "1067 Industries",
];

const media = [
  "Forbes",
  "Entrepreneur",
  "Inc. Magazine",
  "Business Insider",
  "The Australian",
  "Sky News",
  "Channel 7",
  "Herald Sun",
  "SmartCompany",
  "StartupSmart",
];

const mediaExtra = [
  "TechCrunch",
  "Fast Company",
  "Wired",
  "Fortune",
  "Bloomberg",
  "Reuters",
  "CNBC",
  "BBC",
];

function LogoItem({ text }: { text: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 mx-8 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity cursor-default"
      whileHover={{
        scale: 1.1,
        filter: "drop-shadow(0 0 8px rgba(124,58,237,0.7))",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
      <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
        {text}
      </span>
    </motion.div>
  );
}

const labelLetters = "As Seen In".split("");

export default function LogoStrip() {
  return (
    <section
      className="relative -mt-[150px] overflow-hidden"
      style={{
        clipPath: "polygon(0% 150px, 100% 0%, 100% calc(100% - 150px), 0% 100%)",
      }}
    >
      <div className="py-24 bg-[#09060f] border-y border-white/5">
        {/* Third row — opposite direction */}
        <div className="mt-2">
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...mediaExtra, ...mediaExtra].map((m, i) => (
                <LogoItem key={i} text={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandLogoStrip() {
  const brands = [
    "Metricon",
    "My Muscle Chef",
    "Koala",
    "Original UGG",
    "Electrolux",
    "Purple Bricks",
    "Moxie Pest Control",
    "Marshall White",
    "Let's Get Care",
    "Glenvill Homes",
    "Breathe Education",
    "NSR Australia",
  ];

  return (
    <section className="py-14 bg-white overflow-hidden border-b border-gray-100">
      <div className="text-center mb-8">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">
          Brand Experience
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="mx-10 px-6 py-2 border border-gray-200 rounded-full whitespace-nowrap"
            >
              <span className="text-gray-500 text-sm font-medium">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
