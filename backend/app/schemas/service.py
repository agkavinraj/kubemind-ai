from pydantic import BaseModel


class ServiceResponse(BaseModel):
    name: str
    namespace: str
    service_type: str
    cluster_ip: str
    ports: list[str]