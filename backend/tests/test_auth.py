from app.main import app
from fastapi.testclient import TestClient

VALID_CREDENTIALS = {"username": "admin", "password": "change-me"}


def test_login_success() -> None:
    with TestClient(app) as client:
        response = client.post("/api/auth/login", json=VALID_CREDENTIALS)
        assert response.status_code == 200
        assert response.json() == {"username": "admin"}
        assert "session" in response.cookies


def test_login_invalid_credentials() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/api/auth/login",
            json={"username": "admin", "password": "wrong-password"},
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid username or password"


def test_login_validation_error() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/api/auth/login",
            json={"username": "", "password": "change-me"},
        )
        assert response.status_code == 422


def test_me_requires_session() -> None:
    with TestClient(app) as client:
        response = client.get("/api/auth/me")
        assert response.status_code == 401


def test_me_with_session() -> None:
    with TestClient(app) as client:
        login_response = client.post("/api/auth/login", json=VALID_CREDENTIALS)
        assert login_response.status_code == 200

        response = client.get("/api/auth/me")
        assert response.status_code == 200
        assert response.json() == {"username": "admin"}


def test_logout_clears_session() -> None:
    with TestClient(app) as client:
        login_response = client.post("/api/auth/login", json=VALID_CREDENTIALS)
        assert login_response.status_code == 200

        logout_response = client.post("/api/auth/logout")
        assert logout_response.status_code == 200

        me_response = client.get("/api/auth/me")
        assert me_response.status_code == 401


def test_protected_route_requires_auth() -> None:
    with TestClient(app) as client:
        response = client.get("/api/resources")
        assert response.status_code == 401


def test_protected_route_with_session() -> None:
    with TestClient(app) as client:
        client.post("/api/auth/login", json=VALID_CREDENTIALS)
        response = client.get("/api/resources")
        assert response.status_code == 200


def test_expired_session_rejected() -> None:
    from datetime import UTC, datetime, timedelta

    from app.config import settings
    from app.dependencies.auth import ALGORITHM, SESSION_COOKIE
    from jose import jwt

    expired_token = jwt.encode(
        {"sub": "admin", "exp": datetime.now(UTC) - timedelta(hours=1)},
        settings.jwt_secret,
        algorithm=ALGORITHM,
    )

    with TestClient(app) as client:
        client.cookies.set(SESSION_COOKIE, expired_token)
        response = client.get("/api/auth/me")
        assert response.status_code == 401
        assert response.json()["detail"] == "Session expired"
