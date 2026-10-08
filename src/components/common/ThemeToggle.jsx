import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/themeContext";

export default function ThemeToggle({ variant = "compact", className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`theme-toggle-one relative flex h-11 w-[88px] items-center overflow-hidden rounded-full border px-1.5 shadow-sm backdrop-blur-xl transition-all duration-500 ${
        isDark
          ? "border-violet-400/20 bg-slate-900/90 text-slate-100 shadow-[0_8px_28px_rgba(76,29,149,0.18)]"
          : "border-slate-200 bg-white/90 text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
      } ${className}`}
    >
      <motion.span
        className="absolute top-1 h-8 w-8 rounded-full"
        animate={{ left: isDark ? "calc(100% - 36px)" : "6px" }}
        transition={{ type: "spring", stiffness: 170, damping: 20, mass: 0.8 }}
        style={{
          background: isDark
            ? "linear-gradient(135deg,#312e81,#7c3aed)"
            : "linear-gradient(135deg,#fef3c7,#f59e0b)",
          boxShadow: isDark
            ? "0 0 18px rgba(139,92,246,.30)"
            : "0 0 18px rgba(245,158,11,.22)",
        }}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-1.5">
        <Sun size={15} className={isDark ? "text-slate-500" : "text-white drop-shadow-sm"} />
        <Moon size={15} className={isDark ? "text-white drop-shadow-sm" : "text-slate-400"} />
      </span>
    </motion.button>
  );
}
