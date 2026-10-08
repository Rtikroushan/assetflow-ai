import { useState } from "react";
import { Building2, Users, Plus, Package, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialDepts = [
  { name: "Engineering", employees: 42, assets: 118, budget: "₹1.4 Cr", color: "from-blue-600 to-indigo-600" },
  { name: "Product & Design", employees: 18, assets: 44, budget: "₹52 Lakh", color: "from-purple-600 to-pink-600" },
  { name: "IT Infrastructure", employees: 25, assets: 210, budget: "₹2.1 Cr", color: "from-emerald-600 to-teal-600" },
  { name: "Sales & Marketing", employees: 31, assets: 68, budget: "₹65 Lakh", color: "from-amber-500 to-orange-600" },
  { name: "Human Resources", employees: 12, assets: 24, budget: "₹28 Lakh", color: "from-rose-500 to-red-600" },
];

export default function Departments() {
  const [depts, setDepts] = useState(initialDepts);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    employees: 10,
    assets: 25,
    budget: "₹30 Lakh",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;

    const newDept = {
      ...form,
      color: "from-blue-600 to-cyan-600",
    };
    setDepts([...depts, newDept]);
    setIsAddOpen(false);
    setForm({ name: "", employees: 10, assets: 25, budget: "₹30 Lakh" });
    showToast(`Added Department: ${form.name}`);
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
            Departments & Asset Centers
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organizational cost centers, headcounts, and allocated hardware valuation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {depts.map((d) => (
          <motion.div
            key={d.name}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${d.color} text-white shadow-md shadow-blue-500/20`}>
                  <Building2 size={24} />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {d.budget}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {d.name}
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Users size={13} /> Personnel
                  </span>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {d.employees}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Package size={13} /> Allocated
                  </span>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {d.assets} devices
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Department Modal */}
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
                  Add Department Center
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
                    Department Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Legal & Compliance"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Initial Headcount
                    </label>
                    <input
                      type="number"
                      value={form.employees}
                      onChange={(e) => setForm({ ...form, employees: Number(e.target.value) })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Hardware Budget
                    </label>
                    <input
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      placeholder="e.g. ₹45 Lakh"
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
                    Save Department
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