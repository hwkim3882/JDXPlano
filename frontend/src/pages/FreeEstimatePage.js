import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const TABLE_NAME = 'Estimates-dev';

function FreeEstimatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    visitDay: null,
    visitHours: '',
    products: [],
    heardAbout: [],
    marketingPermission: false,
  });

  const requiredFields = [
    { id: 'email', label: 'Email Address' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'zip', label: 'Postal/Zip' },
    { id: 'visitDay', label: 'Visit Day' },
  ];

  const handleChange = (e) => {
    const { id, value, type, checked, name } = e.target;
    if (type === 'checkbox' && name === 'products') {
      setForm((prev) => ({
        ...prev,
        products: checked ? [...prev.products, value] : prev.products.filter((v) => v !== value),
      }));
    } else if (type === 'checkbox' && name === 'heardAbout') {
      setForm((prev) => ({
        ...prev,
        heardAbout: checked
          ? [...prev.heardAbout, value]
          : prev.heardAbout.filter((v) => v !== value),
      }));
    } else if (type === 'checkbox' && id === 'marketingPermission') {
      setForm((prev) => ({ ...prev, marketingPermission: checked }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, visitDay: date }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 필수 입력값 체크
    for (const field of requiredFields) {
      if (!form[field.id] || (field.id === 'visitDay' && !form.visitDay)) {
        alert(`${field.label} is required.`);
        const el = document.getElementById(field.id);
        if (el) el.focus();
        return;
      }
    }
    const payload = {
      ...form,
      visitDay: form.visitDay ? form.visitDay.toISOString().slice(0, 10) : '',
    };
    try {
      const res = await fetch(
        'https://kwy0jqwi63.execute-api.us-west-1.amazonaws.com/dev/estimate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success('Thank you for your request! We will get back to you soon.');
        setTimeout(() => {
          navigate('/');
        }, 1600);
      } else {
        toast.error('Sorry, your request could not be processed. Please try again later.');
      }
    } catch (err) {
      alert('에러: ' + err.message);
    }
  };

  console.log('FreeEstimatePage 렌더링됨');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto my-2 sm:my-4 px-4 sm:px-6 lg:px-8">
          {/* Add hero image at the top */}
          <div className="mb-4 flex justify-center">
            <img
              src="https://mcusercontent.com/744748f5bd75c9102edd7b1c3/images/891ba646-96cc-c4ab-cd48-324f17d16bfc.png"
              alt="JDX Plano Hero"
              style={{
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
              }}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h1
              className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 text-center tracking-tight"
              style={{ fontWeight: 900 }}
            >
              Get Your Free Estimate
            </h1>
            <p className="text-gray-700 mb-8 text-center">Please fill out the form below.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {/* Name */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Name <span className="text-red-600">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-gray-800 text-sm font-semibold mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-gray-800 text-sm font-semibold mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 mb-4"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="address2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Address Line 2"
                  value={form.address2}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="State/Prov/Region"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="zip"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Postal/Zip"
                  value={form.zip}
                  onChange={handleChange}
                />
                <select
                  id="country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  value={form.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Country--</option>
                  <option value="USA">USA</option>
                  {/* TODO: Add more countries */}
                </select>
              </div>
              {/* Visit Day (Date Picker) */}
              <div>
                <label
                  htmlFor="visitDay"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Visit Day <span className="text-red-600">*</span>
                </label>
                <DatePicker
                  selected={form.visitDay}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  minDate={(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d; })()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholderText="Select a date"
                  id="visitDay"
                  required
                  filterDate={date => date.getDay() !== 0}
                />
              </div>
              {/* Visiting Hours (Dropdown) */}
              <div>
                <label
                  htmlFor="visitHours"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Visiting Hours 
                </label>
                <select
                  id="visitHours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus::border-transparent transition duration-200"
                  value={form.visitHours}
                  onChange={handleChange}
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
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Purchasing Products
                </label>
                
                <div className="mt-2 space-y-2 flex flex-col">
                <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value="SHADE(COMBI,ROLLER)"
                      name="products"
                      checked={form.products.includes('SHADE(COMBI,ROLLER)')}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">SHADE(COMBI, ROLLER, MOTORIZED)</span>
                  </label>
                <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value="SHUTTER"
                      name="products"
                      checked={form.products.includes('SHUTTER')}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">SHUTTER</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value="BLINDS"
                      name="products"
                      checked={form.products.includes('BLINDS')}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">BLINDS</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value="PATIO SCREEN"
                      name="products"
                      checked={form.products.includes('PATIO SCREEN')}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">PATIO SCREEN</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value="CURTAIN"
                      name="products"
                      checked={form.products.includes('CURTAIN')}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">CURTAIN</span>
                  </label>
                </div>
              </div>
              {/* How did you hear about us? (Checkboxes) */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  How did you hear about us?
                </label>
                <div className="mt-2 space-y-2 flex flex-col">
                  {['Our website', 'Google', 'Drive By', 'Social Media', 'Community', 'Other'].map(
                    (label) => (
                      <label key={label} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          value={label}
                          name="heardAbout"
                          checked={form.heardAbout.includes(label)}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-gray-700">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              {/* Message or comments */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Message or comments (optional)
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder="Message or comments"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              {/* Marketing Permissions (Checkbox) */}
              {/* <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    id="marketingPermission"
                    checked={form.marketingPermission}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    Please select all the ways you would like to hear from JDX
                    Plano: Email
                  </span>
                </label>
                {/* TODO: Add privacy policy link */}
              {/* </div> */}
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
      <ToastContainer />
    </div>
  );
}

export default FreeEstimatePage;
