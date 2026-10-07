import { useState } from "react";
import {
  ArrowRightLeft,
  CheckCircle,
  Clock,
  XCircle,
  Send,
} from "lucide-react";

export default function Transfers() {
  const [transfers, setTransfers] = useState([
    {
      id: "TRF-1001",
      asset: "MacBook Pro 14",
      assetId: "AST-1001",
      from: "Delhi",
      to: "Mumbai",
      requestedBy: "Rahul Sharma",
      date: "23 Sep 2026",
      status: "Pending",
    },
    {
      id: "TRF-1002",
      asset: "Dell XPS 15",
      assetId: "AST-1002",
      from: "Mumbai",
      to: "Pune",
      requestedBy: "Priya Singh",
      date: "22 Sep 2026",
      status: "Approved",
    },
    {
      id: "TRF-1003",
      asset: "iPhone 15 Pro",
      assetId: "AST-1005",
      from: "Pune",
      to: "Delhi",
      requestedBy: "Amit Kumar",
      date: "21 Sep 2026",
      status: "Rejected",
    },
  ]);

  const [form, setForm] = useState({
    asset: "",
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const requestTransfer = (e) => {
    e.preventDefault();

    if (!form.asset || !form.from || !form.to) {
      alert("Please fill all fields");
      return;
    }

    const newTransfer = {
      id: `TRF-${1000 + transfers.length + 1}`,
      asset: form.asset,
      assetId: `AST-${1000 + transfers.length + 1}`,
      from: form.from,
      to: form.to,
      requestedBy: "Admin",
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };

    setTransfers((prev) => [newTransfer, ...prev]);

    setForm({
      asset: "",
      from: "",
      to: "",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-600";
    }

    return "bg-amber-50 text-amber-600";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Asset Transfers
        </h1>

        <p className="mt-1 text-slate-500">
          Manage asset transfer requests and approvals.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold">
                {
                  transfers.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

              <h2 className="text-2xl font-bold">
                {
                  transfers.filter(
                    (item) => item.status === "Approved"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <XCircle size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Rejected
              </p>

              <h2 className="text-2xl font-bold">
                {
                  transfers.filter(
                    (item) => item.status === "Rejected"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Transfer Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <ArrowRightLeft size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              New Transfer Request
            </h2>

            <p className="text-sm text-slate-500">
              Request an asset transfer between locations.
            </p>
          </div>
        </div>

        <form
          onSubmit={requestTransfer}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
        >

          <input
            name="asset"
            value={form.asset}
            onChange={handleChange}
            placeholder="Asset name"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder="From location"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder="To location"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Send size={18} />
            Request Transfer
          </button>

        </form>
      </div>

      {/* Transfer History */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-lg font-bold">
            Transfer History
          </h2>

          <p className="text-sm text-slate-500">
            Recent asset transfer requests.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 text-left">
                  Transfer
                </th>

                <th className="px-5 py-4 text-left">
                  Asset
                </th>

                <th className="px-5 py-4 text-left">
                  From
                </th>

                <th className="px-5 py-4 text-left">
                  To
                </th>

                <th className="px-5 py-4 text-left">
                  Requested By
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {transfers.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4 font-semibold">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {item.asset}
                    </p>

                    <p className="text-xs text-slate-400">
                      {item.assetId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {item.from}
                  </td>

                  <td className="px-5 py-4">
                    {item.to}
                  </td>

                  <td className="px-5 py-4">
                    {item.requestedBy}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
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