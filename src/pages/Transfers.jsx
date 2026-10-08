import { useState, useMemo } from "react";
import {
  ArrowRightLeft,
  CheckCircle,
  Clock,
  XCircle,
  Send,
  Check,
  X,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Transfers() {
  const [transfers, setTransfers] = useState([
    {
      id: "TRF-1001",
      asset: "MacBook Pro 14",
      assetId: "AST-1001",
      from: "Delhi Hub",
      to: "Mumbai HQ",
      requestedBy: "Rahul Sharma",
      date: "23 Sep 2026",
      status: "Pending",
    },
    {
      id: "TRF-1002",
      asset: "Dell XPS 15",
      assetId: "AST-1002",
      from: "Mumbai HQ",
      to: "Pune Facility",
      requestedBy: "Priya Singh",
      date: "22 Sep 2026",
      status: "Approved",
    },
    {
      id: "TRF-1003",
      asset: "iPhone 15 Pro",
      assetId: "AST-1005",
      from: "Pune Facility",
      to: "Delhi Hub",
      requestedBy: "Amit Kumar",
      date: "21 Sep 2026",
      status: "Rejected",
    },
  ]);

  const [form, setForm] = useState({
    asset: "",
    from: "Delhi Hub",
    to: "Mumbai HQ",
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const requestTransfer = (e) => {
    e.preventDefault();
    if (!form.asset || !form.from || !form.to) {
      showToast("Please enter an asset and both locations");
      return;
    }

    if (form.from === form.to) {
      showToast("Source and destination must be different");
      return;
    }

    const newTransfer = {
      id: `TRF-${1000 + transfers.length + 1}`,
      asset: form.asset,
      assetId: `AST-${1000 + transfers.length + 1}`,
      from: form.from,
      to: form.to,
      requestedBy: "Admin",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setTransfers([newTransfer, ...transfers]);
    setForm({
      asset: "",
      from: "Delhi Hub",
      to: "Mumbai HQ",
    });
    showToast(`Transfer request ${newTransfer.id} submitted!`);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setTransfers(
      transfers.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`Transfer ${id} has been marked as ${newStatus}.`);
  };

  const filteredTransfers = useMemo(() => {
    if (statusFilter === "All") return transfers;
    return transfers.filter((t) => t.status === statusFilter);
  }, [transfers, statusFilter]);

  const pendingCount = transfers.filter((t) => t.status === "Pending").length;
  const approvedCount = transfers.filter((t) => t.status === "Approved").length;
  const rejectedCount = transfers.filter((t) => t.status === "Rejected").length;

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
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Asset Transfers
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Request, dispatch, and approve device relocations across facilities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Pending Approvals
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {pendingCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Approved Transfers
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {approvedCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Rejected / Cancelled
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {rejectedCount}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Request Form */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <ArrowRightLeft size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Create New Transfer
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Initiate shipment between branch offices or headquarters
            </p>
          </div>
        </div>

        <form onSubmit={requestTransfer} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            required
            name="asset"
            value={form.asset}
            onChange={handleChange}
            placeholder="Asset Name (e.g. Dell UltraSharp 32)"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <select
            name="from"
            value={form.from}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="Delhi Hub">From: Delhi Hub</option>
            <option value="Mumbai HQ">From: Mumbai HQ</option>
            <option value="Pune Facility">From: Pune Facility</option>
            <option value="Jaipur Center">From: Jaipur Center</option>
          </select>

          <select
            name="to"
            value={form.to}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="Mumbai HQ">To: Mumbai HQ</option>
            <option value="Delhi Hub">To: Delhi Hub</option>
            <option value="Pune Facility">To: Pune Facility</option>
            <option value="Jaipur Center">To: Jaipur Center</option>
          </select>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Send size={18} />
            Dispatch Request
          </button>
        </form>
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Transfer Manifest
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Relocation tracking and audit history
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {["All", "Pending", "Approved", "Rejected"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setStatusFilter(cat)}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    statusFilter === cat
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Transfer ID</th>
                <th className="px-5 py-4 text-left font-semibold">Asset</th>
                <th className="px-5 py-4 text-left font-semibold">Origin</th>
                <th className="px-5 py-4 text-left font-semibold">Destination</th>
                <th className="px-5 py-4 text-left font-semibold">Requested By</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransfers.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-200/80 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-white">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.asset}
                    </p>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {item.assetId}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {item.from}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {item.to}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {item.requestedBy}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : item.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    {item.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "Approved")}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400"
                          title="Approve"
                        >
                          <Check size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "Rejected")}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400"
                          title="Reject"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}