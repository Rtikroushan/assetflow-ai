import { MapPin, Package } from "lucide-react";

export default function Locations() {
  const locations = [
    ["Delhi", 420],
    ["Mumbai", 315],
    ["Pune", 198],
    ["Jaipur", 175],
    ["Bangalore", 140],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Locations</h1>
        <p className="mt-1 text-slate-500">
          Manage asset storage and office locations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {locations.map(([location, assets]) => (
          <div
            key={location}
            className="card-3d rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="rounded-xl bg-purple-50 p-3 w-fit text-purple-600">
              <MapPin />
            </div>

            <h2 className="mt-5 font-bold">{location}</h2>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Package size={16} />
              {assets} assets
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}