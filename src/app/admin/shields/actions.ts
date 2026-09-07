"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addShield(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string || null;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

    await prisma.shield.create({
      data: {
        name,
        description,
        sortOrder,
      },
    });

    revalidatePath("/admin/shields");
    return { success: true };
  } catch (error) {
    console.error("Failed to add shield:", error);
    return { success: false, error: "فشل إضافة الدرع" };
  }
}

export async function deleteShield(id: string) {
  try {
    await prisma.shield.delete({
      where: { id },
    });
    revalidatePath("/admin/shields");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete shield:", error);
    return { success: false, error: "فشل حذف الدرع" };
  }
}
