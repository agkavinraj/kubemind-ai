from app.services.ai_service import AIService
from app.services.incident_service import IncidentService
from app.services.incident_store import IncidentStore


class IncidentProcessor:

    @staticmethod
    def process(namespace: str, pod_name: str):

        incident = IncidentService.collect_incident(
            namespace=namespace,
            pod_name=pod_name,
        )

        analysis = AIService.analyze(incident)

        IncidentStore.add(
            {
                "incident": incident.model_dump(),
                "analysis": analysis.model_dump(),
            }
        )

        print("=" * 60)
        print("✅ AI Analysis Completed")
        print("=" * 60)
        print(analysis.model_dump())
        print("=" * 60)

        return analysis