import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const startupPhases = [
  {
    title: "Phase 1: Idea Refinement & Validation",
    color: "bg-blue-100 text-gray-900",
    steps: [
      "Identify the Core Problem your idea solves.",
      "Define your Target Audience and Customer Profile.",
      "Analyze Existing Solutions and your Unique Value Proposition (UVP).",
      "Conduct Market Research: Size, Competitors, Trends.",
      "Customer Validation through Interviews and Surveys.",
      "Design a Minimum Viable Product (MVP) for feedback."
    ],
  },
  {
    title: "Phase 2: Planning & Foundation",
    color: "bg-blue-300 text-gray-900",
    steps: [
      "Create a Lean Canvas or Business Model Canvas.",
      "Draft a Lean Business Plan: vision, strategy, execution.",
      "Choose the right Legal Structure (LLP, Pvt. Ltd., etc.).",
      "Register your Startup and secure IP (trademarks, patents).",
      "Identify skill gaps and build your founding team."
    ],
  },
  {
    title: "Phase 3: Development & Initial Launch",
    color: "bg-blue-700 text-white",
    steps: [
      "Build MVP focusing on core features based on feedback.",
      "Develop Branding: Name, Logo, Messaging.",
      "Establish a Web Presence and Basic Marketing Channels.",
      "Launch softly with early adopters and conduct Beta Testing.",
      "Gather Feedback, Iterate and Improve."
    ],
  },
  {
    title: "Phase 4: Growth & Scaling",
    color: "bg-indigo-800 text-white",
    steps: [
      "Explore Funding Options: Bootstrapping, Angel, VC, Crowdfunding.",
      "Build strong Customer Relationships and Feedback Loops.",
      "Scale Operations: Automate, Hire, Expand Marketing.",
      "Track KPIs, Stay Agile, and Monitor Market Trends."
    ],
  }
];

export default function StartupStepsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % startupPhases.length);
  const prev = () => setIndex((prev) => (prev - 1 + startupPhases.length) % startupPhases.length);

  return (
    <section className="w-full py-12 px-4 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={startupPhases[index].title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl shadow-xl p-8 md:p-10 ${startupPhases[index].color}`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{startupPhases[index].title}</h2>
            <ul className="text-left list-disc list-inside space-y-2 text-base md:text-lg">
              {startupPhases[index].steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prev}
            aria-label="Previous"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-lg"
          >
            ‹
          </button>
          <span className="font-medium text-lg">
            {index + 1}/{startupPhases.length}
          </span>
          <button
            onClick={next}
            aria-label="Next"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-lg"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
