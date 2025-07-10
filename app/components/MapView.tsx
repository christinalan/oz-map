'use client';
import { useEffect, useRef } from 'react';
import 'ol/ol.css';

const imageWidth = 14519;
const imageHeight = 13463;
const minZoom = 0;
const maxZoom = 5;
const tileSize = 256;

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

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

      // Fit the view to the image extent
      view.fit(extent, { size: map.getSize() });

      // Clean up on unmount
      return () => map.setTarget(undefined);
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {/* Overlay your modals, video, etc. here */}
    </div>
  );
}