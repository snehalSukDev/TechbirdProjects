"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "🎯",
    title: "Google Ads",
    desc: "Dominate search results and capture high-intent buyers the moment they're looking for what you sell.",
    result: "Avg. 4.2x ROAS",
  },
  {
    icon: "📘",
    title: "Facebook Ads",
    desc: "Explode your sales with hyper-targeted Facebook & Instagram campaigns that convert cold traffic into hot buyers.",
    result: "200%+ revenue increase",
  },
  {
    icon: "📈",
    title: "SEO",
    desc: "Dominate Google's first page organically and own the #1 position for every money keyword in your industry.",
    result: "#1 rankings in 6 months",
  },
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "High-converting sales machines engineered to turn visitors into buyers at rates your competitors can only dream of.",
    result: "3x higher conversion rate",
  },
  {
    icon: "🔄",
    title: "CRO",
    desc: "Squeeze every last drop of revenue from your existing traffic with scientific conversion rate optimization.",
    result: "Up to 800% improvement",
  },
  {
    icon: "🌐",
    title: "Web Design",
    desc: "Stunning, conversion-focused websites that don't just look pretty — they work hard 24/7 to generate leads and sales.",
    result: "5x more qualified leads",
  },
];

export default function GrowthSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-[#080f28] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF6900] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Every Growth Lever,{" "}
            <span className="gradient-text">Pulled Hard</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            We don&apos;t dabble. We dominate. Whether it&apos;s SEO, paid ads, or
            conversion rate optimization — we go all in on what moves the needle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl p-7 bg-[#0d1535] border border-white/10 group hover:bg-[#111f40] hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform inline-block">
                {svc.icon}
              </div>
              <h3 className="text-white font-black text-xl mb-3">{svc.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{svc.desc}</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6900]" />
                <span className="text-[#FF6900] text-sm font-bold">{svc.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
