import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
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
          Premium Quality, Affordable Price, Free Installation & Lifetime Service
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