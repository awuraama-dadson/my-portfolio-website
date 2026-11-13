/**
 * Reads the YouTube channel's long-form videos (no Shorts) from its public RSS feed, no API key needed.
 * Shared by the Vercel function (api/videos.ts) and the local dev server (vite.config.ts),
 * so it must not touch the DOM. The feed lists the 15 most recent long-form uploads.
 */
export const YOUTUBE_CHANNEL_ID = 'UCPTYK5Q8rhrrSu-j2sg-Mnw'; // youtube.com/@AwuraamaDadson
// YouTube's built-in "long-form uploads" playlist: the channel ID with its "UC" prefix swapped for "UULF".
const LONG_FORM_PLAYLIST = 'UULF' + YOUTUBE_CHANNEL_ID.slice(2);
export const YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?playlist_id=${LONG_FORM_PLAYLIST}`;
// Backup: the whole-channel feed (includes Shorts, which are filtered out below).
const CHANNEL_FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

// YouTube sometimes turns away requests that don't look like a browser, so send ordinary browser headers.
const HEADERS = {
  Accept: 'application/atom+xml, application/xml;q=0.9, */*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
};

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
    .filter((v) => v.id && v.title && !v.url.includes('/shorts/'));
}

async function readFeed(url: string): Promise<Video[]> {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(8_000) });
  if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
  const videos = parseYouTubeFeed(await res.text());
  if (!videos.length) throw new Error('YouTube feed had no videos');
  return videos;
}

/** Tries the long-form feed twice, then the channel feed, so a single refusal from YouTube doesn't empty the section. */
export async function fetchYouTubeVideos(): Promise<Video[]> {
  let lastError: unknown;
  for (const url of [YOUTUBE_FEED, YOUTUBE_FEED, CHANNEL_FEED]) {
    try {
      return await readFeed(url);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
