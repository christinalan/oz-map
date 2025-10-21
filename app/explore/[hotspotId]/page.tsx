import { hotspots } from "../../data/hotspots";

// Generate static params for all hotspot routes
export async function generateStaticParams() {
	return hotspots.map((hotspot) => ({
		hotspotId: hotspot.id,
	}));
}

export default function HotspotPage() {
	// This page exists only for static generation
	// The actual content is handled by the layout and parallel routes
	return null;
}
