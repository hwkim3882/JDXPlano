import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

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

  const productOptions = [
    { value: 'Shades', label: 'Shades(COMBO, ROLLER, MOTORIZED)' },
    { value: 'Shutters', label: 'Shutters' },
    { value: 'Blinds', label: 'Blinds' },
    { value: 'Patio Screen', label: 'Patio Screen' },
    { value: 'Curtains', label: 'Curtains' },
  ];
  const allProductValues = productOptions.map((p) => p.value);

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

  const handleSelectAllProducts = (e) => {
    const { checked } = e.target;
    setForm((prev) => ({
      ...prev,
      products: checked ? allProductValues : [],
    }));
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
        'https://qrns9viws0.execute-api.us-west-1.amazonaws.com/dev/estimate',
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
              alt="JDX Blinds and Curtains"
              style={{
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
              }}
              className="rounded-lg"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 text-center tracking-tight font-serif">
              Get Your Free Estimate
            </h1>
            <p className="text-gray-700 mb-4 text-center">Please fill out the form below.</p>
            <p className="text-red-800 italic text-center mb-8 px-4 font-serif">
              Enjoy a complimentary in-home consultation.{' '}
            </p>

            <p className="text-gray-600 text-center mb-8 px-4 font-serif">
              Our design expert will visit your home, take precise measurements, and provide a
              personalized quote—with no pressure or obligation.
            </p>

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
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
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
                  Preferred Visit Date <span className="text-red-600">*</span>
                </label>
                <div className="relative mt-1">
                  <DatePicker
                    selected={form.visitDay}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    minDate={(() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 1);
                      return d;
                    })()}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholderText="e.g., 05/15/2024"
                    id="visitDay"
                    required
                    filterDate={(date) => date.getDay() !== 0}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              {/* Visiting Hours (Dropdown) */}
              <div>
                <label
                  htmlFor="visitHours"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Preferred Visit Time
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="visitHours"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    placeholder="e.g., 10:00 AM"
                    value={form.visitHours}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We will contact you to confirm the appointment based on your availability.
                </p>
              </div>
              {/* Products of Interest (Checkboxes) */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Products of Interest
                </label>
                <div className="mt-2 space-y-2 flex flex-col">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      onChange={handleSelectAllProducts}
                      checked={form.products.length === allProductValues.length}
                    />
                    <span className="ml-2 text-gray-700 font-semibold">Select all that apply</span>
                  </label>
                  <div className="pl-6 mt-2 space-y-2 flex flex-col border-l-2 border-gray-200">
                    {productOptions.map(({ value, label }) => (
                      <label className="flex items-center" key={value}>
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          value={value}
                          name="products"
                          checked={form.products.includes(value)}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
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
