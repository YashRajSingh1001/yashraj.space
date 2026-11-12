// Latest posts via the Instagram API with Instagram Login (needs a Creator or Business account).
// Set INSTAGRAM_ACCESS_TOKEN to a long-lived token; without it the site shows a follow card instead.

export const INSTAGRAM_HANDLE = "yashraj.decodes";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export interface InstaPost {
  id: string;
  image: string;
  caption: string;
  url: string;
  isVideo: boolean;
}

interface ApiMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
}

export async function getInstagramPosts(limit = 6): Promise<InstaPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const { data } = (await res.json()) as { data: ApiMedia[] };
    return data
      .map((m) => ({
        id: m.id,
        image: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
        caption: m.caption?.split("\n")[0] ?? "",
        url: m.permalink,
        isVideo: m.media_type === "VIDEO",
      }))
      .filter((p) => p.image);
  } catch {
    return null;
  }
}
