import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 화살표 애니메이션 CSS 추가
const arrowAnimationStyle = `
@keyframes arrow-bounce {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
}
.arrow-animate {
  animation: arrow-bounce 1.2s ease-in-out 2;
}
`;

const categoryNames = {
  combi: 'COMBI BLINDS',
  twin: 'TWIN SHADES',
  triple: 'TRIPLE SHADES',
  shutter: 'SHUTTER',
  roll: 'ROLL BLINDS',
  solar: 'SOLAR SCREEN',
  // laser: 'LASER BLINDS',
  art: 'ART BLINDS',
  patio: 'PATIO SCREEN',
  smartcurtain: '2" BLINDS & CORDLESS/ SMART CURTAIN',
};

function Arrow({ className, style, onClick, direction }) {
  return (
    <>
      <style>{arrowAnimationStyle}</style>
      <button
        className={
          `${className} arrow-animate z-20 flex items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full shadow-lg transition w-14 h-14 absolute top-1/2 -translate-y-1/2 focus:outline-none focus:ring-0` +
          (direction === 'left' ? 'left-2' : 'right-2')
        }
        style={{ ...style, display: 'flex' }}
        onClick={onClick}
        aria-label={direction === 'left' ? 'Previous' : 'Next'}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {direction === 'left' ? (
            <polyline points="15 18 9 12 15 6" />
          ) : (
            <polyline points="9 6 15 12 9 18" />
          )}
        </svg>
      </button>
    </>
  );
}

export default function GalleryCategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);
  const sliderRef = useRef(null);
  const name = categoryNames[category] || category;

  useEffect(() => {
    loadImages();
  }, [category]);

  const loadImages = async () => {
    try {
      const listRef = ref(storage, `images/${category}`);
      const result = await listAll(listRef);
      const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
      setImages(urls);
    } catch (error) {
      setImages([]);
      console.error('Error loading images:', error);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || !files.length) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `images/${category}/${fileName}`);
        await uploadBytes(storageRef, file);
      }
      await loadImages();
    } catch (error) {
      alert('Upload failed!');
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    afterChange: (idx) => setCurrentIndex(idx),
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10 px-4 md:px-10">
      <button className="mb-6 text-blue-500 text-sm md:text-base" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <div className="flex justify-center mb-8">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition text-lg shadow"
          onClick={() => navigate('/estimate')}
        >
          Free Estimation
        </button>
      </div>

      {/* <div
        className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors mb-8 w-full max-w-3xl focus:outline-none focus:ring-0
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          multiple
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <svg
            className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          <p className="text-base md:text-lg font-medium text-gray-600 mb-2">
            {isUploading ? 'Uploading...' : 'Drag and drop images here'}
          </p>
          <p className="text-sm text-gray-500">or click to select files</p>
        </div>
      </div>  */}

      {images.length > 0 ? (
        <>
          <div
            // className="w-full max-w-3xl mb-4 flex justify-center items-center bg-gray-100 rounded-lg relative"
            className="w-full max-w-3xl mb-4 flex justify-center items-center rounded-lg relative"
            style={{ overflow: 'hidden' }}
          >
            <Slider ref={sliderRef} {...settings} className="w-full h-full">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className="w-full h-full flex justify-center items-center"
                  style={{ padding: '1rem' }}
                >
                  <img
                    src={url}
                    alt={`시공사진${idx}`}
                    className="max-w-full max-h-[70vh] object-contain mx-auto"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex gap-2 justify-center mb-10 flex-wrap px-2 md:px-0">
            {images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`thumb-${i}`}
                className={`w-16 h-12 md:w-20 md:h-16 object-cover rounded cursor-pointer border-2 ${i === currentIndex ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => sliderRef.current?.slickGoTo(i)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full max-w-3xl h-[300px] flex items-center justify-center bg-gray-100 text-gray-500 text-lg">
          images are loading...
        </div>
      )}

      <style>
        {`
          .slick-slide:focus, .slick-slide img:focus {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </div>
  );
}
