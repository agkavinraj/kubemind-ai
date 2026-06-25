import type { IncidentHistory } from "../types/incident";

interface Props {
    incident: IncidentHistory;
}
export default function IncidentCard({ incident }: Props) {

  const analysis = incident.analysis;

  return (
    <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">

      <div className="flex justify-between">

        <h2 className="font-bold text-lg">
          {incident.incident.pod_name}
        </h2>

        <span className="font-semibold text-red-600">
          {analysis.severity}
        </span>

      </div>

      <div className="mt-4">

        <p className="font-semibold">
          Root Cause
        </p>

        <p className="text-gray-600">
          {analysis.root_cause}
        </p>

      </div>

      <div className="mt-4">

        <p className="font-semibold">
          Recommendation
        </p>

        <p className="text-gray-600">
          {analysis.recommendation}
        </p>

      </div>

    </div>
  );
}