from fastapi import APIRouter

from app.schemas.namespace import NamespaceResponse
from app.services.namespace_service import NamespaceService

router = APIRouter()


@router.get("/namespaces", response_model=list[NamespaceResponse])
def get_namespaces():
    return NamespaceService.get_all_namespaces()