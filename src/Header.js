import React, { useState } from 'react';
import logo from './assets/deutschebanklogo.png';
import './App.css';
import RegistrationOverlay from './RegistrationOverlay';
import LoginOverlay from './LoginOverlay';

const navItems = [
  { title: 'User' },
  { title: 'Sign In' },
  { title: 'Register' },
  { title: 'Talk to Us' },
];

export default function Header({ onLoginSuccess }) {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [menuHovered, setMenuHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMouseEnter = (idx) => {
    setHoveredMenu(idx);
    setMenuHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setMenuHovered(false);
  };

  const handleNavClick = (title) => {
    if (title === 'Register') setShowRegister(true);
    else if (title === 'Sign In') setShowLogin(true);
  };

  return (
    <>
      <header className="flex justify-between items-center p-0 m-0 shadow-md relative z-10 bg-white">
        <img src={logo} alt="Deutsche Bank" className="h-20 w-auto" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 relative">
          {navItems.map((item, idx) => (
            <div
              key={item.title}
              className={`relative group cursor-pointer ${idx === navItems.length - 1 ? 'mr-6 pr-4' : ''}`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleNavClick(item.title)}
            >
              <span className="hover:text-blue-700 font-medium border-b-2 border-transparent group-hover:border-blue-700 transition duration-200">
                {item.title}
              </span>

              {item.title === 'User' && hoveredMenu === idx && menuHovered && (
                <div
                  className="fixed top-16 left-0 w-full h-[53vh] bg-white bg-opacity-95 p-10 z-50 overflow-y-auto flex flex-col gap-6 animate-slide-in"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
                    {/* User section content */}
                    {/* Section 1 */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">1. Financial Support and Guidance:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Access to Capital:</strong> Banks can provide loans, lines of credit, and other financial products to help entrepreneurs fund their ventures and manage cash flow effectively.</li>
                        <li><strong>Risk Management:</strong> They can offer tools and strategies to mitigate financial risks, such as fraud detection, credit insurance, and financial planning advice.</li>
                        <li><strong>Cash Flow Management:</strong> Banks can assist with managing accounts receivable and payable, providing overdraft protection, and optimizing payment processing.</li>
                      </ul>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">2. Beyond Traditional Banking:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Strategic Partnerships:</strong> Banks can collaborate with fintech companies and other startups to offer innovative financial solutions and access cutting-edge technologies.</li>
                        <li><strong>Mentorship and Networking:</strong> Some banks actively engage with entrepreneurs, offering mentorship and connecting them with potential investors and partners.</li>
                        <li><strong>Market Validation:</strong> Partnerships with banks can provide entrepreneurs with a stamp of approval, helping them gain credibility and attract further investment.</li>
                        <li><strong>Understanding the Business:</strong> Banks can demonstrate a commitment to partnerships by offering tailored financial solutions that address the specific needs of small business owners.</li>
                      </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">3. Fostering Entrepreneurial Growth:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Dedicated Support:</strong> Banks can offer dedicated relationship managers who understand the unique challenges and opportunities of entrepreneurs.</li>
                        <li><strong>Community Engagement:</strong> Banks can play a vital role in supporting women entrepreneurs and other underrepresented groups in the business community.</li>
                        <li><strong>Long-term Vision:</strong> Banks can help entrepreneurs develop a long-term vision for their businesses, aligning financial strategies with their overall goals.</li>
                      </ul>
                    </div>
                  </div>
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 mt-2">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="border-t p-4"
                onClick={() => handleNavClick(item.title)}
              >
                <p className="font-semibold mb-2">{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Registration Overlay */}
      {showRegister && (
        <RegistrationOverlay onClose={() => setShowRegister(false)} />
      )}

      {/* Login Overlay */}
      {showLogin && (
        <LoginOverlay
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            onLoginSuccess(); // ✅ Triggers navigate('/dashboard') from App.js
          }}
        />
      )}
    </>
  );
}
