from datetime import UTC, datetime, timedelta

from app.dependencies.auth import get_current_user
from app.schemas.event import EventRead, EventSeverity
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/api/events",
    tags=["events"],
    dependencies=[Depends(get_current_user)],
)

_now = datetime(2026, 6, 7, 15, 0, tzinfo=UTC)

MOCK_EVENTS: list[EventRead] = [
    EventRead(
        id="evt-001",
        message="Radarr container stopped unexpectedly",
        severity=EventSeverity.ERROR,
        occurred_at=_now - timedelta(minutes=12),
    ),
    EventRead(
        id="evt-002",
        message="Prometheus alert: memory usage above 75% on node-01",
        severity=EventSeverity.WARNING,
        occurred_at=_now - timedelta(minutes=34),
    ),
    EventRead(
        id="evt-003",
        message="Plex library scan completed for Movies",
        severity=EventSeverity.SUCCESS,
        occurred_at=_now - timedelta(hours=1, minutes=5),
    ),
    EventRead(
        id="evt-004",
        message="Pi-hole blocked 1,247 DNS queries in the last hour",
        severity=EventSeverity.INFO,
        occurred_at=_now - timedelta(hours=2),
    ),
    EventRead(
        id="evt-005",
        message="Nightly backup to NAS finished successfully",
        severity=EventSeverity.SUCCESS,
        occurred_at=_now - timedelta(hours=6, minutes=30),
    ),
    EventRead(
        id="evt-006",
        message="Home Assistant automation triggered: lights off at sunset",
        severity=EventSeverity.INFO,
        occurred_at=_now - timedelta(hours=8),
    ),
    EventRead(
        id="evt-007",
        message="Vaultwarden restarted after configuration update",
        severity=EventSeverity.INFO,
        occurred_at=_now - timedelta(hours=14),
    ),
    EventRead(
        id="evt-008",
        message="Sonarr downloaded 3 episodes from RSS feed",
        severity=EventSeverity.SUCCESS,
        occurred_at=_now - timedelta(days=1, hours=2),
    ),
]


@router.get("", response_model=list[EventRead])
def list_events() -> list[EventRead]:
    return sorted(MOCK_EVENTS, key=lambda event: event.occurred_at, reverse=True)
