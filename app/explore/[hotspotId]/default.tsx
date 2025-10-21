import { hotspots } from "../../data/hotspots";
import HotspotModal from "../@modal/[hotspotId]/page";

// Generate static params for all hotspot routes
export async function generateStaticParams() {
	return hotspots.map((hotspot) => ({
		hotspotId: hotspot.id,
	}));
}

export default function Default({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	return <HotspotModal params={params} />;
}