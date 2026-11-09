import type { ReactNode } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { photos, site } from '../content/site';
import { ArrowLink } from '../components/ArrowLink';
import { Eyebrow } from '../components/Eyebrow';
import { ImageFrame } from '../components/ImageFrame';
import { Reveal } from '../components/Reveal';

export default function About() {
  usePageMeta('About', 'The story of Awuraama Dadson: engineer, author, writer, creator and entrepreneur, and a woman still becoming.');

  return (
    <article className="about">
      <header className="container about__head">
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <h1 className="display-1">
            On <em>becoming.</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="about__dek">
            An essay on engineering, faith, writing, building things, and refusing to be only one thing.
          </p>
        </Reveal>
      </header>

      <div className="container">
        <ImageFrame src={photos.aboutOpening} alt="Awuraama Dadson" ratio="3 / 2" label="Landscape photograph · 3:2" className="about__opening" />
      </div>

      <div className="container essay">
        <Reveal className="essay__lede">
          <p className="dropcap">
            I've never fit neatly into one lane. I'm an engineer who writes, a writer who builds websites, a builder
            who makes videos about faith and mindset. I've come to see that as the most honest thing about me, not a
            problem to solve.
          </p>
        </Reveal>

        <Section numeral="I" title="An engineer's mind">
          <p>
            My background is in Chemical Engineering. I worked in industrial manufacturing, in quality control and
            safety: testing materials against standards, checking processes, and writing up the risks in high-risk
            work before anyone began.
          </p>
          <p>
            It taught me to think in systems, to be patient with detail, and to respect the small things that quietly
            decide whether something works. I still carry that into everything I make.
          </p>
        </Section>

        <Section numeral="II" title="Learning to build">
          <p>
            Over time, I found myself drawn to a different kind of building. I started learning frontend development,
            first HTML, CSS and JavaScript, then React, and now TypeScript, and began making websites and web
            applications for myself and for clients.
          </p>
          <p>
            I use AI-assisted tools as part of how I work, while doing the slower work of understanding what's
            happening underneath. I'm especially curious about AI and intelligent systems, and I hope to study
            Computer Science and Artificial Intelligence further.
          </p>
        </Section>

        <div className="essay__pair">
          <ImageFrame src={photos.aboutPairLeft} alt="Awuraama Dadson" ratio="4 / 5" label="Portrait · 4:5" />
          <ImageFrame src={photos.aboutPairRight} alt="Awuraama Dadson" ratio="4 / 5" label="Portrait · 4:5" delay={150} className="essay__pair-offset" />
        </div>

        <Section numeral="III" title="The inner work">
          <p>
            Alongside all of this was a quieter journey: faith, mindset, self-concept, abundance and the slow work of
            personal transformation. It changed how I see myself and what I believe is possible, and it has become the
            thread that runs through almost everything I create.
          </p>
        </Section>

        <Section numeral="IV" title="The book">
          <p>
            <em>{site.book.title}</em> came out of that journey. It's my attempt to put into words what I've learned
            about faith in God, the Law of Assumption, personal identity and consciously creating a fulfilling life.
          </p>
        </Section>

        <Reveal>
          <blockquote className="pull">
            <p>“Tiny faith, bold moves.”</p>
            <cite>From <em>The Art of Moving Mountains</em>, The Becoming Letter</cite>
          </blockquote>
        </Reveal>

        <Section numeral="V" title="Writing and sharing">
          <p>
            I write <em>The Becoming Letter</em> on Substack and share my journey on YouTube. Neither is about having
            everything figured out. They're about documenting growth, thinking out loud, and passing on what I've found
            valuable in case it's valuable to someone else too.
          </p>
        </Section>

        <Section numeral="VI" title="Building things">
          <p>
            I've always loved the full arc of making something: noticing an opportunity, shaping an idea, giving it a
            name and a look, and putting it into the world. That's what led me to co-found Pluglie, and to create The
            Soft Abundance Co. and its affirmation library.
          </p>
        </Section>

        <div className="essay__closing">
          <ImageFrame src={photos.aboutClosing} alt="Awuraama Dadson" ratio="4 / 5" label="Portrait · 4:5" />
          <Section numeral="VII" title="Still becoming">
            <p>
              I'm still learning, building, creating and becoming. This website is a record of that: a home for the
              work so far, and room for whatever comes next.
            </p>
            <div className="essay__links">
              <ArrowLink to="/writing">Read my writing</ArrowLink>
              <ArrowLink to="/portfolio">See my tech work</ArrowLink>
              <ArrowLink to="/#contact">Get in touch</ArrowLink>
            </div>
          </Section>
        </div>
      </div>
    </article>
  );
}

function Section({ numeral, title, children }: { numeral: string; title: string; children: ReactNode }) {
  return (
    <Reveal className="essay__section">
      <h2 className="essay__heading">
        <span className="essay__numeral">{numeral}.</span> {title}
      </h2>
      {children}
    </Reveal>
  );
}
