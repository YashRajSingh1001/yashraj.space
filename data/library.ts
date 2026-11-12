// Fallback shelves, used until GOODREADS_USER_ID is set (see lib/goodreads.ts).
// These are placeholders — replace with your own, or connect Goodreads.

export interface Book {
  title: string;
  author: string;
  cover: string;
  rating?: number; // 1–5
  note?: string;
  url: string;
}

export interface CurrentBook extends Book {
  progress?: number; // 0–100
}

export const READING_GOAL = 12;

const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
const search = (title: string) => `https://www.goodreads.com/search?q=${encodeURIComponent(title)}`;
const book = (title: string, author: string, isbn: string, rating?: number, note?: string): Book => ({
  title,
  author,
  cover: cover(isbn),
  rating,
  note,
  url: search(title),
});

export const fallbackCurrent: CurrentBook = {
  ...book("Born to Run", "Christopher McDougall", "9780307279187"),
  progress: Math.round((142 / 287) * 100),
};

export const fallbackRead: Book[] = [
  book("Range", "David Epstein", "9780735214484", 5, "A case for the maths-to-data detour."),
  book("Sapiens", "Yuval Noah Harari", "9780062316097", 4, "Big ideas, best read slowly."),
  book("Deep Work", "Cal Newport", "9781455586691", 4, "Turned off Slack notifications after ch. 2."),
  book("The Psychology of Money", "Morgan Housel", "9780857197689", 4, "Short chapters, long after-effects."),
  book("What I Talk About When I Talk About Running", "Haruki Murakami", "9780307389831", 5, "Read it the week I started running daily."),
  book("Naked Statistics", "Charles Wheelan", "9780393347777", 4, "The stats course I wish college had been."),
  book("Thinking, Fast and Slow", "Daniel Kahneman", "9780374533557", 5, "Changed how I read every A/B test."),
];

export const fallbackWant: Book[] = [
  book("Shoe Dog", "Phil Knight", "9781501135910"),
  book("Designing Data-Intensive Applications", "Martin Kleppmann", "9781449373320"),
  book("Project Hail Mary", "Andy Weir", "9780593135204"),
  book("The Signal and the Noise", "Nate Silver", "9780143125082"),
];
