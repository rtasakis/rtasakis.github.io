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

  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__left">
          <p className="app-footer__meta">
            © {year} {data.brand}
            {data.rights ? `. ${data.rights}` : "."}
          </p>

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
      </div>
    </footer>
  );
}
