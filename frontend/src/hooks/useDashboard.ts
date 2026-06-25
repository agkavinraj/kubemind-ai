import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboard";

interface DashboardSummary {
  pods: number;
  nodes: number;
  deployments: number;
  services: number;

  running_pods: number;
  pending_pods: number;
  failed_pods: number;
  restarting_pods: number;
}

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    pods: 0,
    nodes: 0,
    deployments: 0,
    services: 0,
    running_pods: 0,
    pending_pods: 0,
    failed_pods: 0,
    restarting_pods: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  return {
    summary,
    loading,
  };
}