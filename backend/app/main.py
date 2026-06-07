from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from app.config import settings
from app.database import Base, SessionLocal, check_database_connection, engine
from app.models import service as service_model  # noqa: F401
from app.routers.events import router as events_router
from app.routers.resources import router as resources_router
from app.routers.services import router as services_router
from app.seed import seed_services


@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            seed_services(db)
        finally:
            db.close()
    except SQLAlchemyError:
        pass
    yield


app = FastAPI(
    title="Homelab Dashboard API",
    version="0.1.0",
    description="Backend API for the Homelab Dashboard",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services_router)
app.include_router(resources_router)
app.include_router(events_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/health")
def api_health() -> dict[str, str | bool]:
    db_status = False
    try:
        db_status = check_database_connection()
    except SQLAlchemyError:
        db_status = False

    return {
        "status": "ok",
        "database": db_status,
    }
