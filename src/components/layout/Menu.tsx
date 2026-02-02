import { useEffect, useMemo, useState } from "react";
import navigation from "@/data/navigation.json";
import { getIcon } from "@/utils/iconByKey";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

type NavigationData = {
  items: NavItem[];
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // ✅ URL update ONLY on click
  if (id === "home") {
    history.pushState(null, "", window.location.pathname);
  } else {
    history.pushState(null, "", `#${id}`);
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useActiveSection(items: NavItem[]) {
  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "home");

  useEffect(() => {
    if (items.length > 0) setActiveId(items[0].id);
  }, [items]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    let ticking = false;

    const updateActive = () => {
      const scanY = window.innerHeight * 0.35;

      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= scanY && rect.bottom >= scanY) {
          setActiveId(s.id);
          return;
        }
      }

      let bestId = sections[0].id;
      let bestDist = Infinity;

      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const dist = Math.abs(rect.top - scanY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }

      setActiveId(bestId);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return activeId;
}

/* ================= Desktop Menu ================= */

function DesktopMenu({
  items,
  activeId,
  isOnHero,
}: {
  items: NavItem[];
  activeId: string;
  isOnHero: boolean;
}) {
  return (
    <nav aria-label="Primary" className="menu menu--desktop">
      <div className="menu__container">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (isActive) return;
                scrollToSection(item.id);
              }}
              className={`menu__item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="menu__active-bar" />
              <Icon className={`menu__icon ${isActive ? "is-active" : ""}`} />
              <span className={`menu__label ${isActive ? "is-active" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ================= Mobile dropdown menu ================= */

function MobileDropdownMenu({
  items,
  activeId,
  open,
  onClose,
  isOnHero,
}: {
  items: NavItem[];
  activeId: string;
  open: boolean;
  onClose: () => void;
  isOnHero: boolean;
}) {
  return (
    <div
      className={`mobile-menu ${open ? "is-open" : ""}`}
      // className={`mobile-menu ${open ? "is-open" : ""} ${
      //   isOnHero ? "menu--on-hero" : "menu--on-light"
      // }`}
    >
      <div className="mobile-menu__panel">
        <div className="mobile-menu__list">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToSection(item.id);
                  onClose();
                }}
                className={`mobile-menu__item ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="mobile-menu__icon" />
                <span className="mobile-menu__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Menu({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const nav = navigation as unknown as NavigationData;
  const items = nav?.items ?? [];
  const activeId = useActiveSection(items);

  // ✅ This is the ONLY source of truth for "hero vs light"
  const isOnHero = activeId === "home";

  if (items.length === 0) return null;

  return (
    <>
      <DesktopMenu items={items} activeId={activeId} isOnHero={isOnHero} />
      <MobileDropdownMenu
        items={items}
        activeId={activeId}
        open={mobileOpen}
        onClose={onCloseMobile}
        isOnHero={isOnHero}
      />
    </>
  );
}
