from app.kubernetes.client import k8s_client
from app.schemas.service import ServiceResponse


class ServiceService:

    @staticmethod
    def get_all_services():

        services = k8s_client.core_v1.list_service_for_all_namespaces()

        response = []

        for service in services.items:

            ports = []

            if service.spec.ports:
                for port in service.spec.ports:
                    ports.append(
                        f"{port.port}/{port.protocol}"
                    )

            response.append(
                ServiceResponse(
                    name=service.metadata.name,
                    namespace=service.metadata.namespace,
                    service_type=service.spec.type,
                    cluster_ip=service.spec.cluster_ip,
                    ports=ports,
                )
            )

        return response