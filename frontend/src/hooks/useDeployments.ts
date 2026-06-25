import { useEffect, useState } from "react";

import { getDeployments } from "../api/deployments";
import type { Deployment } from "../types/deployments";

export function useDeployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDeployments()
      .then(setDeployments)
      .finally(() => setLoading(false));
  }, []);

  return {
    deployments,
    loading,
  };
}