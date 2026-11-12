import type { ReactElement } from 'react';
import { site, socialDetails, socialLabels, type SocialKey } from '../content/site';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

/** Simple line/fill icons, drawn on a 24×24 grid. */
const icons: Record<SocialKey, ReactElement> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="is-stroke">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24">
      <path d="M16.6 2h-3.2v13.6a2.9 2.9 0 1 1-2.06-2.78v-3.3a6.1 6.1 0 1 0 5.26 6.04V9.1a7.9 7.9 0 0 0 4.6 1.48V7.36a4.6 4.6 0 0 1-4.6-4.6V2Z" />
    </svg>
  ),
  substack: (
    <svg viewBox="0 0 24 24">
      <path d="M3 3h18v2.6H3V3Zm0 5h18v2.6H3V8Zm0 5h18v9l-9-5-9 5v-9Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  goodreads: (
    <svg viewBox="0 0 24 24">
      <text x="12" y="17.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="19" fontWeight="700">
        g
      </text>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.08 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" className="is-stroke">
      <circle cx="12" cy="12" r="9" />
      <path d="M10.5 20.5 12.6 11m-1.2 4.2c3.4 1 5.6-1.3 5.6-4.2a5 5 0 0 0-10 .3c0 1 .3 1.8.9 2.3" />
    </svg>
  ),
};

/** "Follow along": every social profile with a link, shown above the footer on every page. */
export function FollowAlong() {
  const keys = (Object.keys(site.socials) as SocialKey[]).filter((k) => site.socials[k]);

  return (
    <section id="follow" className="follow" aria-labelledby="follow-title">
      <div className="container">
        <div className="follow__head">
          <Reveal>
            <Eyebrow>Follow along</Eyebrow>
            <h2 id="follow-title" className="display-2">
              Come along for <em>the becoming.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lead follow__lead">
              The reading, the reflections, the building and everything in between. Find me wherever you like to
              spend your time.
            </p>
          </Reveal>
        </div>

        <ul className="follow__list">
          {keys.map((k, i) => (
            <li key={k}>
              <Reveal delay={(i % 2) * 90}>
                <a className="follow__item" href={site.socials[k]} target="_blank" rel="noopener noreferrer">
                  <span className="follow__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="follow__icon" aria-hidden="true">
                    {icons[k]}
                  </span>
                  <span className="follow__text">
                    <span className="follow__name">{socialLabels[k]}</span>
                    <span className="follow__handle">
                      {socialDetails[k].handle}
                      <span className="follow__note"> · {socialDetails[k].note}</span>
                    </span>
                  </span>
                  <span className="follow__arrow" aria-hidden="true">↗</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
