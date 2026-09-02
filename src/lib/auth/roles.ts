import { createClient } from "@/lib/supabase/server";

export type UserRole = "scout" | "admin";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    ...user,
    profile,
  };
}

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (profile?.role as UserRole) || "scout";
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
  if (user.profile?.role !== "admin") {
    throw new Error("غير مصرح - صلاحيات المدير مطلوبة");
  }
  return user;
}
