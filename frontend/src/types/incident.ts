export interface AIAnalysis {
  summary: string;
  root_cause: string;
  recommendation: string;
  severity: string;
}

export interface IncidentDetails {
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

export interface IncidentHistory {
  incident: IncidentDetails;
  analysis: AIAnalysis;
}