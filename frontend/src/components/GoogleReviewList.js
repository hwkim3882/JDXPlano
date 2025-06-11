import React, { useEffect, useState } from 'react';

export default function GoogleReviewList() {
  const [reviews, setReviews] = useState([]);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    fetch('https://kwy0jqwi63.execute-api.us-west-1.amazonaws.com/dev/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      });
  }, []);

  if (!reviews.length) return null;

  return (
    <section className="relative z-10 w-full flex flex-col items-center bg-[#16213e]/60 py-16 px-2">
      <h2 className="text-4xl font-bold text-white text-center mb-2">Real Customer Reviews</h2>
      <p className="text-lg text-gray-200 text-center mb-8">
        Check out real reviews from customers who chose JDX Blind!
      </p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-5xl mb-6">
        {reviews.slice(0, 3).map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-4 w-full md:w-72 flex flex-col justify-start border-t-4 border-blue-400 min-h-[260px] max-h-[260px]"
          >
            <div className="flex items-center mb-3">
              {r.profile_photo_url && !imgError[i] ? (
                <img
                  src={r.profile_photo_url}
                  alt={r.author_name || 'Anonymous'}
                  className="w-10 h-10 rounded-full mr-3 border-2 border-blue-400 object-cover"
                  onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-lg font-bold text-blue-800">
                  {r.author_name ? r.author_name[0] : '?'}
                </div>
              )}
              <div className="flex items-center justify-between w-44">
                <span className="font-semibold text-gray-900 truncate">
                  {r.author_name || 'Anonymous'}
                </span>
                {r.author_url ? (
                  <a href={r.author_url} target="_blank" rel="noopener noreferrer">
                    <img src="/google_g_icon.png" alt="Google" className="w-6 h-6 ml-1" />
                  </a>
                ) : (
                  <img src="/google_g_icon.png" alt="Google" className="w-6 h-6 ml-1" />
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500 mb-1">{r.relative_time_description || ''}</span>
            <div className="flex items-center mb-2">
              {[...Array(r.rating || 0)].map((_, idx) => (
                <svg
                  key={idx}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <div className="text-gray-800 text-base mb-2 min-h-[60px] max-h-[120px] overflow-y-auto">
              {r.text || ''}
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://search.google.com/local/writereview?placeid=ChIJ5cDjSvMnTIYRUyksVzTGHRQ"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow transition mb-6"
      >
        Write a review
      </a>
      <p className="text-white text-center text-lg font-semibold mt-2">
        "The Smartest Choice for Long-Lasting, High-Quality Blinds – JDX Blinds!"
      </p>
    </section>
  );
}
