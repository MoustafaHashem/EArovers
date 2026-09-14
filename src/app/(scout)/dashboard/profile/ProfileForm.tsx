"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ArrowRight, UserCog } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import Link from "next/link";

interface ProfileFormProps {
  member: {
    id: string;
    fullName: string;
    phone: string | null;
    academicYear: string | null;
    bio: string | null;
    avatarUrl: string | null;
  };
}

export function ProfileForm({ member }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(member.avatarUrl || "");
  
  const [formData, setFormData] = useState({
    fullName: member.fullName,
    phone: member.phone || "",
    academicYear: member.academicYear || "",
    bio: member.bio || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await updateProfileAction(member.id, {
      ...formData,
      avatarUrl: avatarUrl !== member.avatarUrl ? avatarUrl : undefined,
    });

    setIsLoading(false);

    if (result.success) {
      toast.success("تم تحديث الملف الشخصي بنجاح");
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error(result.error || "حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ArrowRight size={20} />
        </Link>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <UserCog className="text-[var(--color-scout-blue)]" />
          تعديل الملف الشخصي
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-white/10 shadow-xl bg-[#0f1b2d]">
            <AvatarImage src={avatarUrl} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-[var(--color-scout-blue)] to-[#0f1b2d] text-white text-4xl font-black">
              {formData.fullName.substring(0, 1) || "ج"}
            </AvatarFallback>
          </Avatar>

          <CldUploadWidget 
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) => {
              if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                setAvatarUrl(result.info.secure_url as string);
                toast.success("تم رفع الصورة بنجاح");
              }
            }}
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="text-sm font-bold text-[var(--color-scout-blue-light)] hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                تغيير الصورة الشخصية
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-scout-blue)]/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <label className="text-sm font-bold text-gray-300 ml-1 block">الاسم الرباعي</label>
            <Input 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[var(--color-scout-blue)]"
              placeholder="الاسم الرباعي"
            />
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-sm font-bold text-gray-300 ml-1 block">رقم الهاتف</label>
            <Input 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[var(--color-scout-blue)]"
              placeholder="01xxxxxxxxx"
              dir="ltr"
            />
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-sm font-bold text-gray-300 ml-1 block">الفرقة الدراسية</label>
            <Input 
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[var(--color-scout-blue)]"
              placeholder="الفرقة..."
            />
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-sm font-bold text-gray-300 ml-1 block">نبذة تعريفية (Bio)</label>
            <Textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white rounded-xl resize-none focus:border-[var(--color-scout-blue)]"
              placeholder="اكتب نبذة قصيرة عنك..."
              rows={3}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 rounded-2xl bg-[var(--color-scout-blue)] hover:bg-blue-600 text-white font-black text-lg shadow-[0_0_20px_rgba(40,160,255,0.3)] transition-all"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "حفظ التعديلات"}
        </Button>
      </form>
    </div>
  );
}
