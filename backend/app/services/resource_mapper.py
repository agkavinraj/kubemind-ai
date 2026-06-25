from kubernetes.client.rest import ApiException

from app.kubernetes.client import k8s_client


class ResourceMapper:

    @staticmethod
    def get_related_resources(namespace: str, pod) -> dict:
        """
        Maps a Pod to its ReplicaSet, Deployment and Services.
        """

        resources = {
            "pod": pod.metadata.name,
            "replicaset": None,
            "deployment": None,
            "services": [],
        }

        # --------------------------------------------------
        # Find ReplicaSet
        # --------------------------------------------------

        for owner in pod.metadata.owner_references or []:

            if owner.kind != "ReplicaSet":
                continue

            resources["replicaset"] = owner.name

            try:

                rs = (
                    k8s_client.apps_v1.read_namespaced_replica_set(
                        name=owner.name,
                        namespace=namespace,
                    )
                )

                # Find Deployment

                for rs_owner in rs.metadata.owner_references or []:

                    if rs_owner.kind == "Deployment":

                        resources["deployment"] = rs_owner.name
                        break

            except ApiException:
                pass

        # --------------------------------------------------
        # Find Services
        # --------------------------------------------------

        pod_labels = pod.metadata.labels or {}

        services = (
            k8s_client.core_v1.list_namespaced_service(
                namespace=namespace
            )
        )

        for service in services.items:

            selector = service.spec.selector or {}

            if not selector:
                continue

            matches = all(
                pod_labels.get(key) == value
                for key, value in selector.items()
            )

            if matches:

                resources["services"].append(
                    service.metadata.name
                )

        return resources