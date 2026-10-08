import { useState, useMemo } from "react";
import {
  Wrench,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialTickets = [
  {
    id: "MNT-201",
    asset: "HP LaserJet Pro",
    assetId: "AST-1004",
    type: "Fuser Roller Jam",
    severity: "Critical",
    assignedTo: "Neha Gupta (IT)",
    reportedDate: "05 Oct 2026",
    status: "In Progress",
  },
  {
    id: "MNT-202",
    asset: "Dell XPS 15",
    assetId: "AST-1002",
    type: "Battery Health Below 70%",
    severity: "Medium",
    assignedTo: "Pooja Verma",
    reportedDate: "03 Oct 2026",
    status: "Open",
  },
  {
    id: "MNT-203",
    asset: "MacBook Pro 16",
    assetId: "AST-1009",
    type: "Display Backlight Flicker",
    severity: "Critical",
    assignedTo: "Apple Service Center",
    reportedDate: "01 Oct 2026",
    status: "In Progress",
  },
  {
    id: "MNT-204",
    asset: "Cisco Catalyst Switch",
    assetId: "AST-1015",
    type: "Firmware Security Patch",
    severity: "Routine",
    assignedTo: "Vikram Mehta",
    reportedDate: "28 Sep 2026",
    status: "Resolved",
  },
];

export default function Maintenance() {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
    asset: "",
    type: "",
    severity: "Medium",
    assignedTo: "Internal IT",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!form.asset || !form.type) return;

    const newTicket = {
      id: `MNT-${200 + tickets.length + 1}`,
      asset: form.asset,
      assetId: `AST-${1000 + tickets.length + 2}`,
      type: form.type,
      severity: form.severity,
      assignedTo: form.assignedTo,
      reportedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Open",
    };

    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    setForm({ asset: "", type: "", severity: "Medium", assignedTo: "Internal IT" });
    showToast(`Maintenance Ticket ${newTicket.id} logged!`);
  };

  const handleStatusChange = (id, newStatus) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`Ticket ${id} marked as ${newStatus}.`);
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.asset.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [tickets, search, statusFilter]);

  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

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
            Maintenance & Repairs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Hardware diagnostics, vendor servicing, and resolution SLA tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus size={18} />
          Log Service Ticket
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                Open Tickets
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {openCount}
              </h2>
            </div>
            <div className="rounded-2xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <AlertTriangle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                In Diagnostics
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {inProgressCount}
              </h2>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                Assigned Techs
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                8
              </h2>
            </div>
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Wrench size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                Resolved (30d)
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {resolvedCount + 95}
              </h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Management Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Service Tickets
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {filteredTickets.length} active service tickets
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 dark:bg-slate-800">
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket..."
                className="w-32 bg-transparent text-xs text-slate-900 outline-none dark:text-white sm:w-44"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Filter size={15} className="text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Ticket ID</th>
                <th className="px-5 py-4 text-left font-semibold">Asset Info</th>
                <th className="px-5 py-4 text-left font-semibold">Fault Description</th>
                <th className="px-5 py-4 text-left font-semibold">Urgency</th>
                <th className="px-5 py-4 text-left font-semibold">Assigned Tech</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Quick Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((item) => (
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
                    {item.type}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.severity === "Critical"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : item.severity === "Medium"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {item.assignedTo}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold border outline-none cursor-pointer ${
                        item.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                          : item.status === "In Progress"
                          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                          : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"
                      }`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>

                  <td className="px-5 py-4 text-right">
                    {item.status !== "Resolved" ? (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "Resolved")}
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Closed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Ticket Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Log Service Ticket
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Device Name / Tag
                  </label>
                  <input
                    required
                    value={form.asset}
                    onChange={(e) => setForm({ ...form, asset: e.target.value })}
                    placeholder="e.g. MacBook Pro 14 or AST-1001"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Issue Description
                  </label>
                  <input
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g. Broken keyboard switch, overheating"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Severity
                    </label>
                    <select
                      value={form.severity}
                      onChange={(e) => setForm({ ...form, severity: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Critical">Critical</option>
                      <option value="Medium">Medium</option>
                      <option value="Routine">Routine</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Assign Technician
                    </label>
                    <select
                      value={form.assignedTo}
                      onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Internal IT">Internal IT</option>
                      <option value="Neha Gupta (IT)">Neha Gupta (IT)</option>
                      <option value="Authorized Vendor">Authorized Vendor</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}