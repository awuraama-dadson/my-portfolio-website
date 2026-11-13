import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../content/letters';
import { useLetters } from '../hooks/useLetters';
import { site } from '../content/site';
import { ArrowLink } from '../components/ArrowLink';
import { Eyebrow } from '../components/Eyebrow';
import { ImageFrame } from '../components/ImageFrame';
import { Reveal } from '../components/Reveal';

export default function Writing() {
  usePageMeta('Writing', 'The Becoming Letter and selected writing by Awuraama Dadson, on personal development, wealth mindset, self-concept and intentional living.');
  // The newest letter is featured, with the next three below it; the rest live on Substack.
  const [latest, ...rest] = useLetters().slice(0, 4);

  return (
    <div className="writing">
      <header className="container writing__head">
        <Reveal>
          <Eyebrow>Writing</Eyebrow>
          <h1 className="display-1">
            The Becoming <em>Letter</em>
          </h1>
        </Reveal>
        <Reveal delay={200} className="writing__dek">
          <p className="lead">
            Letters on personal development, mindset, self-concept, intentional living and the art
            of enjoying your life while you're still becoming. Published on Substack.
          </p>
          <ArrowLink to={site.socials.substack}>Subscribe on Substack</ArrowLink>
        </Reveal>
      </header>

      <section className="container" aria-label="Latest letter">
        <Reveal className="feature">
          <div className="feature__body">
            <p className="feature__label">
              <svg className="feature__envelope" viewBox="0 0 40 28" aria-hidden="true">
                <rect x="1" y="1" width="38" height="26" rx="1.5" />
                <path d="M1.5 2 20 16.5 38.5 2" />
                <path d="M1.5 26.5 15 12.5M38.5 26.5 25 12.5" />
                <circle cx="20" cy="16.5" r="2.6" className="feature__seal" />
              </svg>
              The latest letter
            </p>
            <p className="journal__meta">
              <span>{latest.theme}</span>
              <time dateTime={latest.date}>{formatDate(latest.date)}</time>
            </p>
            <h2 className="feature__title">
              <a href={latest.url} target="_blank" rel="noopener noreferrer">{latest.title}</a>
            </h2>
            <p className="feature__excerpt">{latest.excerpt}</p>
            <ArrowLink to={latest.url}>Read the letter</ArrowLink>
          </div>
        </Reveal>
      </section>

      <section className="container archive" aria-labelledby="archive-title">
        <Reveal>
          <h2 id="archive-title" className="archive__title">From the archive</h2>
        </Reveal>
        <ol className="archive__list">
          {rest.map((l) => (
            <li key={l.url}>
              <Reveal>
                <a className="archive__item" href={l.url} target="_blank" rel="noopener noreferrer">
                  <time dateTime={l.date}>{formatDate(l.date)}</time>
                  <span className="archive__theme">{l.theme}</span>
                  <span className="archive__name">{l.title}</span>
                  <span className="archive__excerpt">{l.excerpt}</span>
                  <span className="archive__arrow" aria-hidden="true">→</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="archive__more">
          <ArrowLink to={`${site.socials.substack.replace(/\/$/, '')}/archive`}>See all letters on Substack</ArrowLink>
        </Reveal>
      </section>

      <section className="writing__book">
        <div className="container writing__book-grid">
          <a href={site.book.url} className="writing__cover" aria-label="Discover The Master Manifester">
            <ImageFrame src={site.book.cover} alt="The Master Manifester book cover" ratio="2 / 3" />
          </a>
          <Reveal>
            <Eyebrow>Also by Awuraama</Eyebrow>
            <h2 className="display-3">
              The Master <em>Manifester</em>
            </h2>
            <p className="book__subtitle">{site.book.subtitle}</p>
            <p className="writing__book-copy">
              A book on self-concept, faith, manifestation and personal transformation, written from my own journey.
            </p>
            <ArrowLink to={site.book.url}>Discover the Book</ArrowLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
