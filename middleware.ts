/**
 * Vercel Routing Middleware: on awuraamadadsonbook.com, serve the book site (public/book/) at the root,
 * so visitors see awuraamadadsonbook.com and awuraamadadsonbook.com/book-options.html.
 * On every other domain this does nothing. The same mapping runs locally in vite.config.ts.
 */
import { bookHostPath } from './src/lib/bookDomain';

export const config = { matcher: ['/', '/index.html', '/book-options.html', '/asset/:path*'] };

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url);
  const path = bookHostPath(url.hostname, url.pathname);
  if (!path) return undefined;
  url.pathname = path;
  return new Response(null, { headers: { 'x-middleware-rewrite': url.toString() } });
}
