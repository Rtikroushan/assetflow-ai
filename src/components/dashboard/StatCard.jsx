import { useState, useId, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const THEMES = {
  blue: {
    name: "blue",
    gradient: "from-blue-600 to-indigo-600",
    bgLight: "bg-blue-50/80 dark:bg-blue-950/50",
    textLight: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-400/60 dark:hover:border-blue-500/50",
    shadowIcon: "shadow-blue-500/25",
    glow: "from-blue-500/15 via-indigo-500/5 to-transparent",
    stroke: "#3b82f6",
    fillStop: "#3b82f6",
    badge: "bg-blue-50 text-blue-700 border-blue-200/70 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/70",
    progress: "from-blue-600 to-indigo-500",
    pillActive: "bg-blue-600 text-white shadow-sm dark:bg-blue-500",
  },
  emerald: {
    name: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50/80 dark:bg-emerald-950/50",
    textLight: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-400/60 dark:hover:border-emerald-500/50",
    shadowIcon: "shadow-emerald-500/25",
    glow: "from-emerald-500/15 via-teal-500/5 to-transparent",
    stroke: "#10b981",
    fillStop: "#10b981",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/70",
    progress: "from-emerald-500 to-teal-500",
    pillActive: "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500",
  },
  amber: {
    name: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50/80 dark:bg-amber-950/50",
    textLight: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-400/60 dark:hover:border-amber-500/50",
    shadowIcon: "shadow-amber-500/25",
    glow: "from-amber-500/15 via-orange-500/5 to-transparent",
    stroke: "#f59e0b",
    fillStop: "#f59e0b",
    badge: "bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/70",
    progress: "from-amber-500 to-orange-500",
    pillActive: "bg-amber-600 text-white shadow-sm dark:bg-amber-500",
  },
  rose: {
    name: "rose",
    gradient: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50/80 dark:bg-rose-950/50",
    textLight: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-400/60 dark:hover:border-rose-500/50",
    shadowIcon: "shadow-rose-500/25",
    glow: "from-rose-500/15 via-red-500/5 to-transparent",
    stroke: "#f43f5e",
    fillStop: "#f43f5e",
    badge: "bg-rose-50 text-rose-700 border-rose-200/70 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/70",
    progress: "from-rose-500 to-red-500",
    pillActive: "bg-rose-600 text-white shadow-sm dark:bg-rose-500",
  },
  purple: {
    name: "purple",
    gradient: "from-purple-600 to-violet-600",
    bgLight: "bg-purple-50/80 dark:bg-purple-950/50",
    textLight: "text-purple-600 dark:text-purple-400",
    borderHover: "hover:border-purple-400/60 dark:hover:border-purple-500/50",
    shadowIcon: "shadow-purple-500/25",
    glow: "from-purple-500/15 via-violet-500/5 to-transparent",
    stroke: "#8b5cf6",
    fillStop: "#8b5cf6",
    badge: "bg-purple-50 text-purple-700 border-purple-200/70 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/70",
    progress: "from-purple-600 to-violet-500",
    pillActive: "bg-purple-600 text-white shadow-sm dark:bg-purple-500",
  },
};

/**
 * Computes smooth Bezier curve and coordinates for SVG Sparkline
 */
function buildSparkline(points, width = 200, height = 48) {
  if (!points || points.length === 0) return { path: "", area: "", coords: [] };
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const paddingY = 6;
  const usableH = height - paddingY * 2;

  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * usableH;
    return { x, y, val };
  });

  let path = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cpX = ((p0.x + p1.x) / 2).toFixed(1);
    path += ` C ${cpX} ${p0.y.toFixed(1)}, ${cpX} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  return { path, area, coords };
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  periods,
  defaultPeriod = "30D",
  progress,
  breakdown,
  link,
  statusBadge,
}) {
  const gradientId = useId();

  // Auto-detect color theme if not explicitly passed
  const themeKey = useMemo(() => {
    if (color && THEMES[color]) return color;
    const t = (title || "").toLowerCase();
    if (t.includes("alert") || t.includes("risk")) return "rose";
    if (t.includes("maint") || t.includes("repair")) return "amber";
    if (t.includes("allocat")) return "emerald";
    return "blue";
  }, [color, title]);

  const theme = THEMES[themeKey] || THEMES.blue;

  // Periods setup (working timeframe switch)
  const availablePeriods = periods ? Object.keys(periods) : [];
  const [selectedPeriod, setSelectedPeriod] = useState(
    availablePeriods.includes(defaultPeriod)
      ? defaultPeriod
      : availablePeriods[0] || null
  );

  const activeData = useMemo(() => {
    if (selectedPeriod && periods?.[selectedPeriod]) {
      return periods[selectedPeriod];
    }
    return {
      value: value || "0",
      change: change || "+0.0%",
      trend: (change || "").includes("-") ? "down" : "up",
      caption: "from last month",
      sparkline: [20, 24, 22, 28, 26, 32, 35],
    };
  }, [selectedPeriod, periods, value, change]);

  // Sparkline calculation
  const { path, area, coords } = useMemo(() => {
    const points = activeData.sparkline || [20, 25, 22, 30, 28, 35];
    return buildSparkline(points, 200, 48);
  }, [activeData.sparkline]);

  // Sparkline hover state
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const isPositive =
    activeData.trend === "up" ||
    (activeData.change && !activeData.change.includes("-"));

  const handleSparklineMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const idx = Math.round(relX * (coords.length - 1));
    setHoveredIndex(idx);
  };

  const handleSparklineMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] ${theme.borderHover} hover:shadow-[0_16px_36px_-8px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)]`}
    >
      {/* Ambient background glow effect */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${theme.glow} blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Top Header: Icon + Title + Status + Period Switcher */}
      <div>
        <div className="flex min-w-0 items-center justify-between gap-2">
          {/* Left: Icon & Badge */}
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white shadow-md ${theme.shadowIcon} transition-transform duration-300 group-hover:scale-105`}
            >
              {Icon && <Icon size={20} strokeWidth={2.2} />}
            </div>

            <div>
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {title}
                </span>

                {statusBadge && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${theme.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${theme.dot || "bg-current"} animate-pulse`} />
                    {statusBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Working Period Switcher / Link */}
          <div className="flex shrink-0 items-center gap-1.5">
            {availablePeriods.length > 0 && (
              <div className="flex shrink-0 items-center rounded-xl bg-slate-100/80 p-0.5 text-[11px] font-semibold text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
                {availablePeriods.map((periodKey) => {
                  const isActive = selectedPeriod === periodKey;
                  return (
                    <button
                      key={periodKey}
                      type="button"
                      onClick={() => setSelectedPeriod(periodKey)}
                      className={`rounded-lg px-2 py-1 transition-all duration-150 ${
                        isActive
                          ? `${theme.pillActive}`
                          : "hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {periodKey}
                    </button>
                  );
                })}
              </div>
            )}

            {link && (
              <Link
                to={link}
                aria-label={`Open details for ${title}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Primary Value & Trend */}
        <div className="mt-4 flex items-baseline justify-between">
          <motion.h3
            key={activeData.value}
            initial={{ opacity: 0.6, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            {activeData.value}
          </motion.h3>

          {/* Trend Pill */}
          <div className="flex items-center">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                isPositive
                  ? "border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300"
                  : "border-rose-200/70 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300"
              }`}
            >
              {isPositive ? (
                <TrendingUp size={13} strokeWidth={2.5} />
              ) : (
                <TrendingDown size={13} strokeWidth={2.5} />
              )}
              {activeData.change}
            </span>
          </div>
        </div>

        {/* Context Caption */}
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {activeData.caption || "vs previous period"}
        </p>

        {/* Interactive Working Sparkline Chart */}
        <div className="relative mt-4">
          <div
            className="group/chart relative h-12 w-full cursor-crosshair"
            onMouseMove={handleSparklineMouseMove}
            onMouseLeave={handleSparklineMouseLeave}
          >
            <svg
              viewBox="0 0 200 48"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={theme.fillStop}
                    stopOpacity="0.32"
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.fillStop}
                    stopOpacity="0.00"
                  />
                </linearGradient>
              </defs>

              {/* Area gradient under curve */}
              {area && <path d={area} fill={`url(#${gradientId})`} />}

              {/* Sparkline curve */}
              {path && (
                <path
                  d={path}
                  fill="none"
                  stroke={theme.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Scrubber Point on Hover */}
              {hoveredIndex !== null && coords[hoveredIndex] && (
                <g>
                  {/* Vertical guide line */}
                  <line
                    x1={coords[hoveredIndex].x}
                    y1="0"
                    x2={coords[hoveredIndex].x}
                    y2="48"
                    stroke={theme.stroke}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.6"
                  />
                  {/* Outer glow ring */}
                  <circle
                    cx={coords[hoveredIndex].x}
                    cy={coords[hoveredIndex].y}
                    r="5"
                    fill={theme.stroke}
                    opacity="0.3"
                  />
                  {/* Core dot */}
                  <circle
                    cx={coords[hoveredIndex].x}
                    cy={coords[hoveredIndex].y}
                    r="3"
                    fill="#ffffff"
                    stroke={theme.stroke}
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Hover Tooltip Value Badge */}
            {hoveredIndex !== null && coords[hoveredIndex] && (
              <div
                className="pointer-events-none absolute -top-7 rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg transition-transform dark:bg-white dark:text-slate-900"
                style={{
                  left: `${(coords[hoveredIndex].x / 200) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {coords[hoveredIndex].val.toLocaleString()}
              </div>
            )}
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span>Period start</span>
            <span className="font-medium text-slate-500 dark:text-slate-400">
              {hoveredIndex !== null
                ? `Value: ${coords[hoveredIndex]?.val.toLocaleString()}`
                : "Hover graph to inspect"}
            </span>
            <span>Latest</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Progress Bar / Breakdown */}
      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        {progress && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500 dark:text-slate-400">{progress.label}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {progress.value}%
              </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progress.value))}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${theme.progress}`}
              />
            </div>
          </div>
        )}

        {/* Breakdown Accordion Toggle */}
        {breakdown && breakdown.length > 0 && (
          <div className="mt-2.5">
            <button
              type="button"
              onClick={() => setShowBreakdown((prev) => !prev)}
              className="flex w-full items-center justify-between text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
            >
              <span className="flex items-center gap-1">
                <Sparkles size={12} className={theme.textLight} />
                Category Breakdown
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  showBreakdown ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1.5 rounded-xl bg-slate-50/80 p-2.5 text-xs dark:bg-slate-800/60">
                    {breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-slate-600 dark:text-slate-300"
                      >
                        <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
