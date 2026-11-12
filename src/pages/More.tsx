import { usePageMeta } from '../hooks/usePageMeta';
import { creations } from '../content/creations';
import { CreationList } from '../components/CreationList';
import { Eyebrow } from '../components/Eyebrow';
import { Reveal } from '../components/Reveal';

export default function More() {
  usePageMeta(
    'More From Me',
    'Brands, tools and resources created by Awuraama Dadson beyond professional work, on growth, mindset and intentional living.',
  );

  return (
    <div className="more-page">
      <header className="container writing__head">
        <Reveal>
          <Eyebrow>More From Me</Eyebrow>
          <h1 className="display-1">
            More of my <em>creations.</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lead">
            Brands, tools and resources I've made beyond my professional work, each one an extension of what I
            believe about growth and intentional living. There's always something new in the making.
          </p>
        </Reveal>
      </header>

      <section className="more more--page" aria-label="All creations">
        <div className="container">
          <CreationList items={creations} />
        </div>
      </section>
    </div>
  );
}
