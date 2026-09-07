"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function addEvent(formData: FormData) {
  const admin = await requireAdmin();
  
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const eventType = formData.get("eventType") as string;
    const location = formData.get("location") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDateStr = formData.get("endDate") as string;
    const endDate = endDateStr ? new Date(endDateStr) : null;
    const maxParticipantsStr = formData.get("maxParticipants") as string;
    const maxParticipants = maxParticipantsStr ? parseInt(maxParticipantsStr) : null;
    const isPublic = formData.get("isPublic") === "on";

    await prisma.event.create({
      data: {
        title,
        description,
        eventType,
        location,
        startDate,
        endDate,
        maxParticipants,
        isPublic,
        createdBy: admin.id,
      },
    });
    
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Failed to add event:", error);
    return { success: false, error: "Failed to add event" };
  }
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  
  try {
    await prisma.event.delete({
      where: { id },
    });
    
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}
