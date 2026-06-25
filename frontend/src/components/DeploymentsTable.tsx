import type { Deployment } from "../types/deployments";

interface Props {
  deployments: Deployment[];
}

export default function DeploymentsTable({
  deployments,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Deployment
            </th>

            <th className="px-6 py-4 text-left">
              Namespace
            </th>

            <th className="px-6 py-4 text-center">
              Replicas
            </th>

            <th className="px-6 py-4 text-center">
              Ready
            </th>

            <th className="px-6 py-4 text-center">
              Available
            </th>

          </tr>

        </thead>

        <tbody>

          {deployments.map((deployment) => (

            <tr
              key={`${deployment.namespace}-${deployment.name}`}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium text-slate-800">
                {deployment.name}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {deployment.namespace}
              </td>

              <td className="px-6 py-4 text-center">
                {deployment.replicas}
              </td>

              <td className="px-6 py-4 text-center">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {deployment.ready_replicas}
                </span>

              </td>

              <td className="px-6 py-4 text-center">
                {deployment.available_replicas}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}