// import React from 'react';

const reasons = [
  {
    title: 'Expertise You Can Trust',
    desc: `With years of experience in window treatment, JDX offers premium-quality blinds, shades, and curtains tailored to your unique space. Whether you're building a new home or refreshing your current one, our team provides expert consultation to help you choose the perfect design.`,
    icon: '🏆',
  },
  {
    title: 'Free In-Home Estimates',
    desc: `Our no-obligation consultation includes free in-home measuring and design guidance. We come to you — so you can see how each option looks in your actual space before you decide.`,
    icon: '📏',
  },
  {
    title: 'Showrooms You Can Visit',
    desc: `Located inside H-Mart in Plano, our showroom displays a wide selection of popular and trending blinds and shades. Feel the materials, explore the colors, and ask us questions in person.`,
    icon: '🏬',
  },
  {
    title: 'Custom-Made, Fast Turnaround',
    desc: `Every JDX window treatment is made-to-order to fit your windows precisely. With our efficient process and reliable partners, your custom blinds or curtains can be installed in as little as 4-6 weeks.`,
    icon: '⚡',
  },
  {
    title: 'Professional Installation',
    desc: `Our experienced installers ensure that your blinds are installed safely and perfectly aligned — no hassle, no mess. We treat your home like it's our own.`,
    icon: '🛠️',
  },
  {
    title: 'Multilingual Customer Support',
    desc: `We proudly serve the Korean, English, and Chinese-speaking communities in DFW. Our friendly team is here to help every step of the way — from selection to installation and after-care.`,
    icon: '🌐',
  },
  {
    title: 'Affordable Elegance',
    desc: `Get premium blinds and curtains without the premium price. JDX works directly with trusted manufacturers to deliver elegant solutions that match your style and budget.`,
    icon: '💎',
  },
];

export default function WhyJDX() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Why JDX?</h1>
      <div className="max-w-3xl w-full grid grid-cols-1 gap-8">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="flex items-start gap-5 bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl md:text-5xl select-none" style={{ minWidth: 56 }}>
              {r.icon}
            </div>
            <div>
              <div className="text-xl font-bold mb-1">
                {i + 1}. {r.title}
              </div>
              <div className="text-gray-700 text-base leading-relaxed">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
