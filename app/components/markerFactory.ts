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

  // Create pill element for location name
  const pill = document.createElement('div');
  pill.textContent = hotspot.title;
  pill.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    color: #171717;
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 1.25rem;
    font-weight: 700;
    box-shadow: inset 0 0 0 2px #e5e7eb, 0 2px 8px rgba(0,0,0,0.08);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 20000;
    white-space: nowrap;
    pointer-events: none;
  `;

  // Container for marker and pill
  const container = document.createElement('div');
  // Do NOT set position: absolute, left, or top on the container
  container.appendChild(pill);
  container.appendChild(markerElement);

  // Show/hide pill on hover/focus
  const showPill = () => { 
    pill.style.opacity = '1'; 
    pill.style.zIndex = '1000'; // Bring to front
  };
  const hidePill = () => { 
    pill.style.opacity = '0'; 
    pill.style.zIndex = '20'; // Reset to default
  };
  markerElement.addEventListener('mouseenter', showPill);
  markerElement.addEventListener('mouseleave', hidePill);
  markerElement.addEventListener('focus', showPill);
  markerElement.addEventListener('blur', hidePill);

  // Move pill to the right of the cursor on mousemove
  markerElement.addEventListener('mousemove', () => {
    pill.style.top = `-24px`;
    pill.style.left = `24px`;
  });
  // For keyboard focus, place pill to the right of the marker
  markerElement.addEventListener('focus', () => {
    pill.style.top = `-24px`;
    pill.style.left = `24px`;
  });

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
      element: container,
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