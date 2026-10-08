import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Wrench,
  QrCode,
  Upload,
  Bot,
  Brain,
  FileText,
  ShieldCheck,
  Users,
  Building2,
  MapPin,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Workspace",
    items: [{ name: "Dashboard", path: "/", icon: LayoutDashboard }],
  },
  {
    title: "Asset Operations",
    items: [
      { name: "Asset Management", path: "/assets", icon: Package },
      { name: "Allocation", path: "/allocation", icon: Users },
      { name: "Transfers", path: "/transfers", icon: ArrowLeftRight },
      { name: "Maintenance", path: "/maintenance", icon: Wrench },
      { name: "QR Verification", path: "/qr", icon: QrCode },
      { name: "Bulk Import", path: "/bulk-import", icon: Upload },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { name: "AI Assistant", path: "/ai", icon: Bot },
      { name: "Knowledge Base", path: "/knowledge", icon: Brain },
      { name: "ML Intelligence", path: "/ml", icon: Sparkles },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "Reports", path: "/reports", icon: FileText },
      { name: "Audit Logs", path: "/audit", icon: ShieldCheck },
      { name: "Users & Roles", path: "/users", icon: Users },
      { name: "Departments", path: "/departments", icon: Building2 },
      { name: "Locations", path: "/locations", icon: MapPin },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`premium-sidebar fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-slate-200/80 bg-white/95 text-slate-900 shadow-[12px_0_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-[width,background-color,border-color,color] duration-300 ease-out dark:border-white/[0.07] dark:bg-[#08090c]/95 dark:text-slate-100 dark:shadow-[12px_0_40px_rgba(0,0,0,0.28)] lg:flex ${
        collapsed ? "w-[82px]" : "w-[272px]"
      }`}
    >
      {/* Brand / logo is also the sidebar collapse control. */}
      <div
        className={`border-b border-slate-200/80 dark:border-white/[0.07] ${
          collapsed ? "px-3 py-4" : "px-4 py-4"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
          title={collapsed ? "Show sidebar" : "Hide sidebar"}
          className={`group relative flex w-full items-center rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.035] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100/90 ring-1 ring-inset ring-violet-500/20 shadow-[0_0_24px_rgba(124,58,237,0.12)] dark:bg-white/[0.035] dark:ring-violet-400/20 dark:shadow-[0_0_28px_rgba(124,58,237,0.16)]">
            <img
              src="/assetflow-mark.png"
              alt="AssetFlow AI"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)] dark:border-[#08090c]" />
          </span>

          {!collapsed && (
            <span className="min-w-0 text-left">
              <span className="block text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
                Asset<span className="text-violet-500 dark:text-violet-400">Flow AI</span>
              </span>
              <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.23em] text-slate-500 dark:text-slate-500">
                Asset Intelligence
              </span>
              <span className="mt-1.5 block text-[8px] font-medium uppercase tracking-[0.16em] text-violet-500/70 dark:text-violet-300/60">
                Click logo to collapse
              </span>
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] dark:[scrollbar-color:#30323a_transparent]">
        <div className="space-y-3">
          {menu.map((group) => (
            <section
              key={group.title}
              className={`rounded-2xl border border-slate-200/75 bg-slate-50/55 p-2 shadow-[0_5px_18px_rgba(15,23,42,0.025)] transition-all duration-200 dark:border-white/[0.055] dark:bg-white/[0.012] dark:shadow-none ${
                collapsed ? "border-transparent bg-transparent p-0 shadow-none" : ""
              }`}
            >
              {!collapsed && (
                <p className="px-2.5 pb-1.5 pt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {group.title}
                </p>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      title={collapsed ? item.name : undefined}
                      className={({ isActive }) =>
                        `group relative flex items-center rounded-xl py-2.5 text-[13px] font-medium transition-all duration-200 ${
                          collapsed ? "justify-center px-0" : "gap-3 px-3"
                        } ${
                          isActive
                            ? "bg-violet-500/10 text-violet-600 ring-1 ring-inset ring-violet-500/25 shadow-[0_6px_22px_rgba(124,58,237,0.08)] dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30"
                            : "text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.045] dark:hover:text-slate-100"
                        }`
                      }
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                      />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
