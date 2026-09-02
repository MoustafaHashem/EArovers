"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function addMedia(formData: FormData) {
  const admin = await requireAdmin();
  
  try {
    const title = formData.get("title") as string;
    const url = formData.get("url") as string; // Will come from Cloudinary widget eventually
    const category = formData.get("category") as string;
    
    await prisma.media.create({
      data: {
        title,
        url,
        category,
        uploadedBy: admin.id,
      },
    });
    
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Failed to add media:", error);
    return { success: false, error: "Failed to add media" };
  }
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  
  try {
    await prisma.media.delete({
      where: { id },
    });
    
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete media:", error);
    return { success: false, error: "Failed to delete media" };
  }
}
