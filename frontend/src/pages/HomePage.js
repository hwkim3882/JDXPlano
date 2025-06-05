import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Navigation Bar */}
      <nav className="w-full z-20 absolute top-0 left-0 flex items-center justify-between px-8 py-4 bg-black bg-opacity-60 backdrop-blur-md">
        <div className="flex items-center">
          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden mr-3 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <span className="block w-7 h-7 relative">
              <span
                className="absolute left-0 top-2 w-7 h-1 bg-yellow-400 rounded transition-all duration-300"
                style={{
                  top: menuOpen ? "14px" : "6px",
                  transform: menuOpen ? "rotate(45deg)" : "none",
                }}
              ></span>
              <span
                className={`absolute left-0 w-7 h-1 bg-yellow-400 rounded transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
                style={{ top: "14px" }}
              ></span>
              <span
                className="absolute left-0 w-7 h-1 bg-yellow-400 rounded transition-all duration-300"
                style={{
                  top: menuOpen ? "14px" : "22px",
                  transform: menuOpen ? "rotate(-45deg)" : "none",
                }}
              ></span>
            </span>
          </button>
          {/* Logo */}
          <div className="text-2xl font-bold text-yellow-400 tracking-widest drop-shadow-lg">
            JDX Plano
          </div>
        </div>
        {/* Menu (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <li>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/estimate"
              className="text-white hover:text-yellow-400 transition"
            >
              Free Estimate
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="text-white hover:text-yellow-400 transition"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/ai-recommendation"
              className="text-white hover:text-yellow-400 transition"
            >
              AI Recommendation
            </Link>
          </li>
          <li>
            <Link
              to="/why-jdx"
              className="text-white hover:text-yellow-400 transition"
            >
              Why JDX
            </Link>
          </li>
        </ul>
        {/* Mobile Menu (Dropdown) */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-black bg-opacity-90 flex flex-col items-center py-4 space-y-4 text-lg font-semibold md:hidden z-30">
            <li>
              <Link
                to="/"
                className="text-white hover:text-yellow-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/estimate"
                className="text-white hover:text-yellow-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Free Estimate
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="text-white hover:text-yellow-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/ai-recommendation"
                className="text-white hover:text-yellow-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                AI Recommendation
              </Link>
            </li>
            <li>
              <Link
                to="/why-jdx"
                className="text-white hover:text-yellow-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Why JDX
              </Link>
            </li>
          </ul>
        )}
      </nav>

      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2024/12/10/12/41/generated-9257818_1280.jpg')`,
        }}
      ></div>

      {/* Background Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Section Content */}
      <section className="relative z-10 text-center py-20 px-4 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Transform Your Home with Custom Window Treatments
        </h1>
        <p className="text-xl mb-8">
          Premium Quality, Affordable Price, Free Installation & Lifetime
          Service
        </p>
        <Link
          to="/estimate"
          className="bg-blue-600 text-white text-2xl font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 w-full max-w-xs mx-auto block text-center break-words whitespace-normal"
        >
          Get Your Free Estimate Now!
        </Link>
      </section>

      {/* TODO: Add other sections like Benefits, Reviews, etc. */}
    </div>
  );
}

export default HomePage;
