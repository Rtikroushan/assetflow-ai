import { useState, useMemo } from "react";
import {
  UserPlus,
  RotateCcw,
  Clock,
  CheckCircle,
  Search,
  Filter,
  CheckCircle2,
  Undo2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Allocation() {
  const [allocations, setAllocations] = useState([
    {
      id: 1,
      asset: "MacBook Pro 14",
      assetId: "AST-1001",
      employee: "Rahul Sharma",
      department: "Engineering",
      date: "23 Sep 2026",
      status: "Active",
    },
    {
      id: 2,
      asset: "Dell XPS 15",
      assetId: "AST-1002",
      employee: "Priya Singh",
      department: "Design",
      date: "22 Sep 2026",
      status: "Active",
    },
    {
      id: 3,
      asset: "iPhone 15 Pro",
      assetId: "AST-1005",
      employee: "Amit Kumar",
      department: "Sales",
      date: "18 Sep 2026",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    asset: "",
    employee: "",
    department: "Engineering",
  });

  const [search, setSearch] = useState("");
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

  const assignAsset = (e) => {
    e.preventDefault();
    if (!form.asset || !form.employee) {
      showToast("Please enter device and employee details");
      return;
    }

    const newId = `AST-${1000 + allocations.length + 1}`;
    const newAllocation = {
      id: Date.now(),
      asset: form.asset,
      assetId: newId,
      employee: form.employee,
      department: form.department,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    };

    setAllocations([newAllocation, ...allocations]);
    setForm({
      asset: "",
      employee: "",
      department: "Engineering",
    });
    showToast(`Asset allocated to ${form.employee} successfully!`);
  };

  const toggleReturnStatus = (id) => {
    setAllocations(
      allocations.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Active" ? "Returned" : "Active";
          showToast(`Asset marked as ${nextStatus}.`);
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const filteredAllocations = useMemo(() => {
    return allocations.filter((item) => {
      const matchSearch =
        item.asset.toLowerCase().includes(search.toLowerCase()) ||
        item.employee.toLowerCase().includes(search.toLowerCase()) ||
        item.assetId.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [allocations, search, statusFilter]);

  const activeCount = allocations.filter((a) => a.status === "Active").length;
  const returnedCount = allocations.filter((a) => a.status === "Returned").length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
          Asset Allocation
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Assign hardware to employees, process check-ins, and track custody history.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <UserPlus size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Active Custodies
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Pending Returns
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                4
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
                Returned to Stock
              </p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {returnedCount + 126}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Quick Form */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Quick Device Assignment
        </h2>

        <form
          onSubmit={assignAsset}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
        >
          <input
            required
            name="asset"
            value={form.asset}
            onChange={handleChange}
            placeholder="Asset (e.g. MacBook Pro M3)"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <input
            required
            name="employee"
            value={form.employee}
            onChange={handleChange}
            placeholder="Employee full name"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
          </select>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <UserPlus size={18} />
            Assign Asset
          </button>
        </form>
      </div>

      {/* Allocation History Table with Search & Filter */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Allocation Records
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Active custody and return logs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 dark:bg-slate-800">
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
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
                <option value="Active">Active</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Asset</th>
                <th className="px-5 py-4 text-left font-semibold">Employee</th>
                <th className="px-5 py-4 text-left font-semibold">Department</th>
                <th className="px-5 py-4 text-left font-semibold">Allocation Date</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAllocations.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-200/80 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.asset}
                    </p>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {item.assetId}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                    {item.employee}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {item.department}
                  </td>

                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                    {item.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleReturnStatus(item.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                        item.status === "Active"
                          ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {item.status === "Active" ? (
                        <>
                          <RotateCcw size={13} />
                          Return Asset
                        </>
                      ) : (
                        <>
                          <Undo2 size={13} />
                          Reassign
                        </>
                      )}
                    </button>
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