import { useState } from "react";
import {
  QrCode,
  Search,
  CheckCircle2,
  Camera,
  ShieldCheck,
  MapPin,
  Calendar,
  Laptop,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sampleAssets = {
  "AST-1001": {
    id: "AST-1001",
    name: "MacBook Pro 14 (M3 Pro)",
    category: "Laptop",
    serial: "C02G412NMD6T",
    employee: "Rahul Sharma",
    department: "Engineering",
    location: "Delhi Hub - Desk 42",
    status: "Assigned",
    health: "98% (Optimal)",
    lastVerified: "20 Sep 2026",
  },
  "AST-1002": {
    id: "AST-1002",
    name: "Dell XPS 15 OLED",
    category: "Laptop",
    serial: "DLX-8829-19B",
    employee: "Priya Singh",
    department: "Design",
    location: "Mumbai HQ - Studio 3",
    status: "Assigned",
    health: "92% (Normal)",
    lastVerified: "15 Sep 2026",
  },
  "AST-1004": {
    id: "AST-1004",
    name: "HP LaserJet Enterprise 500",
    category: "Printer",
    serial: "HPL-99120-X",
    employee: "IT Facility",
    department: "IT Infrastructure",
    location: "Delhi Hub - Floor 2 Copier Room",
    status: "Maintenance",
    health: "64% (Service Required)",
    lastVerified: "01 Sep 2026",
  },
};

export default function QRVerification() {
  const [assetId, setAssetId] = useState("AST-1001");
  const [isScanning, setIsScanning] = useState(false);
  const [verifiedAsset, setVerifiedAsset] = useState(null);
  const [auditedSuccess, setAuditedSuccess] = useState(false);

  const handleVerify = (idToVerify) => {
    const target = idToVerify || assetId;
    if (!target.trim()) return;

    setIsScanning(true);
    setVerifiedAsset(null);
    setAuditedSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      const found =
        sampleAssets[target.toUpperCase()] || {
          id: target.toUpperCase(),
          name: "Enterprise Hardware Device",
          category: "Hardware",
          serial: "GEN-SN-" + Math.floor(100000 + Math.random() * 900000),
          employee: "Verified Custodian",
          department: "Operations",
          location: "Central Asset Warehouse",
          status: "Available",
          health: "95% (Good)",
          lastVerified: "Today",
        };
      setVerifiedAsset(found);
    }, 800);
  };

  const handleMarkAudited = () => {
    setAuditedSuccess(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          QR Audit & Field Verification
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Scan QR barcode stamps or enter asset tags for instant physical inventory verification.
        </p>
      </div>

      {/* Scanner Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Scanner Simulation Window */}
          <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/70">
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-8 rounded-xl border-2 border-blue-500/50">
              <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-blue-500" />
              <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-blue-500" />
              <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-blue-500" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-blue-500" />
            </div>

            {/* Scanning beam animation */}
            {isScanning && (
              <motion.div
                initial={{ top: "15%" }}
                animate={{ top: "85%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="absolute left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_12px_#3b82f6]"
              />
            )}

            <div className="relative z-10 flex flex-col items-center p-4 text-center">
              <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <QrCode size={48} />
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isScanning ? "Decoding QR Data Matrix..." : "Position QR Code within bounds"}
              </p>
            </div>
          </div>

          {/* Input & Quick Presets */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Scan or Manual Tag Lookup
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Enter asset tag number or simulate QR camera reading
              </p>

              <div className="mt-4 flex gap-2">
                <input
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  placeholder="AST-1001"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm uppercase text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => handleVerify()}
                  disabled={isScanning}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isScanning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Camera size={18} />
                    </motion.div>
                  ) : (
                    <>
                      <Search size={18} />
                      Verify
                    </>
                  )}
                </button>
              </div>

              {/* Sample QR Tags */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Sample Tag Stubs:
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(sampleAssets).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setAssetId(id);
                        handleVerify(id);
                      }}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/60 dark:hover:text-blue-300"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/40">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 text-blue-600 dark:text-blue-400" size={18} />
                <p className="text-xs text-blue-900 dark:text-blue-300">
                  Field verification tags cryptographically validate current location and record physical custody timestamp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Asset Result Card */}
      <AnimatePresence>
        {verifiedAsset && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-md dark:border-emerald-900/50 dark:bg-slate-900/90"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {verifiedAsset.name}
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Verified Match
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    Tag ID: {verifiedAsset.id} · Serial: {verifiedAsset.serial}
                  </p>
                </div>
              </div>

              {!auditedSuccess ? (
                <button
                  type="button"
                  onClick={handleMarkAudited}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <Check size={16} />
                  Stamp Physical Audit
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 size={16} />
                  Audited Today by Admin
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <span className="text-xs text-slate-400 dark:text-slate-500">Current Custodian</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {verifiedAsset.employee}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <span className="text-xs text-slate-400 dark:text-slate-500">Department</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {verifiedAsset.department}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <span className="text-xs text-slate-400 dark:text-slate-500">Physical Location</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {verifiedAsset.location}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <span className="text-xs text-slate-400 dark:text-slate-500">Hardware Health</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {verifiedAsset.health}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}