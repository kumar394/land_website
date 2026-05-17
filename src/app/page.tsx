"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white px-4 py-16 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight whitespace-pre-line mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-green-100 text-base sm:text-lg mb-8 leading-relaxed">
            {t.heroSub}
          </p>
          <Link
            href="/search"
            className="inline-block bg-white text-green-800 font-bold px-8 py-4 rounded-full text-lg hover:bg-green-50 transition shadow-lg"
          >
            {t.checkNow} →
          </Link>
        </div>
      </section>

      {/* Feature badges */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🆓", title: t.free, desc: t.freeDesc },
            { icon: "⚡", title: t.fast, desc: t.fastDesc },
            { icon: "📱", title: t.mobile, desc: t.mobileDesc },
          ].map((f) => (
            <div key={f.title} className="px-2">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-semibold text-gray-800 text-sm sm:text-base">{f.title}</div>
              <div className="text-xs text-gray-500 mt-1 hidden sm:block">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          {t.howWorks}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { num: "1", icon: "📝", title: t.step1Title, desc: t.step1Desc },
            { num: "2", icon: "🔍", title: t.step2Title, desc: t.step2Desc },
            { num: "3", icon: "✅", title: t.step3Title, desc: t.step3Desc },
          ].map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
            >
              <div className="w-10 h-10 bg-green-100 text-green-700 font-bold rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                {step.num}
              </div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-full text-base hover:bg-green-700 transition"
          >
            {t.checkNow} →
          </Link>
        </div>
      </section>
    </div>
  );
}
