from app.schemas.incident import Incident


class ContextBuilder:

    @staticmethod
    def build(
        incident: Incident,
        deployment: dict | None = None,
        resources: dict | None = None,
    ) -> dict:

        return {
            "pod": {
                "name": incident.pod_name,
                "namespace": incident.namespace,
                "status": incident.status,
                "phase": incident.phase,
                "node": incident.node_name,
            },

            "container": {
                "name": incident.container_name,
                "image": incident.container_image,
                "image_pull_policy": incident.image_pull_policy,
                "state": incident.container_state,
                "restart_count": incident.restart_count,
                "last_termination_reason": incident.last_termination_reason,
            },

            "resources": {
                "requests": incident.resource_requests,
                "limits": incident.resource_limits,
            },

            "health": {
                "liveness_probe": incident.liveness_probe,
                "readiness_probe": incident.readiness_probe,
            },

            "deployment": deployment,

            "kubernetes": resources,

            "events": incident.events,

            "logs": incident.logs,
        }