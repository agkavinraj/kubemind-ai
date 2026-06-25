import StatusBadge from "../StatusBadge";
import type { PodIncident } from "../../types/podDetails";

interface Props {
    incident: PodIncident;
}

export default function GeneralInfo({ incident }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        General Information
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div>
          <p className="text-gray-500">Namespace</p>
          <p>{incident.namespace}</p>
        </div>

        <div>
          <p className="text-gray-500">Node</p>
          <p>{incident.node_name}</p>
        </div>

        <div>
          <p className="text-gray-500">Container</p>
          <p>{incident.container_name}</p>
        </div>

        <div>
          <p className="text-gray-500">Image</p>
          <p>{incident.container_image}</p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <StatusBadge status={incident.container_state} />
        </div>

        <div>
          <p className="text-gray-500">Restarts</p>
          <p>{incident.restart_count}</p>
        </div>

        <div>
          <p className="text-gray-500">Image Pull Policy</p>
          <p>{incident.image_pull_policy}</p>
        </div>

        <div>
          <p className="text-gray-500">Termination Reason</p>
          <p>{incident.last_termination_reason}</p>
        </div>

      </div>

    </div>
  );
}