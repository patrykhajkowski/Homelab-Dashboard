def test_list_services(client) -> None:
    login_response = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "change-me"},
    )
    assert login_response.status_code == 200

    response = client.get("/api/services")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "plex"
    assert data[0]["name"] == "Plex"
    assert data[0]["status"] == "up"
    assert data[0]["icon"] == "plex"
    assert data[0]["last_updated"].startswith("2026-06-07T14:32:00")


def test_create_service(client) -> None:
    login_response = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "change-me"},
    )
    assert login_response.status_code == 200

    response = client.post(
        "/api/services",
        json={
            "id": "jellyfin",
            "name": "Jellyfin",
            "status": "unknown",
            "icon": "jellyfin",
        },
    )
    assert response.status_code == 201

    data = response.json()
    assert data["id"] == "jellyfin"
    assert data["name"] == "Jellyfin"
    assert data["status"] == "unknown"
    assert data["icon"] == "jellyfin"
    assert "last_updated" in data


def test_create_service_duplicate_id(client) -> None:
    client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "change-me"},
    )

    response = client.post(
        "/api/services",
        json={
            "id": "plex",
            "name": "Duplicate Plex",
            "status": "up",
            "icon": "plex",
        },
    )
    assert response.status_code == 409


def test_create_service_validation_error(client) -> None:
    client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "change-me"},
    )

    response = client.post(
        "/api/services",
        json={
            "id": "Invalid ID",
            "name": "Bad Service",
            "status": "up",
            "icon": "plex",
        },
    )
    assert response.status_code == 422
