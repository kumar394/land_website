"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

const BIHAR_DISTRICTS = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
  "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
  "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
  "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
  "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
  "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
  "Siwan", "Supaul", "Vaishali", "West Champaran",
];

export default function SearchPage() {
  const { t } = useLang();
  const router = useRouter();

  const [form, setForm] = useState({
    district: "",
    khataNo: "",
    plotNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.district) { setError("Please select a district / जिला चुनें"); return; }
    if (!form.khataNo && !form.plotNo) { setError("Enter at least Khata or Plot number / खाता या प्लॉट नंबर दर्ज करें"); return; }

    setLoading(true);
    const params = new URLSearchParams({
      district: form.district,
      khataNo: form.khataNo,
      plotNo: form.plotNo,
    });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t.searchTitle}</h1>
        <p className="text-sm text-gray-500 mb-6">{t.searchSub}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.district} *</label>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">{t.selectDistrict}</option>
              {BIHAR_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Khata */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.khataNo}</label>
            <input
              type="text"
              name="khataNo"
              value={form.khataNo}
              onChange={handleChange}
              placeholder={t.enterKhata}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Plot */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.plotNo}</label>
            <input
              type="text"
              name="plotNo"
              value={form.plotNo}
              onChange={handleChange}
              placeholder={t.enterPlot}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition disabled:opacity-60 text-base"
          >
            {loading ? t.checking : t.checkStatus}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Enter Khata number, Plot number, or both for better results.
        </p>
      </div>
    </div>
  );
}
