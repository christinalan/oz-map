import { Hotspot } from '../data/hotspots';

// Factory function to create a marker overlay
export function createMarkerOverlay(
  hotspot: Hotspot,
  onMarkerClick: (hotspot: Hotspot) => void,
  zoomLevel?: number
) {
  // Calculate adjusted position and size based on zoom level
  const getAdjustedPositionAndSize = (position: [number, number], zoom?: number) => {
    if (!zoom) return { position: position, width: 64, height: 78, scale: 1 };
    
    // Position adjustments for each zoom level (x, y)
    const positionAdjustments = [
      [0, 0],     // zoom 1
      [500, 0],   // zoom 2
      [200, 0],   // zoom 3
      [0, 0],     // zoom 4
      [0, 0],     // zoom 5
      [-100, 0]   // zoom 6+
    ];
    
    // Size adjustments for each zoom level (width, height, scale)
    const sizeAdjustments = [
      [36, 44, 0.56],   // zoom 1 - smallest
      [44, 54, 0.69],   // zoom 2 - interpolated
      [52, 64, 0.81],   // zoom 3 - interpolated
      [60, 73, 0.94],   // zoom 4 - interpolated
      [80, 98, 1.25],   // zoom 5 - interpolated
      [100, 123, 1.56]  // zoom 6+ - biggest
    ];
    
    const zoomIndex = Math.min(Math.round(zoom) - 1, positionAdjustments.length - 1);
    const posAdjustment = positionAdjustments[zoomIndex];
    const sizeAdjustment = sizeAdjustments[zoomIndex];
    
    return {
      position: [position[0] + posAdjustment[0], position[1] + posAdjustment[1]],
      width: sizeAdjustment[0],
      height: sizeAdjustment[1],
      scale: sizeAdjustment[2]
    };
  };

  const adjusted = getAdjustedPositionAndSize(hotspot.position, zoomLevel);

  // Use an img element for the marker
  const markerElement = document.createElement('img');
  // markerElement.src = '/wavy-flag.svg';
  markerElement.src = '/wavy-flag.png';
  markerElement.alt = `Visit ${hotspot.title}`;
  markerElement.width = 40;
  markerElement.height = 52;
  markerElement.style.cssText = `
    display: block;
    width: ${adjusted.width}px;
    height: ${adjusted.height}px;
    cursor: pointer;
    filter: drop-shadow(4px -4px 10px rgba(0, 0, 0, 1.0));
    transform: translate(-50%, -50%) scale(${adjusted.scale});
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    outline: none;
    z-index: 10;
    animation: ${hotspot.position[0] % 2 === 0 ? 'flagSwayA' : 'flagSwayB' } 3s ease-in-out infinite;
  `;

  // Add hover and focus effects
  const handleFocus = () => {
    markerElement.style.transform = `translate(-50%, -50%) scale(${adjusted.scale * 1.5})`;
  };
  const handleBlur = () => {
    markerElement.style.transform = `translate(-50%, -50%) scale(${adjusted.scale})`;
  };
  markerElement.addEventListener('mouseenter', handleFocus);
  markerElement.addEventListener('mouseleave', handleBlur);
  markerElement.addEventListener('focus', handleFocus);
  markerElement.addEventListener('blur', handleBlur);



  // Container for marker only
  const container = document.createElement('div');
  container.appendChild(markerElement);
  
  // Create a separate pill that will be positioned relative to the viewport
  const pill = document.createElement('div');
  pill.textContent = hotspot.title;
  pill.id = `pill-${hotspot.id}`; // Unique identifier
  pill.style.cssText = `
    position: fixed;
    background: #fff;
    color: #171717;
    padding: 8px 18px 6px;
    border-radius: 9999px;
    font-size: 1.25rem;
    font-family: var(--font-pt-monument);
    font-weight: 700;
    box-shadow: inset 0 0 0 2px #e5e7eb, 0 2px 8px rgba(0,0,0,1.0);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 999999;
    white-space: nowrap;
    pointer-events: none;
  `;
  
  // Append pill to body to escape overlay stacking context
  document.body.appendChild(pill);

  // Show/hide pill on hover/focus
  const showPill = (event: MouseEvent | FocusEvent) => { 
    pill.style.opacity = '1'; 
    
    // Position pill relative to the mouse/focus position
    if (event instanceof MouseEvent) {
      pill.style.left = `${event.clientX + 32}px`;
      pill.style.top = `${event.clientY - 32}px`;
    } else {
      // For keyboard focus, position relative to marker element
      const rect = markerElement.getBoundingClientRect();
      pill.style.left = `${rect.right + 32}px`;
      pill.style.top = `${rect.top - 32}px`;
    }
  };
  
  const hidePill = () => { 
    pill.style.opacity = '0'; 
  };
  
  markerElement.addEventListener('mouseenter', showPill);
  markerElement.addEventListener('mouseleave', hidePill);
  markerElement.addEventListener('focus', showPill);
  markerElement.addEventListener('blur', hidePill);

  // Update pill position on mousemove
  markerElement.addEventListener('mousemove', (event) => {
    if (pill.style.opacity === '1') {
      pill.style.left = `${event.clientX + 32}px`;
      pill.style.top = `${event.clientY - 32}px`;
    }
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
    overlay.setPosition(adjusted.position);
    
    // Store pill reference on overlay for cleanup
    (overlay as import('ol/Overlay').default & { pillElement?: HTMLElement }).pillElement = pill;
    
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

// Function to update overlay position and size based on zoom level
export function updateOverlayPosition(
  overlay: import('ol/Overlay').default,
  hotspot: Hotspot,
  zoomLevel?: number
) {
  const getAdjustedPositionAndSize = (position: [number, number], zoom?: number) => {
    if (!zoom) return { position: position, width: 64, height: 78, scale: 1 };
    
    // Position adjustments for each zoom level (x, y)
    const positionAdjustments = [
      [0, 0],     // zoom 1
      [500, 0],   // zoom 2
      [200, 0],   // zoom 3
      [0, 0],     // zoom 4
      [0, 0],     // zoom 5
      [-100, 0]   // zoom 6+
    ];
    
    // Size adjustments for each zoom level (width, height, scale)
    const sizeAdjustments = [
      [24, 32, 0.40],   // zoom 1 - smallest
      [34, 42, 0.50],   // zoom 2 - interpolated
      [52, 64, 0.81],   // zoom 3 - interpolated
      [60, 73, 0.94],   // zoom 4 - interpolated
      [80, 98, 1.25],   // zoom 5 - interpolated
      [100, 123, 1.56]  // zoom 6+ - biggest
    ];
    
    const zoomIndex = Math.min(Math.round(zoom) - 1, positionAdjustments.length - 1);
    const posAdjustment = positionAdjustments[zoomIndex];
    const sizeAdjustment = sizeAdjustments[zoomIndex];
    
    return {
      position: [position[0] + posAdjustment[0], position[1] + posAdjustment[1]],
      width: sizeAdjustment[0],
      height: sizeAdjustment[1],
      scale: sizeAdjustment[2]
    };
  };

  const adjusted = getAdjustedPositionAndSize(hotspot.position, zoomLevel);
  
  overlay.setPosition(adjusted.position);
  
  // Update the marker size if the overlay element exists
  const element = overlay.getElement();
  if (element) {
    const markerElement = element.querySelector('img') as HTMLImageElement;
    if (markerElement) {
      markerElement.style.width = `${adjusted.width}px`;
      markerElement.style.height = `${adjusted.height}px`;
      markerElement.style.transform = `translate(-50%, -50%) scale(${adjusted.scale})`;
    }
  }
} 