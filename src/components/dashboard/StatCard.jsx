import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Icon size={22} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600">
        <ArrowUpRight size={16} />
        {change}
        <span className="text-slate-400">
          from last month
        </span>
      </div>
    </motion.div>
  );
}  

