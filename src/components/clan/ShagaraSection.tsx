"use client";

import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ShagaraSection({ currentData }: { currentData: any }) {
  if (!currentData || !currentData.tiers) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <p className="text-xl text-white">لا يوجد بيانات للهيكل التنظيمي حالياً.</p>
      </div>
    );
  }

  const { highCouncil, auxiliary, management } = currentData.tiers;

  // Helper to get members of a specific role from a tier
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getExactRole = (tier: any, exactTitle: string) => {
    return tier.members.filter((m: any) => m.role === exactTitle);
  };

  // Build the High Council rows manually to match the rigid layout
  const row1 = [
    ...getExactRole(highCouncil, "قائد العشيرة"),
    ...getExactRole(highCouncil, "قائدة الجوالات")
  ];
  const row2 = getExactRole(highCouncil, "مساعد قائد العشيرة");
  const row3 = [
    ...getExactRole(highCouncil, "الرائد الأكبر"),
    ...getExactRole(highCouncil, "الرائدة الكبرى")
  ];

  return (
    <div className="bg-[#1D4E89]/20 border border-white/10 rounded-3xl p-6 sm:p-12 space-y-16 shadow-2xl w-full dir-rtl font-sans text-center mx-auto max-w-6xl">
      
      {/* SECTION: مجلس القيادة */}
      {(row1.length > 0 || row2.length > 0 || row3.length > 0) && (
        <div className="space-y-12">
          <div className="inline-block border-b border-white/10 pb-3 px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff]">
              مجلس القيادة
            </h2>
          </div>

          <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
            {/* Row 1: Leaders */}
            {row1.length > 0 && (
              <div className="flex justify-center flex-wrap gap-8 sm:gap-16 w-full">
                {row1.map((item, idx) => (
                  <LeaderCard key={idx} item={item} />
                ))}
              </div>
            )}

            {/* Row 2: Assistants */}
            {row2.length > 0 && (
              <div className="flex justify-center flex-wrap gap-8 sm:gap-16 w-full">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {row2.map((item: any, idx: number) => (
                  <LeaderCard key={idx} item={item} />
                ))}
              </div>
            )}

            {/* Row 3: Senior Pioneers */}
            {row3.length > 0 && (
              <div className="flex justify-center flex-wrap gap-8 sm:gap-16 w-full">
                {row3.map((item, idx) => (
                  <LeaderCard key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION: مجلس الإدارة */}
      {management.members.length > 0 && (
        <div className="space-y-10 pt-10 border-t border-white/10">
          <div className="inline-block border-b border-white/10 pb-3 px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff]">
              مجلس الإدارة
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {management.members.map((item: any, idx: number) => (
              <LeaderCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* SECTION: الهيكل المعاون */}
      {auxiliary.members.length > 0 && (
        <div className="space-y-10 pt-10 border-t border-white/10">
          <div className="inline-block border-b border-white/10 pb-3 px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff]">
              الهيكل المعاون
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 max-w-4xl mx-auto">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {auxiliary.members.map((item: any, idx: number) => (
              <LeaderCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LeaderCard({ item }: { item: any }) {
  const imageSrc = item.member.avatar || "/gold-circle.png";
  
  return (
    <div className="flex flex-col items-center space-y-2.5 group">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src={imageSrc}
          alt={item.role}
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="text-center space-y-0.5 max-w-[160px]">
        <h3 className="font-extrabold text-base sm:text-lg text-white">
          {item.role}
        </h3>
        <p className="text-xs sm:text-sm text-[#A7A9AC] leading-snug">{item.member.name}</p>
      </div>
    </div>
  );
}
