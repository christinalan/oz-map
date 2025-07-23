'use client';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface MapViewClientProps {
  selectedHotspotId?: string | null;
  onCloseHotspot?: () => void;
}

export default function MapViewClient({ selectedHotspotId, onCloseHotspot }: MapViewClientProps) {
  return (
    <MapView selectedHotspotId={selectedHotspotId} onCloseHotspot={onCloseHotspot} />
  );
}