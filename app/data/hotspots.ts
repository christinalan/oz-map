export interface Hotspot {
  id: string;
  position: [number, number]; // [x, y] in map coordinates
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: string; // e.g., "2:30"
}

export const hotspots: Hotspot[] = [
  {
    id: 'sydney-opera',
    position: [7259, -6731], // Center of map
    title: 'Sydney Opera House',
    description: 'Iconic performing arts center and architectural masterpiece of the 20th century.',
    videoUrl: '/videos/landscape.mp4',
    duration: '1:45'
  },
  {
    id: 'great-barrier-reef',
    position: [8000, -5000],
    title: 'Great Barrier Reef',
    description: 'World\'s largest coral reef system and marine biodiversity hotspot.',
    videoUrl: '/videos/portrait.mp4',
    duration: '2:30'
  },
  {
    id: 'uluru',
    position: [5000, -4000],
    title: 'Uluru (Ayers Rock)',
    description: 'Sacred sandstone monolith in the heart of Australia\'s Red Centre.',
    videoUrl: '/videos/landscape.mp4',
    duration: '3:15'
  },
  {
    id: 'melbourne-cbd',
    position: [6000, -6000],
    title: 'Melbourne CBD',
    description: 'Cultural capital with world-class dining, arts, and laneway culture.',
    videoUrl: '/videos/portrait.mp4',
    duration: '1:20'
  },
  {
    id: 'perth-skyline',
    position: [4000, -7000],
    title: 'Perth Skyline',
    description: 'Modern cityscape with stunning Swan River views and urban development.',
    videoUrl: '/videos/landscape.mp4',
    duration: '2:45'
  },
  {
    id: 'adelaide-hills',
    position: [7000, -8000],
    title: 'Adelaide Hills',
    description: 'Rolling vineyards and charming towns in South Australia\'s wine region.',
    videoUrl: '/videos/portrait.mp4',
    duration: '3:00'
  },
  {
    id: 'brisbane-river',
    position: [9000, -3000],
    title: 'Brisbane River',
    description: 'Meandering waterway through Queensland\'s vibrant capital city.',
    videoUrl: '/videos/landscape.mp4',
    duration: '1:55'
  },
  {
    id: 'darwin-harbor',
    position: [3000, -9000],
    title: 'Darwin Harbor',
    description: 'Tropical port city with rich Indigenous culture and stunning sunsets.',
    videoUrl: '/videos/portrait.mp4',
    duration: '2:10'
  },
  {
    id: 'hobart-waterfront',
    position: [10000, -10000],
    title: 'Hobart Waterfront',
    description: 'Historic port with convict heritage and modern culinary scene.',
    videoUrl: '/videos/landscape.mp4',
    duration: '2:30'
  },
  {
    id: 'canberra-parliament',
    position: [6500, -7500],
    title: 'Canberra Parliament House',
    description: 'Nation\'s capital with iconic architecture and democratic heritage.',
    videoUrl: '/videos/portrait.mp4',
    duration: '1:40'
  }
]; 