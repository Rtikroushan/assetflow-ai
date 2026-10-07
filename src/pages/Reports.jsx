import { Download, FileBarChart, TrendingUp } from "lucide-react";

export default function Reports() {
  const reports = [
    "Asset Inventory Report",
    "Asset Allocation Report",
    "Maintenance Report",
    "Transfer History Report",
    "Asset Depreciation Report",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="mt-1 text-slate-500">
          Generate and analyze asset management reports.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <FileBarChart className="text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold">1,248</h2>
          <p className="text-sm text-slate-500">Total Assets</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <TrendingUp className="text-emerald-600" />
          <h2 className="mt-4 text-2xl font-bold">92%</h2>
          <p className="text-sm text-slate-500">Utilization Rate</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <FileBarChart className="text-purple-600" />
          <h2 className="mt-4 text-2xl font-bold">₹4.8Cr</h2>
          <p className="text-sm text-slate-500">Asset Value</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Available Reports</h2>

        <div className="mt-5 space-y-3">
          {reports.map((report) => (
            <div
              key={report}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
            >
              <span className="font-medium">{report}</span>

              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                <Download size={16} />
                Export
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}