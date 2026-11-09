# Awuraama Dadson — personal brand website

React 18 + TypeScript + Vite + React Router. No UI framework; hand-written CSS.

## Run it

```bash
npm install
npm run dev        # local development
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

> This folder lives in iCloud-synced Documents. `node_modules` is a symlink to
> `node_modules.nosync` so iCloud doesn't evict dependency files.

## Updating content (no component changes needed)

| What | Where |
| --- | --- |
| Email, social links, book links, motion on/off | `src/content/site.ts` |
| Your photographs (hero, About page, creator still) | put files in `public/images/`, then set paths in `photos` in `src/content/site.ts` |
| The Becoming Letter articles (and which 3 show on the homepage) | `src/content/letters.ts` (`featured: true`) |
| "More From Me" collection | `src/content/creations.ts`: add an object to add a piece |
| Tech portfolio projects, skills, experience | `src/content/portfolio.ts` |
| Contact form enquiry types and their extra fields | `src/content/contact.ts` |

Empty strings (`''`) in `site.ts` render as quiet placeholders: links show faded, images show a styled frame.

## Contact form

The form validates every field and adapts to the enquiry type. It sends in one of two ways:

1. **With an endpoint (recommended):** create a free form at [Formspree](https://formspree.io), copy its URL
   (`https://formspree.io/f/xxxx`) and set it as `VITE_FORM_ENDPOINT` in a `.env` file (see `.env.example`)
   and in your Vercel project's Environment Variables. Messages arrive in your inbox, and visitors see a "sent" confirmation.
2. **Without one:** submitting opens the visitor's email app with the full message pre-written to your address.

## Deploying

`vercel.json` rewrites all routes to `index.html` so `/about`, `/writing` and `/portfolio` work on refresh.

## Motion

Page fades, scroll reveals, image reveals and link hovers are on by default. They switch off automatically
for visitors who prefer reduced motion, and you can turn them off entirely with `motion: false` in `site.ts`.
