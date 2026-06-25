import type { RelatedResources } from "../../types/podDetails";

interface Props {
    resources: RelatedResources;
}
export default function RelatedResources({
  resources,
}: Props) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Related Resources
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div>
          <p className="text-gray-500">
            Deployment
          </p>

          <p>
            {resources.deployment ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            ReplicaSet
          </p>

          <p>
            {resources.replicaset ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Services
          </p>

          <p>
            {resources.services.length
              ? resources.services.join(", ")
              : "-"}
          </p>
        </div>

      </div>

    </div>
  );
}