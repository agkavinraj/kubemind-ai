import { useEffect, useState } from "react";
import { getPods } from "../api/pods";

export interface Pod {
  name: string;
  namespace: string;
  status: string;
  node: string;
}

export function usePods() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPods()
      .then((data) => {
        console.log("Pods:", data);
        setPods(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { pods, loading };
}