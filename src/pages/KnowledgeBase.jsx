import { useState, useMemo } from "react";
import {
  BookOpen,
  FileText,
  Search,
  Plus,
  Eye,
  X,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialDocs = [
  {
    id: 1,
    title: "Enterprise Hardware Provisioning SOP",
    type: "SOP",
    category: "Operations",
    description: "Standard workflow for unboxing, imaging, and assigning company laptops.",
    content:
      "1. Hardware Procurement: Equipment must be logged into AssetFlow AI within 24 hours of warehouse arrival.\n2. Imaging & Security: Pre-install enterprise MDM profile and disk encryption (FileVault / BitLocker).\n3. Employee Acceptance: Physical custody hand-off with digital sign-off and serial scan.\n4. Quarterly Audit: Routine verification scheduled every 90 days via QR badge.",
  },
  {
    id: 2,
    title: "Asset Depreciation & Valuation Guide",
    type: "Policy",
    category: "Finance",
    description: "Accounting policies detailing straight-line depreciation across 3-year cycles.",
    content:
      "Laptops and mobile terminals are depreciated over 36 months using straight-line salvage valuation. Peripherals are fully expensed within the current fiscal period upon deployment.",
  },
  {
    id: 3,
    title: "Remote Custody & Return Manual",
    type: "Manual",
    category: "HR",
    description: "Offboarding protocols for retrieving hardware from remote personnel.",
    content:
      "Upon employee separation, IT dispatches prepaid return shipping packaging within 48 hours. The recipient has 7 business days to drop off the packed device at an authorized courier hub.",
  },
  {
    id: 4,
    title: "Frequently Asked Asset Questions (FAQ)",
    type: "FAQ",
    category: "Support",
    description: "Quick reference guide for common employee hardware queries.",
    content:
      "Q: Can I use personal peripherals with company laptops?\nA: Standard USB mice and keyboards are allowed; unapproved external storage drives are prohibited by policy.\n\nQ: What should I do if my charger fails?\nA: Log an issue under Maintenance & Repairs to receive a replacement from your local hub.",
  },
];

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState(initialDocs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newDoc, setNewDoc] = useState({
    title: "",
    type: "SOP",
    category: "Operations",
    description: "",
    content: "",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || doc.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [documents, search, typeFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDoc.title) return;

    const doc = {
      id: Date.now(),
      ...newDoc,
    };
    setDocuments([doc, ...documents]);
    setIsAddOpen(false);
    setNewDoc({ title: "", type: "SOP", category: "Operations", description: "", content: "" });
    showToast(`Published "${doc.title}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Knowledge Base & SOPs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enterprise guidelines, compliance documentation, and hardware operational manuals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus size={18} />
          Create Document
        </button>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800/80">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search policies, SOPs or guidelines..."
            className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Policy", "SOP", "Manual", "FAQ"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                typeFilter === t
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((doc) => (
          <motion.div
            key={doc.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <FileText size={22} />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {doc.type}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                {doc.title}
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                {doc.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                Category: {doc.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Eye size={14} />
                Read Document
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RAG Banner */}
      <div className="rounded-3xl border border-blue-900/20 bg-slate-950 p-6 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2.5">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="font-bold text-base">RAG Neural Grounding Active</h2>
            <p className="text-xs text-slate-400">
              All documents in this knowledge base are automatically indexed for AssetFlow AI Copilot answers.
            </p>
          </div>
        </div>
      </div>

      {/* Document Reader Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    {selectedDoc.type} · {selectedDoc.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {selectedDoc.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-5 max-h-[60vh] overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {selectedDoc.content}
              </div>

              <div className="mt-6 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="rounded-xl bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Document Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Create Knowledge Document
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Document Title
                  </label>
                  <input
                    required
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    placeholder="e.g. Server Room Access SOP"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Document Type
                    </label>
                    <select
                      value={newDoc.type}
                      onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="SOP">SOP</option>
                      <option value="Policy">Policy</option>
                      <option value="Manual">Manual</option>
                      <option value="FAQ">FAQ</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Category
                    </label>
                    <select
                      value={newDoc.category}
                      onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Operations">Operations</option>
                      <option value="Security">Security</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Brief Summary
                  </label>
                  <input
                    value={newDoc.description}
                    onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                    placeholder="Short summary for preview"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Body Content
                  </label>
                  <textarea
                    rows={4}
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                    placeholder="Type policy instructions or steps..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    Publish Document
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}