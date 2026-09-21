"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const joinSchema = z.object({
  fullName: z.string().min(5, "برجاء إدخال الاسم الثلاثي صحيحاً"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "برجاء إدخال رقم هاتف اتصال مصري صحيح (11 رقماً)"),
  whatsapp: z.string().regex(/^01[0125][0-9]{8}$/, "برجاء إدخال رقم واتساب مصري صحيح (11 رقماً)"),
  gender: z.string().min(1, "يرجى تحديد النوع"),
  academicYear: z.string().min(1, "برجاء اختيار الفرقة الدراسية"),
  department: z.string().min(1, "برجاء تحديد التخصص أو القسم الأكاديمي"),
  interests: z.string().optional(),
  interviewSlots: z.array(z.string()).min(1, "برجاء اختيار موعد واحد على الأقل للمقابلة الشخصية"),
});

export type JoinActionState = {
  success: boolean;
  error: string | null;
  message?: string;
  data?: {
    fullName: string;
    phone: string;
    whatsapp: string;
    gender: string;
    academicYear: string;
    department: string;
    interviewSlots: string[];
  };
};

export async function submitJoinRequest(
  prevState: JoinActionState,
  formData: FormData
): Promise<JoinActionState> {
  try {
    // Collect interview slots either from multiple inputs or JSON string
    let slots: string[] = formData
      .getAll("interviewSlots")
      .map((s) => String(s).trim())
      .filter(Boolean);

    if (slots.length === 0) {
      const rawSlotsStr = formData.get("interviewSlotsStr") as string;
      if (rawSlotsStr) {
        try {
          slots = JSON.parse(rawSlotsStr);
        } catch {
          slots = rawSlotsStr.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
    }

    const phone = (formData.get("phone") as string)?.trim() || "";
    const whatsapp = (formData.get("whatsapp") as string)?.trim() || phone;

    const rawData = {
      fullName: (formData.get("fullName") as string)?.trim() || "",
      phone,
      whatsapp,
      gender: (formData.get("gender") as string)?.trim() || "ذكر",
      academicYear: (formData.get("academicYear") as string)?.trim() || "",
      department: (formData.get("department") as string)?.trim() || "",
      interests: (formData.get("interests") as string)?.trim() || undefined,
      interviewSlots: slots,
    };

    const validatedData = joinSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0]?.message || "بيانات غير صالحة",
      };
    }

    await prisma.joinRequest.create({
      data: {
        fullName: validatedData.data.fullName,
        phone: validatedData.data.phone,
        whatsapp: validatedData.data.whatsapp,
        gender: validatedData.data.gender,
        academicYear: validatedData.data.academicYear,
        department: validatedData.data.department,
        interests: validatedData.data.interests,
        interviewSlots: validatedData.data.interviewSlots,
        status: "pending",
      },
    });

    return {
      success: true,
      error: null,
      message: "تمام، تم تسجيل بياناتك بنجاح! هنبعتلك على الواتساب أو هنكلمك علشان نبلغك بميعاد الإنترفيو.",
      data: {
        fullName: validatedData.data.fullName,
        phone: validatedData.data.phone,
        whatsapp: validatedData.data.whatsapp,
        gender: validatedData.data.gender,
        academicYear: validatedData.data.academicYear,
        department: validatedData.data.department,
        interviewSlots: validatedData.data.interviewSlots,
      },
    };
  } catch (error: any) {
    console.error("Join request error:", error);
    return {
      success: false,
      error: error?.message 
        ? `حدث خطأ أثناء معالجة الطلب: ${error.message}` 
        : "حدث خطأ أثناء إرسال الطلب. برجاء المحاولة لاحقاً.",
    };
  }
}
