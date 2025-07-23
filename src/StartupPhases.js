import React, { useState } from "react";
import { motion } from "framer-motion";

const phases = [
  {
    title: "Phase 1: Idea Refinement & Validation",
    points: [
      "🔍 Identify core pain points: limited market access, middlemen exploitation, lack of digital presence",
      "🎯 Define user personas: e.g. Meena Devi (artisan) & Priya Sharma (ethical buyer)",
      "💡 Unique Value Proposition: A trusted bridge between rural artisans & conscious urban buyers",
      "📊 Analyze similar initiatives (e.g. Okhai, GoCoop) and identify gaps",
      "🗣️ Validate need by talking to 5+ artisans and 2-3 NGO partners",
      "🚀 MVP idea: Instagram storefront + WhatsApp orders for handmade bags or jewelry"
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

export default function IdeaToStartup() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState("input"); // 'input' | 'thinking' | 'phases'
  const [current, setCurrent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim() !== "") {
      setStatus("thinking");
      setTimeout(() => setStatus("phases"), 2000); // simulate thinking delay
    }
  };

  const next = () => setCurrent((current + 1) % phases.length);
  const prev = () => setCurrent((current - 1 + phases.length) % phases.length);

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-800">
      {status === "input" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Enter Your Startup Idea</h2>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="I want to create a startup that collaborates with NGOs and connects rural artisans to sell their handicrafts online..."
            className="w-full h-40 p-4 border rounded-lg resize-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Idea
          </button>
        </form>
      )}

      {status === "thinking" && (
        <div className="flex flex-col items-center justify-center h-96 animate-pulse">
          <div className="text-lg text-gray-600 mb-2">🤔 Thinking on your idea...</div>
          <div className="text-sm text-gray-400 italic">Refining & validating your concept</div>
        </div>
      )}

      {status === "phases" && (
        <section className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-center mb-4">
            Startup Journey — {phases[current].title}
          </h3>

          <motion.ul
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-2 text-base list-disc list-inside"
          >
            {phases[current].points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </motion.ul>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={prev}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              ‹ Prev
            </button>
            <div className="flex space-x-2">
              {phases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 w-2.5 rounded-full ${
                    current === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Next ›
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
