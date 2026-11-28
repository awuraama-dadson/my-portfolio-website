/**
 * Parses The Becoming Letter's Substack RSS feed into plain letter objects.
 * Shared by the Vercel function (api/letters.ts) and the local dev server (vite.config.ts),
 * so it must not touch the DOM.
 */
export const SUBSTACK_FEED = 'https://awuraamadadson.substack.com/feed';

export interface FeedLetter {
  title: string;
  excerpt: string;
  date: string; // ISO date (YYYY-MM-DD)
  url: string;
}

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};

export function parseSubstackFeed(xml: string): FeedLetter[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((item) => {
      const url = tag(item, 'link');
      const pub = new Date(tag(item, 'pubDate'));
      return {
        title: tag(item, 'title'),
        excerpt: tag(item, 'description'),
        date: isNaN(pub.getTime()) ? '' : pub.toISOString().slice(0, 10),
        url,
      };
    })
    .filter((l) => l.url && l.title);
}

async function fetchDirect(): Promise<FeedLetter[]> {
  const res = await fetch(SUBSTACK_FEED, { headers: { Accept: 'application/rss+xml, application/xml' } });
  if (!res.ok) throw new Error(`Substack feed responded ${res.status}`);
  const letters = parseSubstackFeed(await res.text());
  if (!letters.length) throw new Error('Substack feed had no letters');
  return letters;
}

/**
 * Substack often refuses requests from cloud servers (GitHub Actions, Vercel), so when the direct
 * fetch fails we read the same feed through rss2json, which fetches it from its own servers.
 */
async function fetchViaRss2Json(): Promise<FeedLetter[]> {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_FEED)}`);
  if (!res.ok) throw new Error(`rss2json responded ${res.status}`);
  const body = (await res.json()) as {
    status?: string;
    items?: { title?: string; link?: string; pubDate?: string; description?: string }[];
  };
  if (body.status !== 'ok' || !body.items?.length) throw new Error(`rss2json returned no letters`);
  return body.items
    .map((item) => {
      // rss2json dates look like "2026-11-27 11:14:17" (UTC)
      const pub = new Date(`${(item.pubDate ?? '').replace(' ', 'T')}Z`);
      return {
        title: decode(item.title ?? ''),
        excerpt: decode(item.description ?? ''),
        date: isNaN(pub.getTime()) ? '' : pub.toISOString().slice(0, 10),
        url: item.link ?? '',
      };
    })
    .filter((l) => l.url && l.title);
}

export async function fetchSubstackLetters(): Promise<FeedLetter[]> {
  try {
    return await fetchDirect();
  } catch (direct) {
    try {
      return await fetchViaRss2Json();
    } catch (backup) {
      throw new Error(`${String(direct)}; backup also failed: ${String(backup)}`);
    }
  }
}
