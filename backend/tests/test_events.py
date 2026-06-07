from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_list_events() -> None:
    response = client.get("/api/events")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 8
    assert data[0]["id"] == "evt-001"
    assert data[0]["message"] == "Radarr container stopped unexpectedly"
    assert data[0]["severity"] == "error"
    assert data[0]["occurred_at"].startswith("2026-06-07T14:48:00")

    timestamps = [event["occurred_at"] for event in data]
    assert timestamps == sorted(timestamps, reverse=True)
