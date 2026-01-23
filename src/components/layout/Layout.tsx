// src/components/layout/Layout.tsx
import { useEffect, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const homeSection = document.getElementById("home");
      if (!homeSection) return;

      const { bottom } = homeSection.getBoundingClientRect();
      setIsHome(bottom > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="app-layout ">
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((v) => !v)}
        isHome={isHome}
      />

      <Menu
        mobileOpen={isMenuOpen}
        onCloseMobile={() => setIsMenuOpen(false)}
      />

      <main className="app-main">{children}</main>

      <Footer />
    </div>
  );
}
