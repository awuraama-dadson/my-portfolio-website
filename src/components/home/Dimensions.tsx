import { site } from '../../content/site';
import { formatDate } from '../../content/letters';
import type { SyntheticEvent } from 'react';
import { useLetters } from '../../hooks/useLetters';
import { useVideos } from '../../hooks/useVideos';
import { ArrowLink } from '../ArrowLink';
import { Eyebrow } from '../Eyebrow';
import { ImageFrame } from '../ImageFrame';
import { Reveal } from '../Reveal';

/** "A little about what I do": the five dimensions, each with its own composition. */
export function Dimensions() {
  return (
    <section id="work" className="dimensions" aria-labelledby="work-title">
      <div className="container dimensions__head">
        <Reveal>
          <Eyebrow>A little about what I do</Eyebrow>
          <h2 id="work-title" className="display-2">
            Many chapters, <em>one</em> story.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="lead">
            I've never fit neatly into one lane. These are the different ways I spend my curiosity, and the threads
            that tie them together.
          </p>
          <a className="dimensions__cue" href="#engineer">
            <span>Scroll to explore</span>
            <span className="dimensions__cue-arrow" aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </div>

      <Engineer />
      <Author />
      <Writer />
      <Creator />
      <Entrepreneur />
    </section>
  );
}

function Engineer() {
  return (
    <article id="engineer" className="dim dim--engineer" aria-labelledby="dim-engineer">
      <div className="container dim__grid">
        <Reveal className="dim__text">
          <Eyebrow num="01">The Engineer</Eyebrow>
          <h3 id="dim-engineer" className="display-3">
            Thinking in systems, <em>building</em> for the web.
          </h3>
          <p>
            Plot twist: I have a degree in Chemical Engineering, but somewhere along the way, I fell down the rabbit
            hole of software development and decided I wasn't done learning. I'm a self-taught developer who loves
            building things, experimenting with code, figuring out how stuff works, and occasionally breaking things
            just to fix them again. I'm constantly learning, creating, and finding new ways to turn random ideas into
            actual things on the internet. Safe to say, my curiosity doesn't stick to one lane!
          </p>
          <ArrowLink to="/portfolio">Explore my tech portfolio</ArrowLink>
        </Reveal>
        <div className="dim__collage">
          <ImageFrame src="/images/shot-manifester.jpg" alt="The Master Manifester website" ratio="16 / 11" className="collage__a" position="top" />
          <ImageFrame src="/images/shot-kerr.jpg" alt="Kerr Dakwahene website" ratio="16 / 11" className="collage__b" position="top" delay={200} />
        </div>
      </div>
    </article>
  );
}

