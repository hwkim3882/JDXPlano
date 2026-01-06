import React from 'react';

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 text-sm mb-4">Last updated: January 2025</p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              When you request a free estimate, we collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Name and contact information (email, phone number)</li>
              <li>Address for in-home consultation</li>
              <li>Preferred visit date and time</li>
              <li>Product interests and preferences</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use the information you provide to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Schedule and confirm your free consultation</li>
              <li>Contact you regarding your estimate request</li>
              <li>Send appointment reminders via SMS or email</li>
              <li>Provide quotes and product recommendations</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. SMS Communications</h2>
            <p className="text-gray-700 leading-relaxed">
              By submitting your phone number, you consent to receive SMS messages related to your estimate request. Message frequency varies. Message and data rates may apply.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>To opt-out:</strong> Reply STOP to any SMS message to unsubscribe.<br />
              <strong>For help:</strong> Reply HELP for assistance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only with service providers who assist us in operating our business (e.g., appointment scheduling, SMS services).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about this Privacy Policy or to exercise your rights, please contact us at:<br />
              Email: info@jdxplano.com<br />
              Phone: (214) 656-9729
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
