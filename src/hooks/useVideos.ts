import { useEffect, useState } from 'react';
import type { Video } from '../lib/youtube';

let cache: Video[] | null = null;
let pending: Promise<Video[]> | null = null;

function load(): Promise<Video[]> {
  pending ??= fetch('/api/videos')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((feed: unknown) => (cache = Array.isArray(feed) ? (feed as Video[]) : []))
    .catch(() => (cache = []));
  return pending;
}

/** Latest YouTube uploads, newest first. Empty until loaded (or if YouTube can't be reached). */
export function useVideos(): Video[] {
  const [videos, setVideos] = useState<Video[]>(cache ?? []);
  useEffect(() => {
    let alive = true;
    load().then((v) => alive && setVideos(v));
    return () => {
      alive = false;
    };
  }, []);
  return videos;
}
