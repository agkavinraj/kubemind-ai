from kubernetes import watch

from app.kubernetes.client import k8s_client
from app.services.incident_detector import IncidentDetector
from app.services.incident_processor import IncidentProcessor


def watch_pods():

    watcher = watch.Watch()

    print("Watching pod events...")

    for event in watcher.stream(
        k8s_client.core_v1.list_pod_for_all_namespaces
    ):

        pod = event["object"]

        print(
            f"{event['type']} - "
            f"{pod.metadata.namespace}/"
            f"{pod.metadata.name}"
        )

        if not IncidentDetector.is_incident(pod):
            continue

        print("=" * 60)
        print("🚨 INCIDENT DETECTED")
        print(f"Pod       : {pod.metadata.name}")
        print(f"Namespace : {pod.metadata.namespace}")
        print("=" * 60)

        try:

            IncidentProcessor.process(
                namespace=pod.metadata.namespace,
                pod_name=pod.metadata.name,
            )

        except Exception as exc:

            print("❌ Failed to process incident")
            print(exc)
            print("=" * 60)