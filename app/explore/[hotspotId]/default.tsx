"use client";
import HotspotModal from "../@modal/[hotspotId]/page";

export default function Default({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	return <HotspotModal params={params} />
}