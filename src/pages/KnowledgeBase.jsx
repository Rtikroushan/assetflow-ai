import {
  BookOpen,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");

  const documents = [
    {
      title: "Asset Management Policy",
      type: "Policy",
      description: "Rules for managing company assets.",
    },
    {
      title: "Laptop Usage Manual",
      type: "Manual",
      description: "Guidelines for company laptops.",
    },
    {
      title: "Asset Transfer SOP",
      type: "SOP",
      description: "Standard process for transferring assets.",
    },
    {
      title: "Asset FAQ",
      type: "FAQ",
      description: "Frequently asked asset management questions.",
    },
  ];

  const filtered = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="mt-1 text-slate-500">
          Policies, manuals, SOPs and FAQs.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
        <Search size={19} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search knowledge base..."
          className="flex-1 outline-none"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((doc) => (
          <div
            key={doc.title}
            className="card-3d rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <FileText size={23} />
              </div>

              <div>
                <h2 className="font-bold">{doc.title}</h2>
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs">
                  {doc.type}
                </span>

                <p className="mt-3 text-sm text-slate-500">
                  {doc.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-950 p-6 text-white">
        <div className="flex items-center gap-3">
          <BookOpen />
          <h2 className="font-bold">RAG Knowledge System</h2>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Documents can later be connected to your RAG pipeline so AssetFlow
          AI can answer questions using company-specific information.
        </p>
      </div>
    </div>
  );
}