import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollManager } from './components/ScrollManager';
import Home from './pages/Home';
import About from './pages/About';
import Writing from './pages/Writing';
import Portfolio from './pages/Portfolio';
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
          <Route path="/about" element={<About />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
