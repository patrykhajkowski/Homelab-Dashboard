import { SERVICE_ICON_OPTIONS } from "../types/service";

export const SERVICE_ICONS: Record<string, string> = Object.fromEntries(
  SERVICE_ICON_OPTIONS.filter((option) => option.value !== "custom").map(
    (option) => [option.value, iconForKey(option.value)],
  ),
);

function iconForKey(key: string): string {
  const icons: Record<string, string> = {
    plex: "🎬",
    nginx: "🌐",
    "home-assistant": "🏠",
    grafana: "📊",
    prometheus: "🔥",
    postgres: "🐘",
    redis: "⚡",
    vaultwarden: "🔐",
    sonarr: "📺",
    radarr: "🎞️",
    pihole: "🛡️",
    "uptime-kuma": "📡",
  };
  return icons[key] ?? "📦";
}
