// src/components/layout/Header.tsx
import LogoLight from "@/assets/images/svg-logo-light.svg";
import LogoDark from "@/assets/images/svg-logo-dark.svg";

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isHome: boolean;
};

export default function Header({ isMenuOpen, onToggleMenu, isHome }: HeaderProps) {
  return (
    <header className={`app-header ${isHome ? "is-on-hero" : "is-on-light"}`}>
      <a href="#home" className="app-header__logo">
        <img
          src={isHome ? LogoLight : LogoDark}
          alt="Tasakis Venture Strategy"
          className="app-header__logo-img"
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
