import journey from "@/data/journey.json";

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

function BlockTitle({ children }: { children: string }) {
  return <h3 className="journey-block-title">{children}</h3>;
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
    <div className="journey-timeline-item">
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
      <BlockTitle>{data.title}</BlockTitle>

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
      <BlockTitle>{data.title}</BlockTitle>

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

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="journey-block-title">{title}</h3>

      <ul className="journey-bullet-list">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Journey() {
  const data = journey as JourneyData;

  const certItems = data.certifications.items.map((c) => {
    const suffix = c.year ?? c.date;
    const issuer = c.issuer ? ` by ${c.issuer}` : "";
    return suffix ? `${c.title}${issuer} (${suffix})` : `${c.title}${issuer}`;
  });

  const honorItems = data.honors.items.map((h) => {
    const issuer = h.issuer ? ` by ${h.issuer}` : "";
    return h.year ? `${h.title}${issuer} (${h.year})` : `${h.title}${issuer}`;
  });

  return (
  <section className="section-wrap">
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <div className="journey-grid">
          <ExperienceTimeline data={data.experience} />
          <EducationTimeline data={data.education} />
        </div>

        <div className="journey-grid journey-grid--bottom">
          <BulletList title={data.certifications.title} items={certItems} />
          <BulletList title={data.honors.title} items={honorItems} />
        </div>
      </div>
    </section>
  );
}
