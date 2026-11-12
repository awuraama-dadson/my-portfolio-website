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

  // Shown, in this order, in the "Follow along" section above the footer. Empty ones are hidden.
  socials: {
    instagram: 'https://www.instagram.com/the_dadsonnn/',
    youtube: 'https://www.youtube.com/@AwuraamaDadson',
    tiktok: 'https://www.tiktok.com/@awuraama.dadson',
    substack: 'https://sheshares.substack.com/',
    linkedin: 'https://www.linkedin.com/in/awuraama-dadson-419833223',
    goodreads: 'https://www.goodreads.com/user/show/203275454-awuraama-dadson',
    github: 'https://github.com/awuraama-dadson',
    pinterest: 'https://www.pinterest.com/the_soft_abundance_co/',
  },

  book: {
    title: 'The Master Manifester',
    subtitle: 'The Mastery Blueprint for Manifesting Anything Like a Pro',
    // The book site lives in public/book/. Once awuraamadadsonbook.com is live you can use that here instead.
    url: '/book/',
    cover: '/images/book-cover-900.webp',
  },
} as const;

/**
 * Photography. Drop your photos in /public/images and put the path here,
 * e.g. '/images/hero.jpg'. Empty strings show an elegant placeholder.
 */
export const photos = {
  hero: '/images/hero.jpg', // portrait, tall (4:5), at least 1200px wide
} as const;

export type SocialKey = keyof typeof site.socials;

export const socialLabels: Record<SocialKey, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  substack: 'Substack',
  linkedin: 'LinkedIn',
  goodreads: 'Goodreads',
  github: 'GitHub',
  pinterest: 'Pinterest',
};

/** The handle and a few words on what each platform is for, shown in the "Follow along" section. */
export const socialDetails: Record<SocialKey, { handle: string; note: string }> = {
  instagram: { handle: '@the_dadsonnn', note: 'Everyday moments & musings' },
  youtube: { handle: '@AwuraamaDadson', note: 'Videos on mindset, faith & becoming' },
  tiktok: { handle: '@awuraama.dadson', note: 'Short reflections' },
  substack: { handle: 'The Becoming Letter', note: 'Letters, straight to your inbox' },
  linkedin: { handle: 'Awuraama Dadson', note: 'Engineering & work' },
  goodreads: { handle: 'Awuraama Dadson', note: 'What I’m reading' },
  github: { handle: 'awuraama-dadson', note: 'Code & side projects' },
  pinterest: { handle: '@the_soft_abundance_co', note: 'Moodboards & inspiration' },
};
