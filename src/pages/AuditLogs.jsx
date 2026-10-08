import { useState, useMemo } from "react";
import { ShieldCheck, Clock, Search, Filter, Download, CheckCircle2, User, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialLogs = [
  {
    id: "LOG-991",
    action: "Hardware Custody Transfer",
    type: "Assignment",
    user: "Super Admin",
    asset: "MacBook Pro 14 (AST-1001)",
    details: "Assigned to Rahul Sharma (Engineering)",
    time: "10 minutes ago",
    status: "Verified",
  },
  {
    id: "LOG-992",
    action: "Inter-City Relocation Request",
    type: "Transfer",
    user: "Rahul Sharma",
    asset: "Dell XPS 15 (AST-1002)",
    details: "Dispatch requested from Delhi Hub to Mumbai HQ",
    time: "1 hour ago",
    status: "Pending",
  },
  {
    id: "LOG-993",
    action: "Physical QR Audit Verified",
    type: "Audit",
    user: "Neha Gupta (IT)",
    asset: "HP LaserJet (AST-1004)",
    details: "Bar-matrix scan confirmed at Delhi Copier Room",
    time: "3 hours ago",
    status: "Verified",
  },
  {
    id: "LOG-994",
    action: "Diagnostic Service Logged",
    type: "Maintenance",
    user: "System AI Monitor",
    asset: "iPhone 15 Pro (AST-1005)",
    details: "AppleCare warranty renewal alert auto-flagged",
    time: "5 hours ago",
    status: "System Alert",
  },
  {
    id: "LOG-995",
    action: "Security Configuration Updated",
    type: "Security",
    user: "Super Admin",
    asset: "System Portal",
    details: "Two-factor authentication policy enforced globally",
    time: "Yesterday",
    status: "Verified",
  },
];

export default function AuditLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.asset.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || log.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [logs, search, typeFilter]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(
        "ID,Action,Type,User,Asset,Details,Time,Status\n" +
          filteredLogs
            .map(
              (l) =>
                `${l.id},"${l.action}",${l.type},"${l.user}","${l.asset}","${l.details}","${l.time}",${l.status}`
            )
            .join("\n")
      );
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "audit_trail_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported audit trail to CSV!");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Security & Audit Logs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Immutable timeline of asset allocations, security events, and custody handoffs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Download size={16} />
          Export Audit Trail
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800/80">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, user, or asset tag..."
            className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Assignment", "Transfer", "Audit", "Maintenance", "Security"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                typeFilter === t
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Timeline Container */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Audit Stream
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {filteredLogs.length} verified operations recorded
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {log.action}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {log.type}
                    </span>
                  </div>

                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {log.user}
                    </span>{" "}
                    · {log.asset}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                    {log.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    log.status === "Verified"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : log.status === "Pending"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                  }`}
                >
                  {log.status}
                </span>

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={13} />
                  <span>{log.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}