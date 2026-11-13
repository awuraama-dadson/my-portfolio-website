/**
 * Saved letters from The Becoming Letter (https://sheshares.substack.com). Newest first.
 * New letters appear on the site automatically from Substack (see src/hooks/useLetters.ts).
 * This list is the instant-load fallback, and where you set each letter's theme label.
 */
export interface Letter {
  title: string;
  excerpt: string;
  date: string; // ISO date
  url: string;
  theme: string;
}

const base = 'https://sheshares.substack.com/p/';

export const letters: Letter[] = [
  {
    title: 'The Psychology Of Lucky People',
    excerpt: "Luck isn't random, it's engineered.",
    date: '2026-11-12',
    url: base + 'the-psychology-of-lucky-people',
    theme: 'Mindset',
  },
  {
    title: "You are not a victim. You're the main character. Act like it!",
    excerpt: "It's time to get out of your own way.",
    date: '2026-11-06',
    url: base + 'you-are-not-a-victim-youre-the-main',
    theme: 'Mindset',
  },
  {
    title: "The Art of Enjoying Your Life While You're Still Becoming",
    excerpt: "Because you're allowed to romanticise the come up.",
    date: '2026-10-29',
    url: base + 'the-art-of-enjoying-your-life-while',
    theme: 'Becoming',
  },
  {
    title: 'What Being Good With Money Actually Looks Like',
    excerpt: 'To become a better steward of money is to stand the chance to be trusted with more.',
    date: '2026-10-24',
    url: base + 'what-being-good-with-money-actually',
    theme: 'Money',
  },
  {
    title: 'The Law of Assumption: Manifesting 101',
    excerpt: "Just because you're not intentionally applying the law doesn't mean it's not working.",
    date: '2026-10-17',
    url: base + 'the-law-of-assumption-manifesting',
    theme: 'Manifesting',
  },
  {
    title: "3 hills I'm willing to die on",
    excerpt: "And I'm going to make them your hills, too.",
    date: '2026-10-09',
    url: base + '3-hills-im-willing-to-die-on',
    theme: 'Personal growth',
  },
  {
    title: "I plan to be a very wealthy young woman. So, I'm reprogramming myself",
    excerpt: 'Because programming really is everything.',
    date: '2026-10-07',
    url: base + 'i-plan-to-be-a-very-wealthy-young',
    theme: 'Wealth',
  },
  {
    title: 'The Art of Moving Mountains',
    excerpt: 'Tiny faith, bold moves.',
    date: '2025-05-15',
    url: base + 'the-art-of-moving-mountains',
    theme: 'Faith',
  },
  {
    title: 'Are you living on repeat without realizing it?',
    excerpt: "You are stuck in a loop, and until you decide to consciously break free, you'll keep going.",
    date: '2025-05-14',
    url: base + 'are-you-living-on-repeat-without',
    theme: 'Self-concept',
  },
];

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
