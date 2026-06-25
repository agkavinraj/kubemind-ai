from fastapi import APIRouter

from app.schemas.event import ClusterEvent
from app.services.event_manager import event_manager

router = APIRouter()


@router.get("/events", response_model=list[ClusterEvent])
def get_events():

    return event_manager.get_events()