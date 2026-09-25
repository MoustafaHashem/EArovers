"use client";

import Image from "next/image";
import type { ClanTier, ComplexYearData, RoleNode } from "@/data/clanData";

export function ShagaraSection({ currentData }: { currentData: ComplexYearData | undefined }) {
  if (!currentData || !currentData.tiers) {
    return (
      <div className="rounded-[2rem] bg-white/80 dark:bg-[#0d1527]/85 border border-[#d4a373]/25 dark:border-white/10 shadow-[0_20px_60px_rgba(11,26,48,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md p-8 sm:p-12 text-center">
        <p className="text-lg text-[#0b1a30] dark:text-white">لا يوجد بيانات للهيكل التنظيمي حالياً.</p>
      </div>
    );
  }

  const { highCouncil, auxiliary, management } = currentData.tiers;

  // Helper to get members of a specific role from a tier
  const getExactRole = (tier: ClanTier, exactTitle: string) => {
    return tier.members.filter((m) => m.role === exactTitle);
  };

  const getRoles = (tier: ClanTier, exactTitles: string[]) => {
    return tier.members.filter((member) => exactTitles.includes(member.role));
  };

  // Build the High Council rows manually to match the rigid layout
  const row1 = [...getExactRole(highCouncil, "قائد العشيرة"), ...getRoles(highCouncil, ["قائدة الجوالات", "قائده المرشدات"] )];
  const row2 = getExactRole(highCouncil, "مساعد قائد العشيرة");
  const row3 = [
    ...getRoles(highCouncil, ["الرائد الأكبر", "الرائد الاكير"]),
    ...getRoles(highCouncil, ["الرائدة الكبرى", "الرائده الكبري"]),
  ];

  // Pre-process auxiliary groups
  const auxiliaryGroups: { base: RoleNode; assistants: RoleNode[] }[] = [];
  const auxBaseRoles = auxiliary.members.filter((m) => !m.role.includes("مساعد"));

  auxBaseRoles.forEach((baseMember) => {
    const keyword = baseMember.role.replace("قائد ", "").replace("قائدة ", "");
    const assistants = auxiliary.members.filter((m) => m.role.includes("مساعد") && m.role.includes(keyword));
    auxiliaryGroups.push({ base: baseMember, assistants });
  });

  const groupedAssistants = new Set(auxiliaryGroups.flatMap((g) => g.assistants).map((a) => a.member.id));
  const orphans = auxiliary.members.filter((m) => m.role.includes("مساعد") && !groupedAssistants.has(m.member.id));

  return (
    <div className="rounded-[2rem] bg-white/80 dark:bg-[#0d1527]/85 border border-[#d4a373]/25 dark:border-white/10 shadow-[0_20px_60px_rgba(11,26,48,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md p-5 sm:p-8 lg:p-10 space-y-12 sm:space-y-16 w-full dir-rtl font-cairo text-center mx-auto max-w-7xl">
      {/* SECTION: مجلس القيادة */}
      {(row1.length > 0 || row2.length > 0 || row3.length > 0) && (
        <section className="space-y-8 sm:space-y-10">
          <div className="inline-flex items-center gap-3 border-b border-[#d4a373]/25 dark:border-white/10 pb-3 px-6 sm:px-8 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#d4a373] dark:bg-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a30] dark:text-white">مجلس القيادة</h2>
          </div>

          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            {row1.length > 0 && (
              <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                {row1.map((item, idx) => (
                  <LeaderCard key={idx} item={item} />
                ))}
              </div>
            )}

            {row2.length > 0 && (
              <div className="flex justify-center flex-wrap gap-10 sm:gap-16 w-full">
                {row2.map((item, idx: number) => (
                  <LeaderCard key={idx} item={item} isAssistant />
                ))}
              </div>
            )}

            {row3.length > 0 && (
              <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                {row3.map((item, idx) => (
                  <LeaderCard key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION: الهيكل المعاون */}
      {auxiliary.members.length > 0 && (
        <section className="space-y-8 pt-10 border-t border-[#d4a373]/20 dark:border-white/10">
          <div className="inline-flex items-center gap-3 border-b border-[#d4a373]/25 dark:border-white/10 pb-3 px-6 sm:px-8 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#d4a373] dark:bg-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a30] dark:text-white">الهيكل المعاون</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-10 sm:gap-14 max-w-5xl mx-auto items-start">
            {auxiliaryGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col items-center gap-5">
                <LeaderCard item={group.base} />
                {group.assistants.map((ast, i) => (
                  <LeaderCard key={i} item={ast} isAssistant />
                ))}
              </div>
            ))}

            {orphans.map((orphan, idx: number) => (
              <div key={`orphan-${idx}`} className="flex flex-col items-center gap-5">
                <LeaderCard item={orphan} isAssistant />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: مجلس الإدارة */}
      {management.members.length > 0 && (
        <section className="space-y-8 pt-10 border-t border-[#d4a373]/20 dark:border-white/10">
          <div className="inline-flex items-center gap-3 border-b border-[#d4a373]/25 dark:border-white/10 pb-3 px-6 sm:px-8 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#161e35] dark:bg-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a30] dark:text-white">مجلس الإدارة</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 justify-items-center">
            {management.members.map((item, idx: number) => (
              <NameOnlyCard key={idx} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function LeaderCard({ item, isAssistant = false }: { item: RoleNode; isAssistant?: boolean }) {
  const imageSrc = item.member.avatar || "/gold-circle.png";
  const circleSizeClass = "w-32 h-32 sm:w-36 sm:h-36";

  return (
    <div className="flex flex-col items-center space-y-3 group text-center">
      <div className={`relative flex items-center justify-center rounded-full bg-white/85 dark:bg-white/5 border border-[#d4a373]/20 dark:border-cyan-500/20 shadow-lg shadow-[#d4a373]/10 dark:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-transform duration-300 group-hover:scale-105 ${circleSizeClass}`}>
        <Image src={imageSrc} alt={item.role} fill className="object-contain p-1" priority />
      </div>

      <div className="space-y-1 max-w-[180px]">
        <h3 className={`font-black text-[#0b1a30] dark:text-white ${isAssistant ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}>
          {item.role}
        </h3>
        <p className={`text-[#64748b] dark:text-slate-300 leading-snug ${isAssistant ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"}`}>
          {item.member.name}
        </p>
      </div>
    </div>
  );
}

function NameOnlyCard({ item }: { item: RoleNode }) {
  const circleSizeClass = "w-32 h-32 sm:w-36 sm:h-36";

  return (
    <div className="flex flex-col items-center space-y-3 group text-center">
      <div className={`relative flex items-center justify-center rounded-full bg-white/85 dark:bg-white/5 border border-[#d4a373]/20 dark:border-cyan-500/20 shadow-lg shadow-[#d4a373]/10 dark:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-transform duration-300 group-hover:scale-105 ${circleSizeClass}`}>
        <Image src={item.member.avatar || "/gold-circle.png"} alt={item.member.name} fill className="object-contain p-1" priority />
      </div>

      <span className="text-sm sm:text-base font-black text-[#0b1a30] dark:text-white leading-snug max-w-[180px]">
        {item.member.name}
      </span>
    </div>
  );
}
