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
    description: 'Originating in the northeast corner of Gillikin Country, the Munchkin River winds through the blue lands to flow into Lake Quad, just outside of Emerald City. This ancient water route follows a natural path passing fragrant fields, fruit orchards and quiet villages.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Munchkin%20River_WizVO.mp4',
  },
  {
    id: 'great-sandy-waste',
    position: [7761, -12842],
    title: "Great Sandy Waste",
    description: 'A barrier of badlands protects Inner Oz from the Outerlands. South of Quadling Country spans the Great Sandy Waste. Although playful sand dolphins leap over the dunes and entertain; all persons are warned not to cross. For the sands will turn any living flesh to dust.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Great%20Sandy%20Waste_WizVO.mp4',
  },
  {
    id: 'glindas-library',
    position: [7627, -11101],
    title: "Glinda's Library",
    description: 'Deep within Glinda the Good’s Ruby Castle in Quadling Country, her library serves as a sanctuary for her young acolytes. Ancient books are stacked from floor to ceiling. Glinda stands over her Book of Records. This ancient grimoire chronicles all that is or ever was in Oz.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Oz_Library.mp4',
  },
  {
    id: 'poppy-field',
    position: [9814, -6879],
    title: "Poppy Field",
    description: 'In central Munchkin Country, great clusters of scarlet poppies carpet the landscape. Drawn by their sweet aroma and dazzling beauty, the unsuspecting may step off the Road of Yellow Bricks. Beware, as these cursed flowers will lull one into a deep slumber from which they may not awaken.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Poppy%20Field_WizVO.mp4',
  },
  {
    id: 'yoop-castle',
    position: [8000, -5378],
    title: "Yoop Castle",
    description: 'Next to the Rolling Lands, an enormous purple stone castle looms over a barren valley. As a Yookoohoo Witch, Mrs. Yoop chose remote Gillikin Country to practice her forbidden magic. Once this giantess swings open her door and invites you in for supper, be wary, as you may be on the menu.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Yoop%20Castle_WizVO.mp4',
  },
  {
    id: 'rolling-lands',
    position: [7700, -5000],
    title: "Rolling Lands",
    description: 'The welcoming sloping hills and valleys of the Rolling Lands deceive, as it’s a trap to lure prisoners towards Yoop Castle. The Road of Yellow Bricks catapults travelers into its riptide of moving earth.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Rolling%20Lands.mp4',
  },
  {
    id: 'mombis-hovel',
    position: [7357, -4328],
    title: "Mombi's Hovel",
    description: 'Hidden away, deep in the wild Gillikin Mountains, one of the oldest and most powerful witches, Mombi menaces. Tins of powder, dried plants, and bottles of creatures clutter the shelves. Keep clear of this hovel for anyone who stumbles upon it will never be seen again.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Mombis%20Hut_WizVO.mp4',
  },
  {
    id: 'fiddlestick-forest',
    position: [8100, -6850],
    title: "Fiddlestick Forest",
    description: 'The Fiddlestick Forest enchants as the firefly’s dance to the wave of music that sweeps through the dense woods. Journey further to gaze upon the tree’s perform their concerto.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Fiddlestick%20Entrance.mp4',
  },
  {
    id: 'marshland',
    position: [5658, -5265],
    title: "Marshland",
    description: 'An eerie fog covers this desolate and treacherous watery bog. The damp air has a rotting smell in this tangle of moss and dank water. Amidst scattered bones, frog goblins erupt from oozing mud, bellowing out ghostly croaks.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/Marshland_WizVO.mp4',
  },
  {
    id: 'emerald-city',
    position: [6889, -6895],
    title: "Emerald City",
    description: 'At the heart of OZ, the City of Emeralds stands as a beacon of goodness and truth. Magnificent towers and domes dominate the Royal Palace. Within its gates, a diverse community defends the utopian spirit and the unimaginable power of its rightful ruler, Princess Ozma. As night falls, the gemmed spires emit a mesmerizing glow that shines brighter than the stars.',
    videoUrl: 'https://ultimate-oz.b-cdn.net/EmeraldCity_WizVO.mp4',
  },
]; 