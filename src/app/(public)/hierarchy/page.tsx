import { ClanTree } from "@/components/clan/ClanTree";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function HierarchyPage() {
  const allRoles = await prisma.roleHistory.findMany({
    include: {
      member: true
    }
  });

  // Group by year, then format into ClanTreeData format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yearGroups: Record<number, any> = {};
  
  for (const role of allRoles) {
    if (!role.member) continue;

    if (!yearGroups[role.year]) {
      yearGroups[role.year] = {
        year: role.year,
        tiers: {
          highCouncil: { title: "مجلس القيادة", members: [] },
          auxiliary: { title: "الهيكل المعاون", members: [] },
          management: { title: "مجلس الإدارة", members: [] },
          base: { title: "قاعدة العشيرة", members: [] },
        }
      };
    }
    
    // Convert to Member/Person format expected by ClanTree
    const memberObj = {
      id: role.member.id,
      name: role.member.fullName,
      initials: role.member.fullName ? role.member.fullName.substring(0, 2) : "??",
      avatar: role.member.avatarUrl || undefined
    };

    // Note: To perfectly recreate the subordination (who is subordinate to who) 
    // without a self-referential schema, we use heuristics based on roleTitle in the frontend component.
    // For now, just group them by tier.
    // Infer tier from roleTitle
    let inferredTier = "base";
    const title = role.roleTitle || "";
    
    if (title.includes("قائد العشيرة") || title.includes("قائدة") || title.includes("الرائد الأكبر") || title.includes("الرائدة الكبرى") || title === "مساعد قائد العشيرة" || title === "مجلس قيادة") {
      inferredTier = "highCouncil";
    } else if (title.includes("رائد رهط") || title.includes("وكيل رهط") || title.includes("رائدة رهط") || title.includes("وكيلة رهط")) {
      inferredTier = "management";
    } else if (title.includes("مساعد") || title.includes("أمين") || title.includes("مسئول") || title.includes("هيكل معاون")) {
      inferredTier = "auxiliary";
    }
    
    const node = {
      member: memberObj,
      person: memberObj, // backwards-compatible alias
      role: title,
      tier: inferredTier,
      isSecondary: role.isSecondary,
      promotesTo: undefined // Could calculate based on next year's roles, skipped for simplicity
    };
    
    if (inferredTier === "highCouncil") yearGroups[role.year].tiers.highCouncil.members.push(node);
    else if (inferredTier === "auxiliary") yearGroups[role.year].tiers.auxiliary.members.push(node);
    else if (inferredTier === "management") yearGroups[role.year].tiers.management.members.push(node);
    else if (inferredTier === "base") yearGroups[role.year].tiers.base.members.push(node);
  }

  // Convert to array and sort descending
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawClanData = Object.values(yearGroups).sort((a: any, b: any) => b.year - a.year);

  return (
    <main className="flex min-h-screen flex-col items-center bg-transparent text-foreground overflow-x-hidden relative">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="w-full px-4 pt-32 pb-12 z-10 flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto w-full mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <Link href="/" className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 mb-4 transition-colors font-bold">
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white">الهيكل التنظيمي والقيادي</h1>
            <p className="text-[#475569] dark:text-gray-400 text-lg mt-2 max-w-2xl">
              تصفح الأرشيف الكامل لتشكيل مجلس القيادة والهيكل المعاون والرهوط عبر السنين.
            </p>
          </div>
        </div>
        
        <div className="flex-1 w-full glass-card rounded-3xl sm:p-8 border border-[#d4a373]/25 dark:border-white/10 shadow-xl relative overflow-hidden">
          {rawClanData.length > 0 ? (
            <ClanTree dbData={rawClanData} />
          ) : (
            <div className="text-center py-20 text-[#64748b] dark:text-gray-500 font-bold">لا يوجد بيانات للهيكل التنظيمي حالياً</div>
          )}
        </div>
      </div>

      <div className="w-full z-10">
        <Identity />
      </div>
    </main>
  );
}
