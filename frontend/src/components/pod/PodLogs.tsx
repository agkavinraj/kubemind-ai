interface Props {
  logs: string;
}

export default function PodLogs({ logs }: Props) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Logs
      </h2>

      <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">

        {logs || "No logs available."}

      </pre>

    </div>
  );
}