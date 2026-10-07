import {
  Brain,
  AlertTriangle,
  Wrench,
  PackageSearch,
} from "lucide-react";

export default function MLIntelligence() {
  const predictions = [
    {
      title: "Transfer Anomaly",
      value: "3",
      description: "Unusual transfer activities detected.",
      icon: AlertTriangle,
    },
    {
      title: "Maintenance Risk",
      value: "8",
      description: "Assets may require maintenance.",
      icon: Wrench,
    },
    {
      title: "Idle Assets",
      value: "14",
      description: "Assets currently underutilized.",
      icon: PackageSearch,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ML Intelligence</h1>
        <p className="mt-1 text-slate-500">
          Machine learning insights for asset operations.
        </p>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-950 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <Brain size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Asset Intelligence Engine
            </h2>
            <p className="mt-1 text-slate-300">
              AI-powered operational insights.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {predictions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="card-3d rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="rounded-xl bg-blue-50 p-3 w-fit text-blue-600">
                <Icon size={24} />
              </div>

              <p className="mt-5 text-sm text-slate-500">{item.title}</p>

              <h2 className="mt-1 text-3xl font-bold">{item.value}</h2>

              <p className="mt-2 text-sm text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}