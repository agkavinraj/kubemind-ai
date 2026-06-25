import { useEffect, useState } from "react";
import { getIncidentHistory } from "../api/incidents";
import type { IncidentHistory } from "../types/incident";

export function useIncidentHistory() {

  const [incidents, setIncidents] = useState<IncidentHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIncidentHistory()
      .then(setIncidents)
      .finally(() => setLoading(false));
  }, []);

  return {
    incidents,
    loading,
  };
}