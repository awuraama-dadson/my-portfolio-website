/** Technical portfolio content. Facts here come from Awuraama's CV and live projects. */
export interface Project {
  name: string;
  type: string;
  year?: string;
  description: string;
  details?: string[];
  stack: string[];
  live?: string;
  code?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    name: 'Kerr Dakwahene',
    type: 'Client website',
    year: '2026',
    description:
      'A personal brand website for an optometrist, business consultant and podcast host, taken from requirements to launch.',
    details: [
      'Sticky anchor navigation, service sections and a podcast section linking to Spotify, Apple Podcasts and YouTube.',
      'An enquiry form with an enquiry-type selector (consulting, speaking, podcast guest, collaboration).',
      'Deployed on Render with a custom domain.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Render'],
    live: 'https://kerrdakwahene.com',
    image: '/images/shot-kerr.jpg',
  },
  {
    name: 'The Master Manifester',
    type: 'Book website',
    description: 'The promotional website for my self-published personal development book.',
    details: [
      'Author story, FAQ, contact form and a separate ordering page linking to Amazon and Selar.',
      'A JavaScript review carousel, Open Graph metadata for link previews and WebP images to keep pages light.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    live: 'https://the-master-manifester-book.vercel.app/',
    image: '/images/shot-manifester.jpg',
  },
  {
    name: 'The Soft Abundance Co.',
    type: 'Lifestyle product site',
    description: 'A curated product site for my intentional living brand.',
    details: [
      'Category sections, product cards and email opt-in forms for a free guide.',
      'Open Graph and Pinterest rich-pin metadata to support sharing.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    live: 'https://the-soft-abundance-co.vercel.app/',
    image: '/images/shot-softabundance.jpg',
  },
  {
    name: "Awuraama's Reads",
    type: 'Book recommendation site',
    description: 'A multi-page static site recommending books across four categories.',
    details: [
      'Each category has its own page of reviews, ratings and affiliate links.',
      'Organised into separate HTML, CSS, JavaScript and asset folders for easier maintenance.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    live: 'https://awuraama-s-reads.vercel.app/',
    image: '/images/shot-reads.jpg',
  },
  {
    name: 'Petal Planner',
    type: 'Productivity web app',
    description: 'A personal productivity app for tasks and habits.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    code: 'https://github.com/awuraama-dadson/petal-planner',
  },
  {
    name: 'React To-Do App',
    type: 'Task management app',
    description: 'A task manager built with reusable, typed React components, with task data managed in React state.',
    stack: ['React', 'TypeScript', 'Vite', 'Vercel'],
    live: 'https://cutesy-to-do-app-ten.vercel.app/',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Python (beginner)'] },
  { group: 'Frameworks', items: ['React', 'Component-based development', 'State management'] },
  { group: 'Web', items: ['Responsive design', 'Single- and multi-page sites', 'Web forms', 'Open Graph & SEO metadata'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Vite', 'VS Code', 'Vercel', 'Render'] },
  { group: 'AI-assisted', items: ['Claude for coding support', 'AI-assisted development workflows'] },
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
    period: 'Mar 2026 — Present',
    points: [
      'Delivered a personal brand website for Dr. Kerr Dakwahene end to end: requirements, design, development, testing and deployment.',
      'Collaborated with another developer to build a website for the client Vital Junction.',
      'Use Git and GitHub for version control and publish client work on Vercel and Render.',
    ],
  },
  {
    title: 'Co-Founder',
    org: 'Pluglie',
    period: 'May 2026 — Present',
    points: [
      'Co-founded a digital business offering ecommerce websites, website templates and solutions for entrepreneurs and small businesses.',
      'Work on product direction, customer research, branding and day-to-day operations alongside a technical co-founder.',
    ],
  },
  {
    title: 'Chemical Engineering',
    org: 'Industrial manufacturing',
    period: '2023 — 2026',
    points: [
      'Quality control, process control checks and industrial safety work in cable and agrochemical manufacturing.',
      'A habit of testing against standards, documenting clearly and catching small errors before they ship.',
    ],
  },
];

export const certification = {
  name: 'React JavaScript: Fundamentals to Coding',
  issuer: 'Alison',
  date: 'Aug 2026',
};
