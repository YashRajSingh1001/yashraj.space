"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "about" },
  { href: "/writings", label: "writings" },
  { href: "/projects", label: "projects" },
  { href: "/timeline", label: "timeline" },
  { href: "/library", label: "library" },
  { href: "/100-before-30", label: "100/30" },
  { href: "/activity", label: "activity" },
  { href: "/f1", label: "f1" },
];

function toggleTheme() {
  const el = document.documentElement;
  const next = el.dataset.theme === "dark" ? "light" : "dark";
  el.dataset.theme = next;
  try {
    localStorage.setItem("yrs-theme", next);
  } catch {}
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="brand">
          <span className="live-dot" />
          yashraj.space
        </Link>
        <nav className="nav">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}>
                {label}
              </Link>
            );
          })}
          <button type="button" className="theme-toggle" onClick={toggleTheme} title="Toggle light / dark" aria-label="Toggle light / dark">
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
