from pydantic import BaseModel


class DeploymentResponse(BaseModel):
    name: str
    namespace: str
    replicas: int
    available_replicas: int
    ready_replicas: int