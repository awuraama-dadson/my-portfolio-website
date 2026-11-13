/**
 * Refreshes src/content/videos.ts (the saved copy of the latest YouTube videos) from the live feed.
 * Run by .github/workflows/update-videos.yml every hour; also runnable by hand: `npm run update-videos`.
 * Only rewrites the file when the list of videos has changed, and never overwrites it with an empty list.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fetchYouTubeVideos } from '../src/lib/youtube.ts';

const FILE = new URL('../src/content/videos.ts', import.meta.url);
const KEEP = 4;

let videos: Awaited<ReturnType<typeof fetchYouTubeVideos>> = [];
try {
  videos = (await fetchYouTubeVideos()).slice(0, KEEP);
} catch (err) {
  // YouTube occasionally refuses; the next hourly run will try again.
  console.warn(`Couldn't reach YouTube (${String(err)}); leaving the saved copy as it is.`);
  process.exit(0);
}

if (!videos.length) process.exit(0);

const next = `/** Last-known videos, kept up to date by scripts/update-videos.ts. Used when the live feed can't be reached. */
import type { Video } from '../lib/youtube';

export const savedVideos: Video[] = ${JSON.stringify(videos, null, 2)};
`;

if (readFileSync(FILE, 'utf8') === next) {
  console.log('Videos unchanged.');
} else {
  writeFileSync(FILE, next);
  console.log(`Saved ${videos.length} videos, newest: ${videos[0].title}`);
}
