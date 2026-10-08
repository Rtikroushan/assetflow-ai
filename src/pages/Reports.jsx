import { useState } from "react";
import { Download, FileBarChart, TrendingUp, Calendar, CheckCircle2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reportList = [
  { id: "REP-01", name: "Comprehensive Asset Inventory Statement", period: "Monthly", format: "CSV · PDF", size: "2.4 MB" },
  { id: "REP-02", name: "Employee Hardware Custody & Allocation Log", period: "Realtime", format: "CSV · XLSX", size: "1.1 MB" },
  { id: "REP-03", name: "Maintenance Downtime & SLA Vendor Audit", period: "Quarterly", format: "PDF", size: "3.8 MB" },
  { id: "REP-04", name: "Inter-Office Hardware Relocation Manifest", period: "Monthly", format: "CSV", size: "840 KB" },
  { id: "REP-05", name: "Depreciation & Straight-Line Tax Amortization", period: "Annual", format: "XLSX · PDF", size: "4.5 MB" },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("Q3 2026");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExport = (reportName) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(
        `Report: ${reportName}\nGenerated Period: ${timeRange}\nExport Date: ${new Date().toISOString()}\nStatus: Verified Complete\n`
      );
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${reportName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported "${reportName}"!`);
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
            Executive Analytics & Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Generate audit-ready spreadsheets, asset balance sheets, and utilization metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-slate-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="Current Month">Current Month (Oct 2026)</option>
            <option value="Q3 2026">Last Quarter (Q3 2026)</option>
            <option value="FY 2026-2027">Fiscal Year 2026-2027</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <FileBarChart size={22} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">2,458</h2>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Total Audited Assets
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <TrendingUp size={22} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">92.4%</h2>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Utilization Rate
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <FileBarChart size={22} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">₹4.82 Cr</h2>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Aggregate Book Valuation
          </p>
        </div>
      </div>

      {/* Available Reports Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Available Export Manifests
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Click export to generate instant download stream for {timeRange}
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {reportList.map((rep) => (
            <div
              key={rep.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rep.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Cadence: {rep.period} · Formats: {rep.format} · Est. {rep.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleExport(rep.name)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Download size={14} />
                Generate & Export
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}