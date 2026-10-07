import { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  History,
} from "lucide-react";

export default function BulkImport() {
  const [file, setFile] = useState(null);
  const [imported, setImported] = useState(false);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a CSV or Excel file");
      return;
    }

    setImported(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Bulk Import</h1>
        <p className="mt-1 text-slate-500">
          Import multiple assets using CSV or Excel files.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <FileSpreadsheet className="text-blue-600" size={25} />
          <h3 className="mt-3 font-bold">CSV / Excel</h3>
          <p className="mt-1 text-sm text-slate-500">
            Upload your asset data.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <CheckCircle className="text-emerald-600" size={25} />
          <h3 className="mt-3 font-bold">Validation</h3>
          <p className="mt-1 text-sm text-slate-500">
            Validate records before importing.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <History className="text-purple-600" size={25} />
          <h3 className="mt-3 font-bold">Import History</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track previous imports.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Upload size={30} />
          </div>

          <h2 className="mt-5 text-xl font-bold">Upload Asset File</h2>

          <p className="mt-2 text-sm text-slate-500">
            Supported formats: CSV, XLS, XLSX
          </p>

          <label className="mt-6 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-10 transition hover:border-blue-500 hover:bg-blue-50">
            <Upload className="mx-auto text-slate-400" size={30} />

            <p className="mt-3 font-medium text-slate-700">
              {file ? file.name : "Click to choose a file"}
            </p>

            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleImport}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Import Assets
          </button>

          {imported && (
            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
              <CheckCircle size={18} />
              File imported successfully.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <AlertTriangle className="mt-0.5 text-amber-600" size={20} />

        <div>
          <h3 className="font-semibold text-amber-800">Import Guidelines</h3>
          <p className="mt-1 text-sm text-amber-700">
            Make sure your file contains asset name, category, department,
            location and status columns.
          </p>
        </div>
      </div>
    </div>
  );
}