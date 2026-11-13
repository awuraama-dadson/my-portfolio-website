/**
 * Refreshes src/content/letters.feed.ts (the saved copy of the latest Substack letters) from the live feed.
 * Run by .github/workflows/update-letters.yml every hour, and before every build (`npm run build`),
 * so the site never shows an out-of-date "latest letter". Also runnable by hand: `npm run update-letters`.
 * Only rewrites the file when the letters have changed, and never overwrites it with an empty list.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fetchSubstackLetters, type FeedLetter } from '../src/lib/substack.ts';

const FILE = new URL('../src/content/letters.feed.ts', import.meta.url);

let letters: FeedLetter[] = [];
try {
  letters = await fetchSubstackLetters();
} catch (err) {
  // Substack occasionally refuses; keep the saved copy and try again next time.
  console.warn(`Couldn't reach Substack (${String(err)}); leaving the saved letters as they are.`);
  process.exit(0);
}

if (!letters.length) process.exit(0);

const next = `/** Last-known letters from Substack, kept up to date by scripts/update-letters.ts. Do not edit by hand. */
import type { FeedLetter } from '../lib/substack';

export const feedLetters: FeedLetter[] = ${JSON.stringify(letters, null, 2)};
`;

let current = '';
try {
  current = readFileSync(FILE, 'utf8');
} catch {
  // first run: the file doesn't exist yet
}

if (current === next) {
  console.log('Letters unchanged.');
} else {
  writeFileSync(FILE, next);
  console.log(`Saved ${letters.length} letters, newest: ${letters[0].title} (${letters[0].date})`);
}
