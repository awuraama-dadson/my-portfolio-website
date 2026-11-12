import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { FollowAlong } from './components/FollowAlong';
import { ScrollManager } from './components/ScrollManager';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Portfolio from './pages/Portfolio';
import More from './pages/More';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const dark = location.pathname.startsWith('/portfolio');

  // The portfolio has its own darker 'studio' palette, including behind the header.
  useEffect(() => {
    document.documentElement.classList.toggle('is-studio', dark);
  }, [dark]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Nav tone={dark ? 'dark' : 'light'} />
      <main id="main" key={location.pathname} className={`page${dark ? ' page--studio' : ''}`}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          {/* The old About page now lives on the homepage, in "A little about what I do". */}
          <Route path="/about" element={<Navigate to="/#work" replace />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* The socials section belongs to the main site, not the tech portfolio. */}
      {!dark && <FollowAlong />}
      <Footer />
    </>
  );
}
