from fastapi import APIRouter
from app.schemas.pod import PodResponse
from app.services.pod_service import PodService

router = APIRouter()


@router.get("/pods", response_model=list[PodResponse])
def get_pods():
    return PodService.get_all_pods()