"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { ShagaraSection } from "./ShagaraSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ShagaraClient({ clanData }: { clanData: any[] }) {
  // Sort years descending
  const years = clanData.map((d) => d.year.toString());
  const defaultYear = years.length > 0 ? years[0] : new Date().getFullYear().toString();
  
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const currentData = clanData.find((d) => d.year.toString() === selectedYear);

  if (!currentData) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#102A43] text-white dir-rtl font-sans">
        <Navbar />
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <p className="text-xl">لا يوجد بيانات للهيكل التنظيمي حالياً.</p>
        </main>
        <Identity />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#102A43] text-white dir-rtl font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#ffffff] tracking-normal leading-tight">
            الهيكل التنظيمي والقيادي
          </h1>
          <p className="text-[#A7A9AC] text-sm sm:text-base font-medium">
            تصفح الأرشيف الكامل لمجالس القيادة والهيكل المعاون عبر السنين
          </p>
        </div>

        {/* Year Selector Pills */}
        <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-8 py-3 rounded-3xl text-lg font-black transition-all duration-200 ${
                selectedYear === year
                  ? "bg-[#E0B84B] text-[#102A43] shadow-md"
                  : "bg-[#18385C] text-[#8C9BAE] hover:bg-[#1D4470] hover:text-white"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Tree Container */}
        <ShagaraSection currentData={currentData} />
      </main>

      <Identity />
    </div>
  );
  );
}
