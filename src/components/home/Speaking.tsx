import { ArrowLink } from '../ArrowLink';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

export function Speaking() {
  return (
    <section id="speaking" className="speaking" aria-labelledby="speaking-title">
      <div className="container speaking__inner">
        <Reveal>
          <Eyebrow className="center">Speaking &amp; Collaborations</Eyebrow>
          <h2 id="speaking-title" className="display-2">
            Good conversations <em>start somewhere.</em>
          </h2>
          <p className="lead">
            I'm open to speaking engagements, interviews, creative collaborations and meaningful professional
            opportunities, especially around personal growth, faith, mindset, technology and building a life with
            intention.
          </p>
          <ul className="speaking__list">
            <li>Speaking engagements</li>
            <li>Interviews &amp; podcasts</li>
            <li>Creative collaborations</li>
            <li>Professional opportunities</li>
          </ul>
          <ArrowLink to="/#contact">Start a conversation</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
