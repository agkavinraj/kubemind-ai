from app.kubernetes.client import k8s_client
from app.schemas.dashboard import DashboardResponse


class DashboardService:

    @staticmethod
    def get_summary() -> DashboardResponse:

        pods = k8s_client.core_v1.list_pod_for_all_namespaces().items
        nodes = k8s_client.core_v1.list_node().items
        deployments = (
            k8s_client.apps_v1.list_deployment_for_all_namespaces().items
        )
        services = (
            k8s_client.core_v1.list_service_for_all_namespaces().items
        )

        running = 0
        pending = 0
        failed = 0
        restarting = 0

        for pod in pods:

            phase = pod.status.phase

            if phase == "Running":
                running += 1

            elif phase == "Pending":
                pending += 1

            elif phase == "Failed":
                failed += 1

            if pod.status.container_statuses:

                restarting += sum(
                    c.restart_count
                    for c in pod.status.container_statuses
                )

        return DashboardResponse(
            pods=len(pods),
            nodes=len(nodes),
            deployments=len(deployments),
            services=len(services),
            running_pods=running,
            pending_pods=pending,
            failed_pods=failed,
            restarting_pods=restarting,
        )