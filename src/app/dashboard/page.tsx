"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import type { LandRecord } from "@/app/api/fetch-land/route";

function StatusBadge({ status, t }: { status: string; t: { approved: string; pending: string; rejected: string } }) {
  const s = status.toLowerCase();
  if (s.includes("approved") || s.includes("स्वीकृत")) {
    return <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{t.approved}</span>;
  }
  if (s.includes("rejected") || s.includes("अस्वीकृत")) {
    return <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">{t.rejected}</span>;
  }
  return <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">{t.pending}</span>;
}

function RecordCard({ record, t }: { record: LandRecord; t: ReturnType<typeof useLang>["t"] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-800 text-base">{record.ownerName}</p>
          {record.mutationNo && (
            <p className="text-xs text-gray-400 mt-0.5">#{record.mutationNo}</p>
          )}
        </div>
        <StatusBadge status={record.mutationStatus} t={t} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 mb-1">{t.khataNumber}</p>
          <p className="font-semibold text-gray-800">{record.khataNo}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 mb-1">{t.plotNumber}</p>
          <p className="font-semibold text-gray-800">{record.plotNo}</p>
        </div>
        {record.date && record.date !== "-" && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Date / तारीख</p>
            <p className="font-semibold text-gray-800">{record.date}</p>
          </div>
        )}
        {record.landArea && record.landArea !== "-" && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">{t.landArea}</p>
            <p className="font-semibold text-gray-800">{record.landArea}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-3 text-sm">
        <p className="text-xs text-gray-400 mb-1">{t.mutationStatus}</p>
        <p className="font-semibold text-gray-800">{record.mutationStatus}</p>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const district = searchParams.get("district") || "";
  const year = searchParams.get("year") || "2026";
  const caseNo = searchParams.get("caseNo") || "";
  const plotNo = searchParams.get("plotNo") || "";

  const [records, setRecords] = useState<LandRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [noData, setNoData] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ district, year, caseNo, plotNo });
    fetch(`/api/fetch-land?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setErrorMsg(t.error); return; }
        if (data.message === "no_data" || !data.records?.length) { setNoData(true); return; }
        setRecords(data.records);
        setIsDemo(!!data.demo);
      })
      .catch(() => setErrorMsg(t.error))
      .finally(() => setLoading(false));
  }, [district, year, caseNo, plotNo, t.error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/search" className="text-sm text-green-700 hover:underline mb-3 inline-block">
          ← {t.backToSearch}
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{t.results}</h1>
        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
          <span className="bg-gray-100 px-3 py-1 rounded-full">📍 {district}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">📅 {year}-{String(parseInt(year)+1)}</span>
          {caseNo && <span className="bg-gray-100 px-3 py-1 rounded-full">Case: {caseNo}</span>}
          {plotNo && <span className="bg-gray-100 px-3 py-1 rounded-full">Plot: {plotNo}</span>}
        </div>
      </div>

      {isDemo && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 rounded-xl mb-5">
          Demo data shown — government portal did not return results. Live data will appear when the portal responds.
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 text-sm">{t.checking}</p>
        </div>
      )}

      {!loading && errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-xl">
          {errorMsg}
        </div>
      )}

      {!loading && noData && !errorMsg && (
        <div className="bg-gray-50 border border-gray-200 text-gray-600 text-sm px-5 py-8 rounded-xl text-center">
          {t.noData}
        </div>
      )}

      {!loading && records.length > 0 && (
        <div className="space-y-4">
          {records.map((rec, i) => (
            <RecordCard key={i} record={rec} t={t} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/search"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-green-700 transition"
        >
          Search Another Record
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
