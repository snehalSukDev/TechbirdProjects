"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const navItems = [
  {
    label: "Agency",
    href: "#services",
    sub: "Hire Us To Do It For You",
  },
  {
    label: "Courses",
    href: "#courses",
    sub: "Learn How To Do It Yourself",
  },
  { label: "SEO", href: "#seo", sub: "Strengthen Your Organic Presence" },
  { label: "Google Ads", href: "#google-ads", sub: "Paid Search" },
  {
    label: "Facebook Ads",
    href: "#facebook-ads",
    sub: "Explode Sales With Facebook Ads",
  },
  { label: "About Us", href: "#about", sub: "" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.body.scrollHeight - window.innerHeight;
      scrollProgress.set(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#06B6D4]"
          style={{ scaleX: smoothProgress, transformOrigin: "left" }}
        />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full animated-gradient-bg flex items-center justify-center pulse-glow">
              <span className="text-white font-black text-sm">PI</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight group-hover:text-[#7C3AED] transition-colors">
              PILLARY
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-0.5 left-1/2 h-0.5 bg-[#7C3AED] -translate-x-1/2"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.25 }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18883038580"
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              +1-888-303-8580
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="animated-gradient-bg text-white font-bold text-sm px-6 py-2.5 rounded-full pulse-glow"
            >
              Hit the damn button
            </motion.a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col pt-20 px-8 pb-8"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block"
                  >
                    <span className="text-2xl font-black text-white hover:text-[#7C3AED] transition-colors">
                      {item.label}
                    </span>
                    {item.sub && (
                      <p className="text-white/50 text-sm mt-0.5">{item.sub}</p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center animated-gradient-bg text-white font-black text-lg py-4 rounded-full"
              >
                Hit the damn button
              </a>
              <p className="text-center text-white/50 text-sm mt-4">
                +1-888-303-8580
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
