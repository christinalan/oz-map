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
    description: 'At the heart of Oz, the City of Emeralds stands as a beacon of goodness and truth. Magnificent towers and domes dominate the Royal Palace. Within its gates, a diverse community defends the utopian spirit and the unimaginable power of its rightful ruler, Princess Ozma. As the Guardian of Good, she encourages all to embrace their unique gifts and untapped magic. As night falls, the gemmed spires emit a mesmerizing glow that shines brighter than the stars. As Ozians settle in, the Guardian of the Gates takes watch as enemies lurk in the shadows beyond the kingdom’s curtain wall.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Munchkin%20River_WizVO.mp4',
  },
  {
    id: 'great-sandy-waste',
    position: [600, -6342],
    title: "Great Sandy Waste",
    description: 'The Great Sandy Waste is a vast, desolate region of sand and rock, stretching as far as the eye can see. It is home to a variety of creatures, including sandworms, sand snakes, and sand lions. The waste is also home to the Great Sand Dune, which is the largest dune in the world. The dune is so large that it can be seen from space.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Great%20Sandy%20Waste_WizVO.mp4',
  },
  {
    id: 'glindas-library',
    position: [7627, -11101],
    title: "Glinda's Library",
    description: 'Glinda’s Library is a magical place where the Wizard of Oz and his friends can find books and information about the world of Oz. The library is home to a variety of books, including the Book of Spells, the Book of Magic, and the Book of Oz. The library is also home to a variety of other magical items, including the Magic Carpet, the Magic Wand, and the Magic Mirror.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Oz_Library.mp4',
  },
  {
    id: 'poppy-field',
    position: [9814, -6879],
    title: "Poppy Field",
    description: 'The Poppy Field is a beautiful and peaceful place where the Wizard of Oz and his friends can relax and enjoy the beauty of nature. The field is home to a variety of flowers, including poppies, daisies, and roses. The field is also home to a variety of other magical items, including the Magic Carpet, the Magic Wand, and the Magic Mirror.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Poppy%20Field_WizVO.mp4',
  },
  {
    id: 'yoop-castle',
    position: [8661, -5178],
    title: "Yoop Castle",
    description: 'Yoop Castle is a beautiful and peaceful place where the Wizard of Oz and his friends can relax and enjoy the beauty of nature. The field is home to a variety of flowers, including poppies, daisies, and roses. The field is also home to a variety of other magical items, including the Magic Carpet, the Magic Wand, and the Magic Mirror.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Yoop%20Castle_WizVO.mp4',
  },
  {
    id: 'rolling-lands',
    position: [8486, -4691],
    title: "Rolling Lands",
    description: 'The Rolling Lands is a beautiful and peaceful place where the Wizard of Oz and his friends can relax and enjoy the beauty of nature. The field is home to a variety of flowers, including poppies, daisies, and roses. The field is also home to a variety of other magical items, including the Magic Carpet, the Magic Wand, and the Magic Mirror.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Rolling%20Lands.mp4',
  },
  {
    id: 'mombis-hovel',
    position: [7957, -4028],
    title: "Mombi's Hovel",
    description: 'Mombi’s Hovel is a magical place where the Wizard of Oz and his friends can find books and information about the world of Oz. The library is home to a variety of books, including the Book of Spells, the Book of Magic, and the Book of Oz. The library is also home to a variety of other magical items, including the Magic Carpet, the Magic Wand, and the Magic Mirror.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Mombis%20Hut_WizVO.mp4',
  },
  {
    id: 'fiddlestick-forest',
    position: [7886, -6791],
    title: "Fiddlestick Forest",
    description: 'At the heart of Oz, the City of Emeralds stands as a beacon of goodness and truth. Magnificent towers and domes dominate the Royal Palace. Within its gates, a diverse community defends the utopian spirit and the unimaginable power of its rightful ruler, Princess Ozma. As the Guardian of Good, she encourages all to embrace their unique gifts and untapped magic. As night falls, the gemmed spires emit a mesmerizing glow that shines brighter than the stars. As Ozians settle in, the Guardian of the Gates takes watch as enemies lurk in the shadows beyond the kingdom’s curtain wall.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Fiddlestick%20Entrance.mp4',
  },
  {
    id: 'marshland',
    position: [5658, -5265],
    title: "Marshland",
    description: 'At the heart of Oz, the City of Emeralds stands as a beacon of goodness and truth. Magnificent towers and domes dominate the Royal Palace. Within its gates, a diverse community defends the utopian spirit and the unimaginable power of its rightful ruler, Princess Ozma. As the Guardian of Good, she encourages all to embrace their unique gifts and untapped magic. As night falls, the gemmed spires emit a mesmerizing glow that shines brighter than the stars. As Ozians settle in, the Guardian of the Gates takes watch as enemies lurk in the shadows beyond the kingdom’s curtain wall.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Marshland_WizVO.mp4',
  },
  {
    id: 'emerald-city',
    position: [7089, -6395],
    title: "Emerald City",
    description: 'At the heart of Oz, the City of Emeralds stands as a beacon of goodness and truth. Magnificent towers and domes dominate the Royal Palace. Within its gates, a diverse community defends the utopian spirit and the unimaginable power of its rightful ruler, Princess Ozma. As the Guardian of Good, she encourages all to embrace their unique gifts and untapped magic. As night falls, the gemmed spires emit a mesmerizing glow that shines brighter than the stars. As Ozians settle in, the Guardian of the Gates takes watch as enemies lurk in the shadows beyond the kingdom’s curtain wall.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/EmeraldCity_WizVO.mp4',
  },
]; 