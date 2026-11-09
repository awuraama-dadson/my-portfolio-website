import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Wordmark } from './Wordmark';

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'My Work', to: '/#work' },
  { label: 'More From Me', to: '/#more' },
  { label: 'Contact', to: '/#contact' },
];

export function Nav({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const renderLink = (l: (typeof navLinks)[number], i?: number) =>
    l.to.includes('#') ? (
      <Link key={l.to} to={l.to} className="nav__link">
        {i !== undefined && <span className="nav__num">{String(i + 1).padStart(2, '0')}</span>}
        {l.label}
      </Link>
    ) : (
      <NavLink key={l.to} to={l.to} end className="nav__link">
        {i !== undefined && <span className="nav__num">{String(i + 1).padStart(2, '0')}</span>}
        {l.label}
      </NavLink>
    );

  return (
    <header className={`nav nav--${tone}${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner container">
        <Wordmark />
        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => renderLink(l))}
        </nav>
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav__toggle-text">{open ? 'Close' : 'Menu'}</span>
          <span className="nav__toggle-lines" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className="nav__overlay" hidden={!open}>
        <nav className="nav__overlay-links container" aria-label="Mobile">
          {navLinks.map((l, i) => renderLink(l, i))}
        </nav>
      </div>
    </header>
  );
}
