import { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  History,
  Download,
  FileText,
  CheckCircle2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const previewData = [
  { id: "IMP-01", name: "Dell Precision 5570", category: "Laptop", dept: "Engineering", loc: "Delhi", status: "Valid" },
  { id: "IMP-02", name: "Apple iPad Air M2", category: "Tablet", dept: "Design", loc: "Mumbai", status: "Valid" },
  { id: "IMP-03", name: "LG UltraFine 27-inch", category: "Monitor", dept: "Operations", loc: "Pune", status: "Valid" },
  { id: "IMP-04", name: "Zebra Barcode Scanner", category: "Peripheral", dept: "IT Warehouse", loc: "Delhi", status: "Valid" },
];

export default function BulkImport() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imported, setImported] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImported(false);
      showToast(`Loaded ${selected.name}`);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = "Asset_Name,Category,Department,Location,Serial_Number,Value";
    const sampleRows = [
      "Lenovo ThinkPad T14,Laptop,Engineering,Delhi Hub,LN-882910,85000",
      "Dell UltraSharp 27,Monitor,Design,Mumbai HQ,DL-448192,34000",
    ].join("\n");
    const blob = new Blob([headers + "\n" + sampleRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "asset_bulk_import_template.csv";
    a.click();
    showToast("Downloaded CSV template!");
  };

  const handleImport = () => {
    if (!file) {
      // Simulate auto-loading preview if user hasn't selected a local file
      setFile({ name: "staged_hardware_batch.csv", size: "14.2 KB" });
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImported(true);
      showToast("Ingested 4 assets into system directory!");
    }, 1200);
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
            Bulk Asset Ingestion
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Import large device inventories via CSV or Excel spreadsheets with automated schema validation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Download size={16} />
          Download Sample CSV
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <FileSpreadsheet size={22} />
          </div>
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">CSV & XLSX Support</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Automated column mapping for standard hardware schemas.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle size={22} />
          </div>
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Pre-Flight Validation</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Detects duplicate serial numbers and invalid department tags.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <History size={22} />
          </div>
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Batch Rollback</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Every ingestion is versioned with an automatic one-click revert.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
        <div className="mx-auto max-w-xl text-center">
          <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 p-8 transition hover:border-blue-500 hover:bg-blue-50/50 dark:border-slate-700 dark:hover:border-blue-400 dark:hover:bg-blue-950/20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Upload size={28} />
            </div>

            <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
              {file ? file.name : "Click to select CSV or drag & drop file"}
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Supported filetypes: .csv, .xls, .xlsx (Max size: 25MB)
            </p>

            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleImport}
            disabled={isProcessing}
            className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isProcessing ? "Validating & Ingesting..." : "Process Batch Ingestion"}
          </button>
        </div>
      </div>

      {/* Staged Data Preview */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileText size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-slate-900 dark:text-white">
              Staged Records Preview
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            4 Records Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3.5 text-left font-semibold">Row</th>
                <th className="px-5 py-3.5 text-left font-semibold">Device</th>
                <th className="px-5 py-3.5 text-left font-semibold">Category</th>
                <th className="px-5 py-3.5 text-left font-semibold">Department</th>
                <th className="px-5 py-3.5 text-left font-semibold">Location</th>
                <th className="px-5 py-3.5 text-left font-semibold">Validation</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-200/80 dark:border-slate-800"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                    {row.id}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {row.name}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    {row.category}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    {row.dept}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    {row.loc}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <Check size={12} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines Note */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-900/50 dark:bg-amber-950/40">
        <AlertTriangle className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" size={18} />
        <div>
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
            Schema Column Requirement
          </h4>
          <p className="mt-0.5 text-xs text-amber-800/80 dark:text-amber-400/80">
            Spreadsheets must include Asset_Name, Category, Department, Location, and Value. Missing columns will be flagged during the staging phase.
          </p>
        </div>
      </div>
    </div>
  );
}