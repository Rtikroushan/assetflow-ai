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
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Workspace",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Asset Operations",
    items: [
      {
        name: "Asset Management",
        path: "/assets",
        icon: Package,
      },
      {
        name: "Allocation",
        path: "/allocation",
        icon: Users,
      },
      {
        name: "Transfers",
        path: "/transfers",
        icon: ArrowLeftRight,
      },
      {
        name: "Maintenance",
        path: "/maintenance",
        icon: Wrench,
      },
      {
        name: "QR Verification",
        path: "/qr",
        icon: QrCode,
      },
      {
        name: "Bulk Import",
        path: "/bulk-import",
        icon: Upload,
      },
    ],
  },

  {
    title: "Intelligence",
    items: [
      {
        name: "AI Assistant",
        path: "/ai",
        icon: Bot,
      },
      {
        name: "Knowledge Base",
        path: "/knowledge",
        icon: Brain,
      },
      {
        name: "ML Intelligence",
        path: "/ml",
        icon: Sparkles,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        name: "Reports",
        path: "/reports",
        icon: FileText,
      },
      {
        name: "Audit Logs",
        path: "/audit",
        icon: ShieldCheck,
      },
      {
        name: "Users & Roles",
        path: "/users",
        icon: Users,
      },
      {
        name: "Departments",
        path: "/departments",
        icon: Building2,
      },
      {
        name: "Locations",
        path: "/locations",
        icon: MapPin,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
      fixed
      left-0
      top-0
      z-50
      hidden
      lg:flex
      h-screen
      w-72
      flex-col
      border-r
      border-slate-200
      bg-white
      "
    >

      {/* Logo */}

      <div className="px-6 py-6 border-b">

        <div className="flex items-center gap-3">

          <div
            className="
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-violet-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
            shadow-blue-500/30
            "
          >
            <Package size={22} />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              Asset<span className="text-blue-600">
                Flow
              </span>
            </h1>

            <p className="text-xs text-slate-500">
              AI Asset Intelligence
            </p>
          </div>

        </div>

      </div>

      {/* Workspace */}

      <div className="flex-1 overflow-y-auto p-4">

        {menu.map((group) => (

          <div
            key={group.title}
            className="mb-7"
          >

            <p className="
              px-3
              mb-2
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-slate-400
            ">
              {group.title}
            </p>

            <div className="space-y-1">

              {group.items.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      transition-all
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                      `
                    }
                  >

                    <Icon
                      size={18}
                      className="group-hover:scale-110 transition"
                    />

                    <span>
                      {item.name}
                    </span>

                  </NavLink>
                );

              })}

            </div>

          </div>

        ))}

      </div>

      {/* User */}

      <div className="border-t p-4">

        <div className="
          flex
          items-center
          gap-3
          rounded-xl
          bg-slate-50
          p-3
        ">

          <div className="
            h-10
            w-10
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-violet-500
            flex
            items-center
            justify-center
            text-white
            font-bold
          ">
            A
          </div>

          <div className="flex-1">

            <p className="text-sm font-semibold">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <ChevronDown size={16} />

        </div>

      </div>

    </aside>
  );
}