from pydantic import BaseModel


class NodeResponse(BaseModel):
    name: str
    status: str
    kubelet_version: str
    os_image: str
    architecture: str