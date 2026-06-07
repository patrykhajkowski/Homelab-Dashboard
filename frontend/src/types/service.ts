export type ServiceStatus = "up" | "down" | "degraded" | "unknown";

export type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  icon: string;
  last_updated: string;
};

export type ServiceCreateInput = {
  id: string;
  name: string;
  status: ServiceStatus;
  icon: string;
};

export type ServiceFieldErrors = {
  id?: string;
  name?: string;
  status?: string;
  icon?: string;
};

export const SERVICE_STATUSES: { value: ServiceStatus; label: string }[] = [
  { value: "up", label: "Running" },
  { value: "down", label: "Down" },
  { value: "degraded", label: "Degraded" },
  { value: "unknown", label: "Unknown" },
];

export const SERVICE_ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "plex", label: "Plex" },
  { value: "nginx", label: "Nginx" },
  { value: "home-assistant", label: "Home Assistant" },
  { value: "grafana", label: "Grafana" },
  { value: "prometheus", label: "Prometheus" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "redis", label: "Redis" },
  { value: "vaultwarden", label: "Vaultwarden" },
  { value: "sonarr", label: "Sonarr" },
  { value: "radarr", label: "Radarr" },
  { value: "pihole", label: "Pi-hole" },
  { value: "uptime-kuma", label: "Uptime Kuma" },
  { value: "custom", label: "Other (custom key)" },
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function validateServiceInput(input: ServiceCreateInput): ServiceFieldErrors {
  const errors: ServiceFieldErrors = {};

  if (!input.id.trim()) {
    errors.id = "Service ID is required";
  } else if (!SLUG_PATTERN.test(input.id)) {
    errors.id = "Use lowercase letters, numbers, and hyphens only";
  }

  if (!input.name.trim()) {
    errors.name = "Name is required";
  } else if (input.name.length > 128) {
    errors.name = "Name must be 128 characters or fewer";
  }

  if (!input.status) {
    errors.status = "Status is required";
  }

  if (!input.icon.trim()) {
    errors.icon = "Icon is required";
  } else if (!SLUG_PATTERN.test(input.icon)) {
    errors.icon = "Use lowercase letters, numbers, and hyphens only";
  }

  return errors;
}
