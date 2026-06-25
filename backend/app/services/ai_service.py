import json

import httpx
from fastapi import HTTPException

from app.config import OLLAMA_MODEL, OLLAMA_URL
from app.kubernetes.client import k8s_client
from app.schemas.ai_response import AIResponse
from app.schemas.incident import Incident
from app.services.context_builder import ContextBuilder
from app.services.deployment_service import DeploymentService
from app.services.prompt_builder import PromptBuilder
from app.services.resource_mapper import ResourceMapper


class AIService:
    MODEL = OLLAMA_MODEL
    OLLAMA_URL = OLLAMA_URL

    @classmethod
    def analyze(cls, incident: Incident) -> AIResponse:
        """
        Analyze a Kubernetes incident using the configured LLM.
        """

        # ----------------------------------------
        # Read the pod
        # ----------------------------------------

        pod = k8s_client.core_v1.read_namespaced_pod(
            name=incident.pod_name,
            namespace=incident.namespace,
        )

        # ----------------------------------------
        # Discover related Kubernetes resources
        # ----------------------------------------

        resources = ResourceMapper.get_related_resources(
            incident.namespace,
            pod,
        )

        # ----------------------------------------
        # Collect deployment details
        # ----------------------------------------

        deployment = None

        if resources["deployment"]:

            deployment = DeploymentService.get_deployment(
                namespace=incident.namespace,
                deployment_name=resources["deployment"],
            )

        # ----------------------------------------
        # Build AI Context
        # ----------------------------------------

        context = ContextBuilder.build(
            incident=incident,
            deployment=deployment,
            resources=resources,
        )

        prompt = PromptBuilder.build(context)

        # ----------------------------------------
        # Call Ollama
        # ----------------------------------------

        try:

            response = httpx.post(
                cls.OLLAMA_URL,
                json={
                    "model": cls.MODEL,
                    "prompt": prompt,
                    "stream": False,
                    "format": "json",
                },
                timeout=120,
            )

        except httpx.RequestError as exc:

            raise HTTPException(
                status_code=500,
                detail=f"Unable to connect to Ollama: {exc}",
            )

        # ----------------------------------------
        # Validate Response
        # ----------------------------------------

        if response.status_code != 200:

            raise HTTPException(
                status_code=response.status_code,
                detail=response.text,
            )

        try:

            ollama_response = response.json()

        except json.JSONDecodeError:

            raise HTTPException(
                status_code=500,
                detail="Ollama returned an invalid JSON response.",
            )

        if "response" not in ollama_response:

            raise HTTPException(
                status_code=500,
                detail="Ollama response does not contain the 'response' field.",
            )

        ai_output = ollama_response["response"]

        # ----------------------------------------
        # Parse AI JSON
        # ----------------------------------------

        try:

            data = json.loads(ai_output)

        except json.JSONDecodeError:

            raise HTTPException(
                status_code=500,
                detail=f"AI returned invalid JSON:\n\n{ai_output}",
            )

        # ----------------------------------------
        # Return Parsed Response
        # ----------------------------------------

        try:

            return AIResponse(**data)

        except Exception as exc:

            raise HTTPException(
                status_code=500,
                detail=f"Failed to parse AI response: {exc}",
            )