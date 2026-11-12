/** Technical portfolio content. Facts here come from Awuraama's CV and live projects. */
export interface Project {
  name: string;
  type: string;
  year?: string;
  description: string;
  details?: string[];
  stack?: string[];
  live?: string;
  code?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    name: 'Kerr Dakwahene',
    type: 'Client website',
    year: '2026',
    description: 'A personal brand website for a professional with several areas of work, taken from first conversation to launch.',
    live: 'https://kerrdakwahene.com',
    image: '/images/shot-kerr.jpg',
  },
  {
    name: 'The Master Manifester',
    type: 'Book website',
    description: 'The home of my self-published personal development book, made to introduce it and help readers find their copy.',
    live: 'https://the-master-manifester-book.vercel.app/',
    image: '/images/shot-manifester.jpg',
  },
  {
    name: 'The Soft Abundance Co.',
    type: 'Brand website',
    description: 'A curated online home for my intentional living brand.',
    live: 'https://the-soft-abundance-co.vercel.app/',
    image: '/images/shot-softabundance.jpg',
  },
  {
    name: "Awuraama's Reads",
    type: 'Book recommendation site',
    description: 'A collection of the books that have shaped me, gathered in one place.',
    live: 'https://awuraama-s-reads.vercel.app/',
    image: '/images/shot-reads.jpg',
  },
  {
    name: 'To-Do App',
    type: 'Web app',
    description: 'A simple, friendly app for keeping track of tasks.',
    live: 'https://cutesy-to-do-app-ten.vercel.app/',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Design', items: ['Thoughtful, responsive layouts', 'Clear, easy-to-use pages'] },
  { group: 'Build', items: ['Websites', 'Web applications', 'Forms and interactive features'] },
  { group: 'Launch', items: ['Getting sites live', 'Sharing and search visibility'] },
  { group: 'Approach', items: ['Modern tools', 'Always learning'] },
];

export interface Role {
  title: string;
  org: string;
  period: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: 'Freelance Web Developer',
    org: 'Self-employed',
    period: '2026 — Present',
    points: [
      'Designing and building websites for clients, from first idea to launch.',
      'Collaborating with other developers on client projects.',
    ],
  },
  {
    title: 'Co-Founder',
    org: 'Pluglie',
    period: '2026 — Present',
    points: ['Building a digital business that helps entrepreneurs and small businesses get online.'],
  },
  {
    title: 'Chemical Engineering',
    org: 'Industry',
    period: '2023 — 2026',
    points: ['An engineering background that shapes how I build: carefully, and with an eye for detail.'],
  },
];

export const certification = {
  name: 'React JavaScript: Fundamentals to Coding',
  issuer: 'Alison',
  date: 'Aug 2026',
};
