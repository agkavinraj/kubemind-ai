import { useMemo, useState } from "react";

import PodsTable from "../components/PodsTable";
import { usePods } from "../hooks/usePods";

export default function Pods() {
  const { pods, loading } = usePods();

  const [search, setSearch] = useState("");
  const [namespace, setNamespace] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredPods = useMemo(() => {
    return pods.filter((pod) => {
      const matchesSearch = pod.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesNamespace =
        namespace === "All" ||
        pod.namespace === namespace;

      const matchesStatus =
        status === "All" ||
        pod.status === status;

      return (
        matchesSearch &&
        matchesNamespace &&
        matchesStatus
      );
    });
  }, [pods, search, namespace, status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Kubernetes Pods...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Kubernetes Pods
        </h1>

        <p className="mt-2 text-gray-500 text-lg">
          Monitor and manage all running pods in your Kubernetes cluster.
        </p>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex flex-wrap gap-4 items-center">

          <input
            type="text"
            placeholder="Search pods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              min-w-[280px]
              border
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <select
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            className="
              border
              rounded-lg
              px-4
              py-3
              min-w-[200px]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="All">
              All Namespaces
            </option>

            {[...new Set(pods.map((pod) => pod.namespace))].map((ns) => (
              <option
                key={ns}
                value={ns}
              >
                {ns}
              </option>
            ))}

          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              border
              rounded-lg
              px-4
              py-3
              min-w-[180px]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="All">
              All Status
            </option>

            {[...new Set(pods.map((pod) => pod.status))].map((podStatus) => (
              <option
                key={podStatus}
                value={podStatus}
              >
                {podStatus}
              </option>
            ))}

          </select>

        </div>

        {/* Pod Count */}

        <div className="mt-5 flex items-center justify-between">

          <p className="text-gray-600">

            Showing{" "}

            <span className="font-bold text-blue-600">
              {filteredPods.length}
            </span>

            {" "}of{" "}

            <span className="font-bold">
              {pods.length}
            </span>

            {" "}Pods

          </p>

          <button
            onClick={() => {
              setSearch("");
              setNamespace("All");
              setStatus("All");
            }}
            className="
              text-sm
              text-blue-600
              hover:text-blue-800
              font-medium
            "
          >
            Reset Filters
          </button>

        </div>

      </div>

      {/* Pods Table */}

      <PodsTable pods={filteredPods} />

    </div>
  );
}