from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from app.config import settings
from app.database import check_database_connection

app = FastAPI(
    title="Homelab Dashboard API",
    version="0.1.0",
    description="Backend API for the Homelab Dashboard",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
