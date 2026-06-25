import type { AIAnalysis } from "./incident";

export interface RelatedResources {
  pod: string;
  replicaset: string | null;
  deployment: string | null;
  services: string[];
}

export interface PodIncident {
  pod_name: string;
  namespace: string;
  status: string;
  phase: string;
  restart_count: number;
  node_name: string;
  container_name: string;
  container_image: string;
  image_pull_policy: string;
  container_state: string;
  last_termination_reason: string;
  resource_requests: Record<string, string>;
  resource_limits: Record<string, string>;
  liveness_probe: boolean;
  readiness_probe: boolean;
  logs: string;
  events: string[];
}

export interface PodDetailsResponse {
  incident: PodIncident;
  analysis: AIAnalysis | null;
  related_resources: RelatedResources;
}