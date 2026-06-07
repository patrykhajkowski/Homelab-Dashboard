from pydantic import BaseModel, Field


class ResourceUsage(BaseModel):
    cpu_percent: float = Field(ge=0, le=100)
    ram_used_gb: float = Field(ge=0)
    ram_total_gb: float = Field(ge=0)
    ram_percent: float = Field(ge=0, le=100)
    storage_used_tb: float = Field(ge=0)
    storage_total_tb: float = Field(ge=0)
    storage_percent: float = Field(ge=0, le=100)
