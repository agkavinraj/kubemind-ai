from datetime import datetime

from pydantic import BaseModel


class ClusterEvent(BaseModel):
    event_type: str
    resource_type: str
    resource_name: str
    namespace: str | None
    status: str | None
    timestamp: datetime