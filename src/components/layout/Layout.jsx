import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AICopilot from "./AICopilot";
import { AICopilotProvider } from "../../context/AICopilotProvider";

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AICopilotProvider>
      <div className="app-shell min-h-screen bg-[#f5f7fb] text-slate-900 transition-colors duration-300 dark:bg-[#08090c] dark:text-slate-100">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((value) => !value)}
        />

        <div
          className={`app-content relative min-w-0 overflow-x-hidden transition-[margin] duration-300 ease-out ${
            sidebarCollapsed ? "lg:ml-[82px]" : "lg:ml-[272px]"
          }`}
        >
          <Header />
          <main className="premium-ui premium-main min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>

        <AICopilot />
      </div>
    </AICopilotProvider>
  );
}
