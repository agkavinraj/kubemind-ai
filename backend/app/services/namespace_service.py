from app.kubernetes.client import k8s_client
from app.schemas.namespace import NamespaceResponse


class NamespaceService:

    @staticmethod
    def get_all_namespaces():

        namespaces = k8s_client.core_v1.list_namespace()

        response = []

        for namespace in namespaces.items:

            response.append(
                NamespaceResponse(
                    name=namespace.metadata.name,
                    status=namespace.status.phase,
                )
            )

        return response