import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import {
  getFameCategoryBySlug,
  FAME_CATEGORIES,
} from "@/data/fameCategories";
import {
  getTournamentsByCategory,
  type TournamentItem,
} from "@/data/tournamentsData";
import { FameCategoryClient } from "./FameCategoryClient";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getFameCategoryBySlug(category);

  if (!cat) {
    return {
      title: "القسم غير موجود | عشيرة جوالة هندسة عين شمس",
    };
  }

  return {
    title: `${cat.title} | لوحة الشرف والبطولات`,
    description: cat.description,
  };
}

export async function generateStaticParams() {
  return FAME_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function FameCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const currentCategory = getFameCategoryBySlug(category);

  if (!currentCategory) {
    notFound();
  }

  // Build count map for all categories
  const allTournamentsCountMap: Record<string, number> = {};
  FAME_CATEGORIES.forEach((cat) => {
    allTournamentsCountMap[cat.slug] = getTournamentsByCategory(cat.slug).length;
  });

  // Tournaments belonging to this category
  const tournaments: TournamentItem[] = getTournamentsByCategory(currentCategory.slug);

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo overflow-x-hidden relative"
      dir="rtl"
    >
      <Navbar />

      {/* Ambient Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full relative z-10">
        <FameCategoryClient
          currentCategory={currentCategory}
          tournaments={tournaments}
          allTournamentsCountMap={allTournamentsCountMap}
        />
      </main>

      <div className="w-full z-20 relative">
        <Identity />
      </div>
    </div>
  );
}
