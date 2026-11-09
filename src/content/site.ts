/**
 * Site-wide settings. Edit this file to update your email, social links and images.
 * An empty string ('') means "not provided yet": the link renders as a quiet placeholder.
 */
export const site = {
  name: 'Awuraama Dadson',
  statement: 'Building, creating and becoming.',
  description:
    'Engineer, author, writer, creator and entrepreneur, interested in ideas, creativity, personal growth and intentional living.',

  // PLACEHOLDER: replace with your professional email when you have one.
  email: 'awuraama12dadson@gmail.com',

  // Set to false to turn off all scroll and page animations.
  motion: true,

  socials: {
    instagram: '', // PLACEHOLDER
    youtube: '', // PLACEHOLDER: your channel URL
    linkedin: 'https://www.linkedin.com/in/awuraama-dadson-419833223',
    pinterest: '', // PLACEHOLDER
    substack: 'https://sheshares.substack.com/',
    github: 'https://github.com/awuraama-dadson',
  },

  book: {
    title: 'The Master Manifester',
    subtitle: 'The Mastery Blueprint for Manifesting Anything Like a Pro',
    url: 'https://the-master-manifester-book.vercel.app/',
    cover: '/images/book-cover-900.webp',
  },
} as const;

/**
 * Photography. Drop your photos in /public/images and put the path here,
 * e.g. '/images/hero.jpg'. Empty strings show an elegant placeholder.
 */
export const photos = {
  hero: '', // portrait, tall (4:5), at least 1200px wide
  creator: '', // optional: a still from your videos (16:9)
  aboutOpening: '', // landscape (3:2)
  aboutPairLeft: '', // portrait (4:5)
  aboutPairRight: '', // portrait (4:5)
  aboutClosing: '', // portrait (4:5)
} as const;

export type SocialKey = keyof typeof site.socials;

export const socialLabels: Record<SocialKey, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  substack: 'Substack',
  github: 'GitHub',
};
