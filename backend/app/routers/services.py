from app.database import get_db
from app.models.service import Service
from app.schemas.service import ServiceRead
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/services", tags=["services"])


@router.get("", response_model=list[ServiceRead])
def list_services(db: Session = Depends(get_db)) -> list[Service]:
    return db.query(Service).order_by(Service.name).all()
