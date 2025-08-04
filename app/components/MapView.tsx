'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import 'ol/ol.css';
import { createMarkerOverlay } from './markerFactory';
import { hotspots, Hotspot } from '../data/hotspots';
import type Map from 'ol/Map';

const imageWidth = 14519;
const imageHeight = 13463;
const minZoom = 4;
const maxZoom = 4;
const tileSize = 256;

interface MapViewProps {
  onMapLoad?: (isLoaded: boolean) => void;
}

export default function MapView({ onMapLoad }: MapViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const initializedRef = useRef(false);

  // Loading state
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Check if modal is open by looking for hotspot ID in pathname
  const isModalOpen = pathname.includes('/explore/') && pathname !== '/explore';

  const handleMarkerClick = (hotspot: Hotspot) => {
    // Use Next.js router to navigate with URL parameters
    router.push(`/explore/${hotspot.id}`, { scroll: false });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || initializedRef.current) return;
    initializedRef.current = true;
    Promise.all([
      import('ol/Map'),
      import('ol/View'),
      import('ol/layer/Tile'),
      import('ol/source/TileImage'),
      import('ol/tilegrid/TileGrid'),
      import('ol/interaction/MouseWheelZoom'),
    ]).then(([
      { default: Map },
      { default: View },
      { default: TileLayer },
      { default: TileImage },
      { default: TileGrid },
      { default: MouseWheelZoom },
    ]) => {
      const extent = [0, -imageHeight, imageWidth, 0];
      const origin = [0, -imageHeight];
      const resolutions = [64, 32, 16, 8, 4, 2];
      const view = new View({ resolutions, minZoom, maxZoom, extent });
      const map = new Map({
        target: mapRef.current!,
        layers: [
          new TileLayer({
            source: new TileImage({
              attributions: '',
              tileGrid: new TileGrid({ extent, origin, resolutions, tileSize: [tileSize, tileSize] }),
              tileUrlFunction: function (tileCoord) {
                if (!tileCoord) return '';
                const z = tileCoord[0];
                const x = tileCoord[1];
                const y = -1 - tileCoord[2];
                return `/tiles/${z}/${x}/${y}.png`;
              },
            }),
          }),
        ],
        view,
      });
      
      map.getInteractions().forEach(interaction => {
        if (interaction instanceof MouseWheelZoom) {
          map.removeInteraction(interaction);
        }
      });

      const viewport = map.getViewport();
      viewport.addEventListener('wheel', (event) => {
        event.preventDefault();
        const panAmount = 5;
        let deltaX = 0, deltaY = 0;
        if (event.shiftKey && event.deltaX === 0 && event.deltaY !== 0) {
          // Shift + vertical wheel = horizontal pan
          deltaX = event.deltaY * panAmount;
        } else {
          // Normal horizontal scroll (trackpad or horizontal wheel)
          if (event.deltaX !== 0) {
            deltaX = event.deltaX * panAmount;
          }
          // Normal vertical scroll
          if (event.deltaY !== 0) {
            deltaY = event.deltaY * panAmount;
          }
          if (event.deltaX !== 0 && event.deltaY !== 0) {
            deltaX = event.deltaX * panAmount;
            deltaY = -event.deltaY * panAmount;
          }
        }
        const center = view.getCenter();
        if (center) {
          view.setCenter([center[0] + deltaX, center[1] + deltaY]);
        }
      }, { passive: false });

      // Add keyboard arrow key panning
      const handleKeyDown = (event: KeyboardEvent) => {
        const center = view.getCenter();
        if (!center) return;

        const panAmount = 200; // Adjust this value for panning speed
        let deltaX = 0, deltaY = 0;

        switch (event.key) {
          case 'ArrowLeft':
            deltaX = -panAmount;
            break;
          case 'ArrowRight':
            deltaX = panAmount;
            break;
          case 'ArrowUp':
            deltaY = panAmount;
            break;
          case 'ArrowDown':
            deltaY = -panAmount;
            break;
          default:
            return; // Don't prevent default for other keys
        }

        // Only prevent default for arrow keys
        event.preventDefault();
        
        // Use smooth animation for panning
        view.animate({
          center: [center[0] + deltaX, center[1] + deltaY],
          duration: 200, // Animation duration in milliseconds
        });
      };

      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown);

      mapInstanceRef.current = map;
      view.fit(extent, { size: map.getSize() });
      const tileLayer = map.getLayers().getArray()[0] as import('ol/layer/Tile').default;
      let loadedCount = 0;
      let totalCount = 0;
      tileLayer.getSource()?.on('tileloadstart', () => { totalCount++; });
      tileLayer.getSource()?.on('tileloadend', () => {
        loadedCount++;
        if (loadedCount >= totalCount && totalCount > 0) {
          setIsMapLoaded(true);
        }
      });
      Promise.all(
        hotspots.map(hotspot => 
          createMarkerOverlay(hotspot, handleMarkerClick)
        )
      ).then((overlays) => {
        overlays.forEach(overlay => map.addOverlay(overlay));
        if (totalCount === 0) {
          setIsMapLoaded(true);
        }
      });
      return () => {
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleKeyDown);
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setTarget(undefined);
          mapInstanceRef.current = null;
        }
        initializedRef.current = false;
      };
    });
  }, [onMapLoad]);

  useEffect(() => {
    if (onMapLoad) {
      onMapLoad(isMapLoaded);
    }
  }, [isMapLoaded, onMapLoad]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div 
        ref={mapRef} 
        className={`w-full h-full transition-all duration-300 cursor-move ${
          isModalOpen ? 'blur-sm' : ''
        }`} 
      />
    </div>
  );
}