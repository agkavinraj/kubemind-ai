from fastapi import APIRouter

from app.services.ai_service import AIService
from app.services.incident_service import IncidentService

router = APIRouter()


@router.get("/analyze/{namespace}/{pod_name}")
def analyze(
    namespace: str,
    pod_name: str,
):

    incident = IncidentService.collect_incident(
        namespace,
        pod_name,
    )

    return AIService.analyze(incident)