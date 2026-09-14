import { requireAuth } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "تعديل الملف الشخصي | جوالة هندسة",
};

export default async function EditProfilePage() {
  const user = await requireAuth();

  const member = await prisma.member.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      fullName: true,
      phone: true,
      academicYear: true,
      bio: true,
      avatarUrl: true,
    }
  });

  if (!member) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] pt-12 px-4">
      <ProfileForm member={member} />
    </div>
  );
}
