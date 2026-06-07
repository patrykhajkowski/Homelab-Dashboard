from app.dependencies.auth import get_current_user
from app.schemas.resources import ResourceUsage
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/api/resources",
    tags=["resources"],
    dependencies=[Depends(get_current_user)],
)

MOCK_RESOURCE_USAGE = ResourceUsage(
    cpu_percent=34.0,
    ram_used_gb=19.5,
    ram_total_gb=32.0,
    ram_percent=61.0,
    storage_used_tb=2.4,
    storage_total_tb=4.0,
    storage_percent=60.0,
)


@router.get("", response_model=ResourceUsage)
def get_resource_usage() -> ResourceUsage:
    return MOCK_RESOURCE_USAGE
