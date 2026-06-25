from app.kubernetes.client import k8s_client
from app.schemas.pod import PodResponse


class PodService:

    @staticmethod
    def get_all_pods():

        pods = k8s_client.core_v1.list_pod_for_all_namespaces()

        response = []

        for pod in pods.items:

            response.append(
                PodResponse(
                    name=pod.metadata.name,
                    namespace=pod.metadata.namespace,
                    status=pod.status.phase,
                    node=pod.spec.node_name
                )
            )

        return response