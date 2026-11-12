/**
 * Reads the YouTube channel's long-form videos (no Shorts) from its public RSS feed, no API key needed.
 * Shared by the Vercel function (api/videos.ts) and the local dev server (vite.config.ts),
 * so it must not touch the DOM. The feed lists the 15 most recent long-form uploads.
 */
export const YOUTUBE_CHANNEL_ID = 'UCPTYK5Q8rhrrSu-j2sg-Mnw'; // youtube.com/@AwuraamaDadson
// YouTube's built-in "long-form uploads" playlist: the channel ID with its "UC" prefix swapped for "UULF".
const LONG_FORM_PLAYLIST = 'UULF' + YOUTUBE_CHANNEL_ID.slice(2);
export const YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?playlist_id=${LONG_FORM_PLAYLIST}`;

export interface Video {
  id: string;
  title: string;
  url: string;
  published: string; // ISO timestamp
  thumbnail: string;
  /** A smaller image to fall back on if the main thumbnail is missing. */
  fallback: string;
}

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

const tag = (xml: string, name: string) => decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '');

export function parseYouTubeFeed(xml: string): Video[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries
    .map((entry): Video => {
      const id = tag(entry, 'yt:videoId');
      const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? '';
      return {
        id,
        title: tag(entry, 'title'),
        url: link || `https://www.youtube.com/watch?v=${id}`,
        published: tag(entry, 'published'),
        thumbnail: `https://i.ytimg.com/vi/${id}/hq720.jpg`, // 1280×720
        fallback: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    })
    .filter((v) => v.id && v.title);
}

export async function fetchYouTubeVideos(): Promise<Video[]> {
  const res = await fetch(YOUTUBE_FEED, {
    headers: { Accept: 'application/atom+xml, application/xml' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
  return parseYouTubeFeed(await res.text());
}
