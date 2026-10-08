import { useState } from "react";
import { MapPin, Package, Plus, Building, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialLocs = [
  { name: "Delhi Central Hub", type: "Regional Warehouse", manager: "Neha Gupta", assets: 420, capacity: "84%" },
  { name: "Mumbai Corporate HQ", type: "Headquarters", manager: "Rahul Sharma", assets: 315, capacity: "72%" },
  { name: "Pune Tech Campus", type: "Development Center", manager: "Amit Kumar", assets: 198, capacity: "65%" },
  { name: "Jaipur Logistics Hub", type: "Logistics Hub", manager: "Priya Singh", assets: 175, capacity: "50%" },
  { name: "Bengaluru Innovation Lab", type: "R&D Facility", manager: "Suresh Patel", assets: 140, capacity: "58%" },
];

export default function Locations() {
  const [locations, setLocations] = useState(initialLocs);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "Branch Office",
    manager: "Admin",
    assets: 50,
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;

    setLocations([...locations, { ...form, capacity: "40%" }]);
    setIsAddOpen(false);
    setForm({ name: "", type: "Branch Office", manager: "Admin", assets: 50 });
    showToast(`Registered Location: ${form.name}`);
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
            Facilities & Storage Locations
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Physical hardware depots, campus inventory caches, and field hubs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus size={18} />
          Register Facility
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <motion.div
            key={loc.name}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                  <MapPin size={22} />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {loc.type}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                {loc.name}
              </h2>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Facility Lead: {loc.manager}
              </p>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                  <Package size={14} className="text-blue-600 dark:text-blue-400" />
                  {loc.assets} Stored Assets
                </span>
                <span className="text-slate-400 dark:text-slate-500">
                  Capacity: {loc.capacity}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Location Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Register New Location Hub
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Facility Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Hyderabad Development Center"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Location Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Headquarters">Headquarters</option>
                      <option value="Regional Warehouse">Regional Warehouse</option>
                      <option value="Development Center">Development Center</option>
                      <option value="Branch Office">Branch Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Facility Lead
                    </label>
                    <input
                      value={form.manager}
                      onChange={(e) => setForm({ ...form, manager: e.target.value })}
                      placeholder="e.g. Vikramaditya"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    Save Hub
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