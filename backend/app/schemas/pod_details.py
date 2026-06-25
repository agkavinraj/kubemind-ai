from pydantic import BaseModel

from app.schemas.ai_response import AIResponse
from app.schemas.incident import Incident


class PodDetailsResponse(BaseModel):
    incident: Incident
    analysis: AIResponse | None
    related_resources: dict