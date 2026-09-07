import { z } from "zod";

// Join form validation schema
export const joinFormSchema = z.object({
  fullName: z
    .string()
    .min(5, "الاسم يجب أن يكون 5 أحرف على الأقل")
    .max(100, "الاسم طويل جدًا"),
  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم"),
  academicYear: z
    .string()
    .min(1, "يرجى اختيار الفرقة الدراسية"),
  interests: z
    .string()
    .optional(),
});

export type JoinFormData = z.infer<typeof joinFormSchema>;

// Login form validation schema
export const loginFormSchema = z.object({
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),
  password: z
    .string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// Event creation schema (for admin)
export const createEventSchema = z.object({
  title: z.string().min(3, "عنوان الفعالية مطلوب"),
  description: z.string().optional(),
  eventType: z.string().min(1, "نوع الفعالية مطلوب"),
  location: z.string().optional(),
  startDate: z.string().min(1, "تاريخ البداية مطلوب"),
  endDate: z.string().optional(),
  maxParticipants: z.number().positive().optional(),
  isPublic: z.boolean().default(false),
});

export type CreateEventData = z.infer<typeof createEventSchema>;

// Person creation schema (for admin - instructors, historical figures)
export const createPersonSchema = z.object({
  fullName: z.string().min(3, "الاسم مطلوب"),
  roleTitle: z.string().optional(),
  tier: z.string().optional(),
  year: z.number().int().min(1900).max(2100),
  bio: z.string().optional(),
  promotesToYear: z.number().int().optional(),
});

export type CreatePersonData = z.infer<typeof createPersonSchema>;
