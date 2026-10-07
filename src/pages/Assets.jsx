import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Package,
} from "lucide-react";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { assets } from "../data/mockData";

export default function Assets() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredAssets = useMemo(() => {

    return assets.filter((asset) => {

      const matchesSearch =
        asset.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        asset.id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        asset.status === status;

      return matchesSearch && matchesStatus;

    });

  }, [search, status]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Asset Management
          </h1>

          <p className="
            text-slate-500
            mt-1
          ">
            Manage and track all organizational assets.
          </p>

        </div>

        <Link
          to="/assets/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-500/20
            hover:bg-blue-700
            transition
          "
        >

          <Plus size={18} />

          Add Asset

        </Link>

      </div>

      {/* Toolbar */}

      <div className="
        rounded-2xl
        border
        bg-white
        p-4
        shadow-sm
        flex
        flex-col
        lg:flex-row
        gap-3
      ">

        <div className="
          flex
          flex-1
          items-center
          gap-3
          rounded-xl
          bg-slate-50
          px-4
          py-3
        ">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search asset..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-sm
            "
          />

        </div>

        <div className="
          flex
          items-center
          gap-2
        ">

          <Filter
            size={17}
            className="text-slate-400"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              rounded-xl
              border
              px-4
              py-3
              text-sm
              outline-none
            "
          >

            <option>All</option>
            <option>Assigned</option>
            <option>Available</option>
            <option>Maintenance</option>

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
      ">

        <div className="
          flex
          items-center
          justify-between
          border-b
          p-5
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              rounded-xl
              bg-blue-50
              p-2.5
              text-blue-600
            ">
              <Package size={20} />
            </div>

            <div>

              <h2 className="font-semibold">
                All Assets
              </h2>

              <p className="
                text-xs
                text-slate-400
              ">
                {filteredAssets.length} assets found
              </p>

            </div>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="
              bg-slate-50
              text-slate-500
            ">

              <tr>

                <th className="px-5 py-4 text-left">
                  Asset
                </th>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Assigned To
                </th>

                <th className="px-5 py-4 text-left">
                  Department
                </th>

                <th className="px-5 py-4 text-left">
                  Location
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4">
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredAssets.map(
                (asset) => (

                  <tr
                    key={asset.id}
                    className="
                      border-t
                      hover:bg-slate-50
                      transition
                    "
                  >

                    <td className="px-5 py-4">

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <div className="
                          h-10
                          w-10
                          rounded-xl
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-500
                        ">

                          <Package size={18} />

                        </div>

                        <div>

                          <p className="font-semibold">
                            {asset.name}
                          </p>

                          <p className="
                            text-xs
                            text-slate-400
                          ">
                            {asset.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">
                      {asset.category}
                    </td>

                    <td className="px-5 py-4">
                      {asset.employee}
                    </td>

                    <td className="px-5 py-4">
                      {asset.department}
                    </td>

                    <td className="px-5 py-4">
                      {asset.location}
                    </td>

                    <td className="px-5 py-4">

                      <span className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${
                          asset.status === "Assigned"
                            ? "bg-blue-50 text-blue-600"
                            : asset.status === "Available"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }
                      `}>
                        {asset.status}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <button className="
                        rounded-lg
                        p-2
                        hover:bg-slate-100
                      ">

                        <MoreHorizontal size={18} />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}