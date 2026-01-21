import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import home from "@/data/home.json";
import { getImageUrl } from "@/utils/getImageUrl";
import HeroBackgroundMotion from "@/components/playground/HeroBackgroundMotion";

type HeroBackgroundItem = {
  src: string; // e.g. "innovators.jpg"
  alt: string;
};

type HeroCard = {
  id: string;
  audience: string;
  title: string;
  text: string[];
  cta: {
    label: string;
    action: "scroll" | "link";
    target: string;
  };
  background: [HeroBackgroundItem, HeroBackgroundItem]; // exactly 2
};

function handleCta(cta: HeroCard["cta"]) {
  if (cta.action === "scroll") {
    const el = document.getElementById(cta.target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.open(cta.target, "_blank", "noopener,noreferrer");
}

function bgUrl(fileName: string) {
  // your getImageUrl already prepends /src/assets/images/
  return getImageUrl(fileName);
}

export default function Home() {
  const cards = useMemo(() => (home?.cards ?? []) as HeroCard[], []);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const active = cards[activeIndex];

  /* ================= AUTOPLAY (CARD SWITCH) ================= */

  const AUTOPLAY_DELAY = 6000;
  const autoplayRef = useRef<number | null>(null);

  const stopAutoplay = () => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const isAnimatingRef = useRef(false);

  const goTo = (nextIndex: number) => {
    if (!cards.length) return;

    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const outTargets = [
      audienceRef.current,
      titleRef.current,
      textWrapRef.current,
      ctaRef.current,
    ].filter(Boolean) as Element[];

    const tl = gsap.timeline({
      onComplete: () => {
        requestAnimationFrame(() => {
          isAnimatingRef.current = false;
        });
      },
    });

    // 1) Text OUT (a bit faster)
    tl.to(
      outTargets,
      {
        opacity: 0,
        y: -14,
        filter: "blur(8px)",
        duration: 0.32,
        ease: "power2.in",
        stagger: 0.04,
      },
      0,
    );

    // 2) Switch slide EARLY (while bg is already moving)
    tl.add(() => {
      setActiveIndex(nextIndex);
    }, 0.18);
  };

  const next = () => {
    if (!cards.length) return;
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + 1) % cards.length;
    goTo(nextIndex);
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (cards.length <= 1) return;

    autoplayRef.current = window.setInterval(() => {
      if (!isAnimatingRef.current) next();
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!cards.length) return;
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  /* ================= REFS (TEXT) ================= */

  const sectionRef = useRef<HTMLElement | null>(null);
  const audienceRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  /* ================= TEXT ANIMATION (IN) ================= */

  useLayoutEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const targets = [
        audienceRef.current,
        titleRef.current,
        textWrapRef.current,
        ctaRef.current,
      ].filter(Boolean) as Element[];

      gsap.set(targets, { opacity: 0, y: 28, filter: "blur(8px)" });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.09,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [active?.id]);

  if (!active) return null;

  // ✅ Option B: typed mutable tuple (no readonly issue)
  const activeBg: [{ src: string; alt: string }, { src: string; alt: string }] =
    [
      {
        src: bgUrl(active.background[0].src),
        alt: active.background[0].alt,
      },
      {
        src: bgUrl(active.background[1].src),
        alt: active.background[1].alt,
      },
    ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Background motion (per active card) */}
      <HeroBackgroundMotion
        images={activeBg}
        overlayClassName="bg-black/55"
        firstHoldMs={3000}
        holdMs={3800}
        outDur={1.05}
        inDur={1.65}
        outX={-1.4}
        inStartX={2.0}
        outBlur={8}
        inBlur={12}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-[36rem] min-[850px]:max-w-2xl">
            <div
              ref={audienceRef}
              className="text-sm font-semibold tracking-wide text-white/70"
            >
              {active.audience}
            </div>

            <h1
              ref={titleRef}
              className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl"
            >
              {active.title}
            </h1>

            <div ref={textWrapRef} className="mt-8 space-y-4">
              {active.text.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm leading-relaxed text-white/80 md:text-base"
                >
                  {line}
                </p>
              ))}
            </div>

            <button
              ref={ctaRef}
              type="button"
              onClick={() => handleCta(active.cta)}
              className="
                mt-10 inline-flex items-center justify-center
                rounded-full px-6 py-3
                text-sm font-semibold text-white
                bg-[#2e5365]
                border border-[rgba(255,255,255,0.18)]
                cursor-pointer
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              {active.cta.label}
            </button>
          </div>
        </div>
      </div>

      {/* Vertical switcher */}
      <div className="hero-switcher">
        {cards.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              stopAutoplay();
              goTo(idx);
              window.setTimeout(() => startAutoplay(), 200);
            }}
            className={`hero-switcher__item ${
              idx === activeIndex ? "is-active" : ""
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
