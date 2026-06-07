import type { ServiceStatus } from "../../types/service";
import "./ServiceStatusIndicator.css";

const STATUS_LABELS: Record<ServiceStatus, string> = {
  up: "Running",
  down: "Down",
  degraded: "Degraded",
  unknown: "Unknown",
};

type ServiceStatusIndicatorProps = {
  status: ServiceStatus;
};

export function ServiceStatusIndicator({ status }: ServiceStatusIndicatorProps) {
  return (
    <span
      className={`service-status service-status--${status}`}
      role="status"
      aria-label={STATUS_LABELS[status]}
      title={STATUS_LABELS[status]}
    />
  );
}
