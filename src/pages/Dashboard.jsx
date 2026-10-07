import {
  Package,
  Users,
  Wrench,
  AlertTriangle,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import { assets } from "../data/mockData";

const activityData = [
  { month: "Jan", assets: 320 },
  { month: "Feb", assets: 410 },
  { month: "Mar", assets: 380 },
  { month: "Apr", assets: 520 },
  { month: "May", assets: 610 },
  { month: "Jun", assets: 720 },
];

const categoryData = [
  { name: "Laptops", value: 42 },
  { name: "Mobiles", value: 25 },
  { name: "Monitors", value: 18 },
  { name: "Others", value: 15 },
];

const COLORS = ["#2563eb", "#7c3aed", "#06b6d4", "#94a3b8"];

export default function Dashboard() {
  return (
    <div className="space-y-7">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="absolute bottom-0 right-40 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System Operational
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome back, Admin
          </h1>

          <p className="mt-2 max-w-xl text-slate-400">
            Manage your organization's assets, allocations and intelligent
            insights from one centralized workspace.
          </p>

          <Link
            to="/assets"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View Assets
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Assets"
          value="2,458"
          change="+12.5%"
          icon={Package}
        />

        <StatCard
          title="Allocated Assets"
          value="1,842"
          change="+8.2%"
          icon={Users}
        />

        <StatCard
          title="Maintenance"
          value="95"
          change="+4.8%"
          icon={Wrench}
        />

        <StatCard
          title="Risk Alerts"
          value="23"
          change="+2.4%"
          icon={AlertTriangle}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Area Chart */}
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Asset Growth
              </h2>

              <p className="text-sm text-slate-500">
                Asset additions over time
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>

                <defs>
                  <linearGradient
                    id="assetGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="assets"
                  stroke="#2563eb"
                  fill="url(#assetGradient)"
                  strokeWidth={3}
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-bold">
            Asset Distribution
          </h2>

          <p className="text-sm text-slate-500">
            By category
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {categoryData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {categoryData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />

                  {item.name}
                </div>

                <span className="font-semibold">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Recent Assets */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-5">

          <div>
            <h2 className="text-lg font-bold">
              Recent Assets
            </h2>

            <p className="text-sm text-slate-500">
              Latest asset activity
            </p>
          </div>

          <Link
            to="/assets"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 text-left">
                  Asset
                </th>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Employee
                </th>

                <th className="px-5 py-4 text-left">
                  Location
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold">
                        {asset.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {asset.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {asset.category}
                  </td>

                  <td className="px-5 py-4">
                    {asset.employee}
                  </td>

                  <td className="px-5 py-4">
                    {asset.location}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        asset.status === "Assigned"
                          ? "bg-blue-50 text-blue-600"
                          : asset.status === "Available"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {asset.status}
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