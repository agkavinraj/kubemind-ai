import { useMemo, useState } from "react";

import ServicesTable from "../components/ServicesTable";
import { useServices } from "../hooks/useServices";

export default function Services() {
  const { services, loading } = useServices();

  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [services, search]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-lg font-semibold text-slate-600">
          Loading services...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Services
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor Kubernetes services across the cluster.
        </p>

      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
        />

        <div className="mt-4 text-sm text-slate-500">

          Showing

          <span className="mx-1 font-semibold text-slate-900">
            {filteredServices.length}
          </span>

          of

          <span className="mx-1 font-semibold text-slate-900">
            {services.length}
          </span>

          services

        </div>

      </div>

      <ServicesTable services={filteredServices} />

    </div>
  );
}