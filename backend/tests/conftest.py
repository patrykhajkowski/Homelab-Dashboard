from collections.abc import Generator
from datetime import UTC, datetime

import pytest
from app.database import Base, get_db
from app.main import app
from app.models.service import Service, ServiceStatus
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    testing_session_local = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )

    def override_get_db() -> Generator[Session, None, None]:
        db = testing_session_local()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with testing_session_local() as db:
        db.add(
            Service(
                id="plex",
                name="Plex",
                status=ServiceStatus.UP,
                icon="plex",
                last_updated=datetime(2026, 6, 7, 14, 32, tzinfo=UTC),
            )
        )
        db.commit()

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
