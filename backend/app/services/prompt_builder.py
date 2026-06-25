import json


class PromptBuilder:

    @staticmethod
    def build(context: dict) -> str:

        return f"""
You are an expert Kubernetes Site Reliability Engineer.

Analyze this Kubernetes incident.

Context:

{json.dumps(context, indent=2)}

Respond ONLY in JSON.

{{
    "summary":"",
    "root_cause":"",
    "recommendation":"",
    "severity":""
}}
"""