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
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in " style={{ zIndex: 2 }}>
            <div className="py-16 p-6 md:p-12">
              <h1 className="text-white text-4xl md:text-5xl font-bold font-pt-monument transition-all duration-300 mb-8 text-center text-shadow-xl drop-shadow-lg">
                The Lost <br className="block xl:hidden"/>Lands of Oz
              </h1>
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
                <div className="text-left font-pt-monument text-lg transition-all duration-300 mb-8">
                  <h2 className="text-white text-md font-bold mb-4">How to Navigate</h2>
                  <div className="space-y-3 text-white">
                    <div className="flex items-start space-x-3 text-sm">
                      <span className="text-primary font-bold">1.</span>
                      <span>Traverse the map using touch, mouse, or arrow keys</span>
                    </div>
                    <div className="flex items-start space-x-3 text-sm">
                      <span className="text-primary font-bold ">2.</span>
                      <span>Zoom in and out using controls near the bottom left corner of the map</span>
                    </div>
                    <div className="flex items-start space-x-3 text-sm">
                      <span className="text-primary font-bold">3.</span>
                      <span>Tap on white flags to discover hidden locations and stories</span>
                    </div>
                  </div>
                </div>
                  <button
                    onClick={handleEnterOz}
                    className="px-6 py-2 pt-3 text-lg shadow-2xl hover:scale-105 transition-all font-pt-monument bg-primary text-white"
                    style={{ boxShadow: '0 8px 32px 16px rgba(60,154,120,0.45)' }}
                  >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}