from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_resource_usage_endpoint() -> None:
    login_response = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "change-me"},
    )
    assert login_response.status_code == 200

    response = client.get("/api/resources")
    assert response.status_code == 200

    data = response.json()
    assert data["cpu_percent"] == 34.0
    assert data["ram_percent"] == 61.0
    assert data["ram_used_gb"] == 19.5
    assert data["ram_total_gb"] == 32.0
    assert data["storage_used_tb"] == 2.4
    assert data["storage_total_tb"] == 4.0
    assert data["storage_percent"] == 60.0
