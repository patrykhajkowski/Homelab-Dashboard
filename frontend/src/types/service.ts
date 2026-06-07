export type ServiceStatus = "up" | "down" | "degraded" | "unknown";

export type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  icon: string;
  last_updated: string;
};
