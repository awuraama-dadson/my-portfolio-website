import type { Creation } from '../content/creations';
import { ArrowLink } from './ArrowLink';
import { ImageFrame } from './ImageFrame';
import { Reveal } from './Reveal';

/** The "More From Me" collection: a staggered two-column list of creations, numbered in order. */
export function CreationList({ items }: { items: Creation[] }) {
  return (
    <ol className="collection">
      {items.map((c, i) => (
        <li key={c.name} className={`piece${i % 2 ? ' piece--offset' : ''}${c.inTheWorks ? ' piece--soon' : ''}`}>
          {c.inTheWorks ? (
            <div className="piece__image">
              <ComingSoonCard pillars={c.inTheWorks.pillars} />
            </div>
          ) : (
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="piece__image" tabIndex={-1} aria-hidden="true">
              <ImageFrame src={c.image} alt="" ratio="4 / 3" position="top" label={c.name} />
            </a>
          )}
          <Reveal className="piece__caption">
            <p className="piece__no">No. {String(i + 1).padStart(2, '0')}</p>
            <p className="piece__kind">{c.kind}</p>
            <h3 className="piece__name">{c.name}</h3>
            <p className="piece__desc">{c.description}</p>
            {c.inTheWorks ? (
              <ArrowLink to="/more#follow">Follow along for the launch</ArrowLink>
            ) : (
              <ArrowLink to={c.url}>Visit</ArrowLink>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Stands in for a screenshot while a piece is still being built. */
function ComingSoonCard({ pillars }: { pillars: string[] }) {
  return (
    <Reveal variant="image" className="frame soon" style={{ aspectRatio: '4 / 3' }}>
      <div className="soon__inner" role="img" aria-label={`In the works: ${pillars.join(', ')}`}>
        <p className="soon__status" aria-hidden="true">
          <span className="soon__dot" />
          Currently building
        </p>
        <p className="soon__title" aria-hidden="true">
          Untitled, <em>for now.</em>
        </p>
        <ul className="soon__pillars" aria-hidden="true">
          {pillars.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="soon__foot" aria-hidden="true">All in one · Coming soon</p>
      </div>
    </Reveal>
  );
}
