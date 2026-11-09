import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { site } from './content/site';
import './styles/global.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/pages.css';

// Motion is opt-in at runtime: only when enabled in site.ts AND the visitor hasn't asked for reduced motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (site.motion && !reduce) document.documentElement.classList.add('motion');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
