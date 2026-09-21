import { prisma } from "@/lib/prisma";

export async function getClanData() {
  const allRoles = await prisma.roleHistory.findMany({
    include: {
      member: true
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yearGroups: Record<number, any> = {};
  
  for (const role of allRoles) {
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
    
    // Convert to Person format expected by ClanTree
    const memberObj = {
      id: role.member.id,
      name: role.member.fullName,
      initials: role.member.fullName.substring(0, 2),
      avatar: role.member.avatarUrl || undefined
    };

    let inferredTier = "base";
    const title = role.roleTitle || "";
    
    if (title.includes("قائد العشيرة") || title.includes("قائدة") || title.includes("مساعد قائد العشيرة") || title.includes("مساعدة قائدة") || title === "الرائد الأكبر" || title === "الرائدة الكبرى") {
      inferredTier = "highCouncil";
    } else if (title.includes("رائد رهط") || title.includes("وكيل رهط") || title.includes("رائدة رهط") || title.includes("وكيلة رهط")) {
      inferredTier = "management";
    } else if (title.includes("سكرتارية") || title.includes("سكريتارية") || title.includes("ميديا") || title.includes("مسؤول") || title.includes("أمين العهدة")) {
      inferredTier = "auxiliary";
    }
    
    const node = {
      member: memberObj,
      role: title,
      tier: inferredTier,
      isSecondary: role.isSecondary,
      promotesTo: undefined
    };
    
    if (inferredTier === "highCouncil") yearGroups[role.year].tiers.highCouncil.members.push(node);
    else if (inferredTier === "auxiliary") yearGroups[role.year].tiers.auxiliary.members.push(node);
    else if (inferredTier === "management") yearGroups[role.year].tiers.management.members.push(node);
    else if (inferredTier === "base") yearGroups[role.year].tiers.base.members.push(node);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(yearGroups).sort((a: any, b: any) => b.year - a.year);
}
