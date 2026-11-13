import { useEffect, useState } from 'react';
import type { Video } from '../lib/youtube';
import { savedVideos } from '../content/videos';

let cache: Video[] | null = null;
let pending: Promise<Video[]> | null = null;

/** Live and saved videos together, newest first, without duplicates, so whichever is fresher wins. */
const merge = (live: Video[]): Video[] => {
  const byId = new Map<string, Video>();
  for (const v of [...live, ...savedVideos]) if (!byId.has(v.id)) byId.set(v.id, v);
  return [...byId.values()].sort((a, b) => b.published.localeCompare(a.published));
};

const fetchFeed = (): Promise<Video[]> =>
  fetch('/api/videos')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((feed: unknown) => (Array.isArray(feed) && feed.length ? (feed as Video[]) : Promise.reject('empty')));

function load(): Promise<Video[]> {
  pending ??= fetchFeed()
    .catch(() => new Promise<Video[]>((resolve, reject) => setTimeout(() => fetchFeed().then(resolve, reject), 1500)))
    .then((live) => (cache = merge(live)))
    .catch(() => {
      pending = null; // try the live feed again on the next visit to the page
      return savedVideos;
    });
  return pending;
}

/**
 * Latest YouTube uploads, newest first. Shows the saved copy straight away (refreshed hourly by
 * scripts/update-videos.ts), then folds in the live feed as soon as it arrives.
 */
export function useVideos(): Video[] {
  const [videos, setVideos] = useState<Video[]>(cache ?? savedVideos);
  useEffect(() => {
    let alive = true;
    load().then((v) => alive && setVideos(v));
    return () => {
      alive = false;
    };
  }, []);
  return videos;
}
