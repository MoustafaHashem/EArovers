import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type UserRole = "scout" | "admin";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    ...user,
    member: null,
  };
}

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return "scout";
}

export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === "admin";
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAdmin() {
  redirect("/dashboard");
}
