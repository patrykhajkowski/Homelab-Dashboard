from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict


class EventSeverity(StrEnum):
    INFO = "info"
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"


class EventRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    message: str
    severity: EventSeverity
    occurred_at: datetime
