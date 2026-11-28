/**
 * Refreshes src/content/letters.feed.ts (the saved copy of the latest Substack letters) from the live feed.
 * Run by .github/workflows/update-letters.yml every hour, and before every build (`npm run build`),
 * so the site never shows an out-of-date "latest letter". Also runnable by hand: `npm run update-letters`.
 * Only rewrites the file when the letters have changed, and never overwrites it with an empty list.
 * If Substack can't be reached and the saved newest letter is over a week old, it exits with an error
 * so the GitHub workflow fails visibly instead of silently missing new letters.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fetchSubstackLetters, type FeedLetter } from '../src/lib/substack.ts';

const FILE = new URL('../src/content/letters.feed.ts', import.meta.url);
const KEEP = 20;
const STALE_DAYS = 8; // a new letter goes out every week

let current = '';
try {
  current = readFileSync(FILE, 'utf8');
} catch {
  // first run: the file doesn't exist yet
}

let saved: FeedLetter[] = [];
const json = current.match(/=\s*(\[[\s\S]*\]);/);
if (json) {
  try {
    saved = JSON.parse(json[1]);
  } catch {
    // unreadable saved copy: replace it with the live one
  }
}

let fresh: FeedLetter[] = [];
try {
  fresh = await fetchSubstackLetters();
} catch (err) {
  const newest = saved.map((l) => l.date).sort().at(-1);
  const ageDays = newest ? (Date.now() - Date.parse(newest)) / 86_400_000 : Infinity;
  if (ageDays > STALE_DAYS && process.env.CI) {
    console.error(`::error::Couldn't reach Substack (${String(err)}) and the saved newest letter is from ${newest ?? 'never'}.`);
    process.exit(1);
  }
  // Substack occasionally refuses; keep the saved copy and try again next time.
  console.warn(`::warning::Couldn't reach Substack (${String(err)}); leaving the saved letters as they are.`);
  process.exit(0);
}

if (!fresh.length) process.exit(0);

// Merge with the saved copy so a shorter feed never drops older letters.
const seen = new Set(fresh.map((l) => l.url));
const letters = [...fresh, ...saved.filter((l) => !seen.has(l.url))]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, KEEP);

const next = `/** Last-known letters from Substack, kept up to date by scripts/update-letters.ts. Do not edit by hand. */
import type { FeedLetter } from '../lib/substack';

export const feedLetters: FeedLetter[] = ${JSON.stringify(letters, null, 2)};
`;

if (current === next) {
  console.log('Letters unchanged.');
} else {
  writeFileSync(FILE, next);
  console.log(`Saved ${letters.length} letters, newest: ${letters[0].title} (${letters[0].date})`);
}
