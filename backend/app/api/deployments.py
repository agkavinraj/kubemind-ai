from fastapi import APIRouter

from app.schemas.deployment import DeploymentResponse
from app.services.deployment_service import DeploymentService

router = APIRouter()


@router.get("/deployments", response_model=list[DeploymentResponse])
def get_deployments():
    return DeploymentService.get_all_deployments()