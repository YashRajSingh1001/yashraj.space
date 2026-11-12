import { fetchFeed, items, tag, stripTags } from "@/lib/rss";
import { fallbackCurrent, fallbackRead, fallbackWant, type Book, type CurrentBook } from "@/data/library";

export interface Library {
  current: CurrentBook | null;
  read: Book[];
  want: Book[];
  readThisYear: number;
  synced: boolean;
}

async function shelf(userId: string, name: string): Promise<{ book: Book; readAt: string }[] | null> {
  const xml = await fetchFeed(`https://www.goodreads.com/review/list_rss/${userId}?shelf=${name}&per_page=100`, 21600);
  if (!xml) return null;
  return items(xml).map((item) => {
    const rating = Number(tag(item, "user_rating")) || undefined;
    return {
      book: {
        title: stripTags(tag(item, "title")),
        author: stripTags(tag(item, "author_name")),
        cover: tag(item, "book_large_image_url") || tag(item, "book_medium_image_url") || tag(item, "book_image_url"),
        rating,
        note: stripTags(tag(item, "user_review")) || undefined,
        url: tag(item, "link"),
      },
      readAt: tag(item, "user_read_at"),
    };
  });
}

// Set GOODREADS_USER_ID (the number in your Goodreads profile URL) to sync shelves.
export async function getLibrary(): Promise<Library> {
  const userId = process.env.GOODREADS_USER_ID;
  if (userId) {
    const [read, current, want] = await Promise.all([
      shelf(userId, "read"),
      shelf(userId, "currently-reading"),
      shelf(userId, "to-read"),
    ]);
    if (read && current && want) {
      const year = new Date().getFullYear();
      return {
        current: current[0]?.book ?? null,
        read: read.map((r) => r.book),
        want: want.map((r) => r.book),
        readThisYear: read.filter((r) => r.readAt && new Date(r.readAt).getFullYear() === year).length,
        synced: true,
      };
    }
  }
  return {
    current: fallbackCurrent,
    read: fallbackRead,
    want: fallbackWant,
    readThisYear: fallbackRead.length,
    synced: false,
  };
}
