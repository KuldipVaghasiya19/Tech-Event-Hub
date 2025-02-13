import React, { useState, useEffect } from 'react';

const HeroSection = ({ onSignUp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
          alt="Tech Event Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-900/40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full pt-16">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover & Join Amazing Tech Events
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Connect with the tech community, learn from experts, and showcase
              your skills at the best tech events worldwide.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => onSignUp('signup-organization')}
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Register as Organization
              </button>
              <button
                onClick={() => onSignUp('signup-participant')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Join as Participant
              </button>
            </div>
          </div>

          <div className="w-1/2 flex justify-end overflow-hidden relative">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Tech Event ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;