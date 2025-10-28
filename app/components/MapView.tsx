'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import 'ol/ol.css';
import { createMarkerOverlay, updateOverlayPosition } from './markerFactory';
import { hotspots, Hotspot } from '../data/hotspots';
import type Map from 'ol/Map';
import type Overlay from 'ol/Overlay';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuProvider } from '@ariakit/react';
import InfoModal from './InfoModal';

const imageWidth = 14519;
const imageHeight = 13463;
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
  
  // Info modal state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Check if modal is open by looking for hotspot ID in pathname
  const isModalOpen = pathname.includes('/explore/') && pathname !== '/explore';

  const handleMarkerClick = useCallback((hotspot: Hotspot) => {
    // Use Next.js router to navigate with URL parameters
    router.push(`/explore/${hotspot.id}`, { scroll: false });
  }, [router]);

  const centerMapOnHotspot = useCallback((hotspot: Hotspot) => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.animate({
        center: hotspot.position,
        duration: 1000, // 1 second animation
        zoom: 4, // Set a good zoom level for viewing the hotspot
      });
    }
  }, []);

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
      const extent = [0, -imageHeight, imageWidth, 0]; // Expand right edge
      // const extent = [0, -imageHeight, imageWidth, 0];
      const origin = [0, -imageHeight];
      const resolutions = [64, 32, 16, 8, 4, 2];
      const view = new View({
        resolutions,
        extent,
        center: [imageWidth / 2, -imageHeight / 2],
        showFullExtent: true,
        constrainResolution: false,
        minResolution: 2,
        maxResolution: 64,
      });

      view.setZoom(4.0);

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
      
        const panMultiplier = 5;
        const deadzone = 0.1; // ignore very small scrolls
      
        let deltaX = 0, deltaY = 0;
      
        // Shift + vertical scroll acts as horizontal pan
        if (event.shiftKey && Math.abs(event.deltaY) > deadzone) {
          deltaX = event.deltaY * panMultiplier;
        } else {
          if (Math.abs(event.deltaX) > deadzone) {
            deltaX = event.deltaX * panMultiplier;
          }
          if (Math.abs(event.deltaY) > deadzone) {
            deltaY = event.deltaY * panMultiplier;
          }
        }
      
        // Optional: invert Y direction if panning feels backwards
        deltaY = -deltaY;
      
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
      // Store overlays and hotspots for position updates
      const overlayHotspotPairs: Array<{ overlay: Overlay; hotspot: Hotspot }> = [];

      // Create overlays with current zoom level
      const createOverlays = (zoom?: number) => {
        return Promise.all(
          hotspots.map(hotspot => 
            createMarkerOverlay(hotspot, handleMarkerClick, zoom)
          )
        );
      };

      // Initial overlay creation
      createOverlays(view.getZoom()).then((overlays) => {
        overlays.forEach((overlay, index) => {
          map.addOverlay(overlay);
          overlayHotspotPairs.push({ overlay, hotspot: hotspots[index] });
        });
        if (totalCount === 0) {
          setIsMapLoaded(true);
        }
      });

      // Update overlay positions when zoom changes
      view.on('change:resolution', () => {
        const currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
          // Update existing overlay positions
          overlayHotspotPairs.forEach(({ overlay, hotspot }) => {
            updateOverlayPosition(overlay, hotspot, currentZoom);
          });
        }
      });

      // Cleanup function to remove pills when overlays are removed
      const cleanupPills = () => {
        overlayHotspotPairs.forEach(({ overlay }) => {
          const overlayWithPill = overlay as Overlay & { pillElement?: HTMLElement };
          if (overlayWithPill.pillElement) {
            overlayWithPill.pillElement.remove();
          }
        });
      };

      return () => {
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleKeyDown);
        
        // Clean up pills
        cleanupPills();
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setTarget(undefined);
          mapInstanceRef.current = null;
        }
        initializedRef.current = false;
      };
    });
  }, [onMapLoad, handleMarkerClick]);

  useEffect(() => {
    if (onMapLoad) {
      onMapLoad(isMapLoaded);
    }
  }, [isMapLoaded, onMapLoad]);

  return (
    <div className="mobile-safe-height" style={{ width: '100vw', position: 'relative' }}>
      <div 
        ref={mapRef} 
        className={`w-full h-full transition-all duration-300 custom-cursor ${
          isModalOpen ? 'blur-sm' : ''
        }`} 
              />
        <Link 
          href="https://ultimateozuniverse.com" 
          className="absolute p-4 rounded top-1 left-1 md:top-3 md:left-3 z-10"
        >
          {/* Wrapper div for the shadow */}
          <div className="[filter:drop-shadow(0_6px_8px_rgba(0,0,0,1.0))]">
            <Image 
              src="/logo.png" 
              alt="Ultimate Oz Universe" 
              width={150}
              height={60} 
              className="min-w-[70px] w-[9vw]"
              priority
            />
          </div>
        </Link>
        
        {/* Hotspots Dropdown */}
        { ! isModalOpen && <div className="absolute mobile-bottom-safe right-2 md:right-4 z-10 mt-2">
          <div className="flex items-center space-x-2">
            {/* Info Button */}
            <button
              onClick={() => setIsInfoModalOpen(true)}
              className="opacity-90 hover:opacity-100 transition-all duration-200"
              aria-label="Show navigation instructions"
            >
                <Image
                  src="/info.svg"
                  alt="Info"
                  width={46}
                  height={46}
                  className="rounded-full"
                />
            </button>
            
            <MenuProvider>
              <MenuButton className="text-white px-4 py-2 rounded-lg bg-black bg-opacity-80 hover:bg-opacity-80 transition-all duration-200 font-pt-monument">
                Explore Locations
              </MenuButton>
            <Menu className="bg-black bg-opacity-90 rounded-lg p-2 max-h-[60vh] overflow-y-auto mt-2 mb-2">
              {hotspots.map((hotspot) => (
                <MenuItem
                  key={hotspot.id}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors duration-200 font-pt-monument text-sm"
                  onClick={() => {
                    centerMapOnHotspot(hotspot);
                    setTimeout(() => {
                      router.push(`/explore/${hotspot.id}`, { scroll: false });
                    }, 1000);
                  }}
                >
                  <div className="font-bold">{hotspot.title}</div>
                </MenuItem>
              ))}
            </Menu>
          </MenuProvider>
          </div>
        </div> }
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen} 
          onClose={() => setIsInfoModalOpen(false)} 
        />
      </div>
    );
}