"use client";

import { LogOut, Home, Loader2, ShieldCheck, UserCog } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export function DashboardActions({ isAdmin }: { isAdmin?: boolean }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {isAdmin && (
        <button
          onClick={() => window.location.href = "/admin"}
          className="inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 relative group overflow-hidden bg-purple-600 hover:bg-purple-500 text-white border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 cursor-pointer h-10 px-2"
        >
          <span className="flex items-center justify-center relative z-10 w-full text-xs drop-shadow-md">
            <ShieldCheck className="w-4 h-4 mr-1.5 ml-1" />
            <span className="font-bold truncate">لوحة الإدارة</span>
          </span>
        </button>
      )}

      <button
        onClick={() => window.location.href = "/dashboard/profile"}
        className="inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 relative group overflow-hidden bg-amber-600 hover:bg-amber-500 text-white border border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer h-10 px-2"
      >
        <span className="flex items-center justify-center relative z-10 w-full text-xs drop-shadow-md">
          <UserCog className="w-4 h-4 mr-1.5 ml-1" />
          <span className="font-bold truncate">تعديل الملف</span>
        </span>
      </button>
      
      <button
        onClick={() => window.location.href = "/"}
        className="inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 relative group overflow-hidden bg-[var(--color-scout-blue)] hover:bg-blue-500 text-white border border-blue-400 shadow-[0_0_15px_rgba(40,160,255,0.3)] hover:scale-105 cursor-pointer h-10 px-2"
      >
        <span className="flex items-center justify-center relative z-10 w-full text-xs drop-shadow-md">
          <Home className="w-4 h-4 mr-1.5 ml-1" />
          <span className="font-bold truncate">العودة للموقع</span>
        </span>
      </button>

      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 relative group overflow-hidden bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:scale-105 cursor-pointer h-10 px-2 disabled:opacity-50 disabled:pointer-events-none"
      >
        <span className="flex items-center justify-center relative z-10 w-full text-xs drop-shadow-md pointer-events-none">
          {isLoggingOut ? <Loader2 className="w-4 h-4 mr-1.5 ml-1 animate-spin" /> : <LogOut className="w-4 h-4 mr-1.5 ml-1" />}
          <span className="font-bold truncate">تسجيل الخروج</span>
        </span>
      </button>
    </div>
  );
}
