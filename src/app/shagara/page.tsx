"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Identity } from "@/components/Identity";

// Define organizational data per year
const SHAGARA_DATA: Record<
  string,
  {
    leadership: {
      row1: { title: string; name: string; imageSrc: string }[];
      row2: { title: string; name: string; imageSrc: string }[];
      row3: { title: string; name: string; imageSrc: string }[];
      row4?: { title: string; name: string; imageSrc: string }[];
    };
    board: { title: string; name: string; imageSrc: string }[];
  }
> = {
  "2026": {
    leadership: {
      row1: [
        { title: "قائد العشيرة", name: "مصعب سمير", imageSrc: "/leadershippl/mosab.png" },
        { title: "قائدة الجوالات", name: "اروى زين", imageSrc: "/leadershippl/arwa.png" },
      ],
      row2: [
        { title: "مساعد قائد العشيرة", name: "مايكل جورج", imageSrc: "/leadershippl/michael.png" },
        { title: "مساعد قائد العشيرة", name: "أحمد مشعل", imageSrc: "/leadershippl/mashal.png" },
      ],
      row3: [
        { title: "الرائد الأكبر", name: "يوسف علاء", imageSrc: "/leadershippl/alaaa.png" },
        { title: "الرائدة الكبرى", name:"همسة أحمد", imageSrc: "/leadershippl/hamsa.png" },
      ],
      row4: [
        { title: "الرائد الأكبر", name: "يوسف علاء", imageSrc: "/leadershippl/alaaa.png" },
        { title: "الرائدة الكبرى", name:"همسة أحمد", imageSrc: "/leadershippl/hamsa.png" },
      ],
    },
    board: [
      { title: "عضو مجلس إدارة", name: "عضو 1", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 2", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 3", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 4", imageSrc: "/gold-circle.png" },
    ],
  },
  "2025": {
    leadership: {
      row1: [
        { title: "قائد العشيرة", name: "اسم القائد 2025", imageSrc: "/gold-circle.png" },
        { title: "قائدة الجوالات", name: "اسم القائدة 2025", imageSrc: "/gold-circle.png" },
      ],
      row2: [
        { title: "مساعد قائد العشيرة", name: "اسم المساعد 1 (2025)", imageSrc: "/gold-circle.png" },
        { title: "مساعد قائد العشيرة", name: "اسم المساعد 2 (2025)", imageSrc: "/gold-circle.png" },
      ],
      row3: [
        { title: "الرائد الأكبر", name: "اسم الرائد (2025)", imageSrc: "/gold-circle.png" },
        { title: "الرائدة الكبرى", name: "اسم الرائدة (2025)", imageSrc: "/gold-circle.png" },
      ],
    },
    board: [
      { title: "عضو مجلس إدارة", name: "عضو 1 (2025)", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 2 (2025)", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 3 (2025)", imageSrc: "/gold-circle.png" },
      { title: "عضو مجلس إدارة", name: "عضو 4 (2025)", imageSrc: "/gold-circle.png" },
    ],
  },
  "2024": {
    leadership: {
      row1: [
        { title: "قائد العشيرة", name: "اسم القائد 2024", imageSrc: "/gold-circle.png" },
        { title: "قائدة الجوالات", name: "اسم القائدة 2024", imageSrc: "/gold-circle.png" },
      ],
      row2: [
        { title: "مساعد قائد العشيرة", name: "مساعد 2024", imageSrc: "/gold-circle.png" },
        { title: "مساعد قائد العشيرة", name: "مساعد 2024", imageSrc: "/gold-circle.png" },
      ],
      row3: [
        { title: "الرائد الأكبر", name: "رائد 2024", imageSrc: "/gold-circle.png" },
        { title: "الرائدة الكبرى", name: "رائدة 2024", imageSrc: "/gold-circle.png" },
      ],
    },
    board: [],
  },
};

const YEARS = ["2026", "2025", "2024"];

export default function ShagaraPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const currentData = SHAGARA_DATA[selectedYear];

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
            مجلس القيادة و مجلس الإدراة لأخر ثلاث سنوات
          </p>
        </div>

        {/* Year Selector Pills */}
        <div className="flex items-center justify-center gap-4 py-2">
          {YEARS.map((year) => (
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
        <div className="bg-[#1D4E89]/20 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-16 shadow-2xl">
          {/* SECTION: مجلس القيادة */}
          <div className="space-y-12">
            <div className="inline-block border-b border-white/10 pb-3 px-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff]">
                مجلس القيادة
              </h2>
            </div>

            <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto">
              {/* Row 1: Leaders */}
              <div className="grid grid-cols-2 gap-12 sm:gap-24 w-full justify-items-center">
                {currentData?.leadership.row1.map((item, idx) => (
                  <LeaderCard key={idx} title={item.title} name={item.name} imageSrc={item.imageSrc} />
                ))}
              </div>

              {/* Row 2: Assistants */}
              <div className="grid grid-cols-2 gap-10 sm:gap-150 w-full justify-items-center">
                {currentData?.leadership.row2.map((item, idx) => (
                  <LeaderCard key={idx} title={item.title} name={item.name} imageSrc={item.imageSrc} />
                ))}
              </div>

              {/* Row 3: Senior Pioneers */}
              <div className="grid grid-cols-2 gap-12 sm:gap-24 w-full justify-items-center">
                {currentData?.leadership.row3.map((item, idx) => (
                  <LeaderCard key={idx} title={item.title} name={item.name} imageSrc={item.imageSrc} />
                ))}
              </div>
            </div>
          </div>

          {/* SECTION: مجلس الإدارة */}
          {currentData?.board && currentData.board.length > 0 && (
            <div className="space-y-10 pt-10 border-t border-white/10">
              <div className="inline-block border-b border-white/10 pb-3 px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff]">
                  مجلس الإدارة
                </h2>
              </div>

              {/* Row 4: Exact spacing matching Row 3 */}
              {currentData?.leadership.row4 && currentData.leadership.row4.length > 0 && (
                <div className="grid grid-cols-2 gap-12 sm:gap-24 max-w-2xl mx-auto w-full justify-items-center mb-8">
                  {currentData.leadership.row4.map((item, idx) => (
                    <LeaderCard key={idx} title={item.title} name={item.name} imageSrc={item.imageSrc} />
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {currentData.board.map((item, idx) => (
                  <LeaderCard key={idx} title={item.title} name={item.name} imageSrc={item.imageSrc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Identity />
    </div>
  );
}

function LeaderCard({
  title,
  name,
  imageSrc,
}: {
  title: string;
  name: string;
  imageSrc: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-3 group">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-extrabold text-base sm:text-lg text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#A7A9AC]">{name}</p>
      </div>
    </div>
  );
}