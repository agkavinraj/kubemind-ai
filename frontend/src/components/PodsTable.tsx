import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

import type { Pod } from "../types/pod";

interface Props {
  pods: Pod[];
}

export default function PodsTable({ pods }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Pod
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Node
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {pods.map((pod) => (

            <tr
              key={`${pod.namespace}-${pod.name}`}
              className="border-t hover:bg-slate-50 transition-colors duration-200"
            >

              {/* Pod */}

              <td className="px-6 py-4">

                <Link
                  to={`/pods/${pod.namespace}/${pod.name}`}
                  className="block"
                  title={pod.name}
                >

                  <div className="font-semibold text-slate-800 hover:text-blue-600 transition">

                    {pod.name.length > 32
                      ? `${pod.name.substring(0, 32)}...`
                      : pod.name}

                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Namespace: {pod.namespace}
                  </div>

                </Link>

              </td>

              {/* Status */}

              <td className="px-6 py-4">

                <StatusBadge
                  status={pod.status}
                />

              </td>

              {/* Node */}

              <td className="px-6 py-4 text-slate-700">
                {pod.node}
              </td>

              {/* Action */}

              <td className="px-6 py-4 text-center">

                <Link
                  to={`/pods/${pod.namespace}/${pod.name}`}
                  className="
                    inline-flex
                    items-center
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    hover:bg-blue-700
                    transition
                  "
                >
                  View
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}