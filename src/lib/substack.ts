/**
 * Parses The Becoming Letter's Substack RSS feed into plain letter objects.
 * Shared by the Vercel function (api/letters.ts) and the local dev server (vite.config.ts),
 * so it must not touch the DOM.
 */
export const SUBSTACK_FEED = 'https://sheshares.substack.com/feed';

export interface FeedLetter {
  title: string;
  excerpt: string;
  date: string; // ISO date (YYYY-MM-DD)
  url: string;
  image?: string;
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

/** Ask Substack's image CDN for a web-sized WebP instead of the full original. */
const sizeImage = (url: string) =>
  url.includes('substackcdn.com/image/fetch/') ? url.replace(/,f_auto,/, ',w_900,c_limit,f_webp,') : url;

export function parseSubstackFeed(xml: string): FeedLetter[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((item) => {
      const url = tag(item, 'link');
      const pub = new Date(tag(item, 'pubDate'));
      // The cover image; if a post has none, fall back to the first image in its body.
      const enclosure = item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1];
      const firstImg = tag(item, 'content:encoded').match(/<img[^>]+src="([^"]+)"/)?.[1];
      const image = enclosure ?? firstImg;
      return {
        title: tag(item, 'title'),
        excerpt: tag(item, 'description'),
        date: isNaN(pub.getTime()) ? '' : pub.toISOString().slice(0, 10),
        url,
        image: image ? sizeImage(decode(image)) : undefined,
      };
    })
    .filter((l) => l.url && l.title);
}

export async function fetchSubstackLetters(): Promise<FeedLetter[]> {
  const res = await fetch(SUBSTACK_FEED, { headers: { Accept: 'application/rss+xml, application/xml' } });
  if (!res.ok) throw new Error(`Substack feed responded ${res.status}`);
  return parseSubstackFeed(await res.text());
}
