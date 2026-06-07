from datetime import UTC, datetime, timedelta

from sqlalchemy.orm import Session

from app.models.service import Service, ServiceStatus

SEED_SERVICES: list[dict[str, str | ServiceStatus]] = [
    {"id": "plex", "name": "Plex", "status": ServiceStatus.UP, "icon": "plex"},
    {
        "id": "nginx",
        "name": "Nginx Proxy Manager",
        "status": ServiceStatus.UP,
        "icon": "nginx",
    },
    {
        "id": "home-assistant",
        "name": "Home Assistant",
        "status": ServiceStatus.UP,
        "icon": "home-assistant",
    },
    {
        "id": "grafana",
        "name": "Grafana",
        "status": ServiceStatus.UP,
        "icon": "grafana",
    },
    {
        "id": "prometheus",
        "name": "Prometheus",
        "status": ServiceStatus.DEGRADED,
        "icon": "prometheus",
    },
    {
        "id": "postgres",
        "name": "PostgreSQL",
        "status": ServiceStatus.UP,
        "icon": "postgres",
    },
    {"id": "redis", "name": "Redis", "status": ServiceStatus.UP, "icon": "redis"},
    {
        "id": "vaultwarden",
        "name": "Vaultwarden",
        "status": ServiceStatus.UP,
        "icon": "vaultwarden",
    },
    {"id": "sonarr", "name": "Sonarr", "status": ServiceStatus.UP, "icon": "sonarr"},
    {"id": "radarr", "name": "Radarr", "status": ServiceStatus.DOWN, "icon": "radarr"},
    {"id": "pihole", "name": "Pi-hole", "status": ServiceStatus.UP, "icon": "pihole"},
    {
        "id": "uptime-kuma",
        "name": "Uptime Kuma",
        "status": ServiceStatus.UNKNOWN,
        "icon": "uptime-kuma",
    },
]


def seed_services(db: Session) -> None:
    if db.query(Service).count() > 0:
        return

    now = datetime.now(UTC)
    for index, service_data in enumerate(SEED_SERVICES):
        db.add(
            Service(
                id=str(service_data["id"]),
                name=str(service_data["name"]),
                status=service_data["status"],  # type: ignore[arg-type]
                icon=str(service_data["icon"]),
                last_updated=now - timedelta(minutes=index * 7),
            )
        )
    db.commit()
