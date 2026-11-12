import { fetchSubstackLetters } from '../src/lib/substack';

export const config = { runtime: 'edge' };

/** GET /api/letters: the latest letters from Substack, cached at Vercel's edge for 15 minutes. */
export default async function handler(): Promise<Response> {
  try {
    const letters = await fetchSubstackLetters();
    return Response.json(letters, {
      headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400' },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
