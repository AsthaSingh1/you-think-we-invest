import React, { useState, useEffect } from 'react';
import businessPeople from './assets/business-people.png';
import financialInclusion from './assets/financial_inclusion.png';
import growthRate from './assets/growth_rate.png';
import womenCelebrating from './assets/women_celebrating.png';

const slides = [
  {
    img: businessPeople,
    headline: 'This is Deutsche Bank',
    subheadline: 'Explore how we create an environment that allows everyone to unleash their full potential.',
    link: 'https://careers.db.com/this-is-db/'
  },
  {
    img: financialInclusion,
    subheadline: 'Discover how we are placing inclusion at the heart of our culture',
    link: 'https://careers.db.com/explore-the-bank/working-environment/inclusive-culture/index?language_id=1'
  },
  {
    img: growthRate,
    headline: 'Engineer the future',
    subheadline: 'Discover careers in technology',
    link: 'https://careers.db.com/explore-the-bank/careers-in-technology/index?language_id=1'
  },
  {
    img: womenCelebrating,
    headline: 'Women in Technology',
    subheadline: 'Discover how we’re challenging the gender imbalance in technology',
    link: '/explore-the-bank/careers-in-technology/women-in-technology/'
  }
];

const cards = [
  {
    title: 'Professionals',
    description: 'Discover the opportunity for you',
    bg: 'bg-[#192986] text-white',
    link: 'https://careers.db.com/professionals/index?language_id=1#/professional/'
  },
  {
    title: 'Students and Graduates',
    description: `Whether you're a university student or recent graduate, explore a broad range of entry routes tailored to you`,
    bg: 'bg-[#192986] text-white',
    link: 'https://careers.db.com/students-graduates/index?language_id=1#/graduate/'
  },
  {
    title: 'School leavers',
    description: 'Our school leaver opportunities offer an attractive alternative to university and a great platform to start a successful career.',
    bg: 'bg-[#192986] text-white',
    link: 'https://careers.db.com/School-leavers-uk/index?language_id=1'
  }
];

export default function DBSliderSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="flex flex-col lg:flex-row w-full mt-12 mb-20 px-4 md:px-12">
      {/* Slider Section */}
      <div className="w-full lg:w-1/2 relative overflow-hidden">
        <div className="relative min-h-[685px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img src={slide.img} alt="slide" className="w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent text-white p-6 flex flex-col justify-center">
                {slide.headline && <h3 className="text-xl font-semibold mb-2">{slide.headline}</h3>}
                <h2 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: slide.subheadline.replace(/\n/g, '<br/>') }}></h2>
                <a href={slide.link} className="mt-2 inline-block px-4 py-2 bg-white text-black rounded shadow" target="_blank" rel="noopener noreferrer">
                  more
                </a>
              </div>
            </div>
          ))}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">&#8592;</button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">&#8594;</button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white flex items-center space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full border border-white ${index === current ? 'bg-white' : 'bg-transparent'}`}
              ></button>
            ))}
            <span className="ml-4 text-sm">{current + 1}/{slides.length}</span>
          </div>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 p-6">
        {cards.map((card, index) => (
          <div key={index} className={`p-6 rounded-lg shadow ${card.bg}`}>
            <h2 className="text-xl font-semibold mb-2">
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                {card.title}
              </a>
            </h2>
            <p className="mb-3">{card.description}</p>
            <a href={card.link} className="inline-block px-4 py-2 bg-white text-[#192986] font-medium rounded shadow" target="_blank" rel="noopener noreferrer">
              more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
