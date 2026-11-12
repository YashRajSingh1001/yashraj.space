import { site, gmailCompose } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <span>yash raj singh · bengaluru · {new Date().getFullYear()}</span>
      <span className="footer-links">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label.toLowerCase()} ↗
          </a>
        ))}
        <a href={gmailCompose} target="_blank" rel="noopener noreferrer">
          {site.email}
        </a>
      </span>
    </footer>
  );
}
