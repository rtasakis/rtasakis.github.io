import about from "@/data/about.json";
import { toHtml } from "@/utils/toHtml";
import { getImageUrl } from "@/utils/getImageUrl";

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
    items: { title: string; description: string }[];
  };
};

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
          <div key={item.title} className="about-highlights__card">
            <div className="about-highlights__card-title">{item.title}</div>
            <div className="about-highlights__card-text">
              {item.description} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const data = about as AboutData;

  return (
    <section
      className="about section-wrap"
      style={{ backgroundImage: `url(${getImageUrl(data.backgroundImage)})` }}
    >
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <AboutBio profile={data.profile} />
        <AboutHighlights highlights={data.highlights} />
      </div>
    </section>
  );
}
