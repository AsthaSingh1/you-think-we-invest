import React, { useState } from "react";
import { motion } from "framer-motion";

const phases = [
  {
    title: "Phase 1: Idea Refinement & Validation",
    points: [
      "🔍 Identify artisan & buyer pain points (e.g. market access, transparency)",
      "🎯 Define your personas (e.g. Meena Devi & Priya Sharma)",
      "💡 Craft your Unique Value Proposition",
      "📊 Analyze market trends & competitors",
      "🗣️ Validate assumptions via interviews & NGO partners",
      "🚀 Define MVP: Instagram + WhatsApp + 1 craft focus"
    ]
  },
  {
    title: "Phase 2: Planning & Foundation",
    points: [
      "🧱 Build a Lean Canvas to visualize business",
      "📝 Draft a concise business plan",
      "⚖️ Register your entity & protect IP (trademark/logo)",
      "🧑‍🤝‍🧑 Start forming early team/partner roles",
      "📂 Onboard 1-2 NGOs for support"
    ]
  },
  {
    title: "Phase 3: Development & Initial Launch",
    points: [
      "📷 Capture artisan stories via photos/videos",
      "📦 Enable fair pricing & ethical logistics",
      "📣 Launch Instagram/WhatsApp MVP with 2-3 products",
      "📈 Track customer interest, feedback, and conversions",
      "🔁 Iterate and adapt based on user insights"
    ]
  },
  {
    title: "Phase 4: Growth & Scaling",
    points: [
      "💰 Explore funding: bootstrapping, angel investors, crowdfunding",
      "📡 Expand marketing via SEO, content, social, influencers",
      "🌍 Scale product base and onboard more NGOs/artisans",
      "📦 Streamline packaging, fulfillment & quality checks",
      "📉 Set KPIs: CAC, LTV, conversion rates",
      "⚙️ Automate backend and CRM as growth continues"
    ]
  }
];

export default function StartupCarousel() {
  const [current, setCurrent] = useState(0);
  const total = phases.length;

  const next = () => setCurrent((current + 1) % total);
  const prev = () => setCurrent((current - 1 + total) % total);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prev} className="text-2xl">‹</button>
        <h2 className="text-2xl font-bold text-center flex-1">{phases[current].title}</h2>
        <button onClick={next} className="text-2xl">›</button>
      </div>

      <motion.ul
        key={current}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="space-y-3 text-base list-disc list-inside"
      >
        {phases[current].points.map((point, i) => (
          <li key={i} className="text-gray-700">{point}</li>
        ))}
      </motion.ul>

      <div className="mt-8 flex justify-center space-x-2">
        {phases.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
