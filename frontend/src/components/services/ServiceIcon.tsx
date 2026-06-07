const SERVICE_ICONS: Record<string, string> = {
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

type ServiceIconProps = {
  icon: string;
  name: string;
};

export function ServiceIcon({ icon, name }: ServiceIconProps) {
  const symbol = SERVICE_ICONS[icon] ?? name.charAt(0).toUpperCase();

  return (
    <span className="service-icon" aria-hidden="true">
      {symbol}
    </span>
  );
}
