from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict


class ServiceStatus(StrEnum):
    UP = "up"
    DOWN = "down"
    DEGRADED = "degraded"
    UNKNOWN = "unknown"


class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    status: ServiceStatus
    icon: str
    last_updated: datetime
