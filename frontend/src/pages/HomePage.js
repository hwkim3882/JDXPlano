// import React from 'react';
import { Link } from 'react-router-dom';
import GoogleReviewList from '../components/GoogleReviewList';

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-2 mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:mt-6 lg:mt-8 lg:px-8 xl:mt-10">
              <div className="sm:text-center lg:text-left pl-8 md:pl-12 lg:pl-16">
                <h2 className="text-2xl tracking-tight font-extrabold text-white sm:text-3xl md:text-4xl">
                  <span className="block">Bare Windows?  Broken Blinds?  Outdated Curtains?</span>
                </h2>

                {/* Subheading */}
                <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 font-medium">
                  Whatever the problem, JDX has the fix — custom window treatments, professionally installed across North Texas since 2015
                </p>

                {/* Phone Number - Prominently Displayed */}
                <div className="mt-6 mb-4">
                  <a
                    href="tel:945-249-4851"
                    className="inline-flex items-center text-3xl sm:text-4xl md:text-5xl font-black text-yellow-300 hover:text-yellow-200 transition-all duration-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.7)]"
                    style={{ textShadow: '0 0 20px rgba(253, 224, 71, 0.8)' }}
                  >
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mr-3 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    945-249-4851
                  </a>
                </div>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/estimate"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Free Estimate
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/gallery"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                    >
                      View Our Work
                    </Link>
                  </div>
                </div>

                {/* Animated Features */}
                <div className="mt-8 h-10 relative overflow-hidden">
                  <div className="slide-feature-item absolute flex items-center text-white text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap uppercase">
                    <span className="text-yellow-400 mr-2 text-2xl">✓</span>
                    Lifetime A/S support
                  </div>
                  <div className="slide-feature-item absolute flex items-center text-white text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap uppercase">
                    <span className="text-yellow-400 mr-2 text-2xl">✓</span>
                    100% free installation
                  </div>
                  <div className="slide-feature-item absolute flex items-center text-white text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap uppercase">
                    <span className="text-yellow-400 mr-2 text-2xl">✓</span>
                    Fast in-home consultation
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-12 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">
              Why Choose Us
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Excellence in Every Detail
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Expert Craftsmanship',
                  description:
                    'Our team of skilled professionals brings years of experience to every project.',
                },
                {
                  title: 'Quality Materials',
                  description:
                    'We use only the finest materials to ensure lasting beauty and durability.',
                },
                {
                  title: 'Custom Design',
                  description: 'Every project is tailored to your unique style and requirements.',
                },
                {
                  title: 'Satisfaction Guaranteed',
                  description:
                    "Your happiness is our priority. We won't stop until you're completely satisfied.",
                },
              ].map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-600 text-gray-900">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GoogleReviewList />
    </div>
  );
};

export default HomePage;
