export interface Hotspot {
  id: string;
  position: [number, number]; // [x, y] in map coordinates
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
}

export const hotspots: Hotspot[] = [
  {
    id: 'munchkin-river',
    position: [11444, -6102],
    title: "Munchkin River",
    description: '',
    videoUrl: '/videos/landscape.mp4',
  },
  {
    id: 'great-sandy-waste',
    position: [600, -6342],
    title: "Great Sandy Waste",
    description: '',
    videoUrl: '/videos/portrait.mp4',
  },
  {
    id: 'glindas-library',
    position: [7627, -11101],
    title: "Glinda's Library",
    description: '',
    videoUrl: '/videos/landscape.mp4',
  },
  {
    id: 'poppy-field',
    position: [9814, -6879],
    title: "Poppy Field",
    description: '',
    videoUrl: '/videos/portrait.mp4',
  },
  {
    id: 'yoop-castle',
    position: [8661, -5178],
    title: "Yoop Castle",
    description: '',
    videoUrl: '/videos/landscape.mp4',
  },
  {
    id: 'rolling-lands',
    position: [8486, -4691],
    title: "Rolling Lands",
    description: '',
    videoUrl: '/videos/portrait.mp4',
  },
  {
    id: 'mombis-hovel',
    position: [7957, -4028],
    title: "Mombi's Hovel",
    description: '',
    videoUrl: '/videos/landscape.mp4',
  },
  {
    id: 'fiddlestick-forest',
    position: [7886, -6791],
    title: "Fiddlestick Forest",
    description: '',
    videoUrl: '/videos/portrait.mp4',
  },
  {
    id: 'marshland',
    position: [5658, -5265],
    title: "Marshland",
    description: '',
    videoUrl: '/videos/landscape.mp4',
  },
  {
    id: 'emerald-city',
    position: [7089, -6395],
    title: "Emerald City",
    description: '',
    videoUrl: '/videos/portrait.mp4',
  },
]; 