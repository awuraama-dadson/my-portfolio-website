/**
 * "More From Me": things created beyond professional work.
 * Add a new object to the array to add a new piece to the collection.
 */
export interface Creation {
  name: string;
  kind: string;
  description: string;
  /** Leave empty for something still in the works. */
  url: string;
  image?: string;
  /** Marks a piece that isn't out yet: it shows a teaser card instead of an image and a "Visit" link. */
  inTheWorks?: {
    /** Short words shown on the teaser card, e.g. what the thing brings together. */
    pillars: string[];
  };
}

export const creations: Creation[] = [
  {
    name: 'The Soft Abundance Co.',
    kind: 'Lifestyle & personal development brand',
    description:
      'Journals, affirmation and mindset tools, manifestation tools and intentional living pieces, for a life that feels soft, abundant and chosen.',
    url: 'https://the-soft-abundance-co.vercel.app/',
    image: '/images/shot-softabundance.jpg',
  },
  {
    name: 'The Soft Abundance Affirmation Library',
    kind: 'A free resource',
    description:
      'A free library of affirmations for anyone interested in mindset, self-concept and personal growth.',
    url: 'https://the-soft-abundance-affirmation-libr.vercel.app/',
    image: '/images/shot-affirmations.jpg',
  },
  {
    name: "Awuraama's Reads",
    kind: 'Book recommendations',
    description:
      'Books that changed the way I think, live, love and grow, gathered across personal growth, mindset and manifestation, money, and love and relationships.',
    url: 'https://awuraama-s-reads.vercel.app/',
    image: '/images/shot-reads.jpg',
  },
  {
    name: 'Something new is on the way',
    kind: 'An all-in-one app · In the works',
    description:
      'Productivity, personal development and manifestation, finally in one place. A single home for planning your days, growing into who you are becoming and keeping your intentions in view. The name is still taking shape.',
    url: '',
    inTheWorks: { pillars: ['Productivity', 'Personal development', 'Manifestation'] },
  },
];
