"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What does a Digital Marketing Agency actually do?",
    a: "A good digital marketing agency will get to know your business inside out. They will assess the traffic your website is getting and establish the best online marketing platforms to invest in. Part of a digital marketing agency's strategy should involve continual evaluation to ensure a client is maintaining the perfect balance between their marketing spend and the results they're getting.\n\nWe do all of that but, unlike other agencies, the Pillary team isn't just focused on maintaining that perfect balance. Our goal is to crush your competitors, turn website visitors into buyers and bring you the biggest ROI possible using the most effective marketing strategies available.",
  },
  {
    q: "How do I know that I will get a return on my investment?",
    a: "Because we put our money where our mouth is and we make BIG guarantees that other marketing agencies don't. We offer guarantees for all of our traffic sources. Whether it's Google Ads, Facebook marketing, or SEO, if we don't hit our agreed-upon targets, we don't get paid. Go check out our individual service pages for more information on what guarantees we offer.",
  },
  {
    q: "Do you work with big or small companies?",
    a: "Are you serious about scaling your operations and dominating your market space? We can work with you. It doesn't matter if you're a big or small company. Our clients range from small, local businesses with 5 or less employees to large multinational companies with a workforce of hundreds of people operating from all corners of the globe.",
  },
  {
    q: "Why is Pillary the best digital marketing agency?",
    a: "We let the numbers do the talking: $7.8 billion in sales generated. 1,067 different industries and niches. 4,952 reviews with an average of 4.7 stars. 38 millionaires created. 6x 8-figure clients created. #17 fastest growing company in Australia (ranked by the AFR). #1 fastest growing agency for 3 years in a row.",
  },
  {
    q: "Can you guarantee results?",
    a: "We offer guarantees for all of our traffic sources. Whether it's Google Ads, Facebook marketing, or SEO, we put our money where our mouth is — if we don't hit our agreed-upon targets, we don't get paid. That's how confident we are in our ability to deliver results.",
  },
  {
    q: "What's involved with digital marketing?",
    a: "Digital marketing encompasses everything from search engine optimization (SEO) and pay-per-click advertising (PPC) to social media marketing, email campaigns, content marketing, conversion rate optimization, and more. We craft custom strategies tailored to your specific business, audience, and goals — not a cookie-cutter approach.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-[#7C3AED]/50 bg-white" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Animated left border on open */}
      {open && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
          style={{ background: "linear-gradient(180deg, #7C3AED, #06B6D4)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-7 py-6 flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-4">
          {/* Number indicator */}
          <span className={`text-sm font-black font-mono transition-colors ${open ? "text-[#7C3AED]" : "text-gray-300"}`}>
            {num}
          </span>
          <span className={`font-bold text-lg leading-snug transition-colors ${open ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
            open ? "border-[#7C3AED] text-[#7C3AED]" : "border-gray-300 text-gray-400"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 pl-[4.5rem]">
              <div className="w-full h-px bg-gray-200 mb-5" />
              {faq.a.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-600 text-base leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="faq" className="py-28 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#7C3AED] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-500 text-xl">
            Everything you need to know about working with Pillary.
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="relative">
              <FAQItem faq={faq} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center p-10 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-500 text-lg mb-8">
            Book a free 30-minute strategy session with our team.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block animated-gradient-bg text-white font-black text-lg px-10 py-4 rounded-full pulse-glow"
          >
            Book Free Strategy Session
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
