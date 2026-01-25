// src/components/layout/Header.tsx
import { useEffect, useState } from "react";

import LogoLight from "@/assets/images/svg-logo-light.svg";
import LogoDark from "@/assets/images/svg-logo-dark.svg";
import SymbolDark from "@/assets/images/symbol-dark.svg";

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isHome: boolean;
};

export default function Header({
  isMenuOpen,
  onToggleMenu,
  isHome,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On scroll: SymbolDark
  // On top of Home(hero): LogoLight
  // Elsewhere: LogoDark
  const logoSrc = isScrolled ? SymbolDark : isHome ? LogoLight : LogoDark;

  return (
    <header
      className={[
        "app-header",
        isHome ? "is-on-hero" : "is-on-light",
        isScrolled ? "is-scrolled" : "",
      ].join(" ")}
    >
      <a href="#home" className="app-header__logo">
        <img
          src={logoSrc}
          alt="Tasakis Venture Strategy"
          className={[
            "app-header__logo-img",
            isScrolled ? "is-symbol" : "",
          ].join(" ")}
        />
      </a>

      <button
        type="button"
        onClick={onToggleMenu}
        className={[
          "app-header__hamburger",
          "hamburger",
          isMenuOpen ? "open" : "",
        ].join(" ")}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <span className="hamburger-top" />
        <span className="hamburger-middle" />
        <span className="hamburger-bottom" />
      </button>
    </header>
  );
}
