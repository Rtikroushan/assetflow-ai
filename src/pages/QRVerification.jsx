import { QrCode, Search, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function QRVerification() {
  const [assetId, setAssetId] = useState("");
  const [verified, setVerified] = useState(false);

  const verify = () => {
    if (!assetId.trim()) {
      alert("Enter an asset ID");
      return;
    }

    setVerified(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">QR Verification</h1>
        <p className="mt-1 text-slate-500">
          Verify physical assets using QR codes.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <QrCode size={40} />
        </div>

        <h2 className="mt-5 text-xl font-bold">Scan or Enter Asset ID</h2>

        <div className="mx-auto mt-6 flex max-w-lg gap-3">
          <input
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            placeholder="AST-1001"
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={verify}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 text-white"
          >
            <Search size={18} />
            Verify
          </button>
        </div>

        {verified && (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-emerald-700">
            <CheckCircle className="mx-auto" size={30} />
            <p className="mt-2 font-semibold">
              Asset {assetId} verified successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}