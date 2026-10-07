import { useState } from "react";
import {
  UserPlus,
  RotateCcw,
  Clock,
  CheckCircle,
} from "lucide-react";

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
  ]);

  const [form, setForm] = useState({
    asset: "",
    employee: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const assignAsset = (e) => {
    e.preventDefault();

    if (!form.asset || !form.employee || !form.department) {
      alert("Please fill all fields");
      return;
    }

    const newAllocation = {
      id: Date.now(),
      asset: form.asset,
      assetId: `AST-${1000 + allocations.length + 1}`,
      employee: form.employee,
      department: form.department,
      date: new Date().toLocaleDateString(),
      status: "Active",
    };

    setAllocations([...allocations, newAllocation]);

    setForm({
      asset: "",
      employee: "",
      department: "",
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Asset Allocation
        </h1>

        <p className="mt-1 text-slate-500">
          Assign and manage organizational assets.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <UserPlus size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Active Allocations
              </p>

              <h2 className="text-2xl font-bold">
                {allocations.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending Returns
              </p>

              <h2 className="text-2xl font-bold">
                12
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Returned
              </p>

              <h2 className="text-2xl font-bold">
                126
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Assign Form */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-lg font-bold">
          Assign New Asset
        </h2>

        <form
          onSubmit={assignAsset}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
        >

          <input
            name="asset"
            value={form.asset}
            onChange={handleChange}
            placeholder="Asset name"
            className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="employee"
            value={form.employee}
            onChange={handleChange}
            placeholder="Employee name"
            className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Assign Asset
          </button>

        </form>
      </div>

      {/* Allocation History */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-5">

          <div>
            <h2 className="text-lg font-bold">
              Allocation History
            </h2>

            <p className="text-sm text-slate-500">
              Recently allocated assets
            </p>
          </div>

          <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
            <RotateCcw size={18} />
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 text-left">
                  Asset
                </th>

                <th className="px-5 py-4 text-left">
                  Employee
                </th>

                <th className="px-5 py-4 text-left">
                  Department
                </th>

                <th className="px-5 py-4 text-left">
                  Date
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {allocations.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {item.asset}
                    </p>

                    <p className="text-xs text-slate-400">
                      {item.assetId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {item.employee}
                  </td>

                  <td className="px-5 py-4">
                    {item.department}
                  </td>

                  <td className="px-5 py-4">
                    {item.date}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                      {item.status}
                    </span>
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