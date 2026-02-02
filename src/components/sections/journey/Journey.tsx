import journey from "@/data/journey.json";
import { Briefcase, GraduationCap, BadgeCheck, Trophy } from "lucide-react";

type JourneyData = {
  sectionTitle: string;
  experience: {
    title: string;
    items: {
      organization: string;
      location: string;
      roles: { title: string; start: string; end: string }[];
    }[];
  };
  education: {
    title: string;
    items: {
      organization: string;
      location: string;
      degree: string;
      start: string;
      end: string;
    }[];
  };
  certifications: {
    title: string;
    items: {
      title: string;
      issuer?: string;
      year?: string;
      date?: string;
    }[];
  };
  honors: {
    title: string;
    items: {
      title: string;
      issuer?: string;
      year?: string;
    }[];
  };
};

function BlockTitle({
  children,
  icon: Icon,
}: {
  children: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <h3 className="journey-block-title">
      {Icon && (
        <span className="journey-block-title__icon">
          <Icon className="journey-block-title__icon-svg" aria-hidden />
        </span>
      )}
      <span>{children}</span>
    </h3>
  );
}

function TimelineItem({
  header,
  lines,
  isLast,
}: {
  header: string;
  lines: string[];
  isLast: boolean;
}) {
  return (
    <div className="journey-timeline-item group">
      <div className="journey-timeline-marker">
        <span className="journey-timeline-dot" />
        {!isLast && <span className="journey-timeline-line" />}
      </div>

      <div className="journey-timeline-content">
        <div className="journey-timeline-header">{header}</div>
        {lines.map((t, i) => (
          <div key={i} className="journey-timeline-text">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceTimeline({ data }: { data: JourneyData["experience"] }) {
  return (
    <div>
      <BlockTitle icon={Briefcase}>{data.title}</BlockTitle>

      <div className="journey-timeline">
        {data.items.map((org, idx) => (
          <TimelineItem
            key={`${org.organization}-${idx}`}
            header={`${org.organization} | ${org.location}`}
            lines={org.roles.map((r) => `${r.title}, ${r.start} – ${r.end}`)}
            isLast={idx === data.items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function EducationTimeline({ data }: { data: JourneyData["education"] }) {
  return (
    <div>
      <BlockTitle icon={GraduationCap}>{data.title}</BlockTitle>

      <div className="journey-timeline">
        {data.items.map((e, idx) => (
          <TimelineItem
            key={`${e.organization}-${idx}`}
            header={`${e.organization}, ${e.location}`}
            lines={[`${e.degree}, ${e.start} – ${e.end}`]}
            isLast={idx === data.items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function BulletList({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: { title: string; meta?: string }[];
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <div>
      <BlockTitle icon={Icon}>{title}</BlockTitle>

      <ul className="journey-bullet-list">
        {items.map((item, i) => (
          <li key={i}>
            <span className="journey-bullet-title">{item.title}</span>
            {item.meta && (
              <span className="journey-bullet-meta"> {item.meta}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Journey() {
  const data = journey as JourneyData;

  const certItems = data.certifications.items.map((c) => ({
    title: c.title,
    meta: [c.issuer, c.year ?? c.date].filter(Boolean).join(" "),
  }));

  const honorItems = data.honors.items.map((h) => ({
    title: h.title,
    meta: [h.issuer, h.year].filter(Boolean).join(" "),
  }));

  return (
    <section className="section-wrap">
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <div className="journey-grid">
          <ExperienceTimeline data={data.experience} />
          <EducationTimeline data={data.education} />

          <BulletList
            title={data.certifications.title}
            items={certItems}
            icon={BadgeCheck}
          />
          <BulletList
            title={data.honors.title}
            items={honorItems}
            icon={Trophy}
          />
        </div>
      </div>
    </section>
  );
}
