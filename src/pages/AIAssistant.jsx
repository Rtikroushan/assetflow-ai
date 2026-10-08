import { useEffect } from "react";
import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAICopilot } from "../context/aiCopilotContext";

export default function AIAssistant() {
  const { openCopilot, isOpen } = useAICopilot();

  useEffect(() => {
    openCopilot();
  }, [openCopilot]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-800 bg-slate-950 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Bot size={22} />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AssetFlow AI Copilot</h1>
              <p className="text-sm text-slate-400">Live Neural RAG Engine</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            The copilot is available on every page. Use the floating assistant in
            the bottom-right corner to ask about inventory, warranties,
            allocations, and maintenance — without leaving your current workspace.
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Online · conversation persists across routes
          </div>

          <button
            type="button"
            onClick={openCopilot}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
          >
            <Sparkles size={16} />
            {isOpen ? "Copilot is open" : "Open AssetFlow AI Copilot"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
