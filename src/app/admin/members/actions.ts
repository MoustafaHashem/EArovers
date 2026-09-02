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
