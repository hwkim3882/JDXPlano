import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/estimate', label: 'Free Estimate' },
    { path: '/gallery', label: 'Gallery' },
    //{ path: '/ai-recommendation', label: 'AI Recommendation' },
    { path: '/whyjdx', label: 'Why JDX' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 bg-opacity-80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="bg-white rounded px-2 py-1">
                  <img
                    src="https://mcusercontent.com/744748f5bd75c9102edd7b1c3/images/891ba646-96cc-c4ab-cd48-324f17d16bfc.png"
                    alt="JDX Plano Logo"
                    className="h-10 w-auto"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <footer
        className="bg-gray-900 bg-opacity-90 text-gray-200 mt-8"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between items-center text-sm">
          {/* 회사 정보 */}
          <div className="mb-4 md:mb-0 text-center md:text-left md:w-1/2">
            <div className="font-semibold">JDX Plano H-mart</div>
            <div>
              Phone:{' '}
              <a href="tel:945-249-4851" className="hover:underline">
                945-249-4851
              </a>
            </div>
            <div>
              E-mail:{' '}
              <a href="mailto:info@jdxplano.com" className="hover:underline">
                info@jdxplano.com
              </a>
            </div>
            <div>Address: 3320 K Avenue, Plano, TX 75074</div>
            <div>Hours : Mon-Sun 10:00 ~ 19:00</div>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <a
                href="https://instagram.com/jdxplano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-pink-500 hover:text-pink-600"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13-.38a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
                </svg>
                <span className="text-xs">Follow us on Instagram</span>
              </a>
            </div>
          </div>
          {/* 지도 */}
          <div className="w-full md:w-1/2 flex justify-center">
            <iframe
              title="JDX Plano Location"
              src="https://www.google.com/maps?q=3320+K+Avenue,+Plano,+TX+75074&output=embed"
              width="100%"
              height="140"
              style={{ maxWidth: 250, border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="text-center py-2 text-xs border-t border-gray-700">
          &copy; {new Date().getFullYear()} JDX Plano. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
