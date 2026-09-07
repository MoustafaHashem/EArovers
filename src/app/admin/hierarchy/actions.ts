"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateHierarchyRole(personId: string, year: number, tier: string, roleTitle: string, isSecondary: boolean = false) {
  await requireAdmin();
  
  try {
    // A person can only hold one primary role per year (unless we allow multiple, but usually it's one)
    // Actually they might hold multiple if one is secondary.
    
    // Check if this specific role is already assigned to someone else this year, and remove it if so
    await prisma.roleHistory.deleteMany({
      where: {
        year,
        roleTitle,
        tier,
      },
    });

    // Assign the role to the new person
    await prisma.roleHistory.create({
      data: {
        personId,
        year,
        tier,
        roleTitle,
        isSecondary,
      },
    });
    
    revalidatePath("/admin/hierarchy");
    revalidatePath("/hierarchy"); // Public page
    return { success: true };
  } catch (error) {
    console.error("Failed to update hierarchy role:", error);
    return { success: false, error: "Failed to update hierarchy role" };
  }
}

export async function removeRole(personId: string, year: number, roleTitle: string) {
  await requireAdmin();
  
  try {
    await prisma.roleHistory.deleteMany({
      where: {
        personId,
        year,
        roleTitle,
      }
    });
    
    revalidatePath("/admin/hierarchy");
    revalidatePath("/hierarchy");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove role:", error);
    return { success: false, error: "Failed to remove role" };
  }
}
