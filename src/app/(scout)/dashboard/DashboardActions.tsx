"use client";

import { LogOut, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export function DashboardActions() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/");
  };

  return (
    <>
      <Link href="/" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--color-scout-blue)]/10 text-[var(--color-scout-blue-light)] font-bold hover:bg-[var(--color-scout-blue)]/20 transition-all border border-[var(--color-scout-blue)]/30 shadow-[0_0_15px_rgba(40,160,255,0.15)]">
        <Home size={18} />
        العودة للموقع
      </Link>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20"
      >
        <LogOut size={18} />
        تسجيل الخروج
      </button>
    </>
  );
}
