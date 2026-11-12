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
| Photographs (hero) | put files in `public/images/`, then set paths in `photos` in `src/content/site.ts` |
| The Becoming Letter articles | **Automatic.** New Substack posts appear on their own (homepage shows the newest 3). Optionally add a post to `src/content/letters.ts` to give it a theme label |
| "More From Me" collection | `src/content/creations.ts`: add an object to add a piece |
| Tech portfolio projects, skills, experience | `src/content/portfolio.ts` |
| Contact form enquiry types and their extra fields | `src/content/contact.ts` |

Empty strings (`''`) in `site.ts` render as quiet placeholders: links show faded, images show a styled frame.

## Contact form

The form validates every field and adapts to the enquiry type. Pressing **Send message** delivers it through
[Web3Forms](https://web3forms.com) straight to the inbox the access key was created with; visitors then see a "sent"
confirmation. The (public) access key is set in `src/components/ContactForm.tsx`. Replies go to the sender, since
each message carries their address as reply-to. The email address is also shown beside the form for anyone who'd
rather write directly.

## The Becoming Letter (automatic)

The site reads the Substack RSS feed through `/api/letters` (`api/letters.ts` on Vercel, mirrored in `vite.config.ts`
for `npm run dev`). Vercel caches it for 15 minutes, so a new post shows up within about 15 minutes with no redeploy.
Each letter's title, excerpt, date and cover image come from Substack. `src/content/letters.ts` is the instant-load
fallback and supplies theme labels (new posts show "Letter" until one is added).

## The book site (awuraamadadsonbook.com)

The Master Manifester's site is plain HTML in `public/book/` (`index.html`, `book-options.html`, `asset/`). It is edited there directly.

- On the main site it loads at `/book/`.
- On **awuraamadadsonbook.com** it loads at the root: `middleware.ts` maps `/`, `/book-options.html` and `/asset/*`
  to `public/book/` when the request comes in on that domain.
- Locally: `http://localhost:5173/book/`, or `http://book.localhost:5173/` to see it exactly as the book domain will.

To go live, add `awuraamadadsonbook.com` (and `www.`) under **Settings → Domains** in this site's Vercel project and point
the domain's DNS at Vercel as instructed. If the domain is attached to the old book project, remove it there first.

## Deploying

`vercel.json` rewrites all routes to `index.html` so `/writing` and `/portfolio` work on refresh.

## Motion

Page fades, scroll reveals, image reveals and link hovers are on by default. They switch off automatically
for visitors who prefer reduced motion, and can be turned off entirely with `motion: false` in `site.ts`.
