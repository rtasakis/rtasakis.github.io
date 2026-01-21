import servicesData from "@/data/services.json";
import { getIcon } from "@/utils/iconByKey";

type ServiceItem = {
  id: string;
  name: string;
  text: string;
  icon: string;
};

type ServiceCategory = {
  id: string;
  title: string;
  service: ServiceItem[];
};

function ServiceCard({
  icon,
  name,
  text,
}: {
  icon: string;
  name: string;
  text: string;
}) {
  const Icon = getIcon(icon);

  return (
    <div className="service-card">
      <div className="service-card__icon-row">
        <div className="service-card__icon-badge">
          <Icon className="service-card__icon" />
        </div>
      </div>

      <h3 className="service-card__title">{name}</h3>
      <p className="service-card__text">{text}</p>
    </div>
  );
}

function CategoryRow({ category }: { category: ServiceCategory }) {
  return (
    <div className="services-category">
      <div className="services-category__inner">
        <div className="services-category__head">
          <div className="services-category__head-inner">
            <h3 className="services-category__title">{category.title}</h3>
            <div className="services-category__divider" />
          </div>
        </div>

        <div className="services-grid">
          {category.service.map((s) => (
            <ServiceCard key={s.id} icon={s.icon} name={s.name} text={s.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const categories = (servicesData?.services ?? []) as ServiceCategory[];

  return (
    <section className="section-wrap">
      <div className="section-inner">
        <h2 className="section-title">Services</h2>

        <div className="services-rows">
          {categories.map((cat) => (
            <CategoryRow key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
