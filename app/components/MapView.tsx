'use client';
import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { createMarkerOverlay } from './markerFactory';
import { hotspots, Hotspot } from '../data/hotspots';
import VideoModal from './VideoModal';
import type Map from 'ol/Map';

const imageWidth = 14519;
const imageHeight = 13463;
const minZoom = 0;
const maxZoom = 5;
const tileSize = 256;

interface MapViewProps {
  onMapLoad?: (isLoaded: boolean) => void;
}

export default function MapView({ onMapLoad }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const initializedRef = useRef(false);
  
  // Modal state
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Loading state
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadedTiles, setLoadedTiles] = useState(0);
  const [totalTiles, setTotalTiles] = useState(0);

  const handleMarkerClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotspot(null);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || initializedRef.current) return;

    // Mark as initialized to prevent double creation
    initializedRef.current = true;

    Promise.all([
      import('ol/Map'),
      import('ol/View'),
      import('ol/layer/Tile'),
      import('ol/source/TileImage'),
      import('ol/tilegrid/TileGrid'),
    ]).then(([
      { default: Map },
      { default: View },
      { default: TileLayer },
      { default: TileImage },
      { default: TileGrid },
    ]) => {
      const extent = [0, -imageHeight, imageWidth, 0];
      const origin = [0, -imageHeight];
      const resolutions = [64, 32, 16, 8, 4, 2];

      const view = new View({
        resolutions,
        minZoom,
        maxZoom,
        extent,
      });

      const map = new Map({
        target: mapRef.current!,
        layers: [
          new TileLayer({
            source: new TileImage({
              attributions: '',
              tileGrid: new TileGrid({
                extent,
                origin,
                resolutions,
                tileSize: [tileSize, tileSize],
              }),
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

      // Store the map instance
      mapInstanceRef.current = map;

      // Fit the view to the image extent
      view.fit(extent, { size: map.getSize() });

      // Track tile loading progress
      const tileLayer = map.getLayers().getArray()[0] as any;
      let loadedCount = 0;
      let totalCount = 0;

      tileLayer.getSource()?.on('tileloadstart', () => {
        totalCount++;
        setTotalTiles(totalCount);
      });

      tileLayer.getSource()?.on('tileloadend', () => {
        loadedCount++;
        setLoadedTiles(loadedCount);
        
        // Check if all tiles are loaded
        if (loadedCount >= totalCount && totalCount > 0) {
          setIsMapLoaded(true);
        }
      });

      // Create markers for all hotspots
      Promise.all(
        hotspots.map(hotspot => 
          createMarkerOverlay(hotspot, handleMarkerClick)
        )
      ).then((overlays) => {
        // Add all overlays to the map
        overlays.forEach(overlay => map.addOverlay(overlay));
        
        // If no tiles were loaded (cached), mark as loaded
        if (totalCount === 0) {
          setIsMapLoaded(true);
        }
      });

      // Clean up on unmount
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setTarget(undefined);
          mapInstanceRef.current = null;
        }
        initializedRef.current = false;
      };
    });
  }, [onMapLoad]);

  // Notify parent when map loading state changes
  useEffect(() => {
    if (onMapLoad) {
      onMapLoad(isMapLoaded);
    }
  }, [isMapLoaded, onMapLoad]);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
      
      <VideoModal
        hotspot={selectedHotspot}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}