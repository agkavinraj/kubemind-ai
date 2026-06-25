from fastapi import APIRouter

from app.services.incident_service import IncidentService

router = APIRouter()


@router.get("/incidents/{namespace}/{pod_name}")
def get_incident(
    namespace: str,
    pod_name: str,
):

    return IncidentService.collect_incident(
        namespace,
        pod_name,
    )