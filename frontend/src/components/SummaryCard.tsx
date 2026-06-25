interface Props {
  title: string;
  value: number | string;
  color?: string;
}

export default function SummaryCard({
  title,
  value,
  color = "bg-blue-600",
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div
        className={`w-3 h-3 rounded-full ${color} mb-4`}
      />

      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-2">
        {value}
      </h1>

    </div>
  );
}