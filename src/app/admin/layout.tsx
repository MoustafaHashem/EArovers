import { Cairo } from "next/font/google";
import { requireAdmin } from "@/lib/auth/roles";
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata = {
  title: "لوحة تحكم الإدارة | جوالة هندسة",
  description: "إدارة النظام وعشيرة الجوالة",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure only admins can access the layout
  const user = await requireAdmin();

  return (
    <div className={`min-h-screen bg-[var(--color-dark-bg)] text-white flex flex-col md:flex-row ${cairo.variable} font-sans`}>
      {/* Mobile Header (Hidden on Desktop) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[var(--color-scout-navy)] border-b border-[var(--color-dark-border)]">
        <div className="font-bold">لوحة التحكم</div>
        <div className="text-sm text-gray-400">{user.member?.fullName || user.email}</div>
      </header>

      {/* Sidebar Navigation */}
      <AdminSidebar user={user} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
