"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
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
      <span className="text-white/60 text-sm">
        {count} stars / {total.toLocaleString()} reviews
      </span>
    </div>
  );
}

const services = [
  {
    tag: "DONE FOR YOU",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Hire us to do it for you",
    subtitle: "Agency",
    description:
      "Managed and 'done-for-you' digital marketing services for mid-to-large companies looking to accelerate hyper-growth. And yes, we guarantee results and smell fantastic.",
    cta: "Get Started",
    href: "#agency",
    stars: 4.5,
    reviews: 704,
    features: [
      "Google Ads Management",
      "Facebook & Instagram Ads",
      "SEO & Content",
      "Landing Page Design",
      "CRO & Funnel Optimization",
    ],
    gradient: "from-[#7C3AED] to-[#06B6D4]",
  },
  {
    tag: "DO IT YOURSELF",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "Learn how to do it yourself",
    subtitle: "Courses",
    description:
      "Business growth training programs for companies serious about scaling their coaching, consulting or service business to seven and eight figures FAST (in months, not years).",
    cta: "Get Started",
    href: "#courses",
    stars: 4.8,
    reviews: 6706,
    features: [
      "Quantum Growth Program",
      "Client Acquisition Systems",
      "Facebook Ads Mastery",
      "Sales Funnel Blueprint",
      "Scale to 8 Figures Framework",
    ],
    gradient: "from-[#06B6D4] to-[#EC4899]",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative -mt-[150px] overflow-hidden"
      style={{
        clipPath:
          "polygon(0% 150px, 100% 0%, 100% calc(100% - 150px), 0% 100%)",
      }}
    >
      <div className="py-32 md:py-48 bg-[#0f0520]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#a78bfa] text-sm font-bold tracking-[0.3em] uppercase mb-4">
              Two Ways To Win
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              How Would You Like To{" "}
              <span className="gradient-text">Dominate</span> Your Market?
            </h2>
          </motion.div>

          {/* Service cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.subtitle}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="rounded-2xl p-8 group transition-all duration-300 bg-[#1a0a35] border border-[#7C3AED]/30 hover:border-[#7C3AED]/60 cursor-pointer"
                style={{ transition: "box-shadow 0.3s" }}
              >
                {/* Animated gradient top strip */}
                <div
                  className={`h-1 -mx-8 -mt-8 mb-6 rounded-t-2xl bg-gradient-to-r ${svc.gradient} animated-gradient-bg`}
                />

                {/* Tag with animated gradient */}
                <div className="inline-flex items-center gap-2 animated-gradient-bg px-4 py-1.5 rounded-full mb-6">
                  <span className="text-white font-black text-xs tracking-widest">
                    {svc.tag}
                  </span>
                </div>

                {/* Icon with hover rotate */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center text-white mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {svc.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                  {svc.title}
                </h3>

                {/* Stars */}
                <div className="mb-5">
                  <StarRow count={svc.stars} total={svc.reviews} />
                </div>

                {/* Description */}
                <p className="text-white/60 text-base leading-relaxed mb-7">
                  {svc.description}
                </p>

                {/* Features with stagger on hover */}
                <ul className="space-y-2.5 mb-8">
                  {svc.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      className="flex items-center gap-3 text-white/70 text-sm"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1, x: 4 }}
                      transition={{ delay: fi * 0.05 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${svc.gradient} flex-shrink-0`}
                      />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={svc.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-block w-full text-center bg-gradient-to-r ${svc.gradient} text-white font-black text-base py-4 rounded-xl transition-all hover:opacity-90`}
                >
                  {svc.cta} &rarr;
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
