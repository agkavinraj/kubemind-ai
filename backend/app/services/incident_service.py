import ast

from kubernetes.client.rest import ApiException

from app.kubernetes.client import k8s_client
from app.schemas.incident import Incident


class IncidentService:

    @staticmethod
    def collect_incident(namespace: str, pod_name: str) -> Incident:

        pod = k8s_client.core_v1.read_namespaced_pod(
            name=pod_name,
            namespace=namespace,
        )

        # --------------------------------------------------
        # Container Information
        # --------------------------------------------------

        container = pod.spec.containers[0]
        container_status = pod.status.container_statuses[0]

        container_name = container.name
        container_image = container.image
        image_pull_policy = container.image_pull_policy

        restart_count = container_status.restart_count

        node_name = pod.spec.node_name

        # --------------------------------------------------
        # Container State
        # --------------------------------------------------

        if container_status.state.running:
            container_state = "Running"

        elif container_status.state.waiting:
            container_state = (
                container_status.state.waiting.reason
                or "Waiting"
            )

        elif container_status.state.terminated:
            container_state = (
                container_status.state.terminated.reason
                or "Terminated"
            )

        else:
            container_state = "Unknown"

        # --------------------------------------------------
        # Last Termination
        # --------------------------------------------------

        last_termination_reason = None

        if (
            container_status.last_state
            and container_status.last_state.terminated
        ):
            last_termination_reason = (
                container_status.last_state.terminated.reason
            )

        # --------------------------------------------------
        # Resources
        # --------------------------------------------------

        resource_requests = (
            container.resources.requests
            if container.resources.requests
            else {}
        )

        resource_limits = (
            container.resources.limits
            if container.resources.limits
            else {}
        )

        # --------------------------------------------------
        # Health Probes
        # --------------------------------------------------

        liveness_probe = (
            container.liveness_probe is not None
        )

        readiness_probe = (
            container.readiness_probe is not None
        )

        # --------------------------------------------------
        # Logs
        # --------------------------------------------------

        try:

            logs = k8s_client.core_v1.read_namespaced_pod_log(
                name=pod_name,
                namespace=namespace,
                tail_lines=100,
            )

            if isinstance(logs, bytes):
                logs = logs.decode("utf-8")

            elif isinstance(logs, str) and (
                logs.startswith("b'")
                or logs.startswith('b"')
            ):
                try:
                    logs = ast.literal_eval(logs).decode("utf-8")
                except Exception:
                    pass

        except ApiException:
            logs = "Unable to fetch logs."

        # --------------------------------------------------
        # Events
        # --------------------------------------------------

        events = []

        k8s_events = (
            k8s_client.core_v1.list_namespaced_event(
                namespace=namespace
            )
        )

        for event in k8s_events.items:

            if (
                event.involved_object.kind == "Pod"
                and event.involved_object.name == pod_name
            ):

                events.append(
                    f"{event.reason}: {event.message}"
                )

        # --------------------------------------------------
        # Build Incident
        # --------------------------------------------------

        return Incident(
            pod_name=pod.metadata.name,
            namespace=namespace,

            status=pod.status.phase,
            phase=pod.status.phase,

            restart_count=restart_count,

            node_name=node_name,

            container_name=container_name,
            container_image=container_image,
            image_pull_policy=image_pull_policy,

            container_state=container_state,
            last_termination_reason=last_termination_reason,

            resource_requests=resource_requests,
            resource_limits=resource_limits,

            liveness_probe=liveness_probe,
            readiness_probe=readiness_probe,

            logs=logs,
            events=events,
        )