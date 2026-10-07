import { ShieldCheck, Clock } from "lucide-react";

export default function AuditLogs() {
  const logs = [
    {
      action: "Asset Assigned",
      user: "Admin",
      asset: "MacBook Pro 14",
      time: "10 minutes ago",
    },
    {
      action: "Transfer Requested",
      user: "Rahul Sharma",
      asset: "Dell XPS 15",
      time: "1 hour ago",
    },
    {
      action: "Asset Added",
      user: "Admin",
      asset: "iPhone 15 Pro",
      time: "3 hours ago",
    },
    {
      action: "Maintenance Updated",
      user: "Technician",
      asset: "HP LaserJet",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="mt-1 text-slate-500">
          Track important activities across AssetFlow.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b p-5 last:border-b-0"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ShieldCheck size={20} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{log.action}</h3>
              <p className="text-sm text-slate-500">
                {log.user} • {log.asset}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={14} />
              {log.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}