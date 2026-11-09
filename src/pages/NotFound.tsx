import { usePageMeta } from '../hooks/usePageMeta';
import { ArrowLink } from '../components/ArrowLink';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="container notfound">
      <p className="eyebrow"><span>404</span></p>
      <h1 className="display-1">This page is <em>still becoming.</em></h1>
      <p className="lead">It doesn't exist yet, or it has moved.</p>
      <ArrowLink to="/">Return home</ArrowLink>
    </section>
  );
}
