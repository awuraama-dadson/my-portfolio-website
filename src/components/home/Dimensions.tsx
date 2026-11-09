import { photos, site } from '../../content/site';
import { letters, formatDate } from '../../content/letters';
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
    <article className="dim dim--engineer" aria-labelledby="dim-engineer">
      <div className="container dim__grid">
        <Reveal className="dim__text">
          <Eyebrow num="01">The Engineer</Eyebrow>
          <h3 id="dim-engineer" className="display-3">
            Thinking in systems, <em>building</em> for the web.
          </h3>
          <p>
            My foundation is in Chemical Engineering, where I learned to think in systems and test against standards.
            Today I build as a software engineer and frontend developer: creating digital experiences, building useful
            products and bringing ideas to life through technology.
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
          <a className="book__cover" href={site.book.url} target="_blank" rel="noopener noreferrer" aria-label="Discover The Master Manifester">
            <ImageFrame src={site.book.cover} alt="The Master Manifester book cover" ratio="2 / 3" />
          </a>
          <Reveal className="book__copy" delay={150}>
            <p>
              A book about self-concept, faith, manifestation and personal transformation, written from my own journey.
              It explores the relationship between faith in God and the Law of Assumption, and what it means to
              consciously create a life that feels true to who you are becoming.
            </p>
            <ArrowLink to={site.book.url}>Discover the Book</ArrowLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Writer() {
  const featured = letters.filter((l) => l.featured).slice(0, 3);
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
              Letters on personal development, wealth mindset, self-concept, finances, intentional living and the art
              of becoming.
            </p>
          </Reveal>
        </div>

        <div className="journal">
          {featured.map((l, i) => (
            <Reveal key={l.url} delay={i * 120} className="journal__item">
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
            Sharing the journey, <em>as it unfolds.</em>
          </h3>
          <p>
            On YouTube I share my journey through personal development, faith, mindset, self-concept and abundance:
            what I'm learning, reading and practising along the road of becoming. Not from the finish line, but from
            somewhere in the middle.
          </p>
          <ArrowLink to={site.socials.youtube}>Watch My Videos</ArrowLink>
        </Reveal>

        {/* PLACEHOLDER thumbnails: add video stills in /public/images and set photos.creator in site.ts */}
        <div className="thumbs" aria-hidden="true">
          <ImageFrame alt="" ratio="16 / 9" className="thumb thumb--back" label="Video still" />
          <ImageFrame alt="" ratio="16 / 9" className="thumb thumb--mid" label="Video still" delay={120} />
          <div className="thumb thumb--front">
            <ImageFrame src={photos.creator} alt="" ratio="16 / 9" label="Featured video" delay={240} />
            <span className="thumb__play" />
            <span className="thumb__caption">The Becoming — on YouTube</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Entrepreneur() {
  return (
    <article className="dim dim--entrepreneur" aria-labelledby="dim-entrepreneur">
      <div className="container">
        <Reveal>
          <Eyebrow num="05">The Entrepreneur</Eyebrow>
          <h3 id="dim-entrepreneur" className="statement">
            I like turning ideas into things people can actually <em>use.</em>
          </h3>
        </Reveal>
        <div className="entre__row">
          <Reveal delay={100}>
            <p>
              Building businesses, digital products and creative projects is one of my favourite ways to think. I
              co-founded Pluglie, which helps businesses get online with ecommerce websites and custom CRM systems,
              and I keep a few creations of my own close to my heart.
            </p>
          </Reveal>
          <Reveal delay={200} className="entre__links">
            <ArrowLink to="https://pluglie.com/">Visit Pluglie</ArrowLink>
            <ArrowLink to="/#more">See what I've created</ArrowLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
