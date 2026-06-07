from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field


class ServiceStatus(StrEnum):
    UP = "up"
    DOWN = "down"
    DEGRADED = "degraded"
    UNKNOWN = "unknown"


SLUG_PATTERN = r"^[a-z0-9]+(?:-[a-z0-9]+)*$"


class ServiceCreate(BaseModel):
    id: str = Field(min_length=1, max_length=64, pattern=SLUG_PATTERN)
    name: str = Field(min_length=1, max_length=128)
    status: ServiceStatus = ServiceStatus.UNKNOWN
    icon: str = Field(min_length=1, max_length=64, pattern=SLUG_PATTERN)


class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    status: ServiceStatus
    icon: str
    last_updated: datetime
