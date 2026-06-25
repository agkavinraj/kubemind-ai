// src/components/StatusBadge.tsx

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {

  const styles: Record<string, string> = {
    Running: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    CrashLoopBackOff: "bg-red-100 text-red-700",
    ImagePullBackOff: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}