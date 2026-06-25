from pydantic import BaseModel


class AIResponse(BaseModel):
    summary: str
    root_cause: str
    recommendation: str
    severity: str