"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="font-bold text-green-700 text-lg">{t.appName}</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-green-700 hidden sm:block">
            {t.nav_home}
          </Link>
          <Link
            href="/search"
            className="text-sm bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {t.nav_search}
          </Link>

          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-50 transition font-medium"
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
