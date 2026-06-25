from pydantic import BaseModel


class DashboardResponse(BaseModel):
    pods: int
    nodes: int
    deployments: int
    services: int

    running_pods: int
    pending_pods: int
    failed_pods: int
    restarting_pods: int