from fastapi import APIRouter

from app.schemas.service import ServiceResponse
from app.services.service_service import ServiceService

router = APIRouter()


@router.get("/services", response_model=list[ServiceResponse])
def get_services():
    return ServiceService.get_all_services()