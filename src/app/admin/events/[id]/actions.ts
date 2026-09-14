"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ParticipantStatus } from "@prisma/client";

export async function addParticipant(eventId: string, memberId: string, status: string = "registered") {
  try {
    await prisma.eventParticipant.create({
      data: {
        eventId,
        memberId,
        status: status as ParticipantStatus,
      },
    });
    revalidatePath(`/admin/events/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error("Add participant error:", error);
    return { success: false, error: "Failed to add participant" };
  }
}

export async function updateParticipantStatus(participantId: string, eventId: string, status: string) {
  try {
    await prisma.eventParticipant.update({
      where: { id: participantId },
      data: { status: status as ParticipantStatus },
    });
    revalidatePath(`/admin/events/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error("Update participant error:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function removeParticipant(participantId: string, eventId: string) {
  try {
    await prisma.eventParticipant.delete({
      where: { id: participantId },
    });
    revalidatePath(`/admin/events/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error("Remove participant error:", error);
    return { success: false, error: "Failed to remove participant" };
  }
}
