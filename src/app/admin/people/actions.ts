"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  await requireAdmin();
  
  try {
    const fullName = formData.get("fullName") as string;
    const bio = formData.get("bio") as string;
    
    // In a real app we'd handle Cloudinary upload for avatarUrl here
    const avatarUrl = formData.get("avatarUrl") as string || null;

    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName,
        bio,
        avatarUrl,
      },
    });
    
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    console.error("Failed to add person:", error);
    return { success: false, error: "Failed to add person" };
  }
}

export async function deletePerson(id: string) {
  await requireAdmin();
  
  try {
    await prisma.member.delete({
      where: { id },
    });
    
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete person:", error);
    return { success: false, error: "Failed to delete person" };
  }
}

export async function updatePerson(id: string, formData: FormData) {
  await requireAdmin();
  
  try {
    const fullName = formData.get("fullName") as string;
    const bio = formData.get("bio") as string;
    const avatarUrl = formData.get("avatarUrl") as string || null;

    await prisma.member.update({
      where: { id },
      data: {
        id: crypto.randomUUID(),
        fullName,
        bio,
        avatarUrl,
      },
    });
    
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    console.error("Failed to update person:", error);
    return { success: false, error: "Failed to update person" };
  }
}
