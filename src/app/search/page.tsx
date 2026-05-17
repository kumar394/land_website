"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

const BIHAR_DISTRICTS = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
  "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
  "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
  "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
  "Nalanda", "Nawada", "Patna", "Purnea", "Rohtas", "Saharsa",
  "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
  "Siwan", "Supaul", "Vaishali", "West Champaran",
];

const YEARS = [
  { value: "2026", label: "2026 - 2027" },
  { value: "2025", label: "2025 - 2026" },
  { value: "2024", label: "2024 - 2025" },
  { value: "2023", label: "2023 - 2024" },
  { value: "2022", label: "2022 - 2023" },
  { value: "2021", label: "2021 - 2022" },
  { value: "2020", label: "2020 - 2021" },
  { value: "2019", label: "2019 - 2020" },
  { value: "2018", label: "2018 - 2019" },
  { value: "2017", label: "2017 - 2018" },
];

export default function SearchPage() {
  const { t } = useLang();
  const router = useRouter();

  const [form, setForm] = useState({
    district: "",
    year: "2026",
    caseNo: "",
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
    if (!form.caseNo && !form.plotNo) { setError("Enter Case Number or Plot Number / केस नंबर या प्लॉट नंबर दर्ज करें"); return; }

    setLoading(true);
    const params = new URLSearchParams({
      district: form.district,
      year: form.year,
      caseNo: form.caseNo,
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

          {/* Financial Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Financial Year / वित्तीय वर्ष *
            </label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {YEARS.map((y) => (
                <option key={y.value} value={y.value}>{y.label}</option>
              ))}
            </select>
          </div>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="mx-3 text-xs text-gray-400">Search by / खोजें</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Case Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Number / केस नंबर
            </label>
            <input
              type="text"
              name="caseNo"
              value={form.caseNo}
              onChange={handleChange}
              placeholder="e.g. 426 (number only)"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-center text-xs text-gray-400">— OR —</div>

          {/* Plot Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.plotNo}
            </label>
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
          Tip: Use the Case Number for exact results. Plot number searches all records in the selected circle.
        </p>
      </div>
    </div>
  );
}
