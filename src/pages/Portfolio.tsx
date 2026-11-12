import { usePageMeta } from '../hooks/usePageMeta';
import { projects, skills, experience, certification } from '../content/portfolio';
import { site } from '../content/site';
import { ArrowLink } from '../components/ArrowLink';
import { ImageFrame } from '../components/ImageFrame';
import { Reveal } from '../components/Reveal';

export default function Portfolio() {
  usePageMeta('Tech Portfolio', 'The tech portfolio of Awuraama Dadson: websites, web applications and digital projects.');
  const featured = projects.filter((p) => p.image);
  const more = projects.filter((p) => !p.image);

  return (
    <div className="studio">
      <header className="container studio__head">
        <Reveal>
          <p className="mono-label">/ portfolio — software engineering</p>
          <h1 className="display-1">
            Where creativity <br />
            <em>meets code.</em>
          </h1>
        </Reveal>
        <Reveal delay={200} className="studio__intro">
          <p>
            I'm a developer with an engineering background. I design and build websites and web applications that
            are thoughtful, easy to use and made to last, and I'm always learning along the way.
          </p>
          <div className="studio__links">
            <ArrowLink to={site.socials.github}>GitHub</ArrowLink>
            <ArrowLink to={site.socials.linkedin}>LinkedIn</ArrowLink>
            <ArrowLink to="/?enquiry=software#contact">Start a project</ArrowLink>
          </div>
        </Reveal>
      </header>

      <section className="container" aria-labelledby="projects-title">
        <div className="studio__section-head">
          <p className="mono-label">01 / selected work</p>
          <h2 id="projects-title" className="studio__h2">Selected projects</h2>
        </div>

        <ol className="projects">
          {featured.map((p, i) => (
            <li key={p.name} className={`project${i % 2 ? ' project--rev' : ''}`}>
              <div className="project__media">
                <ImageFrame src={p.image} alt={`${p.name} website`} ratio="16 / 10" position="top" />
              </div>
              <Reveal className="project__body">
                <p className="mono-label">
                  {String(i + 1).padStart(2, '0')} / {p.type}
                  {p.year ? ` / ${p.year}` : ''}
                </p>
                <h3 className="project__name">{p.name}</h3>
                <p className="project__desc">{p.description}</p>
                {p.details && (
                  <ul className="project__details">
                    {p.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                )}
                {p.stack && (
                  <ul className="stack" aria-label="Built with">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                )}
                <div className="project__links">
                  {p.live && <ArrowLink to={p.live}>Live site</ArrowLink>}
                  {p.code && <ArrowLink to={p.code}>Code</ArrowLink>}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mini-projects">
          {more.map((p) => (
            <Reveal key={p.name} className="mini">
              <p className="mono-label">{p.type}</p>
              <h3 className="mini__name">{p.name}</h3>
              <p>{p.description}</p>
              {p.stack && <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>}
              <div className="project__links">
                {p.live && <ArrowLink to={p.live}>Live app</ArrowLink>}
                {p.code && <ArrowLink to={p.code}>Code</ArrowLink>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container studio__split" aria-labelledby="skills-title">
        <div className="studio__section-head">
          <p className="mono-label">02 / toolkit</p>
          <h2 id="skills-title" className="studio__h2">Skills &amp; tools</h2>
        </div>
        <dl className="skills">
          {skills.map((s) => (
            <Reveal key={s.group} className="skills__row">
              <dt>{s.group}</dt>
              <dd>{s.items.join('  ·  ')}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="container studio__split" aria-labelledby="exp-title">
        <div className="studio__section-head">
          <p className="mono-label">03 / experience</p>
          <h2 id="exp-title" className="studio__h2">Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((r) => (
            <Reveal key={r.title} className="role">
              <p className="role__period">{r.period}</p>
              <div>
                <h3 className="role__title">
                  {r.title} <span>— {r.org}</span>
                </h3>
                <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="role">
            <p className="role__period">{certification.date}</p>
            <div>
              <h3 className="role__title">
                {certification.name} <span>— {certification.issuer}</span>
              </h3>
              <ul><li>Certification</li></ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container studio__cta">
        <Reveal>
          <h2 className="display-2">
            Have a website or product <em>in mind?</em>
          </h2>
          <div className="studio__links">
            <ArrowLink to="/?enquiry=software#contact">Tell me about your project</ArrowLink>
            <ArrowLink to="/">Back to the main site</ArrowLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
