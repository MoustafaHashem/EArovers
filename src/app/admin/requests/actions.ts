"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateRequestStatus(requestId: string, status: "approved" | "rejected") {
  const admin = await requireAdmin();
  
  try {
    await prisma.joinRequest.update({
      where: { id: requestId },
      data: { 
        status,
        reviewedBy: admin.id,
        reviewedAt: new Date()
      },
    });
    
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error("Failed to update request:", error);
    return { success: false, error: "Failed to update request" };
  }
}
