from datetime import datetime

from kubernetes import watch

from app.kubernetes.client import k8s_client
from app.schemas.event import ClusterEvent
from app.services.ai_service import AIService
from app.services.event_manager import event_manager
from app.services.incident_detector import IncidentDetector
from app.services.incident_service import IncidentService
from app.services.incident_store import IncidentStore


class WatcherService:

    def watch_pods(self):

        watcher = watch.Watch()

        print("Watching pod events...")

        analyzed_pods = set()

        for event in watcher.stream(
            k8s_client.core_v1.list_pod_for_all_namespaces
        ):

            pod = event["object"]

            cluster_event = ClusterEvent(
                event_type=event["type"],
                resource_type="Pod",
                resource_name=pod.metadata.name,
                namespace=pod.metadata.namespace,
                status=pod.status.phase,
                timestamp=datetime.now(),
            )

            event_manager.add_event(cluster_event)

            print(cluster_event)

            pod_key = f"{pod.metadata.namespace}/{pod.metadata.name}"

            if pod_key in analyzed_pods:
                continue

            if not IncidentDetector.is_incident(pod):
                continue

            analyzed_pods.add(pod_key)

            print("=" * 60)
            print("🚨 INCIDENT DETECTED")
            print(f"Pod: {pod.metadata.name}")
            print(f"Namespace: {pod.metadata.namespace}")
            print("=" * 60)

            try:
                incident = IncidentService.collect_incident(
                    namespace=pod.metadata.namespace,
                    pod_name=pod.metadata.name,
                )

                analysis = AIService.analyze(incident)

                IncidentStore.add(
                    {
                        "incident": incident.model_dump(),
                        "analysis": analysis.model_dump(),
                    }
                )

                print("✅ AI Analysis Completed")
                print(analysis.model_dump())

            except Exception as exc:
                print("❌ AI Analysis Failed")
                print(exc)

            print("=" * 60)


watcher_service = WatcherService()