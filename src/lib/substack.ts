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

export async function fetchSubstackLetters(): Promise<FeedLetter[]> {
  const res = await fetch(SUBSTACK_FEED, { headers: { Accept: 'application/rss+xml, application/xml' } });
  if (!res.ok) throw new Error(`Substack feed responded ${res.status}`);
  return parseSubstackFeed(await res.text());
}
