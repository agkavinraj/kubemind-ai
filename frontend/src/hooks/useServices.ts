import { useEffect, useState } from "react";

import { getServices } from "../api/services";
import type { Service } from "../types/service";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return {
    services,
    loading,
  };
}