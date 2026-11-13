import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchSubstackLetters } from './src/lib/substack';
import { fetchYouTubeVideos } from './src/lib/youtube';
import { bookHostPath } from './src/lib/bookDomain';

/** Serves a JSON feed at `path` during `npm run dev` and `npm run preview`, mirroring the Vercel functions in api/. */
function feedApi(path: string, load: () => Promise<unknown>): Plugin {
  const handler = async (_req: unknown, res: { setHeader(k: string, v: string): void; statusCode: number; end(body: string): void }) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      res.end(JSON.stringify(await load()));
    } catch (err) {
      res.statusCode = 502;
      res.end(JSON.stringify({ error: String(err) }));
    }
  };
  return {
    name: `feed-api:${path}`,
    configureServer(server) {
      server.middlewares.use(path, handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(path, handler);
    },
  };
}

/**
 * Serves the static book site (public/book/) during `npm run dev`, mirroring vercel.json and middleware.ts:
 * /book → /book/, /book/ → /book/index.html, and http://book.localhost:5173 acts as awuraamadadsonbook.com.
 */
function bookSite(): Plugin {
  return {
    name: 'book-site',
    configureServer(server) {
      server.middlewares.use((rawReq, res, next) => {
        // Typed loosely: this project doesn't install @types/node.
        const req = rawReq as unknown as { url?: string; headers: { host?: string } };
        const url = new URL(req.url ?? '/', 'http://localhost');
        const host = (req.headers.host ?? '').split(':')[0];
        if (url.pathname === '/book') {
          res.statusCode = 308;
          res.setHeader('Location', '/book/' + url.search);
          return res.end();
        }
        const mapped = url.pathname === '/book/' ? '/book/index.html' : bookHostPath(host, url.pathname);
        if (mapped) req.url = mapped + url.search;
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    feedApi('/api/letters', fetchSubstackLetters),
    feedApi('/api/videos', fetchYouTubeVideos),
    bookSite(),
  ],
});
