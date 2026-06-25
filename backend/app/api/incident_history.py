from fastapi import APIRouter

from app.services.incident_store import IncidentStore

router = APIRouter()


@router.get("/incident-history")
def get_incident_history():
    return IncidentStore.get_all()