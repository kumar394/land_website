import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BhumiAlert | भूमि अलर्ट - Land Mutation Status",
  description: "Check land mutation status, Khata and Plot details from Bihar government portal — bhumialert.in. भूमि म्यूटेशन स्थिति तुरंत जांचें।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="text-center text-xs text-gray-400 py-6 px-4 border-t mt-12">
            BhumiAlert (bhumialert.in) — Data sourced from Bihar Government Land Portal &nbsp;|&nbsp;
            <a href="https://emutation.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">
              emutation.bihar.gov.in
            </a>
          </footer>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
