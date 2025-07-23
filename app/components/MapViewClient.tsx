'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface MapViewClientProps {
  selectedHotspotId?: string | null;
  onCloseHotspot?: () => void;
}

const SKIP_LOADING = false; // Set to false for production

export default function MapViewClient({ selectedHotspotId, onCloseHotspot }: MapViewClientProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(SKIP_LOADING);
  const [showLoading, setShowLoading] = useState(!SKIP_LOADING);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(SKIP_LOADING);

  // Preload high-res png
  useEffect(() => {
    console.log('preloading high-res image');
    if (SKIP_LOADING) return;
    const img = new window.Image();
    img.src = '/map_highres.webp';
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
      <MapView onMapLoad={handleMapLoad} selectedHotspotId={selectedHotspotId} onCloseHotspot={onCloseHotspot} />
    </>
  );
}