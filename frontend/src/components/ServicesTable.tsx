import type { Service } from "../types/service";

interface Props {
  services: Service[];
}

export default function ServicesTable({
  services,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Service
            </th>

            <th className="px-6 py-4 text-left">
              Namespace
            </th>

            <th className="px-6 py-4 text-left">
              Type
            </th>

            <th className="px-6 py-4 text-left">
              Cluster IP
            </th>

            <th className="px-6 py-4 text-left">
              Ports
            </th>

          </tr>

        </thead>

        <tbody>

          {services.map((service) => (

            <tr
              key={`${service.namespace}-${service.name}`}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {service.name}
              </td>

              <td className="px-6 py-4">
                {service.namespace}
              </td>

              <td className="px-6 py-4">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                  {service.service_type}

                </span>

              </td>

              <td className="px-6 py-4 font-mono text-sm">
                {service.cluster_ip}
              </td>

              <td className="px-6 py-4">

                <div className="flex flex-wrap gap-2">

                  {service.ports.map((port) => (

                    <span
                      key={port}
                      className="rounded bg-slate-200 px-2 py-1 text-xs"
                    >
                      {port}
                    </span>

                  ))}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}