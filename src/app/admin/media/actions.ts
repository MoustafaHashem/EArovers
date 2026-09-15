"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addMedia(formData: FormData) {
  const admin = await requireAdmin();
  
  try {
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
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
    revalidateTag("media", "max");
    return { success: true };
  } catch (error) {
    console.error("Failed to add media:", error);
    return { success: false, error: "Failed to add media" };
  }
}

export async function addMediaFromWidget(data: { url: string, title: string, category: string }) {
  const admin = await requireAdmin();
  try {
    await prisma.media.create({
      data: {
        title: data.title,
        url: data.url,
        category: data.category,
        uploadedBy: admin.id,
      }
    });
    revalidatePath("/admin/media");
    revalidateTag("media", "max");
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
    revalidateTag("media", "max");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete media:", error);
    return { success: false, error: "Failed to delete media" };
  }
}

export async function updateMedia(id: string, formData: FormData) {
  await requireAdmin();
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");
    const isFeatured = formData.get("isFeatured") === "on";

    await prisma.media.update({
      where: { id },
      data: {
        title,
        category,
        sortOrder,
        isFeatured,
      },
    });

    revalidatePath("/admin/media");
    revalidatePath("/");
    revalidateTag("media", "max");
    return { success: true };
  } catch (error) {
    console.error("Failed to update media:", error);
    return { success: false, error: "فشل تحديث الصورة" };
  }
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  await requireAdmin();
  try {
    await prisma.media.update({
      where: { id },
      data: { isFeatured },
    });
    revalidatePath("/admin/media");
    revalidatePath("/");
    revalidateTag("media", "max");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle featured:", error);
    return { success: false };
  }
}

export async function updateMediaSortOrder(updates: { id: string; sortOrder: number }[]) {
  await requireAdmin();
  try {
    await prisma.$transaction(
      updates.map(update => 
        prisma.media.update({
          where: { id: update.id },
          data: { sortOrder: update.sortOrder }
        })
      )
    );
    revalidatePath("/admin/media");
    revalidatePath("/");
    revalidateTag("media", "max");
    return { success: true };
  } catch (error) {
    console.error("Failed to update sort order:", error);
    return { success: false };
  }
}
