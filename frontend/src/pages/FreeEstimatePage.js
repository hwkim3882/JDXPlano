import React, { useState } from 'react';

function FreeEstimatePage() {
  // Optional: Add state management for form inputs here later
  // const [formData, setFormData] = useState({});
  // TODO: Add state for "How did you hear about us?" checkboxes

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add form submission logic here later
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto my-8 sm:my-12 px-4 sm:px-6 lg:px-8">
          {/* Add hero image at the top */}
          <div className="mb-4 flex justify-center">
            <img 
              src="https://mcusercontent.com/744748f5bd75c9102edd7b1c3/images/891ba646-96cc-c4ab-cd48-324f17d16bfc.png"
              alt="JDX Plano Hero"
              style={{ 
                maxWidth: '200px',
                height: 'auto',
                display: 'block'
              }}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 text-center tracking-tight" style={{ fontWeight: 900 }}>
              Get Your Free Estimate
            </h1>
            <p className="text-gray-700 mb-8 text-center">Please fill out the form below.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">Email Address <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  required
                  // TODO: Add value and onChange handlers
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Name</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholder="First Name"
                    // TODO: Add value and onChange handlers
                  />
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholder="Last Name"
                    // TODO: Add value and onChange handlers
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-gray-800 text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  // TODO: Add value and onChange handlers
                />
              </div>

              {/* Address */}
               <div>
                <label htmlFor="address" className="block text-gray-800 text-sm font-semibold mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 mb-4"
                  placeholder="Street Address"
                   // TODO: Add value and onChange handlers
                />
                 <input
                  type="text"
                  id="address2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Address Line 2"
                   // TODO: Add value and onChange handlers
                />
              </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="City"
                  // TODO: Add value and onChange handlers
                />
                 <input
                  type="text"
                  id="state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="State/Prov/Region"
                  // TODO: Add value and onChange handlers
                />
              </div>
               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="zip"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Postal/Zip"
                   // TODO: Add value and onChange handlers
                />
                 <select
                   id="country"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    // TODO: Add value and onChange handlers
                 >
                   <option value="">--Select Country--</option>
                   <option value="USA">USA</option>
                   {/* TODO: Add more countries */}
                 </select>
               </div>

              {/* Visit Day (Date Picker) */}
               {/* Note: Implementing a date picker requires a library or custom component */}\
               {/* For now, adding a text input as a placeholder */}
              <div>
                <label htmlFor="visitDay" className="block text-gray-800 text-sm font-semibold mb-2">Visit Day</label>
                <input
                  type="text"
                  id="visitDay"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Select a date"
                   // TODO: Add value and onChange handlers
                />
              </div>

              {/* Visiting Hours (Dropdown) */}
              <div>
                <label htmlFor="visitHours" className="block text-gray-800 text-sm font-semibold mb-2">Visiting Hours</label>
                <select
                  id="visitHours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus::border-transparent transition duration-200"
                   // TODO: Add value and onChange handlers
                >
                  <option value="">--Select Time--</option>
                  <option value="10AM-12PM">10 AM - 12 PM</option>
                  <option value="12PM-2PM">12 PM - 2 PM</option>
                  <option value="2PM-4PM">2 PM - 4 PM</option>
                  <option value="4PM-6PM">4 PM - 6 PM</option>
                </select>
              </div>

               {/* Purchasing Products (Checkboxes) */}
               <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Purchasing Products</label>
                 <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-600" value="BLINDS" /* TODO: Add checked/onChange */ />
                    <span className="ml-2 text-gray-700">BLINDS</span>
                  </label>
                   <label className="inline-flex items-center ml-6">
                    <input type="checkbox" className="form-checkbox text-blue-600" value="PATIO SCREEN" /* TODO: Add checked/onChange */ />
                    <span className="ml-2 text-gray-700">PATIO SCREEN</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="checkbox" className="form-checkbox text-blue-600" value="CURTAIN" /* TODO: Add checked/onChange */ />
                    <span className="ml-2 text-gray-700">CURTAIN</span>
                  </label>
                 </div>
               </div>

               {/* How did you hear about us? (Checkboxes) */}
               <div>
                 <label className="block text-gray-800 text-sm font-semibold mb-2">How did you hear about us?</label>
                 <div className="mt-2 space-y-2">
                   <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Our website" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Our website</span>
                   </label>
                    <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Google" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Google</span>
                   </label>
                    <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Drive By" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Drive By</span>
                   </label>
                    <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Social Media" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Social Media</span>
                   </label>
                    <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Community" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Community</span>
                   </label>
                    <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-blue-600" value="Other" /* TODO: Add checked/onChange */ />
                     <span className="ml-2 text-gray-700">Other</span>
                   </label>
                 </div>
               </div>

               {/* Marketing Permissions (Checkbox) */}
               <div className="mb-6">
                 <label className="inline-flex items-center">
                   <input type="checkbox" className="form-checkbox text-blue-600" value="email-marketing" /* TODO: Add checked/onChange */ />
                   <span className="ml-2 text-gray-700 text-sm">Please select all the ways you would like to hear from JDX Plano: Email</span>
                 </label>
                 {/* TODO: Add privacy policy link */}\
               </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                >
                  Submit Free Estimate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeEstimatePage; 