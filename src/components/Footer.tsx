import { Link } from 'react-router-dom';
import { site, socialLabels, type SocialKey } from '../content/site';

const footerSocials: SocialKey[] = ['instagram', 'youtube', 'linkedin', 'pinterest', 'substack'];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__name">
              Awuraama <em>Dadson</em>
            </p>
            <p className="footer__statement">
              Engineer, author, writer, creator and entrepreneur. Building, creating and becoming, one chapter at a time.
            </p>
            <a className="footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <p className="footer__heading">Explore</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/writing">Writing</Link></li>
              <li><Link to="/portfolio">Tech Portfolio</Link></li>
              <li><Link to="/#more">More From Me</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__heading">Elsewhere</p>
            <ul>
              {footerSocials.map((k) =>
                site.socials[k] ? (
                  <li key={k}>
                    <a href={site.socials[k]} target="_blank" rel="noopener noreferrer">
                      {socialLabels[k]}
                    </a>
                  </li>
                ) : (
                  <li key={k}>
                    <span className="is-placeholder" title="Link coming soon">{socialLabels[k]}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Awuraama Dadson. All rights reserved.</span>
          <span className="footer__motto">Building, creating and becoming.</span>
        </div>
      </div>
    </footer>
  );
}
