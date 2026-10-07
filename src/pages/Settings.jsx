import { Save, Settings as SettingsIcon, Bell, Shield } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("AssetFlow Organization");
  const [email, setEmail] = useState("admin@assetflow.ai");
  const [notifications, setNotifications] = useState(true);

  const saveSettings = () => {
    alert("Settings saved successfully");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-slate-500">
          Configure your AssetFlow workspace.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <SettingsIcon className="text-blue-600" />
          <h2 className="text-xl font-bold">Organization Settings</h2>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Organization Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Admin Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex gap-3">
              <Bell />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-slate-500">
                  Receive asset activity notifications.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="flex gap-3 rounded-xl bg-blue-50 p-4 text-blue-700">
            <Shield size={20} />
            <p className="text-sm">
              Security settings and role-based access can be connected to
              your backend later.
            </p>
          </div>

          <button
            onClick={saveSettings}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}