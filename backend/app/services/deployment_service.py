from kubernetes.client.rest import ApiException

from app.kubernetes.client import k8s_client
from app.schemas.deployment import DeploymentResponse


class DeploymentService:

    @staticmethod
    def get_all_deployments():

        deployments = (
            k8s_client.apps_v1.list_deployment_for_all_namespaces()
        )

        response = []

        for deployment in deployments.items:

            response.append(
                DeploymentResponse(
                    name=deployment.metadata.name,
                    namespace=deployment.metadata.namespace,
                    replicas=deployment.spec.replicas or 0,
                    available_replicas=deployment.status.available_replicas or 0,
                    ready_replicas=deployment.status.ready_replicas or 0,
                )
            )

        return response

    @staticmethod
    def get_deployment(namespace: str, deployment_name: str):
        """
        Returns detailed information about a single deployment.
        This is used by the AI Context Builder.
        """

        try:
            deployment = (
                k8s_client.apps_v1.read_namespaced_deployment(
                    name=deployment_name,
                    namespace=namespace,
                )
            )

            return {
                "name": deployment.metadata.name,
                "namespace": deployment.metadata.namespace,
                "replicas": deployment.spec.replicas or 0,
                "available_replicas": deployment.status.available_replicas or 0,
                "ready_replicas": deployment.status.ready_replicas or 0,
                "updated_replicas": deployment.status.updated_replicas or 0,
                "strategy": deployment.spec.strategy.type,
                "labels": deployment.spec.template.metadata.labels or {},
                "selector": deployment.spec.selector.match_labels or {},
            }

        except ApiException:
            return None