import { Hotspot } from '../data/hotspots';

// Factory function to create a marker overlay
export function createMarkerOverlay(
  hotspot: Hotspot,
  onMarkerClick: (hotspot: Hotspot) => void
) {
  const markerElement = document.createElement('div');
  markerElement.className = 'marker';
  
  // Generate different hue based on hotspot ID for color variation
  const hue = (hotspot.id.charCodeAt(0) * 137.5) % 360; // Golden angle approximation for good distribution
  const baseColor = `hsl(${hue}, 70%, 50%)`;
  const glowColor = `hsl(${hue}, 70%, 60%)`;
  
  markerElement.style.cssText = `
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at 30% 30%, ${baseColor}, ${glowColor});
    border-radius: 0;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    border: 2px solid;
    border-image: linear-gradient(45deg, ${baseColor}, ${glowColor}) 1;
    box-shadow: 
      inset 0 0 8px rgba(255,255,255,0.3),
      0 0 10px ${glowColor},
      0 0 20px ${glowColor},
      0 0 30px ${glowColor};
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
    animation: pulse-glow 2s ease-in-out infinite;
    outline: none;
  `;
  
  // Add CSS animation for pulsing glow effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 
          0 0 10px ${glowColor},
          0 0 20px ${glowColor},
          0 0 30px ${glowColor},
          0 2px 4px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
      }
      50% {
        box-shadow: 
          0 0 15px ${glowColor},
          0 0 25px ${glowColor},
          0 0 35px ${glowColor},
          0 2px 4px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
      }
    }
  `;
  
  // Only add the style once to avoid duplicates
  if (!document.querySelector('#marker-styles')) {
    style.id = 'marker-styles';
    document.head.appendChild(style);
  }
  
  // Add hover and focus effects
  const handleFocus = () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1.3)';
    markerElement.style.boxShadow = `
      0 0 20px ${glowColor},
      0 0 30px ${glowColor},
      0 0 40px ${glowColor},
      0 4px 8px rgba(0,0,0,0.4)
    `;
  };

  const handleBlur = () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1)';
    markerElement.style.boxShadow = `
      0 0 10px ${glowColor},
      0 0 20px ${glowColor},
      0 0 30px ${glowColor},
      0 2px 4px rgba(0,0,0,0.3)
    `;
  };

  markerElement.addEventListener('mouseenter', handleFocus);
  markerElement.addEventListener('mouseleave', handleBlur);
  markerElement.addEventListener('focus', handleFocus);
  markerElement.addEventListener('blur', handleBlur);
  
  // Add accessibility attributes
  markerElement.setAttribute('tabindex', '0');
  markerElement.setAttribute('role', 'button');
  markerElement.setAttribute('aria-label', `Visit ${hotspot.title}`);
  markerElement.title = hotspot.title;
  
  // Add click handler
  markerElement.addEventListener('click', () => onMarkerClick(hotspot));
  
  // Add keyboard handler
  markerElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onMarkerClick(hotspot);
    }
  });

  // Dynamically import OpenLayers Overlay
  return import('ol/Overlay').then(({ default: Overlay }) => {
    const overlay = new Overlay({
      element: markerElement,
      positioning: 'center-center',
    });

    overlay.setPosition(hotspot.position);
    
    // Ensure accessibility attributes are set after overlay creation
    setTimeout(() => {
      if (markerElement.parentNode) {
        markerElement.setAttribute('tabindex', '0');
        markerElement.setAttribute('role', 'button');
        markerElement.setAttribute('aria-label', `Visit ${hotspot.title}`);
        markerElement.title = hotspot.title;
      }
    }, 100);
    
    // Also set attributes immediately
    markerElement.setAttribute('tabindex', '0');
    markerElement.setAttribute('role', 'button');
    markerElement.setAttribute('aria-label', `Visit ${hotspot.title}`);
    markerElement.title = hotspot.title;
    
    return overlay;
  });
} 