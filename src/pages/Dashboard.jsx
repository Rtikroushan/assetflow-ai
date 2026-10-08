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
import { useTheme } from "../context/themeContext";
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
  const { isDark } = useTheme();

  return (
    <div className="space-y-7">
      {/* Dashboard Heading */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Dashboard Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time asset operations, allocations & ML-powered monitoring
          </p>
        </div>
      </div>

      {/* Premium Hero — AssetFlow workspace visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-theme group relative min-h-[272px] overflow-hidden rounded-[28px] border border-violet-500/35 bg-[#050812] text-white shadow-[0_24px_70px_rgba(15,23,42,0.20)] dark:border-violet-500/40 dark:shadow-[0_28px_80px_rgba(0,0,0,0.42)]"
      >
        <img
          src="/assetflow-dashboard-hero.png"
          alt="AssetFlow AI workspace with laptops, desktops, accessories and servers"
          className="hero-art absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.012]"
        />

        {/* Keep the reference artwork visible while protecting text readability. */}
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-accent absolute inset-y-0 left-0 w-[48%]" />

        <div className="relative z-10 flex min-h-[272px] max-w-3xl flex-col justify-center px-7 py-8 sm:px-8 lg:px-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3.5 py-2 text-xs font-medium text-slate-100 shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)] animate-pulse" />
            System Operational
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Welcome back, <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Admin</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Manage your organization's assets, allocations and intelligent insights
            from one centralized workspace.
          </p>

          <Link
            to="/assets"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-violet-400/50 bg-gradient-to-r from-violet-600/80 to-indigo-600/75 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.28)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:from-violet-500 hover:to-indigo-500"
          >
            View Assets
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="dashboard-stats-grid grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Assets"
          icon={Package}
          color="blue"
          statusBadge="Live Sync"
          link="/assets"
          progress={{ label: "Inventory Active", value: 88.5 }}
          breakdown={[
            { label: "Laptops & Desktops", value: "1,240" },
            { label: "Mobile & Tablets", value: "614" },
            { label: "Monitors & AV", value: "442" },
            { label: "Peripherals & IoT", value: "162" },
          ]}
          periods={{
            "7D": {
              value: "2,458",
              change: "+2.4%",
              trend: "up",
              caption: "+58 added this week",
              sparkline: [2400, 2412, 2420, 2435, 2442, 2450, 2458],
            },
            "30D": {
              value: "2,458",
              change: "+12.5%",
              trend: "up",
              caption: "vs last month (2,185)",
              sparkline: [2185, 2220, 2280, 2330, 2390, 2425, 2458],
            },
            "90D": {
              value: "2,458",
              change: "+28.3%",
              trend: "up",
              caption: "+542 assets since Q3",
              sparkline: [1916, 2010, 2120, 2240, 2330, 2410, 2458],
            },
          }}
        />

        <StatCard
          title="Allocated Assets"
          icon={Users}
          color="emerald"
          statusBadge="Optimal"
          link="/allocation"
          progress={{ label: "Utilization Rate", value: 74.9 }}
          breakdown={[
            { label: "Engineering", value: "892" },
            { label: "Product & Design", value: "385" },
            { label: "Sales & Marketing", value: "320" },
            { label: "Operations & HR", value: "245" },
          ]}
          periods={{
            "7D": {
              value: "1,842",
              change: "+1.8%",
              trend: "up",
              caption: "+32 assigned this week",
              sparkline: [1810, 1818, 1822, 1829, 1835, 1838, 1842],
            },
            "30D": {
              value: "1,842",
              change: "+8.2%",
              trend: "up",
              caption: "vs last month (1,702)",
              sparkline: [1702, 1720, 1748, 1780, 1810, 1828, 1842],
            },
            "90D": {
              value: "1,842",
              change: "+19.4%",
              trend: "up",
              caption: "+300 assigned since Q3",
              sparkline: [1542, 1600, 1670, 1720, 1780, 1820, 1842],
            },
          }}
        />

        <StatCard
          title="Maintenance"
          icon={Wrench}
          color="amber"
          statusBadge="In Service"
          link="/maintenance"
          progress={{ label: "SLA Resolution Rate", value: 91.2 }}
          breakdown={[
            { label: "Scheduled Servicing", value: "58" },
            { label: "Hardware Repairs", value: "24" },
            { label: "Pending Vendor Parts", value: "13" },
          ]}
          periods={{
            "7D": {
              value: "95",
              change: "-8.6%",
              trend: "down",
              caption: "-9 tickets closed this week",
              sparkline: [104, 102, 99, 98, 96, 97, 95],
            },
            "30D": {
              value: "95",
              change: "+4.8%",
              trend: "up",
              caption: "avg turnaround 1.6 days",
              sparkline: [88, 92, 95, 91, 94, 98, 95],
            },
            "90D": {
              value: "95",
              change: "-14.2%",
              trend: "down",
              caption: "backlog reduced from 111",
              sparkline: [111, 108, 104, 99, 96, 98, 95],
            },
          }}
        />

        <StatCard
          title="Risk Alerts"
          icon={AlertTriangle}
          color="rose"
          statusBadge="Attention"
          link="/audit"
          progress={{ label: "Mitigation Rate", value: 82.6 }}
          breakdown={[
            { label: "Warranty Expiring (<30d)", value: "11" },
            { label: "Unallocated (>60d)", value: "7" },
            { label: "Pending Audit Verification", value: "5" },
          ]}
          periods={{
            "7D": {
              value: "23",
              change: "-28.1%",
              trend: "down",
              caption: "-9 alerts resolved",
              sparkline: [32, 29, 28, 26, 25, 24, 23],
            },
            "30D": {
              value: "23",
              change: "-14.8%",
              trend: "down",
              caption: "down from 27 last month",
              sparkline: [27, 29, 31, 28, 26, 25, 23],
            },
            "90D": {
              value: "23",
              change: "-41.0%",
              trend: "down",
              caption: "39 high risks mitigated",
              sparkline: [39, 36, 33, 29, 27, 25, 23],
            },
          }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Area Chart */}
        <div className="xl:col-span-2 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Asset Growth
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Asset additions over time
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
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
                  stroke={isDark ? "#1e293b" : "#e2e8f0"}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  stroke={isDark ? "#64748b" : "#94a3b8"}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  stroke={isDark ? "#64748b" : "#94a3b8"}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                    borderRadius: "0.75rem",
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                />

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
        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Asset Distribution
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
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

                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                    borderRadius: "0.75rem",
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {categoryData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />
                  {item.name}
                </div>

                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Assets */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Assets
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Latest asset activity
            </p>
          </div>

          <Link
            to="/assets"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Asset</th>
                <th className="px-5 py-4 text-left font-semibold">Category</th>
                <th className="px-5 py-4 text-left font-semibold">Employee</th>
                <th className="px-5 py-4 text-left font-semibold">Location</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-t border-slate-200/80 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {asset.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {asset.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {asset.category}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {asset.employee}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {asset.location}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        asset.status === "Assigned"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                          : asset.status === "Available"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300"
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