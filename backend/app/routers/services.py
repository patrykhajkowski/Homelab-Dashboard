from datetime import UTC, datetime

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceRead
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/services",
    tags=["services"],
    dependencies=[Depends(get_current_user)],
)


@router.get("", response_model=list[ServiceRead])
def list_services(db: Session = Depends(get_db)) -> list[Service]:
    return db.query(Service).order_by(Service.name).all()


@router.post("", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
def create_service(body: ServiceCreate, db: Session = Depends(get_db)) -> Service:
    existing = db.get(Service, body.id)
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A service with this ID already exists",
        )

    service = Service(
        id=body.id,
        name=body.name,
        status=body.status,
        icon=body.icon,
        last_updated=datetime.now(UTC),
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service
