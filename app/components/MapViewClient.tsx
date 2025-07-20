'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

export default function MapViewClient() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);

  // Preload high-res png
  useEffect(() => {
    const img = new window.Image();
    img.src = '/map_highres.jpg';
    img.onload = () => setHighResLoaded(true);
    console.log('High-res png loaded:', highResLoaded);
  }, []);

  const handleMapLoad = (loaded: boolean) => {
    setIsMapLoaded(loaded);
  };

  const handleEnterOz = () => {
    if (isMapLoaded) {
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
          <div className="text-center w-full h-full relative">
            <Image 
              src={highResLoaded ? "/map_highres.jpg" : "/map_full.webp"}
              alt="Loading Map" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className={`text-black text-6xl font-bold retro-text cursor-pointer transition-all duration-300 ${
                isMapLoaded && highResLoaded ? 'animate-pulse hover:scale-110' : 'animate-pulse'
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