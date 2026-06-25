interface Props {
  running: number;
  pending: number;
  failed: number;
  restarting: number;
}

export default function ClusterHealth({
  running,
  pending,
  failed,
  restarting,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Cluster Health
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div>
          <p className="text-gray-500">Running</p>
          <h2 className="text-3xl font-bold text-green-600">
            {running}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-500">
            {pending}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Failed</p>
          <h2 className="text-3xl font-bold text-red-600">
            {failed}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Restarts</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {restarting}
          </h2>
        </div>

      </div>

    </div>
  );
}