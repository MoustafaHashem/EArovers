import { prisma } from "@/lib/prisma";
import { ShieldsClient } from "./ShieldsClient";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدروع الكشفية | عشيرة جوالة هندسة عين شمس",
  description: "تغطي أنشطة الجوالة مجالات متعددة لبناء شخصية متكاملة.",
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ShieldsPage() {
  const shields = await prisma.shield.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  // Map to the structure expected by the client component
  const formattedShields = shields.map(shield => ({
    id: shield.id,
    title: shield.name,
    description: shield.description,
    image: shield.image || undefined,
  }));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-foreground dir-rtl overflow-x-hidden relative">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]"></div>
      </div>

      <main className="flex-1 pt-28 pb-16 px-6 max-w-7xl mx-auto w-full relative z-10">
        <ShieldsClient initialShields={formattedShields} />
      </main>

      <div className="w-full z-10 relative">
        <Identity />
      </div>
    </div>
  );
}
