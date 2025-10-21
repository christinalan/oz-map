import { hotspots } from "../../data/hotspots";
import HotspotModal from "@/app/components/HotspotModal";

// Generate static params for all hotspot routes
export async function generateStaticParams() {
	return hotspots.map((hotspot) => ({
		hotspotId: hotspot.id,
	}));
}

export default function HotspotPage({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	return <HotspotModal params={params} />;
}
