from app.kubernetes.client import k8s_client
from app.schemas.node import NodeResponse


class NodeService:

    @staticmethod
    def get_all_nodes():

        nodes = k8s_client.core_v1.list_node()

        response = []

        for node in nodes.items:

            status = "Unknown"

            for condition in node.status.conditions:
                if condition.type == "Ready":
                    status = condition.status

            response.append(
                NodeResponse(
                    name=node.metadata.name,
                    status="Ready" if status == "True" else "Not Ready",
                    kubelet_version=node.status.node_info.kubelet_version,
                    os_image=node.status.node_info.os_image,
                    architecture=node.status.node_info.architecture
                )
            )

        return response