"use client";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
    { label: "Blog", href: "#blog" },
    { label: "Reviews", href: "#reviews" },
    { label: "Careers", href: "#careers" },
    { label: "Case Studies", href: "#case-studies" },
  ],
  Services: [
    { label: "SEO", href: "#seo" },
    { label: "Conversion Rate Optimization", href: "#cro" },
    { label: "Google Ads", href: "#google-ads" },
    { label: "Facebook Ads", href: "#facebook-ads" },
    { label: "Landing Pages", href: "#landing-pages" },
    { label: "Web Design", href: "#web-design" },
  ],
  Solutions: [
    { label: "Agency", href: "#agency" },
    { label: "Courses", href: "#courses" },
    { label: "Books", href: "#book" },
    { label: "Blog", href: "#blog" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const linksRef = useRef(null);
  const linksInView = useInView(linksRef, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-[#080808] border-t border-white/8">
      {/* CTA Strip with animated gradient */}
      <div className="animated-gradient-bg py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Ready to 10X Your Business?
          </h2>
          <p className="text-white/80 text-xl mb-8">
            Book your free 30-minute strategy session today.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-black hover:bg-[#111] text-white font-black text-lg px-12 py-5 rounded-full transition-colors shadow-2xl"
          >
            Hit the damn button
          </motion.a>
          <p className="text-white/60 text-sm mt-4">
            No obligation. No credit card required. 100% free.
          </p>
        </div>
      </div>

      {/* Email signup */}
      <div className="py-16 border-b border-white/8">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            Want some{" "}
            <span className="gradient-text">free money?</span>
          </h3>
          <p className="text-white/50 text-lg mb-8">
            Get million dollar marketing strategies sent straight to your inbox
            every week.
          </p>
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/8 border border-white/15 rounded-full px-6 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#7C3AED] transition-colors text-sm"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="animated-gradient-bg text-white font-black px-8 py-3.5 rounded-full text-sm whitespace-nowrap"
              >
                Let&apos;s Go
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full px-8 py-4 max-w-md mx-auto"
            >
              <span className="text-[#7C3AED] font-bold">
                You&apos;re in! Thank you for subscribing.
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div ref={linksRef} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full animated-gradient-bg flex items-center justify-center">
                  <span className="text-white font-black text-sm">PI</span>
                </div>
                <span className="text-white font-black text-xl">PILLARY</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                Like steroids for business. We&apos;ve generated $7.8 billion in
                client revenue across 1,067+ industries worldwide.
              </p>
              {/* Contact */}
              <div className="space-y-2 text-sm text-white/40">
                <p>520 Broadway, Santa Monica, CA 90401</p>
                <p>
                  <a href="tel:+18883038580" className="hover:text-[#7C3AED] transition-colors">
                    +1-888-303-8580
                  </a>
                </p>
              </div>
              {/* Social */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                    className="w-9 h-9 rounded-full border border-white/15 hover:border-[#7C3AED] hover:text-[#7C3AED] flex items-center justify-center text-white/50 transition-colors"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns with stagger animate in on scroll */}
            {Object.entries(footerLinks).map(([heading, links], colIdx) => (
              <motion.div
                key={heading}
                initial={{ opacity: 0, y: 20 }}
                animate={linksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: colIdx * 0.1 }}
              >
                <h4 className="text-white font-black text-sm mb-5 tracking-wide uppercase">
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, li) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={linksInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: colIdx * 0.1 + li * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        {/* Animated gradient line above bottom bar */}
        <motion.div
          className="h-px bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#06B6D4]"
          style={{ backgroundSize: "200% auto" }}
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-sm">
              © {new Date().getFullYear()} Pillary. All rights reserved.
            </p>
            <div className="flex gap-6 text-white/25 text-sm">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
