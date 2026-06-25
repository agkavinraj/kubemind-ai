import { useParams } from "react-router-dom";

import { usePodDetails } from "../hooks/usePodDetails";

import GeneralInfo from "../components/pod/GeneralInfo";
import AIAnalysis from "../components/pod/AIAnalysis";
import PodEvents from "../components/pod/PodEvents";
import PodLogs from "../components/pod/PodLogs";
import RelatedResources from "../components/pod/RelatedResources";

export default function PodDetails() {
  const { namespace, podName } = useParams();

  const {
    pod,
    loading,
  } = usePodDetails(
    namespace,
    podName,
  );

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading Pod Details...
        </h2>
      </div>
    );
  }

  if (!pod) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Pod not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          {pod.incident.pod_name}
        </h1>

        <p className="text-gray-500 mt-2">
          Namespace: {pod.incident.namespace}
        </p>

      </div>

      <GeneralInfo incident={pod.incident} />

      <AIAnalysis analysis={pod.analysis} />

      <PodEvents events={pod.incident.events} />

      <PodLogs logs={pod.incident.logs} />

      <RelatedResources
        resources={pod.related_resources}
      />

    </div>
  );
}