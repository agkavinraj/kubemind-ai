interface Props {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "bg-blue-600",
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`h-12 w-2 rounded-full ${color}`}
        />

      </div>

    </div>
  );
}