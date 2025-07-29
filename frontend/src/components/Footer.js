function Footer() {
  return (
    <footer
      className="bg-gray-900 bg-opacity-90 text-gray-200 mt-auto"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side: Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">JDX Plano H-mart</h3>
            <div className="text-sm space-y-1 text-gray-300">
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:945-249-4851" className="hover:underline">
                  945-249-4851
                </a>
              </p>
              <p>
                <strong>E-mail:</strong>{' '}
                <a href="mailto:info@jdxplano.com" className="hover:underline">
                  info@jdxplano.com
                </a>
              </p>
              <p>
                <strong>Address:</strong> 3320 K Avenue, Plano, TX 75074
              </p>
              <p>
                <strong>Hours:</strong> Mon-Sun 10:00 AM - 7:00 PM
              </p>
            </div>
            <div className="flex items-center pt-2">
              <a
                href="https://www.instagram.com/jdxblinds_plano/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-pink-500 hover:text-pink-600 transition"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13-.38a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
                </svg>
                <span className="text-sm font-medium">Follow us on Instagram</span>
              </a>
            </div>
          </div>
          {/* Right Side: Map */}
          <div className="w-full h-48">
            <iframe
              title="JDX Plano Location"
              src="https://www.google.com/maps?q=3320+K+Avenue,+Plano,+TX+75074&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} JDX Plano. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
