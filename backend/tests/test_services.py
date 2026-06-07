def test_list_services(client) -> None:
    response = client.get("/api/services")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "plex"
    assert data[0]["name"] == "Plex"
    assert data[0]["status"] == "up"
    assert data[0]["icon"] == "plex"
    assert data[0]["last_updated"].startswith("2026-06-07T14:32:00")
