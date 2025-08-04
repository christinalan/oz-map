import HotspotModal from "../@modal/[hotspotId]/page";

export default async function Default({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	return <HotspotModal params={params} />
}