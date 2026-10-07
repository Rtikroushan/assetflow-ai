import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddAsset() {

  const [form, setForm] = useState({
    name: "",
    category: "",
    serial: "",
    department: "",
    location: "",
    value: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    console.log("New Asset:", form);

    alert("Asset created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-center gap-4">

        <Link
          to="/assets"
          className="
            rounded-xl
            border
            p-2.5
            hover:bg-slate-50
          "
        >
          <ArrowLeft size={18} />
        </Link>

        <div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Add New Asset
          </h1>

          <p className="
            text-slate-500
            mt-1
          ">
            Register a new organizational asset.
          </p>

        </div>

      </div>

      <form
        onSubmit={submit}
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
          space-y-6
        "
      >

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        ">

          <Input
            label="Asset Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="MacBook Pro 14"
          />

          <Input
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Laptop"
          />

          <Input
            label="Serial Number"
            name="serial"
            value={form.serial}
            onChange={handleChange}
            placeholder="SN-123456"
          />

          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Engineering"
          />

          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Delhi"
          />

          <Input
            label="Asset Value"
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder="150000"
          />

        </div>

        <div className="
          flex
          justify-end
          border-t
          pt-5
        ">

          <button
            type="submit"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-white
              hover:bg-blue-700
            "
          >

            <Save size={18} />

            Create Asset

          </button>

        </div>

      </form>

    </div>
  );
}

function Input({
  label,
  ...props
}) {

  return (
    <label className="space-y-2">

      <span className="
        text-sm
        font-medium
        text-slate-700
      ">
        {label}
      </span>

      <input
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3
          outline-none
          transition
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />

    </label>
  );
}