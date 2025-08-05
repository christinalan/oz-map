"use client";
import { use } from "react";
import { useRouter } from "next/navigation.js";
import { Dialog, DialogDescription, DialogHeading } from "@ariakit/react";
import { hotspots } from "../../../data/hotspots";
import MapViewClient from "@/app/components/MapViewClient";

export default function HotspotModal({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	const router = useRouter();
	const { hotspotId } = use(params);
	
	// Find the hotspot data
	const hotspot = hotspots.find(h => h.id === hotspotId);
	
	if (!hotspot) {
		return <MapViewClient/>;
	}

	const handleBackdropClick = (event: React.MouseEvent) => {
		// Only close if clicking on the backdrop (not the modal content)
		if (event.target === event.currentTarget) {
			router.back();
		}
	};

	return (
       <Dialog
          open
          onClose={() => router.back()}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-55 animate-in fade-in duration-300 p-2 overflow-y-auto"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          autoFocusOnHide={(element) => {
            if (!element) {
              const exploreLink = document.querySelector(`[href="/explore"]`) as HTMLElement;
              exploreLink?.focus();
            }
            return true;
          }}
          onClick={handleBackdropClick}
        >
		<div className="animate-in zoom-in-95 duration-300 max-w-[720px] w-full p-4 md:p-8 border border-solid border-gray-600 rounded-xl md:rounded-3xl flex flex-col gap-6 bg-black bg-opacity-75 max-h-[90vh] overflow-y-auto">
            <DialogHeading 
              id="modal-title"
              className="text-white text-xl md:text-3xl font-bold text-shadow-xl font-pt-monument drop-shadow-lg"
            >
              {hotspot.title}
            </DialogHeading>
            <video
              className="object-contain max-h-[70vh]"
              controls
              preload="metadata"
              poster={hotspot.thumbnail}
			  autoPlay
            >
              <source src={hotspot.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <DialogDescription className="font-sans text-sm leading-5 text-white">
              {hotspot.description}
            </DialogDescription>
          </div>

          {/* Return to Oz button positioned at bottom */}
          <button
            className="absolute bottom-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-80 rounded-lg font-pt-monument px-4 py-2"
            aria-label="Return to Oz"
			onClick={() => router.back()}
          >
            Return to Oz
          </button>
        </Dialog>
	)
}