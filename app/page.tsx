'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = '/map_highres.webp';
    img.onload = () => setHighResLoaded(true);
  }, []);

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
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative w-full h-full text-center">
          {/* Blurred background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/map_full.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: highResLoaded ? 'none' : 'blur(4px)',
              zIndex: 0,
            }}
          />
          {/* High-res image overlays the background when loaded */}
          {highResLoaded && (
            <Image 
              src="/map_highres.webp"
              alt="Loading Map" 
              fill
              className="object-cover transition-opacity duration-500 opacity-100"
              priority
              style={{ zIndex: 1, position: 'absolute', inset: 0 }}
            />
          )}
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
            <h1 className="text-black text-4xl md:text-6xl font-pt-monument transition-all duration-300 animate-pulse mb-8">
              {highResLoaded ? 'Explore Oz' : 'Loading'}
            </h1>
            {highResLoaded && (
              <button
                onClick={handleEnterOz}
                className="px-6 py-2 pt-3 text-2xl rounded-lg shadow-2xl hover:scale-105 transition-transform font-bold font-pt-monument"
                style={{ backgroundColor: '#3C9A78', boxShadow: '0 8px 32px 16px rgba(60,154,120,0.45)' }}
              >
                Enter
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}