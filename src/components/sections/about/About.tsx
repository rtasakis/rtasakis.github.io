import { useLayoutEffect, useRef } from "react";
import about from "@/data/about.json";
import { toHtml } from "@/utils/toHtml";
import { getImageUrl } from "@/utils/getImageUrl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* =======================
   Types
======================= */

type AboutData = {
  sectionTitle: string;
  profile: {
    name: string;
    position: string;
    organization: string;
    image: string;
    bioHtml: string;
    quoteHtml?: string;
  };

  highlights: {
    sectionTitle: string;
    items: {
      value: number;
      label: string;
      description: string;
    }[];
  };
};

/* =======================
   About Bio
======================= */

function AboutBio({ profile }: { profile: AboutData["profile"] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imageWrapRef.current;
    const text = textRef.current;
    if (!wrap || !img || !text) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // initial state
      gsap.set(img, { x: -40, opacity: 0 });
      gsap.set(text, { x: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none",
          // once: true,
        },
      });

      tl.to(img, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      }).to(
        text,
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.1, // μικρό overlap για πιο cinematic feel
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-bio" ref={wrapRef}>
      <div className="about-bio__image" ref={imageWrapRef}>
        <img
          src={getImageUrl(profile.image)}
          alt={profile.name}
          className="about-bio__img"
        />
      </div>

      <div className="about-bio__text" ref={textRef}>
        <h3 className="about-bio__name">{profile.name}</h3>
        <div className="about-bio__position">{profile.position}</div>
        <div className="about-bio__org">{profile.organization}</div>

        <div
          className="about-bio__content"
          dangerouslySetInnerHTML={{ __html: toHtml(profile.bioHtml) }}
        />

        {profile.quoteHtml && (
          <figure className="about-bio__quote">
            <Quote className="about-bio__quote-icon" aria-hidden />
            <blockquote
              className="about-bio__quote-text"
              dangerouslySetInnerHTML={{ __html: toHtml(profile.quoteHtml) }}
            />
          </figure>
        )}
      </div>
    </div>
  );
}

/* =======================
   Highlight Card
======================= */

function HighlightCard({
  value,
  label,
  description,
}: {
  value: number;
  label: string;
  description: string;
}) {
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (!numberRef.current) return;

    gsap.fromTo(
      numberRef.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.3,
        ease: "power3.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, [value]);

  return (
    <div className="about-highlights__card">
      <div className="about-highlights__card-title">
        <span ref={numberRef} className="about-highlights__number" />
        <span className="about-highlights__label">{label}</span>
      </div>

      <div className="about-highlights__card-text">{description}</div>
    </div>
  );
}

/* =======================
   About Highlights
======================= */

function AboutHighlights({
  highlights,
}: {
  highlights: AboutData["highlights"];
}) {
  return (
    <div className="about-highlights">
      <h3 className="about-highlights__title">{highlights.sectionTitle}</h3>

      <div className="about-highlights__grid">
        {highlights.items.map((item) => (
          <HighlightCard
            key={item.label}
            value={item.value}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

/* =======================
   Main About Section
======================= */

export default function About() {
  const data = about as AboutData;

  return (
    <section
      className="about section-wrap"
      style={{ backgroundColor: "#F3F5F8" }}
    >
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <AboutBio profile={data.profile} />
        <AboutHighlights highlights={data.highlights} />
      </div>
    </section>
  );
}
