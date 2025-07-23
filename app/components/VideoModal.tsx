'use client';
import { useEffect, useRef, useState } from 'react';
import { Hotspot } from '../data/hotspots';

interface VideoModalProps {
  hotspot: Hotspot | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ hotspot, isOpen, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Handle fade-in transition
  useEffect(() => {
    if (isOpen) {
      // Start transition after a brief delay to ensure DOM is ready
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      // Immediate close - no transition
      setIsVisible(false);
    }
  }, [isOpen]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !hotspot) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Location title positioned at top */}
      <div className="absolute top-4 z-10 m-auto w-full">
        <h2 className="text-white text-center text-2xl font-pt-monument drop-shadow-lg">
          {hotspot.title}
        </h2>
      </div>

      {/* Video Player - direct child of modal overlay */}
      <div
        ref={modalRef}
        className={`w-full h-full transition-transform duration-300 ease-out ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        tabIndex={-1}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls
          preload="metadata"
          poster={hotspot.thumbnail}
        >
          <source src={hotspot.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Return to Oz button positioned at bottom */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute bottom-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-lg px-4 py-2 retro-text"
        aria-label="Return to Oz"
      >
        Return to Oz
      </button>
    </div>
  );
} 