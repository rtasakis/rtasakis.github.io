// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import LogoLight from "@/assets/images/svg-logo-light.svg";
import LogoDark from "@/assets/images/svg-logo-dark.svg";

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
  const [isMobile, setIsMobile] = useState(false);

  // detect scroll (for adding .is-scrolled)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // detect mobile (matches your CSS breakpoint max-width: 768px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();

    // modern + fallback
    mq.addEventListener?.("change", update);
    mq.addListener?.(update);

    return () => {
      mq.removeEventListener?.("change", update);
      mq.removeListener?.(update);
    };
  }, []);

  // ✅ light only when hero AND NOT (mobile glass state)
  const isGlassOnMobile = isMobile && isScrolled;
  const useLightLogo = isHome && !isGlassOnMobile;

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
          src={useLightLogo ? LogoLight : LogoDark}
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
