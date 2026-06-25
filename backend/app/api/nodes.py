from fastapi import APIRouter

from app.schemas.node import NodeResponse
from app.services.node_service import NodeService

router = APIRouter()


@router.get("/nodes", response_model=list[NodeResponse])
def get_nodes():
    return NodeService.get_all_nodes()