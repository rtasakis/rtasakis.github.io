import { useLayoutEffect, useRef } from "react";
import about from "@/data/about.json";
import { toHtml } from "@/utils/toHtml";
import { getImageUrl } from "@/utils/getImageUrl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =======================
   Types
======================= */

type AboutData = {
  sectionTitle: string;
  backgroundImage: string;

  profile: {
    name: string;
    position: string;
    organization: string;
    image: string;
    bioHtml: string;
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
  return (
    <div className="about-bio">
      <div className="about-bio__image">
        <img
          src={getImageUrl(profile.image)}
          alt={profile.name}
          className="about-bio__img"
        />
      </div>

      <div className="about-bio__text">
        <h3 className="about-bio__name">{profile.name}</h3>
        <div className="about-bio__position">{profile.position}</div>
        <div className="about-bio__org">{profile.organization}</div>

        <div
          className="about-bio__content"
          dangerouslySetInnerHTML={{ __html: toHtml(profile.bioHtml) }}
        />
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
      style={{
        backgroundImage: `url(${getImageUrl(data.backgroundImage)})`,
      }}
    >
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <AboutBio profile={data.profile} />
        <AboutHighlights highlights={data.highlights} />
      </div>
    </section>
  );
}
