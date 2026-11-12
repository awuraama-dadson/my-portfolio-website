import { fetchYouTubeVideos } from '../src/lib/youtube';

export const config = { runtime: 'edge' };

/** GET /api/videos: the latest uploads from YouTube, cached at Vercel's edge for 15 minutes. */
export default async function handler(): Promise<Response> {
  try {
    const videos = await fetchYouTubeVideos();
    return Response.json(videos, {
      headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400' },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
