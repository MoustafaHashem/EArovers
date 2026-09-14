"use client";

import { useActionState, useState } from "react";
import { Send, Loader2, ChevronLeft, ChevronRight, User, Phone, GraduationCap, Sparkles } from "lucide-react";
import { submitJoinRequest } from "@/actions/join";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function JoinForm() {
  const [state, formAction, pending] = useActionState(submitJoinRequest, { success: false, error: null });
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Local state for validation
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    academicYear: "إعدادي",
    interests: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canGoNext = () => {
    if (step === 1) return formData.fullName.length > 2 && formData.phone.length > 8;
    if (step === 2) return true; // academic year always has a default
    return true;
  };

  const nextStep = () => {
    if (canGoNext() && step < totalSteps) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10 bg-[#0a1122]/80 backdrop-blur-2xl">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-scout-blue)] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">انضم إلينا</h2>
        <p className="text-gray-400 text-sm">سجل بياناتك للالتحاق بعشيرة جوالة هندسة عين شمس</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10 px-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative z-10">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
              step >= i 
                ? "bg-gradient-to-br from-[var(--color-scout-blue)] to-blue-500 text-white shadow-[0_0_15px_rgba(92,124,182,0.5)]" 
                : "bg-white/5 border border-white/10 text-gray-500"
            )}>
              {i === 1 && <User size={18} />}
              {i === 2 && <GraduationCap size={18} />}
              {i === 3 && <Sparkles size={18} />}
            </div>
          </div>
        ))}
        {/* Connecting Lines */}
        <div className="absolute top-5 left-10 right-10 h-[2px] bg-white/5 -z-0">
          <div 
            className="h-full bg-gradient-to-r from-[var(--color-scout-blue)] to-cyan-400 transition-all duration-500" 
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} 
          />
        </div>
      </div>

      <form action={formAction} className="relative z-10">
        {state.success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-2xl text-center font-bold mb-6 backdrop-blur-md">
            {state.message}
          </div>
        )}
        
        {state.error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-2xl text-center font-bold mb-6 backdrop-blur-md">
            {state.error}
          </div>
        )}

        <div className="relative min-h-[220px] overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 absolute inset-0"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <User size={16} className="text-[var(--color-scout-blue-light)]" />
                    الاسم الثلاثي
                  </label>
                  <input 
                    name="fullName" 
                    required 
                    type="text" 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all placeholder:text-gray-600" 
                    placeholder="أحمد محمد محمود" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-[var(--color-scout-blue-light)]" />
                    رقم الهاتف (واتساب)
                  </label>
                  <input 
                    name="phone" 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all text-right placeholder:text-gray-600" 
                    placeholder="01xxxxxxxxx" 
                    dir="ltr" 
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 absolute inset-0"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <GraduationCap size={16} className="text-[var(--color-scout-blue-light)]" />
                    الفرقة الدراسية
                  </label>
                  <select 
                    name="academicYear" 
                    required 
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-gray-200 focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-[#0f172a] text-white py-2">إعدادي</option>
                    <option className="bg-[#0f172a] text-white py-2">الفرقة الأولى</option>
                    <option className="bg-[#0f172a] text-white py-2">الفرقة الثانية</option>
                    <option className="bg-[#0f172a] text-white py-2">الفرقة الثالثة</option>
                    <option className="bg-[#0f172a] text-white py-2">الفرقة الرابعة</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 absolute inset-0"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-[var(--color-scout-blue-light)]" />
                    مجالات الاهتمام (اختياري)
                  </label>
                  <textarea 
                    name="interests" 
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] focus:ring-1 focus:ring-[var(--color-scout-blue-light)] transition-all min-h-[120px] placeholder:text-gray-600 resize-none" 
                    placeholder="رياضة، فنون، سمر..." 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <ChevronRight size={18} />
              السابق
            </button>
          )}
          
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep}
              disabled={!canGoNext()}
              className="flex-1 bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] hover:bg-[var(--color-scout-blue-light)] font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(92,124,182,0.3)] active:scale-95"
            >
              التالي
              <ChevronLeft size={18} />
            </button>
          ) : (
            <button 
              disabled={pending} 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-[var(--color-scout-blue)] to-cyan-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {pending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  إرسال الطلب
                  <Send size={18} className="rotate-180" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
