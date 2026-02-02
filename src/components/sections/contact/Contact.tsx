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
    tagline: string;
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

// function ContactCard({ data }: { data: ContactData }) {
//   return (

//   );
// }

export default function Contact() {
  const data = contact as ContactData;

  return (
    <section
      id="contact"
      className="section-wrap"
      style={{ backgroundColor: "#F3F5F8" }}
    >
      <div className="section-inner">
        <h2 className="section-title">{data.sectionTitle}</h2>

        <div className="flex flex-col items-center gap-10 md:gap-0 md:flex-row md:items-center md:justify-around">
          {/* LEFT */}
          <div className="flex flex-col items-center">
            <img
              src={getImageUrl(data.left.logoImage)}
              alt="Logo"
              className="w-80 object-contain"
            />

            <div className="info">
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

              {data.left.location?.value && (
                <InfoRow
                  icon={MapPin}
                  label={data.left.location.label ?? "Location"}
                  value={data.left.location.value}
                />
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right text-neutral-800 md:pl-10">
            <h3 className="text-3xl font-bold">{data.right.name}</h3>

            <div className="mt-2 text-xl font-semibold text-primary">
              {data.right.role}
            </div>

            <div className="text-xl font-semibold text-primary">
              {data.right.brand}
            </div>

            {data.right.tagline && (
              <div className="mt-8 max-w-md text-xl font-bold italic leading-snug text-neutral-900">
                {data.right.tagline}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
