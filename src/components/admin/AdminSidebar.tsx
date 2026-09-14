"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  ShieldAlert,
  Home,
  Menu,
  X,
  LogOut,
  Award,
  BookOpen,
  Network,
  Shield
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navigation: any[] = [
  { href: "/admin", label: "نظرة عامة", icon: Home },
  { href: "/admin/requests", label: "طلبات الانضمام", icon: ShieldAlert },
  { href: "/admin/events", label: "الفعاليات", icon: Calendar },
  { href: "/admin/members", label: "إدارة الأعضاء", icon: Users },
  { href: "/admin/people", label: "سجل الكوادر", icon: BookOpen },
  { href: "/admin/hierarchy", label: "الهيكل التنظيمي", icon: Network },
  { href: "/admin/media", label: "الميديا", icon: ImageIcon },
  { href: "/admin/achievements", label: "لوحة الشرف", icon: Award },
  { href: "/admin/shields", label: "إدارة الدروع", icon: Shield },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AdminSidebar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a1122]/90 backdrop-blur-xl border-t border-white/10 z-40 pb-safe">
        <div className="flex items-center justify-around p-2">
          {navigation.slice(0, 4).map((item: { label: string; href: string; icon: React.ElementType }) => {
            const Icon = item.icon;
            const isActive = item.href === "/admin" 
              ? pathname === "/admin" 
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl transition-all min-w-[64px]",
                  isActive ? "text-[var(--color-scout-blue-light)]" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-full mb-1 transition-all",
                  isActive ? "bg-[var(--color-scout-blue)]/20 shadow-[0_0_10px_rgba(92,124,182,0.3)]" : "bg-transparent"
                )}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
          
          {/* More Menu Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center p-2 rounded-xl transition-all min-w-[64px] text-gray-500 hover:text-gray-300"
          >
            <div className="p-1.5 rounded-full mb-1 bg-transparent transition-all">
              <Menu size={20} />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">
              المزيد
            </span>
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] h-screen sticky top-0 shrink-0">
        <SidebarContent 
          pathname={pathname} 
          user={user} 
          onLogout={handleLogout} 
        />
      </aside>

      {/* Mobile Drawer for More Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] shadow-2xl z-[60] md:hidden flex flex-col"
            >
              <SidebarContent 
                pathname={pathname} 
                user={user} 
                onLogout={handleLogout}
                onClose={() => setIsOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ 
  pathname, 
  user, 
  onLogout,
  onClose 
}: { 
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6 border-b border-[var(--color-dark-border)] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center text-white font-bold text-sm">
            ج
          </div>
          <span className="font-bold text-white">إدارة الجوالة</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {navigation.map((item: any) => {
            const Icon = item.icon;
            
            // Fix for the home link "/admin" matching everything
            const isActive = item.href === "/admin" 
              ? pathname === "/admin" 
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-l-xl transition-all font-bold text-sm",
                  isActive
                    ? "bg-gradient-to-l from-[var(--color-scout-blue)]/20 to-transparent text-white border-r-4 border-[var(--color-scout-blue-light)] shadow-[inset_-10px_0_20px_rgba(40,160,255,0.1)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-r-4 border-transparent"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[var(--color-dark-border)] flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-white shadow-inner">
            {user.member?.fullName?.substring(0, 2) || "أد"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {user.member?.fullName || "مدير النظام"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        
        <Link href="/" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-base">
          <Home size={20} />
          <span>العودة للموقع</span>
        </Link>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors font-bold text-base"
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
