import { useEffect, useState } from "react";
import { getPodDetails } from "../api/podDetails";
import type { PodDetailsResponse } from "../types/podDetails";


export function usePodDetails(
  namespace?: string,
  podName?: string
) {
  const [pod, setPod] = useState<PodDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!namespace || !podName) {
      setLoading(false);
      return;
    }

    async function loadPod() {
      try {
        const data = await getPodDetails(namespace, podName);
        console.log("Pod Details:", data);
        setPod(data);
      } catch (err) {
        console.error("Failed to load pod:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPod();
  }, [namespace, podName]);

  return {
    pod,
    loading,
  };
}