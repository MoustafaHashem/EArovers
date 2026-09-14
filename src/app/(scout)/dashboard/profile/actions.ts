"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(
  memberId: string,
  data: {
    fullName: string;
    phone?: string;
    academicYear?: string;
    bio?: string;
    avatarUrl?: string;
  }
) {
  try {
    const updatedUser = await prisma.member.update({
      where: { id: memberId },
      data: {
        fullName: data.fullName,
        phone: data.phone || null,
        academicYear: data.academicYear || null,
        bio: data.bio || null,
        ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    
    return { success: true, member: updatedUser };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "فشل في تحديث البيانات" };
  }
}
