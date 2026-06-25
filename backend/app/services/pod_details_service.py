from app.services.ai_service import AIService
from app.services.incident_service import IncidentService
from app.services.resource_mapper import ResourceMapper
from app.schemas.pod_details import PodDetailsResponse
from app.kubernetes.client import k8s_client


class PodDetailsService:

    @staticmethod
    def get(namespace: str, pod_name: str):

        incident = IncidentService.collect_incident(
            namespace,
            pod_name,
        )

        pod = k8s_client.core_v1.read_namespaced_pod(
            pod_name,
            namespace,
        )

        resources = ResourceMapper.get_related_resources(
            namespace,
            pod,
        )

        analysis = None

        try:
            analysis = AIService.analyze(incident)
        except Exception:
            pass

        return PodDetailsResponse(
            incident=incident,
            analysis=analysis,
            related_resources=resources,
        )