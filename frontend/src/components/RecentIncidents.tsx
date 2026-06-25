import IncidentCard from "./IncidentCard";
import { useIncidentHistory } from "../hooks/useIncidentHistory";

export default function RecentIncidents() {
  const { incidents, loading } = useIncidentHistory();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent AI Incidents
        </h2>

        <p>Loading incidents...</p>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent AI Incidents
        </h2>

        <p className="text-gray-500">
          🎉 No incidents detected.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent AI Incidents
      </h2>

      <div className="space-y-4">

        {incidents.map((incident, index) => (
          <IncidentCard
            key={index}
            incident={incident}
          />
        ))}

      </div>

    </div>
  );
}