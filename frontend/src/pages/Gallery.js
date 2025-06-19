import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const blinds = [
    { name: 'COMBI BLINDS', img: 'Combi-Blinds.jpg', key: 'combi' },
    { name: 'ROLL BLINDS', img: 'Roll-Blinds.jpg', key: 'roll' },
    { name: 'SHUTTER', img: 'shutter_inbedroom.jpg', key: 'shutter' },
    { name: 'PATIO SCREEN', img: 'patioscreen.jpg', key: 'patio' },
    { name: 'SOLAR SCREEN', img: 'Sunscreen.jpg', key: 'solar' },
    // { name: 'TWIN SHADES', img: 'Twin-Shade.jpg', key: 'twin' },
    // { name: 'TRIPLE SHADES', img: 'Triple-Shade.jpg', key: 'triple' },
    { name: '2" BLINDS & CORDLESS / SMART CURTAIN', img: 'smart-curtain.jpg', key: 'smartcurtain' },
    // { name: 'ART BLINDS', img: 'Art-Blinds.jpg', key: 'art' },
  ];

  return (
    <div
      className="bg-gray-100 flex flex-col items-center w-full"
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    >
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <div className="flex justify-center mb-8">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition text-lg shadow"
          onClick={() => navigate('/estimate')}
        >
          Free Estimation
        </button>
      </div>
      {/* <h2 className="text-2xl font-bold mb-4">Browse by Blind Type</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl mb-10">
        {blinds.map((b) => (
          <div
            key={b.key}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/gallery/${b.key}`)}
          >
            <img
              src={`/images/blinds/${b.img}`}
              alt={b.name}
              className="w-56 h-40 object-cover rounded shadow mb-3"
            />
            <div className="text-lg font-semibold text-center">{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
