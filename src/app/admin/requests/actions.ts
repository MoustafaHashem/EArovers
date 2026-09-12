"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export async function updateRequestStatus(requestId: string, status: "approved" | "rejected") {
  const admin = await requireAdmin();
  const supabase = await createAdminClient();
  
  try {
    const request = await prisma.joinRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) return { success: false, error: "Request not found" };

    if (status === "approved" && request.email) {
      // 1. Invite user via Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(request.email);
      
      if (authError) {
        console.error("Supabase invite error:", authError);
        return { success: false, error: authError.message };
      }

      if (authData?.user) {
        // 2. Create Profile
        await prisma.member.create({
          data: {
            id: authData.user.id,
            fullName: request.fullName,
            phone: request.phone,
            academicYear: request.academicYear,
            bio: request.interests,
            role: "scout"
          }
        });
      }
    }

    await prisma.joinRequest.update({
      where: { id: requestId },
      data: { 
        status,
        reviewedBy: admin.id,
        reviewedAt: new Date()
      },
    });
    
    revalidatePath("/admin/requests");
    revalidatePath("/admin/members"); // update members list too
    return { success: true };
  } catch (error) {
    console.error("Failed to update request:", error);
    return { success: false, error: "Failed to update request" };
  }
}
