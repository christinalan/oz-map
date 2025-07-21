"use client";
import { use } from "react";
import { useRouter } from 'next/navigation';
import MapViewClient from '../components/MapViewClient';

export default function HotspotPage({ params }: { params: Promise<{ hotspotId: string }> }) {
  const router = useRouter();
  const { hotspotId } = use(params);
  return (
    <MapViewClient
      selectedHotspotId={hotspotId}
      onCloseHotspot={() => router.push('/')}
    />
  );
} 