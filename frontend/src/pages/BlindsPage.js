import React from 'react';

const blinds = [
  { name: 'COMBI BLINDS', img: 'combi.jpg' },
  { name: 'TWIN SHADES', img: 'twin.jpg' },
  { name: 'TRIPLE SHADES', img: 'triple.jpg' },
  { name: 'BLACKOUT BLINDS', img: 'blackout.jpg' },
  { name: 'ROLL BLINDS', img: 'roll.jpg' },
  { name: 'SOLAR SCREEN', img: 'solar.jpg' },
  { name: 'LASER BLINDS', img: 'laser.jpg' },
  { name: 'ART BLINDS', img: 'art.jpg' },
  { name: 'PATIO SCREEN', img: 'roman.jpg' },
];

export default function BlindsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10">
      {/* <h1 className="text-3xl font-bold mb-2">BLINDS</h1>
      <p className="text-gray-600 mb-6">
        Our blinds are just as beautiful and aesthetically pleasing as they are functional.
      </p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded mb-10 transition">
        CONTACT US &nbsp; &gt;
      </button> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl mb-10">
        {blinds.map((b) => (
          <div key={b.name} className="flex flex-col items-center">
            <img
              src={`/images/blinds/${b.img}`}
              alt={b.name}
              className="w-56 h-40 object-cover rounded shadow mb-3"
            />
            <div className="text-lg font-semibold text-center">{b.name}</div>
          </div>
        ))}
      </div>
      <img src="/jdx-logo.png" alt="JDX Logo" className="h-12 mt-8" />
    </div>
  );
}
