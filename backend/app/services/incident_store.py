from app.schemas.ai_response import AIResponse


class IncidentStore:

    _incidents = []

    @classmethod
    def add(cls, incident):
        cls._incidents.append(incident)

    @classmethod
    def get_all(cls):
        return cls._incidents