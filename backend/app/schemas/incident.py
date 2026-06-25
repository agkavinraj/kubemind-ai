from pydantic import BaseModel


class Incident(BaseModel):
    pod_name: str
    namespace: str

    status: str
    phase: str

    restart_count: int

    node_name: str

    container_name: str
    container_image: str

    image_pull_policy: str

    container_state: str

    last_termination_reason: str | None

    resource_requests: dict[str, str]
    resource_limits: dict[str, str]

    liveness_probe: bool
    readiness_probe: bool

    logs: str

    events: list[str]