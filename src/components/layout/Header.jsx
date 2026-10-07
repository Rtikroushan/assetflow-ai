import { Search, Bell, Command } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Search */}
        <div className="hidden md:flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search assets, users, locations..."
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <div className="flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-1 text-xs text-slate-400">
            <Command size={12} />
            <span>K</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 hover:bg-slate-100"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Profile */}
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
