import contact from "@/data/contact.json";
import { getImageUrl } from "@/utils/getImageUrl";
import { MapPin, Mail, Linkedin } from "lucide-react";
import type { ComponentType } from "react";

type ContactData = {
  sectionTitle: string;
  backgroundImage: string;
  left: {
    logoImage: string;

    linkedin?: {
      label: string;
      url: string;
    };

    mail?: {
      label: string;
      url: string;
      value?: string;
    };

    location: {
      label?: string;
      value: string;
    };
  };
  right: {
    name: string;
    role: string;
    brand: string;
    quote?: {
      text: string;
      author?: string;
    };
  };
};

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label?: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="info-row">
      <Icon className="info-row-icon" />
      <div>
        {label && <div className="info-row-label">{label}</div>}
        {href ? (
          <a href={href} className="info-row-link">
            {value}
          </a>
        ) : (
          <div className="info-row-value">{value}</div>
        )}
      </div>
    </div>
  );
}

function ContactCard({ data }: { data: ContactData }) {
  return (
    <div className="contact-card">
      <h2 className="section-title">{data.sectionTitle}</h2>

      <div className="contact-grid">
        {/* LEFT */}
        <div className="flex flex-col items-start">
          <img
            src={getImageUrl(data.left.logoImage)}
            alt="Logo"
            className="max-w-xs"
          />

          {data.left.linkedin && (
            <InfoRow
              icon={Linkedin}
              label={data.left.linkedin.label}
              value="Rafail Tasakis"
              href={data.left.linkedin.url}
            />
          )}

          {data.left.mail?.value && (
            <InfoRow
              icon={Mail}
              label={data.left.mail.label}
              value={data.left.mail.value}
              href={data.left.mail.url}
            />
          )}

          <InfoRow
            icon={MapPin}
            label={data.left.location.label ?? "Location"}
            value={data.left.location.value}
          />
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <h3 className="text-3xl font-bold">{data.right.name}</h3>

          <div className="mt-2 text-xl font-semibold text-primary">
            {data.right.role}
          </div>

          <div className="text-xl font-semibold text-primary">
            {data.right.brand}
          </div>

          {data.right.quote?.text && (
            <div className="mt-8 max-w-md text-sm italic">
              “{data.right.quote.text}”
              {data.right.quote.author && (
                <div className="mt-2 text-xs not-italic">
                  ~ {data.right.quote.author}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const data = contact as ContactData;

  return (
    <section
      className="contact-section section-wrap"
      style={{ backgroundImage: `url(${getImageUrl(data.backgroundImage)})` }}
    >
      <div className="section-inner">
        <ContactCard data={data} />
      </div>
    </section>
  );
}
