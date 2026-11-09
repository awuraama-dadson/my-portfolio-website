import { useEffect } from 'react';
import { site } from '../content/site';

/** Sets the document title and meta description for a page. */
export function usePageMeta(title: string | null, description: string = site.description) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.statement.replace(/\.$/, '')}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
