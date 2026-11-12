/**
 * "More From Me": things created beyond professional work.
 * Add a new object to the array to add a new piece to the collection.
 */
export interface Creation {
  name: string;
  kind: string;
  description: string;
  url: string;
  image?: string;
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
];
