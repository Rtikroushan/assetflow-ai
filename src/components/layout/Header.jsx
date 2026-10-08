import { useState, useRef, useEffect } from "react";
import { Search, Bell, Command, CheckCheck, AlertCircle, Wrench, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";

const mockNotifications = [
  {
    id: 1,
    title: "Maintenance Scheduled",
    description: "HP LaserJet (AST-1004) scheduled for routine service.",
    time: "10m ago",
    icon: Wrench,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60",
    unread: true,
  },
  {
    id: 2,
    title: "Warranty Expiring Soon",
    description: "iPhone 15 Pro (AST-1005) warranty expires in 14 days.",
    time: "1h ago",
    icon: AlertCircle,
    color: "text-rose-500 bg-rose-50 dark:bg-rose-950/60",
    unread: true,
  },
  {
    id: 3,
    title: "Asset Allocation Approved",
    description: "MacBook Pro 14 assigned to Rahul Sharma.",
    time: "3h ago",
    icon: Package,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60",
    unread: false,
  },
];

export default function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="premium-header sticky top-0 z-40 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Search */}
        <div className="hidden md:flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/80">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search assets, users, locations..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none dark:text-slate-100 dark:placeholder-slate-500"
          />

          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            <Command size={12} />
            <span>K</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2.5 sm:gap-4">

          {/* Theme Switch - placed right by the side of the notification */}
          <div className="flex items-center">
            <ThemeToggle variant="compact" />
          </div>

          {/* Notification Button & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen((prev) => !prev)}
              aria-label="View notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400">
                          {unreadCount} new
                        </span>
                      )}
                    </div>

                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        <CheckCheck size={14} />
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    {notifications.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 rounded-xl p-2.5 transition ${
                            item.unread
                              ? "bg-slate-50 dark:bg-slate-800/60"
                              : "hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                          }`}
                        >
                          <div className={`mt-0.5 rounded-lg p-2 ${item.color}`}>
                            <Icon size={16} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                {item.title}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                {item.time}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-400/30 bg-slate-950 shadow-[0_6px_20px_rgba(124,58,237,0.22)] ring-1 ring-inset ring-white/10 dark:bg-black">
              <img
                src="/assetflow-mark.png"
                alt="AssetFlow AI"
                className="admin-brand-mark h-[30px] w-[30px] object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Admin
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Super Admin
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
