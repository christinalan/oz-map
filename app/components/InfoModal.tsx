'use client';
import { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 border border-white/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
		  tabIndex={0}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          </button>
          <span className="sr-only">Close</span>

        {/* Content */}
        <div className="text-left font-pt-monument">
          <h2 className="text-white text-xl font-bold mb-6 text-left">How to Navigate</h2>
          <div className="space-y-2 text-white">
            <div className="flex items-start space-x-3">
              <span className="text-primary text-sm">1.</span>
              <span className="text-sm">Traverse the map using touch, mouse, or arrow keys</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary text-sm">2.</span>
              <span className="text-sm">Zoom in and out using controls near the bottom left corner of the map</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary text-sm">3.</span>
              <span className="text-sm">Tap on white flags to discover hidden locations and stories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
