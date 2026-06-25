import StatCard from "../components/StatCard";
import ClusterHealth from "../components/ClusterHealth";
import RecentIncidents from "../components/RecentIncidents";

import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { summary, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-lg font-semibold text-slate-600">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your Kubernetes cluster and AI detected incidents.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Pods"
          value={summary.pods}
        />

        <StatCard
          title="Nodes"
          value={summary.nodes}
          color="bg-green-600"
        />

        <StatCard
          title="Deployments"
          value={summary.deployments}
          color="bg-yellow-500"
        />

        <StatCard
          title="Services"
          value={summary.services}
          color="bg-purple-600"
        />

      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ClusterHealth
          running={summary.running_pods}
          pending={summary.pending_pods}
          failed={summary.failed_pods}
          restarting={summary.restarting_pods}
        />

        <RecentIncidents />

      </div>

    </div>
  );
}