function Author() {
  return (
    <article className="dim dim--author" aria-labelledby="dim-author">
      <div className="container">
        <Reveal>
          <Eyebrow num="02" className="center">The Author</Eyebrow>
        </Reveal>
        <div className="book">
          <Reveal className="book__title-col">
            <h3 id="dim-author" className="book__title">
              The Master <em>Manifester</em>
            </h3>
            <p className="book__subtitle">{site.book.subtitle}</p>
          </Reveal>
          <a className="book__cover" href={site.book.url} aria-label="Discover The Master Manifester">
            <ImageFrame src={site.book.cover} alt="The Master Manifester book cover" ratio="2 / 3" />
          </a>
          <Reveal className="book__copy" delay={150}>
            <p>
              Apparently, I don't just love reading books; I love writing them too! I'm the author of{' '}
              <em>The Master Manifester</em>, a book born out of my journey with faith, self-concept, and the art of
              creating a life you genuinely love. This book touches on the Law of Assumption and all you need to know
              about manifesting. If you haven't read it yet, what are you doing?
            </p>
            <ArrowLink to={site.book.url}>Discover the Book</ArrowLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Writer() {
  const featured = useLetters().slice(0, 3);
  return (
    <article className="dim dim--writer" aria-labelledby="dim-writer">
      <div className="container">
        <div className="writer__head">
          <Reveal>
            <Eyebrow num="03">The Writer</Eyebrow>
            <h3 id="dim-writer" className="display-3">
              The Becoming <em>Letter</em>
            </h3>
          </Reveal>
          <Reveal delay={150}>
            <p className="lead">
              Letters on personal development, mindset, self-concept, intentional living and the art
              of becoming.
            </p>
          </Reveal>
        </div>

        <div className="journal">
          {featured.map((l, i) => (
            <Reveal key={l.url} delay={i * 120} className="journal__item">
              {l.image && <ImageFrame src={l.image} alt="" ratio="4 / 3" className="journal__image" delay={i * 120} />}
              <p className="journal__meta">
                <span>{l.theme}</span>
                <time dateTime={l.date}>{formatDate(l.date)}</time>
              </p>
              <h4 className="journal__title">
                <a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a>
              </h4>
              <p className="journal__excerpt">{l.excerpt}</p>
              <span className="journal__read">Read on Substack</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="dim__cta">
          <ArrowLink to="/writing">Read The Becoming Letter</ArrowLink>
        </Reveal>
      </div>
    </article>
  );
}

function Creator() {
  return (
    <article className="dim dim--creator" aria-labelledby="dim-creator">
      <div className="container dim__grid">
        <Reveal className="dim__text">
          <Eyebrow num="04">The Creator</Eyebrow>
          <h3 id="dim-creator" className="display-3">
            Welcome to <em>The Becoming.</em>
          </h3>
          <p>
            Somewhere between figuring life out and becoming the person I always knew I could be, I started a YouTube
            channel. It's my little corner of the internet where we talk mindset, self-concept, personal growth, habits,
            and creating a life you actually love. I share lessons from my own journey, things I'm learning, and little
            reminders that we're allowed to want more out of life. Think of it as a conversation with a friend who's
            figuring it out too.
          </p>
          <ArrowLink to={site.socials.youtube}>Watch My Videos</ArrowLink>
        </Reveal>

        <VideoCards />
      </div>
    </article>
  );
}

const fallbackImage = (fallback: string) => (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src !== fallback) img.src = fallback;
};

/** The two newest long-form videos, straight from the YouTube feed; quiet placeholders until they load. */
function VideoCards() {
  const videos = useVideos().slice(0, 2);

  return (
    <div className="videos">
      <ol className="videos__list">
        {videos.length
          ? videos.map((v, i) => (
              <li key={v.id} className="video">
                <Reveal variant="image" delay={i * 120}>
                  <a className="video__link" href={v.url} target="_blank" rel="noopener noreferrer">
                    <span className="video__frame">
                      <img
                        src={v.thumbnail}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={fallbackImage(v.fallback)}
                      />
                      <span className="video__play" aria-hidden="true" />
                    </span>
                    <span className="video__meta" aria-hidden="true">
                      {formatDate(v.published.slice(0, 10))}
                    </span>
                    <span className="video__title">{v.title}</span>
                  </a>
                </Reveal>
              </li>
            ))
          : [0, 1].map((i) => (
              <li key={i} className="video" aria-hidden="true">
                <ImageFrame alt="" ratio="16 / 9" label="Latest video" delay={i * 120} />
              </li>
            ))}
      </ol>
      <p className="videos__caption">The Becoming — latest on YouTube</p>
    </div>
  );
}

function Entrepreneur() {
  return (
    <article className="dim dim--entrepreneur" aria-labelledby="dim-entrepreneur">
      <div className="container">
        <Reveal>
          <Eyebrow num="05">The Entrepreneur</Eyebrow>
          <h3 id="dim-entrepreneur" className="statement">
            I have a soft spot for ideas and I <em>turn them into projects.</em>
          </h3>
        </Reveal>
        <div className="entre__row">
          <Reveal delay={100}>
            <p>
              From building digital brands and creating products to experimenting with new business ventures, I love
              bringing things to life and figuring out how to make them work. I'm a digital entrepreneur, serial idea
              enthusiast, and firm believer that there's always room to create something interesting. Explore some of
              my creations.
            </p>
          </Reveal>
          <Reveal delay={200} className="entre__links">
            <ArrowLink to="https://pluglie.com/">Visit Pluglie</ArrowLink>
            <ArrowLink to="/more">Explore my creations</ArrowLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
