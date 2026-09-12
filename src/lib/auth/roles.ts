import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export type UserRole = "scout" | "admin";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const member = await prisma.member.findUnique({
    where: { id: user.id }
  });

  return {
    ...user,
    member,
  };
}

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const member = await prisma.member.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  return (member?.role as UserRole) || "scout";
}

export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === "admin";
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("غير مصرح - يرجى تسجيل الدخول");
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("غير مصرح - يرجى تسجيل الدخول");
  }
  if (user.member?.role !== "admin") {
    throw new Error("غير مصرح - صلاحيات المدير مطلوبة");
  }
  return user;
}
