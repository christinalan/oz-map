'use client';
import { useState } from 'react';

export default function HomePage() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterOz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = '/explore';
    }, 300);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Loading Screen */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative w-full h-full text-center">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/map_blur.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in" style={{ zIndex: 2 }}>
            <div className="py-16 p-12">
              <h1 className="text-white text-4xl md:text-5xl font-bold font-pt-monument transition-all duration-300 mb-8">
                Explore Oz
              </h1>
                <button
                  onClick={handleEnterOz}
                  className="px-6 py-2 pt-3 text-2xl rounded-lg shadow-2xl hover:scale-105 transition-all font-pt-monument"
                  style={{ backgroundColor: '#3C9A78', boxShadow: '0 8px 32px 16px rgba(60,154,120,0.45)' }}
                >
                  Enter
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}