import { useState } from "react";
import {
  Brain,
  AlertTriangle,
  Wrench,
  PackageSearch,
  Sparkles,
  Play,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialAnomalies = [
  {
    id: "ANM-01",
    asset: "MacBook Pro 16 (AST-1009)",
    risk: "High",
    confidence: "94.2%",
    pattern: "Abnormal temperature telemetry spike (94°C) under low CPU load",
    action: "Schedule Thermal Diagnostics",
  },
  {
    id: "ANM-02",
    asset: "Dell XPS 15 (AST-1002)",
    risk: "Medium",
    confidence: "88.6%",
    pattern: "Rapid consecutive transfers (Delhi -> Mumbai -> Pune in 7 days)",
    action: "Audit Custody Verification",
  },
  {
    id: "ANM-03",
    asset: "iPhone 15 Pro (AST-1005)",
    risk: "High",
    confidence: "91.8%",
    pattern: "Battery degradation curve accelerated 3.4x faster than fleet benchmark",
    action: "Warranty Service Claim",
  },
  {
    id: "ANM-04",
    asset: "HP LaserJet (AST-1004)",
    risk: "Low",
    confidence: "76.4%",
    pattern: "Print fuser failure predicted within next 120 operating hours",
    action: "Pre-order Maintenance Roller",
  },
];

export default function MLIntelligence() {
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [isInferring, setIsInferring] = useState(false);
  const [sensitivity, setSensitivity] = useState(85);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const runInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
      showToast("Model inference finished: 4 operational risk patterns evaluated.");
    }, 1200);
  };

  const handleDismiss = (id) => {
    setAnomalies(anomalies.filter((a) => a.id !== id));
    showToast(`Anomaly ${id} dismissed.`);
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
            ML Predictive Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Automated anomaly detection, predictive failure models, and fleet utilization analytics.
          </p>
        </div>

        <button
          type="button"
          onClick={runInference}
          disabled={isInferring}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
        >
          {isInferring ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Sparkles size={16} />
            </motion.div>
          ) : (
            <Play size={16} />
          )}
          {isInferring ? "Computing Telemetry..." : "Run ML Diagnostics"}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-900/30 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <Brain size={32} className="text-blue-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Asset Telemetry Neural Model
                </h2>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                  Model v3.8 Active
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Continuous Bayesian inference on hardware wear-and-tear, thermal loads, and location variance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
            <Sliders size={18} className="text-slate-400" />
            <div className="text-xs">
              <span className="text-slate-400">Sensitivity:</span>{" "}
              <span className="font-bold text-white">{sensitivity}%</span>
              <input
                type="range"
                min="60"
                max="95"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="block mt-1 w-28 accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertTriangle size={22} />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Transfer Anomalies
          </p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            1 Detected
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Flagged 1 unusual relocation frequency between Mumbai and Pune.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <Wrench size={22} />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Predicted Failures
          </p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            2 Hardware Units
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Thermal threshold exceeded in AST-1009 and battery degradation in AST-1005.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <PackageSearch size={22} />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Underutilized Devices
          </p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            14 Idle Terminals
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Hardware units inactive in storage for &gt;45 days without custody.
          </p>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShieldAlert size={20} className="text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Live Anomaly Queue
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Actionable machine learning findings requiring IT triage
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {anomalies.length} Findings
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {anomalies.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      item.risk === "High"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                        : item.risk === "Medium"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    }`}
                  >
                    {item.risk} Risk · {item.confidence}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.asset}
                  </p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.pattern}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast(`Initiated: ${item.action}`)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
                >
                  {item.action}
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDismiss(item.id)}
                  className="rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}