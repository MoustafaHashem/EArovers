"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAchievement(formData: FormData) {
  try {
    const title = (formData.get("title") as string) || null;
    const yearStr = formData.get("year") as string;
    const placement = formData.get("placement") as string || null;
    const competitionName = formData.get("competitionName") as string || null;
    
    // Awards come as comma separated string
    const awardsStr = formData.get("awards") as string;
    const awards = awardsStr ? awardsStr.split(",").map(a => a.trim()).filter(a => a.length > 0) : [];

    await prisma.achievement.create({
      data: {
        title,
        
        placement: placement || "",
        eventId: "dummy-event-id", // TODO: Update UI to pass eventId
        
        
      },
    });

    revalidatePath("/admin/achievements");
    return { success: true };
  } catch (error) {
    console.error("Failed to add achievement:", error);
    return { success: false, error: "فشل إضافة الإنجاز" };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await prisma.achievement.delete({
      where: { id },
    });
    revalidatePath("/admin/achievements");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete achievement:", error);
    return { success: false, error: "فشل حذف الإنجاز" };
  }
}
