import { Hotspot } from '../data/hotspots';

// Factory function to create a marker overlay
export function createMarkerOverlay(
  hotspot: Hotspot,
  onMarkerClick: (hotspot: Hotspot) => void
) {
  const markerElement = document.createElement('div');
  markerElement.className = 'marker';
  markerElement.style.cssText = `
    width: 20px;
    height: 20px;
    background-color:rgb(47, 255, 0);
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
  `;
  
  // Add hover effect
  markerElement.addEventListener('mouseenter', () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
    markerElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
  });
  
  markerElement.addEventListener('mouseleave', () => {
    markerElement.style.transform = 'translate(-50%, -50%) scale(1)';
    markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
  });
  
  // Add title for tooltip
  markerElement.title = hotspot.title;
  
  // Add click handler
  markerElement.addEventListener('click', () => onMarkerClick(hotspot));

  // Dynamically import OpenLayers Overlay
  return import('ol/Overlay').then(({ default: Overlay }) => {
    const overlay = new Overlay({
      element: markerElement,
      positioning: 'center-center',
    });

    overlay.setPosition(hotspot.position);
    return overlay;
  });
} 