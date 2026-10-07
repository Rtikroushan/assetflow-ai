import { Building2, Users } from "lucide-react";

export default function Departments() {
  const departments = [
    ["Engineering", 42],
    ["Design", 18],
    ["IT", 25],
    ["Sales", 31],
    ["HR", 12],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Departments</h1>
        <p className="mt-1 text-slate-500">
          Manage organizational departments.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {departments.map(([name, count]) => (
          <div
            key={name}
            className="card-3d rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Building2 />
              </div>

              <span className="text-sm text-slate-400">
                <Users size={15} className="inline" /> {count}
              </span>
            </div>

            <h2 className="mt-5 font-bold">{name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {count} employees
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}