import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import home from "@/data/home.json";
import { getImageUrl } from "@/utils/getImageUrl";
import CarouselBackgroundGlitch, {
  type CarouselBgHandle,
} from "@/components/playground/CarouselBackgroundGlitch";

type HeroBackgroundItem = {
  src: string;
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
  background: [HeroBackgroundItem]; // ✅ your schema: 1 image
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

  const next = () => {
    if (!cards.length) return;
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + 1) % cards.length;
    goTo(nextIndex);
  };

  /* ================= REFS (TEXT) ================= */

  const sectionRef = useRef<HTMLElement | null>(null);
  const audienceRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  /* ================= BG GLITCH REF ================= */

  const bgRef = useRef<CarouselBgHandle | null>(null);

  const currentBg = active?.background?.[0]
    ? { src: bgUrl(active.background[0].src), alt: active.background[0].alt }
    : { src: "", alt: "" };

  const goTo = (nextIndex: number) => {
    if (!cards.length) return;

    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const nextCard = cards[nextIndex];
    const nextBgItem = nextCard?.background?.[0];
    const nextBg = nextBgItem
      ? { src: bgUrl(nextBgItem.src), alt: nextBgItem.alt }
      : { src: "", alt: "" };

    // ✅ 1) GLITCH the background AND swap image during the glitch
    bgRef.current?.glitchTo(nextBg);

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

    // ✅ 2) Text OUT
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

    // ✅ 3) Switch card content (sync-ish with background glitch swap)
    tl.add(() => {
      setActiveIndex(nextIndex);
    }, 0.18);
  };

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

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      // onMouseEnter={stopAutoplay}
      // onMouseLeave={startAutoplay}
    >
      {/* ✅ Background carousel (active card image) + glitch on change */}
      <CarouselBackgroundGlitch
        ref={bgRef}
        src={currentBg.src}
        alt={currentBg.alt}
        overlayClassName="bg-black/55"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-[36rem] min-[850px]:max-w-2xl">
            <div
              ref={audienceRef}
              className=" text-base md:text-lg font-semibold tracking-wide text-white/70"
            >
              {active.audience}
            </div>

            <h1
              ref={titleRef}
              className="mt-3 text-4xl font-bold tracking-wide  text-white md:text-6xl"
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
