import { useMemo, useState } from "react";

import DeploymentsTable from "../components/DeploymentsTable";
import { useDeployments } from "../hooks/useDeployments";

export default function Deployments() {
  const { deployments, loading } = useDeployments();

  const [search, setSearch] = useState("");

  const filteredDeployments = useMemo(() => {
    return deployments.filter((deployment) =>
      deployment.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [deployments, search]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-lg font-semibold text-slate-600">
          Loading deployments...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Deployments
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor deployment health and replica status.
        </p>

      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <input
          type="text"
          placeholder="Search deployments..."
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
            {filteredDeployments.length}
          </span>

          of

          <span className="mx-1 font-semibold text-slate-900">
            {deployments.length}
          </span>

          deployments

        </div>

      </div>

      <DeploymentsTable
        deployments={filteredDeployments}
      />

    </div>
  );
}