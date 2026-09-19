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
    <div className="min-h-screen flex flex-col justify-between bg-[#102A43] text-white dir-rtl">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4 sm:px-8 w-full">
        <ShieldsClient initialShields={formattedShields} />
      </main>

      <Identity />
    </div>
  );
}
