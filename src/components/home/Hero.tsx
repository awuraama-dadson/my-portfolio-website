import { photos } from '../../content/site';
import { ArrowLink } from '../ArrowLink';
import { ImageFrame } from '../ImageFrame';
import { Reveal } from '../Reveal';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Reveal variant="fade">
            <p className="hero__kicker">
              <span className="hero__vol">Vol. I</span>
              <span>A personal journal &amp; body of work</span>
            </p>
          </Reveal>

          <h1 id="hero-title" className="hero__title">
            <span className="line"><span>Building,</span></span>
            <span className="line line--indent"><span>creating</span></span>
            <span className="line"><span>&amp; <em>becoming.</em></span></span>
          </h1>

          <Reveal delay={450} className="hero__lower">
            <p className="hero__intro">
              I'm Awuraama Dadson: an engineer, author, writer and entrepreneur with a deep interest in ideas,
              creativity, faith and intentional living. This is a home for what I build, what I write, and what I'm
              learning on the way to becoming.
            </p>
            <div className="hero__ctas">
              <ArrowLink to="/#work">Explore my world</ArrowLink>
              <ArrowLink to="/about">Get to know me</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="hero__visual">
          <ImageFrame
            src={photos.hero}
            alt="Portrait of Awuraama Dadson"
            ratio="4 / 5"
            label="Portrait · 4:5"
            priority
            className="hero__image"
          />
          <p className="hero__caption">
            <span>Awuraama Dadson</span>
            <span>Tema, Ghana</span>
          </p>
          <span className="hero__vertical" aria-hidden="true">A body of work, in progress</span>
        </div>
      </div>

      <div className="container hero__foot">
        <p><span>Currently writing</span> The Becoming Letter</p>
        <p><span>Currently building</span> for the web</p>
        <p className="hero__scroll" aria-hidden="true">Scroll</p>
      </div>
    </section>
  );
}
