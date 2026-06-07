import enum
from datetime import datetime

from app.database import Base
from sqlalchemy import DateTime, Enum, String
from sqlalchemy.orm import Mapped, mapped_column


class ServiceStatus(enum.StrEnum):
    UP = "up"
    DOWN = "down"
    DEGRADED = "degraded"
    UNKNOWN = "unknown"


class Service(Base):
    __tablename__ = "services"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    status: Mapped[ServiceStatus] = mapped_column(
        Enum(ServiceStatus, native_enum=False, length=16),
        nullable=False,
    )
    icon: Mapped[str] = mapped_column(String(64), nullable=False)
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )
