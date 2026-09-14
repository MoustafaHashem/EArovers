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
        <Button
          onClick={() => window.location.href = "/admin"}
          className="w-full relative group overflow-hidden bg-purple-600 hover:bg-purple-500 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 transition-all duration-300 h-10 px-2"
        >
          <ShieldCheck className="w-4 h-4 mr-1.5 ml-1 drop-shadow-md" />
          <span className="font-bold truncate drop-shadow-md text-xs">لوحة الإدارة</span>
        </Button>
      )}

      <Button
        onClick={() => window.location.href = "/dashboard/profile"}
        className="w-full relative group overflow-hidden bg-amber-600 hover:bg-amber-500 text-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 transition-all duration-300 h-10 px-2"
      >
        <UserCog className="w-4 h-4 mr-1.5 ml-1 drop-shadow-md" />
        <span className="font-bold truncate drop-shadow-md text-xs">تعديل الملف</span>
      </Button>
      
      <Button
        onClick={() => window.location.href = "/"}
        className="w-full relative group overflow-hidden bg-[var(--color-scout-blue)] hover:bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(40,160,255,0.3)] hover:scale-105 transition-all duration-300 h-10 px-2"
      >
        <Home className="w-4 h-4 mr-1.5 ml-1 drop-shadow-md" />
        <span className="font-bold truncate drop-shadow-md text-xs">العودة للموقع</span>
      </Button>

      <Button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full relative group overflow-hidden bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:scale-105 transition-all duration-300 h-10 px-2 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoggingOut ? <Loader2 className="w-4 h-4 mr-1.5 ml-1 animate-spin drop-shadow-md" /> : <LogOut className="w-4 h-4 mr-1.5 ml-1 drop-shadow-md" />}
        <span className="font-bold truncate drop-shadow-md text-xs">تسجيل الخروج</span>
      </Button>
    </div>
  );
}
