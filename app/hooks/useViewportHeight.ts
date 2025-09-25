'use client';
import { useEffect, useState } from 'react';

export function useViewportHeight() {
  const [vh, setVh] = useState(0);
  const [safeAreaBottom, setSafeAreaBottom] = useState(0);

  useEffect(() => {
    const updateViewportHeight = () => {
      // Get the actual viewport height
      const vh = window.innerHeight * 0.01;
      setVh(vh);
      
      // Update CSS custom property
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Get safe area inset bottom (for devices with notches/home indicators)
      const safeAreaBottom = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--safe-area-inset-bottom')
          .replace('px', '') || '0'
      );
      setSafeAreaBottom(safeAreaBottom);
    };

    // Initial calculation
    updateViewportHeight();

    // Update on resize (handles browser UI show/hide)
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    // Update on visual viewport changes (better for mobile browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
      }
    };
  }, []);

  return { vh, safeAreaBottom };
}
