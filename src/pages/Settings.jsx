// import { Save, Settings as SettingsIcon, Bell, Shield } from "lucide-react";
// import { useState } from "react";

// export default function Settings() {
//   const [name, setName] = useState("AssetFlow Organization");
//   const [email, setEmail] = useState("admin@assetflow.ai");
//   const [notifications, setNotifications] = useState(true);

//   const saveSettings = () => {
//     alert("Settings saved successfully");
//   };

//   return (
//     <div className="max-w-4xl space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Settings</h1>
//         <p className="mt-1 text-slate-500">
//           Configure your AssetFlow workspace.
//         </p>
//       </div>

//       <div className="rounded-2xl border bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-3">
//           <SettingsIcon className="text-blue-600" />
//           <h2 className="text-xl font-bold">Organization Settings</h2>
//         </div>

//         <div className="mt-6 space-y-5">
//           <div>
//             <label className="text-sm font-medium">Organization Name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Admin Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//             />
//           </div>

//           <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
//             <div className="flex gap-3">
//               <Bell />
//               <div>
//                 <p className="font-medium">Notifications</p>
//                 <p className="text-sm text-slate-500">
//                   Receive asset activity notifications.
//                 </p>
//               </div>
//             </div>

//             <input
//               type="checkbox"
//               checked={notifications}
//               onChange={(e) => setNotifications(e.target.checked)}
//               className="h-5 w-5"
//             />
//           </div>

//           <div className="flex gap-3 rounded-xl bg-blue-50 p-4 text-blue-700">
//             <Shield size={20} />
//             <p className="text-sm">
//               Security settings and role-based access can be connected to
//               your backend later.
//             </p>
//           </div>

//           <button
//             onClick={saveSettings}
//             className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
//           >
//             <Save size={18} />
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  Save,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Building2,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [name, setName] = useState("AssetFlow Organization");
  const [email, setEmail] = useState("admin@assetflow.ai");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-full bg-slate-50 p-1 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <SettingsIcon size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Settings
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Configure and manage your AssetFlow workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Main Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
        >
          {/* Card Header */}
          <div className="border-b border-slate-200 bg-slate-950 p-5 text-white dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
                <SettingsIcon size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Organization Settings
                </h2>

                <p className="text-xs text-slate-400">
                  Manage your organization information and preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6 p-6 sm:p-8">
            {/* Organization Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Building2 size={16} className="text-blue-500" />
                Organization Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                placeholder="Enter organization name"
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Mail size={16} className="text-blue-500" />
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                placeholder="Enter admin email"
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition dark:border-slate-800 dark:bg-slate-800/60">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Bell size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Receive asset activity notifications.
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`relative h-7 w-12 rounded-full transition ${
                  notifications
                    ? "bg-blue-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Security Information */}
            <div className="rounded-2xl border border-blue-200/50 bg-blue-50 p-5 dark:border-blue-900/40 dark:bg-blue-950/30">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Shield size={20} />
                </div>

                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-300">
                    Security & Access Control
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-blue-700 dark:text-blue-400">
                    Security settings and role-based access control can be
                    connected to your backend. Admins will be able to manage
                    permissions, users, and organization access.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {saved && (
                  <>
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500"
                    />
                    <span className="text-sm font-medium text-emerald-500">
                      Settings saved successfully
                    </span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <Save size={18} />
                Save Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Status */}
        <div className="flex items-center justify-center gap-2 pb-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          AssetFlow workspace is active
        </div>
      </div>
    </div>
  );
}

