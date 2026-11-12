import { Link } from 'react-router-dom';
import { site } from '../content/site';

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
              <li><Link to="/#work">About</Link></li>
              <li><Link to="/writing">Writing</Link></li>
              <li><Link to="/portfolio">Tech Portfolio</Link></li>
              <li><Link to="/#more">More From Me</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </nav>

        </div>

        <div className="footer__bottom">
          <span>© {year} Awuraama Dadson. All rights reserved.</span>
          <span className="footer__motto">Building, creating and becoming.</span>
        </div>
      </div>
    </footer>
  );
}
