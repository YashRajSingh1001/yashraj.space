import type { Metadata } from "next";
import { Source_Sans_3, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yash Raj Singh",
  description:
    "Yash Raj Singh — data scientist in Bengaluru. Essays, builds, books, and 100 things to do before 30.",
  metadataBase: new URL("https://yashraj.space"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yashraj.space",
    siteName: "yashraj.space",
  },
};

// Runs before paint so the saved theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('yrs-theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sourceSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        <div className="container">
          <Footer />
        </div>
      </body>
    </html>
  );
}
