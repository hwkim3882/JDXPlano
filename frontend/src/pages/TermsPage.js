import React from 'react';

function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 text-sm mb-4">Last updated: January 2025</p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the JDX Plano website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Services</h2>
            <p className="text-gray-700 leading-relaxed">
              JDX Plano provides window treatment solutions including blinds, shades, shutters, and curtains. We offer free in-home consultations and professional installation services in the Dallas-Fort Worth metroplex area.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Free Estimate Requests</h2>
            <p className="text-gray-700 leading-relaxed">
              When you submit a free estimate request, you agree to provide accurate contact information. We will use this information to schedule your consultation and may contact you via phone, email, or SMS regarding your request.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. SMS Communications</h2>
            <p className="text-gray-700 leading-relaxed">
              By providing your phone number, you consent to receive SMS messages from JDX Plano regarding your estimate request and appointment scheduling. Message and data rates may apply. You can opt-out at any time by replying STOP to any message.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed">
              All prices quoted during consultations are valid for 30 days. Final pricing may vary based on actual measurements and product specifications. Payment terms will be discussed during your consultation.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              JDX Plano shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms & Conditions, please contact us at:<br />
              Email: info@jdxplano.com<br />
              Phone: (214) 656-9729
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
