import React from 'react';
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
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Space</span>
                  <span className="block text-yellow-600">With JDX Plano</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Experience the perfect blend of style and functionality with our expert remodeling
                  services. From kitchens to bathrooms, we bring your vision to life.
                </p>
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
