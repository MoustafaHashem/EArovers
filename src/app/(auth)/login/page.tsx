"use client";

import { useState } from "react";
import { LogIn, ArrowRight, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginFormSchema, type LoginFormData } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

type FormState = "idle" | "submitting" | "error";

export default function LoginPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    // Client-side validation
    const result = loginFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setFormState("submitting");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setFormState("error");
        return;
      }

      // Redirect to dashboard on success
      window.location.assign("/dashboard");
    } catch {
      setErrorMessage("حدث خطأ غير متوقع. حاول مرة أخرى.");
      setFormState("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-card p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10 bg-[#0a1122]/80 backdrop-blur-2xl">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-scout-blue)] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

      {/* Back to home */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8 relative z-10"
      >
        <ArrowRight size={16} />
        <span>العودة للرئيسية</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-scout-blue)] text-white font-black text-2xl">
          ج
        </div>
        <h1 className="text-2xl font-black text-white mb-2">تسجيل الدخول</h1>
        <p className="text-gray-400 text-sm">
          أدخل بياناتك للوصول إلى لوحة التحكم
        </p>
      </div>

      {/* Error Alert */}
      {formState === "error" && errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 relative z-10">
          <AlertCircle size={20} className="text-red-400 shrink-0" />
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Login Form */}
      <form className="flex flex-col gap-5 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            required
            dir="ltr"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all text-left placeholder:text-gray-600"
            placeholder="example@eng.asu.edu.eg"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              dir="ltr"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all text-left pl-12 placeholder:text-gray-600"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="mt-4 bg-[var(--color-scout-blue)] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--color-scout-blue-light)] hover:text-[var(--color-scout-navy)] transition-colors shadow-[0_0_15px_rgba(92,124,182,0.3)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
        >
          {formState === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              جاري تسجيل الدخول...
            </>
          ) : (
            <>
              <LogIn size={18} />
              تسجيل الدخول
            </>
          )}
        </button>
      </form>

      {/* Info note */}
      <p className="text-center text-gray-500 text-xs mt-6 relative z-10">
        الحسابات يتم إنشاؤها بواسطة مدير العشيرة فقط
      </p>
    </div>
  );
}
