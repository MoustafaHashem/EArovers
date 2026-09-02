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
  Award
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const adminLinks = [
  { href: "/admin", label: "نظرة عامة", icon: Home },
  { href: "/admin/members", label: "إدارة الأعضاء", icon: Users },
  { href: "/admin/events", label: "الفعاليات", icon: Calendar },
  { href: "/admin/requests", label: "طلبات الانضمام", icon: ShieldAlert },
  { href: "/admin/media", label: "الميديا", icon: ImageIcon },
  { href: "/admin/achievements", label: "الإنجازات والدروع", icon: Award },
];

export function AdminSidebar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] rounded-full flex items-center justify-center shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] h-screen sticky top-0 shrink-0">
        <SidebarContent 
          pathname={pathname} 
          user={user} 
          onLogout={handleLogout} 
        />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] shadow-2xl z-50 md:hidden flex flex-col"
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
  user: any;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6 border-b border-[var(--color-dark-border)] flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center text-white font-bold text-sm">
            ج
          </div>
          <span className="font-bold text-white">إدارة الجوالة</span>
        </a>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                  isActive
                    ? "bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] border border-[var(--color-scout-blue)]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[var(--color-dark-border)]">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs">
            {user.profile?.fullName?.substring(0, 2) || "أد"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {user.profile?.fullName || "مدير النظام"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors font-medium text-sm"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
