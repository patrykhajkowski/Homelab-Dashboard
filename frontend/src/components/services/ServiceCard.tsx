import type { Service } from "../../types/service";
import { ServiceIcon } from "./ServiceIcon";
import { ServiceStatusIndicator } from "./ServiceStatusIndicator";
import "./ServiceCard.css";

type ServiceCardProps = {
  service: Service;
};

function formatLastUpdated(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__header">
        <ServiceIcon icon={service.icon} name={service.name} />
        <h2 className="service-card__name">{service.name}</h2>
        <ServiceStatusIndicator status={service.status} />
      </div>
      <p className="service-card__updated">
        Last updated {formatLastUpdated(service.last_updated)}
      </p>
    </article>
  );
}
