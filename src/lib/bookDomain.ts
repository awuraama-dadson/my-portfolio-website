/**
 * The book site lives in public/book/ and is served at /book/ on the main site,
 * and at the root of its own domain. Locally, http://book.localhost:5173 acts as the book domain.
 */
export const BOOK_DOMAIN = 'awuraamadadsonbook.com';

export const isBookDomain = (hostname: string) =>
  hostname === BOOK_DOMAIN || hostname === `www.${BOOK_DOMAIN}` || hostname.startsWith('book.');

/** For a request on the book domain, the file under /book/ to serve; otherwise null. */
export function bookHostPath(hostname: string, pathname: string): string | null {
  if (!isBookDomain(hostname)) return null;
  if (pathname === '/' || pathname === '') return '/book/index.html';
  if (pathname === '/index.html' || pathname === '/book-options.html' || pathname.startsWith('/asset/')) {
    return '/book' + pathname;
  }
  return null;
}
