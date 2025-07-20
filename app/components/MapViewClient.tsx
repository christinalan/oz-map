'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

const SKIP_LOADING = false; // Set to false for production

export default function MapViewClient() {
  const [isMapLoaded, setIsMapLoaded] = useState(SKIP_LOADING);
  const [showLoading, setShowLoading] = useState(!SKIP_LOADING);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(SKIP_LOADING);

  // Preload high-res png
  useEffect(() => {
    if (SKIP_LOADING) return;
    const img = new window.Image();
    img.src = '/map_highres.jpg';
    img.onload = () => setHighResLoaded(true);
  }, []);

  const handleMapLoad = (loaded: boolean) => {
    setIsMapLoaded(loaded);
  };

  const handleEnterOz = () => {
    if (isMapLoaded && highResLoaded) {
      setIsTransitioning(true);
      // Fade out loading screen
      setTimeout(() => setShowLoading(false), 300);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {showLoading && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleEnterOz}
        >
          <div
            className="text-center w-full h-full relative"
            style={{
              backgroundImage: 'url(/map_full.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: highResLoaded ? 'none' : 'grayscale(1)'
            }}
          >
            {/* High-res image overlays the webp background when loaded */}
            {highResLoaded && (
              <Image 
                src="/map_highres.jpg"
                alt="Loading Map" 
                fill
                className="object-cover transition-opacity duration-500 opacity-100"
                priority
                style={{ zIndex: 1, position: 'absolute', inset: 0 }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
              <h1 className={`text-black text-6xl font-bold retro-text transition-all duration-300 ${
                isMapLoaded && highResLoaded ? 'animate-pulse hover:scale-110 cursor-pointer' : 'animate-pulse'
              }`}>
                {isMapLoaded && highResLoaded ? 'Explore Oz' : 'Loading'}
              </h1>
            </div>
          </div>
        </div>
      )}
      
      {/* Map View */}
      <MapView onMapLoad={handleMapLoad} />
    </>
  );
}