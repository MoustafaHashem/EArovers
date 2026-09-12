import { prisma } from "@/lib/prisma";
import HierarchyClient from "./HierarchyClient";
import Link from "next/link";

export default async function HierarchyPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const currentYear = new Date().getFullYear();
  const { year: yearParam } = await searchParams;
  const year = yearParam ? parseInt(yearParam) : currentYear;

  const [members, roles] = await Promise.all([
    prisma.member.findMany({
      orderBy: { fullName: "asc" }
    }),
    prisma.roleHistory.findMany({
      where: { year }
    })
  ]);

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {[currentYear - 1, currentYear, currentYear + 1].map(y => (
          <Link
            key={y}
            href={`/admin/hierarchy?year=${y}`}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              year === y 
                ? "bg-[var(--color-scout-blue)] text-white" 
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-[var(--color-dark-border)]"
            }`}
          >
            هيكل {y}
          </Link>
        ))}
      </div>
      
      <HierarchyClient 
        members={members} 
        initialRoles={roles} 
        year={year} 
      />
    </div>
  );
}
