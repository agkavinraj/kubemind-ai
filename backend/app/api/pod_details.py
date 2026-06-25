from fastapi import APIRouter

from app.services.pod_details_service import PodDetailsService

router = APIRouter()


@router.get("/pod-details/{namespace}/{pod_name}")
def get_pod_details(
    namespace: str,
    pod_name: str,
):
    return PodDetailsService.get(
        namespace,
        pod_name,
    )