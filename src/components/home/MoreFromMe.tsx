import { creations } from '../../content/creations';
import { ArrowLink } from '../ArrowLink';
import { Eyebrow } from '../Eyebrow';
import { ImageFrame } from '../ImageFrame';
import { Reveal } from '../Reveal';

export function MoreFromMe() {
  return (
    <section id="more" className="more" aria-labelledby="more-title">
      <div className="container">
        <div className="more__head">
          <Reveal>
            <Eyebrow>More From Me</Eyebrow>
            <h2 id="more-title" className="display-2">
              Things I've created <em>along the way.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lead">
              A small corner of my world: brands, tools and resources I've made beyond my professional work, each
              one an extension of what I believe about growth and intentional living.
            </p>
          </Reveal>
        </div>

        <ol className="collection">
          {creations.map((c, i) => (
            <li key={c.url} className={`piece${i % 2 ? ' piece--offset' : ''}`}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="piece__image" tabIndex={-1} aria-hidden="true">
                <ImageFrame src={c.image} alt="" ratio="4 / 3" position="top" label={c.name} />
              </a>
              <Reveal className="piece__caption">
                <p className="piece__no">No. {String(i + 1).padStart(2, '0')}</p>
                <p className="piece__kind">{c.kind}</p>
                <h3 className="piece__name">{c.name}</h3>
                <p className="piece__desc">{c.description}</p>
                <ArrowLink to={c.url}>Visit</ArrowLink>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
