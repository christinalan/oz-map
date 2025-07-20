import { Hotspot } from '../data/hotspots';

// Factory function to create a marker overlay
export function createMarkerOverlay(
  hotspot: Hotspot,
  onMarkerClick: (hotspot: Hotspot) => void
) {
  // Use an img element for the marker
  const markerElement = document.createElement('img');
  markerElement.src = '/flag.svg';
  markerElement.alt = `Visit ${hotspot.title}`;
  markerElement.width = 32;
  markerElement.height = 40;
  markerElement.style.cssText = `
    display: block;
    width: 32px;
    height: 40px;
    cursor: pointer;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    outline: none;
    z-index: 10;
  `;

  // Add hover and focus effects
  const handleFocus = () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
  };
  const handleBlur = () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1)';
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