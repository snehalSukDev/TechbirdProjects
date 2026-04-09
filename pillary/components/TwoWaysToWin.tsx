"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Card = ({
  title,
  description,
  buttonText,
  delay,
  isInView,
}: {
  title: string;
  description: string;
  buttonText: string;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 shadow-lg backdrop-blur-sm md:p-8"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}
    />
    <h4 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
      {title}
    </h4>
    <p className="mt-3 text-white/70 text-sm md:text-base max-w-prose">
      {description}
    </p>
    <button className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#4ADE80] text-black font-bold tracking-tight hover:brightness-110 transition">
      {buttonText}
    </button>
  </motion.div>
);

export default function TwoWaysToWin() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section ref={sectionRef} className="relative -mt-[150px] overflow-hidden">
      {/* Dark Section with Double Diagonal Clip-Path */}
      <div
        className="relative"
        style={{
          clipPath:
            "polygon(0% 150px, 100% 0%, 100% calc(100% - 150px), 0% 100%)",
        }}
      >
        {/* Background and Accents Container */}
        <div className="relative bg-gradient-to-b from-[#111] to-[#f7e0e0] text-white py-32 md:py-48">
          {/* Grain Texture */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "2px 2px",
            }}
          />

          {/* Content Container */}
          <div className="relative max-w-5xl mx-auto px-6 md:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center text-sm font-bold tracking-[0.2em] text-[#4ADE80] uppercase"
            >
              Our Offering
            </motion.h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <Card
                title="AGENCY"
                description="Hands-on execution, growth systems and done-for-you outcomes powered by sharp strategy."
                buttonText="Learn More"
                delay={0.3}
                isInView={isInView}
              />
              <Card
                title="COURSES"
                description="Playbooks, frameworks and step-by-step training to scale with precision and speed."
                buttonText="Explore"
                delay={0.4}
                isInView={isInView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
