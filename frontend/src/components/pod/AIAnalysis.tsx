import type { AIAnalysis as AIAnalysisType } from "../../types/incident";

interface Props {
  analysis: AIAnalysisType | null;
}

export default function AIAnalysis({ analysis }: Props) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold">
          🤖 AI Analysis
        </h2>

        <p className="text-gray-500 mt-4">
          No AI analysis available for this pod.
        </p>
      </div>
    );
  }

  const severityStyles: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          🤖 AI Analysis
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            severityStyles[analysis.severity] ??
            "bg-gray-100 text-gray-700"
          }`}
        >
          {analysis.severity}
        </span>

      </div>

      <div className="space-y-8">

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Summary
          </h3>

          <p className="text-gray-700 leading-7">
            {analysis.summary}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Root Cause
          </h3>

          <p className="text-gray-700 leading-7">
            {analysis.root_cause}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Recommendation
          </h3>

          <p className="text-gray-700 leading-7">
            {analysis.recommendation}
          </p>
        </div>

      </div>

    </div>
  );
}