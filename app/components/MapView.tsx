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
  selectedHotspotId?: string | null;
  onCloseHotspot?: () => void;
}

export default function MapView({ onMapLoad, selectedHotspotId, onCloseHotspot }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const initializedRef = useRef(false);

  // Loading state
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Find the selected hotspot from the id
  const selectedHotspot = selectedHotspotId
    ? hotspots.find(h => h.id === selectedHotspotId) || null
    : null;

  // Open modal if selectedHotspotId is set
  const isModalOpen = !!selectedHotspot;

  const handleMarkerClick = (hotspot: Hotspot) => {
    // Use router to push the new route
    if (typeof window !== 'undefined') {
      window.location.assign(`/explore/${hotspot.id}`);
    }
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
    <>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <VideoModal
        hotspot={selectedHotspot}
        isOpen={isModalOpen}
        onClose={onCloseHotspot || (() => {})}
      />
    </>
  );
}