"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const joinSchema = z.object({
  fullName: z.string().min(10, "برجاء إدخال الاسم الثلاثي صحيحاً"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "برجاء إدخال رقم هاتف مصري صحيح"),
  academicYear: z.string().min(1, "برجاء اختيار الفرقة الدراسية"),
  interests: z.string().optional(),
});

export type JoinActionState = {
  success: boolean;
  error: string | null;
  message?: string;
};

export async function submitJoinRequest(
  prevState: JoinActionState,
  formData: FormData
): Promise<JoinActionState> {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      academicYear: formData.get("academicYear") as string,
      interests: (formData.get("interests") as string) || undefined,
    };

    const validatedData = joinSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0]?.message || "بيانات غير صالحة",
      };
    }

    await prisma.joinRequest.create({
      data: validatedData.data,
    });

    return {
      success: true,
      error: null,
      message: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً.",
    };
  } catch (error) {
    console.error("Join request error:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء إرسال الطلب. برجاء المحاولة لاحقاً.",
    };
  }
}
