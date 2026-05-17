"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";

const translations = {
  en: {
    appName: "BhumiAlert",
    tagline: "Check Land Mutation Status Instantly",
    heroTitle: "Your Land Records,\nAt Your Fingertips",
    heroSub: "Track mutation status, Khata & Plot details from the Bihar government portal — free, fast, and mobile-friendly.",
    checkNow: "Check Status Now",
    howWorks: "How It Works",
    step1Title: "Enter Details",
    step1Desc: "Enter your district, Khata or Plot number",
    step2Title: "We Fetch",
    step2Desc: "We pull live data from Bihar government portal",
    step3Title: "See Results",
    step3Desc: "View mutation status and land details instantly",
    free: "100% Free",
    freeDesc: "No registration required to check your land status",
    fast: "Live Data",
    fastDesc: "Direct from Bihar government portal, always up to date",
    mobile: "Mobile Friendly",
    mobileDesc: "Works perfectly on any phone or tablet",
    searchTitle: "Check Land Status",
    searchSub: "Enter your land details below",
    district: "District",
    selectDistrict: "Select District",
    anchal: "Anchal (Block)",
    selectAnchal: "Select Anchal",
    mouza: "Mouza (Village)",
    selectMouza: "Select Mouza",
    khataNo: "Khata Number",
    enterKhata: "Enter Khata number",
    plotNo: "Plot Number (Khasra)",
    enterPlot: "Enter Plot / Khasra number",
    checkStatus: "Check Status",
    checking: "Checking...",
    results: "Land Record Details",
    mutationStatus: "Mutation Status",
    ownerName: "Owner Name",
    landArea: "Land Area",
    landType: "Land Type",
    khataNumber: "Khata Number",
    plotNumber: "Plot Number",
    noData: "No records found. Please verify your details and try again.",
    error: "Could not fetch data. The government portal may be temporarily unavailable.",
    backToSearch: "Back to Search",
    footer: "Data sourced from Bihar Government Land Portal. For official records, visit emutation.bihar.gov.in",
    nav_home: "Home",
    nav_search: "Search",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  },
  hi: {
    appName: "BhumiAlert",
    tagline: "भूमि अलर्ट — म्यूटेशन स्थिति तुरंत जांचें",
    heroTitle: "आपकी ज़मीन की जानकारी,\nआपकी उंगलियों पर",
    heroSub: "बिहार सरकार पोर्टल से म्यूटेशन स्थिति, खाता और प्लॉट विवरण जांचें — बिल्कुल मुफ्त, तेज़ और मोबाइल-फ्रेंडली।",
    checkNow: "अभी स्थिति जांचें",
    howWorks: "यह कैसे काम करता है",
    step1Title: "विवरण दर्ज करें",
    step1Desc: "जिला, खाता या प्लॉट नंबर दर्ज करें",
    step2Title: "हम डेटा लाते हैं",
    step2Desc: "बिहार सरकार पोर्टल से लाइव डेटा लाया जाता है",
    step3Title: "परिणाम देखें",
    step3Desc: "म्यूटेशन स्थिति और भूमि विवरण तुरंत देखें",
    free: "100% मुफ्त",
    freeDesc: "भूमि स्थिति जांचने के लिए कोई पंजीकरण आवश्यक नहीं",
    fast: "लाइव डेटा",
    fastDesc: "बिहार सरकार पोर्टल से सीधे, हमेशा अप-टू-डेट",
    mobile: "मोबाइल फ्रेंडली",
    mobileDesc: "किसी भी फोन या टैबलेट पर बिल्कुल सही काम करता है",
    searchTitle: "भूमि स्थिति जांचें",
    searchSub: "नीचे अपना भूमि विवरण दर्ज करें",
    district: "जिला",
    selectDistrict: "जिला चुनें",
    anchal: "अंचल (ब्लॉक)",
    selectAnchal: "अंचल चुनें",
    mouza: "मौज़ा (गाँव)",
    selectMouza: "मौज़ा चुनें",
    khataNo: "खाता संख्या",
    enterKhata: "खाता संख्या दर्ज करें",
    plotNo: "प्लॉट संख्या (खसरा)",
    enterPlot: "प्लॉट / खसरा संख्या दर्ज करें",
    checkStatus: "स्थिति जांचें",
    checking: "जांच हो रही है...",
    results: "भूमि रिकॉर्ड विवरण",
    mutationStatus: "म्यूटेशन स्थिति",
    ownerName: "मालिक का नाम",
    landArea: "भूमि क्षेत्र",
    landType: "भूमि प्रकार",
    khataNumber: "खाता संख्या",
    plotNumber: "प्लॉट संख्या",
    noData: "कोई रिकॉर्ड नहीं मिला। कृपया अपना विवरण सत्यापित करें और पुनः प्रयास करें।",
    error: "डेटा प्राप्त नहीं किया जा सका। सरकारी पोर्टल अस्थायी रूप से अनुपलब्ध हो सकता है।",
    backToSearch: "खोज पर वापस जाएं",
    footer: "डेटा बिहार सरकार भूमि पोर्टल से लिया गया है। आधिकारिक रिकॉर्ड के लिए, emutation.bihar.gov.in पर जाएं",
    nav_home: "होम",
    nav_search: "खोजें",
    pending: "लंबित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
  },
};

type T = typeof translations.en;

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}>({ lang: "en", setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
