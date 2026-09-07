"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: "admin" | "scout") {
  await requireAdmin();
  
  try {
    await prisma.profile.update({
      where: { id: userId },
      data: { role: newRole },
    });
    
    revalidatePath("/admin/members");
    return { success: true };
  } catch (error) {
    console.error("Failed to update role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function awardShield(profileId: string, shieldId: string) {
  await requireAdmin();
  
  try {
    // Check if already awarded
    const existing = await prisma.userShield.findUnique({
      where: {
        profileId_shieldId: {
          profileId,
          shieldId,
        }
      }
    });

    if (existing) {
      return { success: false, error: "هذا الدرع ممنوح بالفعل لهذا العضو" };
    }

    await prisma.userShield.create({
      data: {
        profileId,
        shieldId,
        // awardedBy will be null for now unless we get the current user's profile ID
      }
    });
    
    revalidatePath("/admin/members");
    return { success: true };
  } catch (error) {
    console.error("Failed to award shield:", error);
    return { success: false, error: "فشل منح الدرع" };
  }
}
