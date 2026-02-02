import { Link } from "react-router-dom";
import footer from "@/data/footer.json";

type FooterLink = { label: string; href: string };
type FooterData = {
  brand: string;
  rights?: string;
  credit?: { label?: string; name: string; url?: string };
  links?: FooterLink[];
};

export default function Footer() {
  const data = footer as FooterData;
  const year = new Date().getFullYear();

  const links = data.links ?? [];

  // only legal links on the RIGHT
  const legalLinks = links.filter((l) =>
    ["/privacy", "/impressum", "/privacy-policy", "/imprint"].includes(l.href),
  );

  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        {/* LEFT: credit only */}
        <div className="app-footer__left">
          {data.credit?.name && (
            <p className="app-footer__credit">
              {data.credit.label ?? "Designed & built by"}{" "}
              {data.credit.url ? (
                <a
                  className="app-footer__link"
                  href={data.credit.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.credit.name}
                </a>
              ) : (
                <span>{data.credit.name}</span>
              )}
            </p>
          )}
        </div>

        {/* CENTER: copyright */}
        <div className="app-footer__center">
          <p className="app-footer__meta">
            © {year} {data.brand}
            {data.rights ? `. ${data.rights}` : "."}
          </p>
        </div>

        {/* RIGHT: legal links */}
        <nav className="app-footer__right" aria-label="Legal">
          {legalLinks.map((l) => (
            <Link key={l.href} className="app-footer__legalLink" to={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
