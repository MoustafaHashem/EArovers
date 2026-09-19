import { getClanData } from "@/lib/clanDataFetcher";
import { ShagaraClient } from "@/components/clan/ShagaraClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الهيكل التنظيمي | عشيرة جوالة هندسة عين شمس",
  description: "تصفح الأرشيف الكامل لمجالس القيادة والهيكل المعاون عبر السنين.",
};

export const revalidate = 60;

export default async function HierarchyPage() {
  const rawClanData = await getClanData();

  return <ShagaraClient clanData={rawClanData} />;
}
