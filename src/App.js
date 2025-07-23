import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import DBSliderSection from './DBSliderSection'; // adjust path if needed
import logo from './assets/deutschebanklogo.png';
import flowerVideo from './assets/flower_bloom.mp4';
import businessPeople from './assets/business-people.png';
import financialInclusion from './assets/financial_inclusion.png';
import growthRate from './assets/growth_rate.png';
import womenCelebrating from './assets/women_celebrating.png';

const slides = [
  {
    img: businessPeople,
    alt: 'Business People',
    sections: [
      {
        title: 'Professionals',
        text: 'Discover the opportunity for you',
        link: 'https://careers.db.com/professionals/index?language_id=1#/professional/',
        button: 'more',
        bgColor: 'bg-blue-100 text-gray-900',
      },
    ],
  },
  {
    img: financialInclusion,
    alt: 'Financial Inclusion',
    sections: [
      {
        title: 'Students and Graduates',
        text: "Whether you're a university student or recent graduate, explore a broad range of entry routes tailored to you",
        link: 'https://careers.db.com/students-graduates/index?language_id=1#/graduate/',
        button: 'more',
        bgColor: 'bg-blue-700',
      },
    ],
  },
  {
    img: growthRate,
    alt: 'Growth Rate',
    sections: [
      {
        title: 'School Leavers',
        text: 'Our school leaver opportunities offer an attractive alternative to university and a great platform to start a successful career.',
        link: 'https://careers.db.com/School-leavers-uk/index?language_id=1',
        button: 'more',
        bgColor: 'bg-blue-900',
      },
    ],
  },
  {
    img: womenCelebrating,
    alt: 'Women Celebrating',
    sections: [
      {
        title: 'Women in Tech',
        text: 'Discover how we’re challenging the gender imbalance in technology',
        link: 'https://careers.db.com/explore-the-bank/careers-in-technology/women-in-technology/',
        button: 'more',
        bgColor: 'bg-indigo-800',
      },
    ],
  },
];

const Slide = ({ data }) => (
  <motion.div
    className="slide grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-16"
    key={data.img}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.6 }}
  >
    {/* Image */}
    <div className="w-full">
      <img src={data.img} alt={data.alt} className="w-full h-auto rounded-lg shadow-lg" />
    </div>

    {/* Text box */}
    <div className="space-y-6">
      {data.sections.map((section, i) => (
        <div key={i} className={`p-6 rounded-xl text-white ${section.bgColor}`}>
          <h2 className="text-2xl font-bold mb-2">
            <a href={section.link} target="_blank" rel="noreferrer">{section.title}</a>
          </h2>
          <p className="mb-4">{section.text}</p>
          <a
            href={section.link}
            className="inline-block px-4 py-2 bg-white text-gray-800 font-semibold rounded shadow hover:bg-gray-100"
            target="_blank"
            rel="noreferrer"
          >
            {section.button}
          </a>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [index, setIndex] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const navItems = [
    {
      title: "USER",
      bullets: [
        "Explore personalized career tracks",
        "Access mentorship programs",
        "Custom learning paths"
      ],
    },
    {
      title: "BANK",
      bullets: [
        "Innovations in financial technology",
        "Sustainable banking goals",
        "Leadership insights"
      ],
    },
    {
      title: "TALK TO US",
      bullets: [
        "Voice-enabled support in 22 Indian languages",
        "Type your query in any language you prefer",
        "Get help from Deutsche Bank career advisors"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md relative z-10 bg-white">
        <img src={logo} alt="Deutsche Bank" className="h-8 w-auto" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 relative">
          {navItems.map((item, idx) => (
            <div
              key={item.title}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMenu(idx)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span className="hover:text-blue-700 font-medium">{item.title}</span>
              {hoveredMenu === idx && (
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 min-w-[300px] max-w-[90vw] w-fit z-50 bg-white bg-opacity-95 p-6 rounded-xl shadow-xl text-left max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
                    {item.bullets.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 mt-2">
            {navItems.map((item, idx) => (
              <div key={idx} className="border-t p-4">
                <p className="font-semibold mb-2">{item.title}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4">
                  {item.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </header>

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
      
      <DBSliderSection />
        {/* Footer */}
  <footer className="bg-gray-200 text-center p-4 mt-12">
    <p className="text-sm">&copy; {new Date().getFullYear()} Deutsche Bank. All rights reserved.</p>
  </footer>
</div>
);
}
