import { useEffect, useState } from 'react';
import { letters as savedLetters, type Letter } from '../content/letters';
import type { FeedLetter } from '../lib/substack';

let cache: Letter[] | null = null;
let pending: Promise<Letter[]> | null = null;

const byUrl = new Map(savedLetters.map((l) => [l.url, l]));

/** Live letters win for title, excerpt and date; saved letters supply the theme and the local image. */
function merge(feed: FeedLetter[]): Letter[] {
  const live = feed.map((f): Letter => {
    const saved = byUrl.get(f.url);
    return {
      ...f,
      theme: saved?.theme ?? 'Letter',
      image: saved?.image ?? f.image,
    };
  });
  // Keep older saved letters the feed no longer lists.
  const liveUrls = new Set(live.map((l) => l.url));
  return [...live, ...savedLetters.filter((l) => !liveUrls.has(l.url))].sort((a, b) => b.date.localeCompare(a.date));
}

function load(): Promise<Letter[]> {
  pending ??= fetch('/api/letters')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((feed: FeedLetter[]) => (cache = Array.isArray(feed) && feed.length ? merge(feed) : savedLetters))
    .catch(() => (cache = savedLetters));
  return pending;
}

/** Letters from The Becoming Letter, newest first. Renders the saved list instantly, then updates from Substack. */
export function useLetters(): Letter[] {
  const [letters, setLetters] = useState<Letter[]>(cache ?? savedLetters);
  useEffect(() => {
    let alive = true;
    load().then((l) => alive && setLetters(l));
    return () => {
      alive = false;
    };
  }, []);
  return letters;
}
