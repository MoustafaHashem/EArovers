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
    <div className="w-full max-w-xl mx-auto glass-card p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-[#d4a373]/30 dark:border-white/10 bg-white/90 dark:bg-[#0a1122]/80 backdrop-blur-2xl">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#161e35]/10 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#d4a373]/15 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-[#0b1a30] dark:text-white mb-2 tracking-tight">انضم إلينا</h2>
        <p className="text-[#475569] dark:text-gray-400 text-sm">سجل بياناتك للالتحاق بعشيرة جوالة هندسة عين شمس</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10 px-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative z-10">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
              step >= i 
                ? "bg-gradient-to-br from-[#161e35] to-[#1e2746] dark:from-cyan-400 dark:to-teal-400 text-white dark:text-[#080b10] shadow-[0_4px_14px_rgba(22,30,53,0.35)] dark:shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-400"
            )}>
              {i === 1 && <User size={18} />}
              {i === 2 && <GraduationCap size={18} />}
              {i === 3 && <Sparkles size={18} />}
            </div>
          </div>
        ))}
        {/* Connecting Lines */}
        <div className="absolute top-5 left-10 right-10 h-[2px] bg-black/5 dark:bg-white/5 -z-0">
          <div 
            className="h-full bg-gradient-to-r from-[#161e35] to-[#26355d] dark:from-cyan-400 dark:to-teal-400 transition-all duration-500" 
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
                  <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <User size={16} className="text-[#161e35] dark:text-cyan-400" />
                    الاسم الثلاثي
                  </label>
                  <input 
                    name="fullName" 
                    required 
                    type="text" 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all placeholder:text-gray-400" 
                    placeholder="أحمد محمد محمود" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-[#161e35] dark:text-cyan-400" />
                    رقم الهاتف (واتساب)
                  </label>
                  <input 
                    name="phone" 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all text-right placeholder:text-gray-400" 
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
                  <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#161e35] dark:text-cyan-400" />
                    الفرقة الدراسية
                  </label>
                  <select 
                    name="academicYear" 
                    required 
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-4 text-[#0b1a30] dark:text-gray-200 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">إعدادي</option>
                    <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">الفرقة الأولى</option>
                    <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">الفرقة الثانية</option>
                    <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">الفرقة الثالثة</option>
                    <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">الفرقة الرابعة</option>
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
                  <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#161e35] dark:text-cyan-400" />
                    مجالات الاهتمام (اختياري)
                  </label>
                  <textarea 
                    name="interests" 
                    value={formData.interests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all placeholder:text-gray-400 resize-none" 
                    placeholder="التخييم، الفنون، الرياضة، التكنولوجيا..." 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="flex-1 bg-black/5 hover:bg-black/10 text-[#0b1a30] dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-95 border border-black/5 dark:border-white/5"
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
              className="flex-1 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(22,30,53,0.25)] dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95"
            >
              التالي
              <ChevronLeft size={18} />
            </button>
          ) : (
            <button 
              disabled={pending} 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(22,30,53,0.3)] dark:hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
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
