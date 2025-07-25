import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Make sure this import is here
import { motion } from 'framer-motion';
import './App.css';
import Header from './Header';
import DBSliderSection from './DBSliderSection';
import flowerVideo from './assets/flower_bloom.mp4';
import BenefitsSection from './BenefitsSection';
import IdeaForm from "./IdeaForm";
import Thinking from "./Thinking";
import StartupPhases from "./StartupPhases";
import ThinkingToIdea from "./ThinkingToIdea";
import Dashboard from "./Dashboard";

// This is a new component to hold all your homepage content.
// This keeps the main App component clean.
const HomePage = () => {
  const [status, setStatus] = useState("input"); // 'input' | 'thinking' | 'phases'

  const handleSubmit = (ideaText) => {
    setStatus("thinking");
    // Simulate an API call or processing time
    setTimeout(() => {
      setStatus("phases");
    }, 2000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      {/* Hero Section with Video */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src={flowerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-6">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" variants={fadeUp} initial="hidden" animate="show">
            Deutsche Bank's Initiative "GROW WITH US"
          </motion.h1>
          <motion.p className="text-lg md:text-xl max-w-2xl" variants={fadeUp} initial="hidden" animate="show">
            Together we can help each other grow.
          </motion.p>
        </div>
      </section>

      <div className="mt-12 md:mt-16 lg:mt-20">
        <ThinkingToIdea />
      </div>

      <div className="mt-12 md:mt-16 lg:mt-20">
        <BenefitsSection />
      </div>
      
      <DBSliderSection />
    </>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header is outside Routes, so it appears on all pages */}
      <Header onLoginSuccess={() => setIsLoggedIn(true)} />

      <main>
        <Routes>
          {/* ✅ The root path "/" will now render your complete HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ The "/dashboard" path will render the Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer is outside Routes, so it appears on all pages */}
      <footer className="bg-gray-200 text-center p-4 mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} Deutsche Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
