"use client";
import { use } from "react";
import { useRouter, usePathname } from "next/navigation.js";
import { Dialog, DialogDescription, DialogHeading } from "@ariakit/react";
import { hotspots } from "../data/hotspots";
import MapViewClient from "./MapViewClient";

export default function HotspotModal({
	params,
}: {
	params: Promise<{ hotspotId: string }>;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const { hotspotId } = use(params);
	
	// Only show modal if we're on a specific hotspot route
	if (pathname === '/explore') {
		return null;
	}
	
	// Find the hotspot data
	const hotspot = hotspots.find(h => h.id === hotspotId);
	
	if (!hotspot) {
		return <MapViewClient/>;
	}

	// Handle modal close - navigate to explore page
	const handleClose = () => {
		router.push('/explore');
	};

	const handleBackdropClick = (event: React.MouseEvent) => {
		// Only close if clicking on the backdrop (not the modal content)
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	return (
		<>
			{/* Modal overlay */}
			<Dialog
				open
				onClose={handleClose}
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
				<div className="animate-in zoom-in-95 duration-300 max-w-[800px] w-full p-4 md:p-8 border border-solid border-gray-600 rounded-xl md:rounded-3xl flex flex-col gap-6 bg-black bg-opacity-75 max-h-[90vh] overflow-y-auto relative">
					<DialogHeading 
						id="modal-title"
						className="text-white text-2xl md:text-3xl font-bold text-shadow-xl font-pt-monument drop-shadow-lg"
					>
						{hotspot.title}
					</DialogHeading>
					<button
						className="absolute top-4 right-4 md:top-8 md:right-8"
						onClick={handleClose}
						aria-label="Close modal"
					>
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
					</svg>
					</button>
					<div className={ hotspot.isPortrait ? 'flex flex-col md:grid md:grid-cols-2 md:gap-4' : 'flex flex-col gap-4'}>
					<video
						className="object-contain max-h-[70vh] mb-4"
						controls
						preload="metadata"
						autoPlay
					>
						<source src={hotspot.videoUrl} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<DialogDescription className="font-joan text-xl leading-8 text-white">
						{hotspot.description}
					</DialogDescription>
					</div>
				</div>

				{/* Return to Oz button positioned at bottom */}
				<button
					className="absolute bottom-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-80 rounded-lg font-pt-monument px-4 py-2"
					aria-label="Return to Oz"
					onClick={handleClose}
				>
					Return to Oz
				</button>
			</Dialog>
		</>
	);
}
