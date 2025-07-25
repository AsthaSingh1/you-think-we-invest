import React, { useEffect, useState, useRef } from 'react';
import womanImg from './assets/woman-thinking.png';
import dbLogo from './assets/deutschebanklogo.png';
import finalImg from './assets/wmremove-transformed.jpeg';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThinkingToIdea() {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage(0); // Reset animation on scroll into view
          const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 3500),
            setTimeout(() => setStage(4), 5000)
          ];
          return () => timers.forEach(clearTimeout);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[40vh] bg-[#fffaf0] flex justify-center items-center overflow-hidden"
    >
      {/* Woman Image Slide In */}
      <AnimatePresence>
        {stage >= 1 && stage < 3 && (
          <motion.div
            key="woman"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute left-4 flex flex-col items-center gap-2"
          >
            <img
              src={womanImg}
              alt="Woman Thinking"
              className="h-[180px] object-contain"
            />
            {stage === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-2xl text-black font-semibold font-[cursive] text-center"
              >
                Something on your mind?
              </motion.div>
            )}
          </motion.div>
        )}

        {/* DB Logo Slide In */}
        {stage >= 2 && stage < 3 && (
          <motion.div
            key="logo"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-4 flex flex-col items-center gap-2"
          >
            <img
              src={dbLogo}
              alt="Deutsche Bank Logo"
              className="h-[180px] object-contain"
            />
            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-2xl text-black font-semibold font-[cursive] text-center"
              >
                Let&apos;s make it to an idea together
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Final Composite Image */}
        {stage === 4 && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-10 px-4 text-center"
          >
            <div className="text-black text-xl md:text-3xl font-semibold font-[cursive]">
              Something on your mind?
            </div>
            <img
              src={finalImg}
              alt="Final"
              className="w-[160px] h-[160px] object-contain border border-gray-300 rounded"
            />
            <div className="text-black text-xl md:text-3xl font-semibold font-[cursive]">
              Let&apos;s make it an idea together
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
