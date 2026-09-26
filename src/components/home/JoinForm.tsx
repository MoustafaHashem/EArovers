"use client";

import { useActionState, useState } from "react";
import { 
  Send, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Phone, 
  MessageSquare, 
  GraduationCap, 
  Sparkles, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Check, 
  X,
  RotateCcw,
  Calendar,
  Sparkle
} from "lucide-react";
import { submitJoinRequest } from "@/actions/join";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ASU_DEPARTMENTS = [
  "إعدادي عام",
  "هندسة مدنية",
  "هندسة معمارية",
  "هندسة القوى والآلات الكهربية",
  "هندسة الإلكترونيات والاتصالات",
  "هندسة الحاسبات والنظم",
  "هندسة القوى الميكانيكية",
  "هندسة التصميم والإنتاج",
  "هندسة الميكاترونكس",
  "هندسة السيارات",
  "أخرى (تحديد يدوي)"
];

const INTEREST_TAGS = [
  "🏕️ التخييم والريادة الكشفية",
  "🎨 الفنون والمسرح",
  "⚽ الرياضة واللياقة البدنية",
  "💻 الميديا والتصميم والبرمجة",
  "🧭 الخدمة العامة والمجتمعية",
  "🚣 الجوالة والملاحة البحرية",
  "🎻 الموسيقى والغناء الكشفي",
  "🛠️ المشغولات والأعمال اليدوية"
];

const INTERVIEW_DAYS = [
  { id: "sat", name: "السبت" },
  { id: "sun", name: "الأحد" },
  { id: "mon", name: "الاثنين" },
  { id: "tue", name: "الثلاثاء" },
  { id: "wed", name: "الأربعاء" },
  { id: "thu", name: "الخميس" },
];

const TIME_SLOTS = [
  { id: "10-12", label: "10:00 ص - 12:00 م", period: "صباحاً" },
  { id: "12-02", label: "12:00 م - 02:00 م", period: "ظهراً" },
  { id: "02-04", label: "02:00 م - 04:00 م", period: "عصراً" },
  { id: "04-06", label: "04:00 م - 06:00 م", period: "مساءً" },
];

export function JoinForm() {
  const [state, formAction, pending] = useActionState(submitJoinRequest, { success: false, error: null });
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Active day tab in Step 4
  const [selectedDayId, setSelectedDayId] = useState("sat");

  // Sync WhatsApp toggle
  const [sameAsPhone, setSameAsPhone] = useState(true);

  // Custom department toggle if "أخرى"
  const [customDept, setCustomDept] = useState("");

  // Local state for validation & controlled values
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "ذكر",
    phone: "",
    whatsapp: "",
    academicYear: "إعدادي",
    programType: "mainstream" as "mainstream" | "credit",
    department: "إعدادي عام",
    interests: "",
    interviewSlots: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "phone" && sameAsPhone) {
        updated.whatsapp = value;
      }
      return updated;
    });
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSameAsPhoneToggle = () => {
    setSameAsPhone(prev => {
      const nextVal = !prev;
      if (nextVal) {
        setFormData(curr => ({ ...curr, whatsapp: curr.phone }));
      }
      return nextVal;
    });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "أخرى (تحديد يدوي)") {
      setFormData(prev => ({ ...prev, department: customDept || "أخرى" }));
    } else {
      setFormData(prev => ({ ...prev, department: val }));
    }
  };

  const handleCustomDeptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomDept(val);
    setFormData(prev => ({ ...prev, department: val }));
  };

  const toggleInterestTag = (tag: string) => {
    setFormData(prev => {
      const current = prev.interests.trim();
      if (!current) return { ...prev, interests: tag };
      const list = current.split("، ").map(s => s.trim());
      if (list.includes(tag)) {
        const filtered = list.filter(t => t !== tag);
        return { ...prev, interests: filtered.join("، ") };
      } else {
        return { ...prev, interests: `${current}، ${tag}` };
      }
    });
  };

  const toggleSlot = (dayName: string, slotLabel: string) => {
    const slotString = `${dayName}: ${slotLabel}`;
    setFormData(prev => {
      const exists = prev.interviewSlots.includes(slotString);
      const updated = exists 
        ? prev.interviewSlots.filter(s => s !== slotString)
        : [...prev.interviewSlots, slotString];
      return { ...prev, interviewSlots: updated };
    });
  };

  const toggleAllSlotsForDay = (dayName: string) => {
    const daySlotStrings = TIME_SLOTS.map(t => `${dayName}: ${t.label}`);
    const allSelected = daySlotStrings.every(s => formData.interviewSlots.includes(s));
    
    setFormData(prev => {
      let updated: string[];
      if (allSelected) {
        updated = prev.interviewSlots.filter(s => !daySlotStrings.includes(s));
      } else {
        const toAdd = daySlotStrings.filter(s => !prev.interviewSlots.includes(s));
        updated = [...prev.interviewSlots, ...toAdd];
      }
      return { ...prev, interviewSlots: updated };
    });
  };

  const removeSlot = (slotString: string) => {
    setFormData(prev => ({
      ...prev,
      interviewSlots: prev.interviewSlots.filter(s => s !== slotString)
    }));
  };

  const isEgyptianPhone = (num: string) => /^01[0125][0-9]{8}$/.test(num.trim());

  const canGoNext = () => {
    if (step === 1) {
      const validName = formData.fullName.trim().length >= 5;
      const validPhone = isEgyptianPhone(formData.phone);
      const validWhatsapp = isEgyptianPhone(formData.whatsapp);
      const validGender = !!formData.gender;
      return validName && validPhone && validWhatsapp && validGender;
    }
    if (step === 2) {
      return Boolean(formData.academicYear && formData.programType && formData.department && formData.department.trim().length > 0);
    }
    if (step === 3) {
      return true; // interests is optional
    }
    if (step === 4) {
      return formData.interviewSlots.length >= 1;
    }
    return true;
  };

  const nextStep = () => {
    if (canGoNext() && step < totalSteps) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      gender: "ذكر",
      phone: "",
      whatsapp: "",
      academicYear: "إعدادي",
      programType: "mainstream",
      department: "إعدادي عام",
      interests: "",
      interviewSlots: []
    });
    setSameAsPhone(true);
    setCustomDept("");
    setStep(1);
  };

  // Current active day object
  const currentDay = INTERVIEW_DAYS.find(d => d.id === selectedDayId) || INTERVIEW_DAYS[0];

  // Helper count of slots per day
  const getSelectedCountForDay = (dayName: string) => {
    return formData.interviewSlots.filter(s => s.startsWith(`${dayName}:`)).length;
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-6 sm:p-8 md:p-10 rounded-[32px] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-[#d4a373]/30 dark:border-white/10 bg-white/95 dark:bg-[#0a1122]/90 backdrop-blur-2xl transition-all">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#161e35]/10 dark:bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#d4a373]/20 dark:bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      {!state.success && (
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161e35]/5 dark:bg-cyan-500/10 border border-[#d4a373]/30 dark:border-cyan-500/20 text-[#8c5e2d] dark:text-cyan-400 text-xs font-bold mb-3">
            <Sparkle size={13} className="animate-spin text-[#d4a373] dark:text-cyan-400" />
            باب الانضمام مفتوح لموسم 2026 / 2027
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b1a30] dark:text-white mb-2 tracking-tight">انضم إلينا</h2>
          <p className="text-[#475569] dark:text-gray-400 text-sm max-w-md mx-auto">
            سجل بياناتك ومواعيدك المفضلة للالتحاق بعشيرة جوالة هندسة عين شمس
          </p>
        </div>
      )}

      {/* SUCCESS STATE DISPLAY */}
      {state.success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 text-center py-4 px-2"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white flex items-center justify-center mx-auto mb-6 shadow-[0_0_35px_rgba(34,197,94,0.45)] ring-4 ring-green-500/20 animate-pulse">
            <CheckCircle2 size={44} strokeWidth={2.5} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#0b1a30] dark:text-white mb-3">
            تم تسجيل طلبك بنجاح! 🎉
          </h3>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 p-5 rounded-2xl text-base sm:text-lg font-bold mb-8 backdrop-blur-md leading-relaxed shadow-sm">
            {state.message}
          </div>

          {/* Submission Details Recap Card */}
          {state.data && (
            <div className="bg-black/[0.02] dark:bg-white/[0.03] border border-[#d4a373]/30 dark:border-white/10 rounded-2xl p-5 mb-8 text-right text-sm space-y-3">
              <h4 className="font-bold text-[#0b1a30] dark:text-white border-b border-black/5 dark:border-white/5 pb-2 flex items-center gap-2">
                <User size={16} className="text-[#d4a373] dark:text-cyan-400" />
                ملخص بيانات التسجيل
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">الاسم:</span>
                  <span className="font-bold text-[#0b1a30] dark:text-gray-200">{state.data.fullName} ({state.data.gender})</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">الفرقة والتخصص:</span>
                  <span className="font-bold text-[#0b1a30] dark:text-gray-200">{state.data.academicYear} - {state.data.department} ({state.data.programType})</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">رقم الهاتف (اتصال):</span>
                  <span className="font-bold text-[#0b1a30] dark:text-gray-200" dir="ltr">{state.data.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">رقم الواتساب:</span>
                  <span className="font-bold text-[#0b1a30] dark:text-gray-200" dir="ltr">{state.data.whatsapp}</span>
                </div>
              </div>

              {state.data.interviewSlots && state.data.interviewSlots.length > 0 && (
                <div className="pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400 block mb-2 font-medium">مواعيد الإنترفيو المحددة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {state.data.interviewSlots.map((slot, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#161e35]/10 dark:bg-cyan-500/15 text-[#161e35] dark:text-cyan-300 border border-[#161e35]/15 dark:border-cyan-500/20"
                      >
                        <Calendar size={12} />
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] font-black text-sm shadow-[0_4px_15px_rgba(212,163,115,0.3)] hover:brightness-105 active:scale-95 transition-all text-center"
            >
              العودة للرئيسية
            </Link>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3.5 rounded-2xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#0b1a30] dark:text-gray-300 font-bold text-sm border border-black/5 dark:border-white/5 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw size={16} />
              تسجيل طلب جديد
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Progress Bar with 4 Steps */}
          <div className="flex items-center justify-between mb-8 relative z-10 px-2 sm:px-6">
            {[
              { num: 1, label: "بيانات شخصية", icon: User },
              { num: 2, label: "الكلية والتخصص", icon: GraduationCap },
              { num: 3, label: "الاهتمامات", icon: Sparkles },
              { num: 4, label: "مواعيد الإنترفيو", icon: CalendarCheck },
            ].map(({ num, label, icon: StepIcon }) => (
              <div key={num} className="flex flex-col items-center gap-1.5 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    // allow clicking previous completed steps
                    if (num < step) setStep(num);
                  }}
                  disabled={num > step}
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300",
                    step === num
                      ? "bg-gradient-to-br from-[#161e35] to-[#1e2746] dark:from-cyan-400 dark:to-teal-400 text-white dark:text-[#080b10] shadow-[0_4px_14px_rgba(22,30,53,0.35)] dark:shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-110"
                      : step > num
                        ? "bg-[#d4a373] text-[#0b1a30] dark:bg-cyan-500/20 dark:text-cyan-300 cursor-pointer shadow-sm"
                        : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-400 cursor-not-allowed"
                  )}
                  title={label}
                >
                  {step > num ? <Check size={18} strokeWidth={3} /> : <StepIcon size={18} />}
                </button>
                <span className={cn(
                  "text-[10px] sm:text-xs font-bold transition-colors hidden sm:block",
                  step === num 
                    ? "text-[#0b1a30] dark:text-cyan-400" 
                    : step > num 
                      ? "text-[#8c5e2d] dark:text-gray-300"
                      : "text-gray-400"
                )}>
                  {label}
                </span>
              </div>
            ))}
            {/* Connecting Lines */}
            <div className="absolute top-[22px] left-8 right-8 h-[2px] bg-black/10 dark:bg-white/10 -z-0">
              <div 
                className="h-full bg-gradient-to-r from-[#161e35] via-[#d4a373] to-[#26355d] dark:from-cyan-400 dark:to-teal-400 transition-all duration-500" 
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} 
              />
            </div>
          </div>

          <form action={formAction} className="relative z-10">
            {/* Hidden inputs to preserve full state across steps on native Form submission */}
            <input type="hidden" name="fullName" value={formData.fullName} />
            <input type="hidden" name="gender" value={formData.gender} />
            <input type="hidden" name="phone" value={formData.phone} />
            <input type="hidden" name="whatsapp" value={sameAsPhone ? formData.phone : formData.whatsapp} />
            <input type="hidden" name="academicYear" value={formData.academicYear} />
            <input type="hidden" name="programType" value={formData.programType} />
            <input type="hidden" name="department" value={formData.department} />
            <input type="hidden" name="interests" value={formData.interests} />
            <input type="hidden" name="interviewSlotsStr" value={JSON.stringify(formData.interviewSlots)} />
            {formData.interviewSlots.map(slot => (
              <input key={slot} type="hidden" name="interviewSlots" value={slot} />
            ))}

            {state.error && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-300 p-4 rounded-2xl text-center font-bold mb-6 backdrop-blur-md text-sm">
                {state.error}
              </div>
            )}

            <div className="relative min-h-[380px]">
              <AnimatePresence mode="wait">
                {/* STEP 1: Personal & Contact Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                        <User size={16} className="text-[#161e35] dark:text-cyan-400" />
                        الاسم الثلاثي
                        <span className="text-red-500">*</span>
                      </label>
                      <input 
                        name="fullName" 
                        required 
                        type="text" 
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all placeholder:text-gray-400 text-sm sm:text-base" 
                        placeholder="مثال: أحمد محمد محمود" 
                      />
                    </div>

                    {/* Gender Selector (النوع) */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Sparkle size={16} className="text-[#161e35] dark:text-cyan-400" />
                        النوع
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleGenderSelect("ذكر")}
                          className={cn(
                            "py-3 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
                            formData.gender === "ذكر"
                              ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-500/25 dark:to-teal-500/25 dark:text-cyan-300 border-[#161e35] dark:border-cyan-400 shadow-sm"
                              : "bg-black/[0.02] dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 border-[#d4a373]/20 dark:border-white/10 hover:border-black/20"
                          )}
                        >
                          <span className="text-base">👦</span>
                          <span>ذكر (جوال)</span>
                          {formData.gender === "ذكر" && <Check size={16} className="mr-auto text-[#d4a373] dark:text-cyan-300" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleGenderSelect("أنثى")}
                          className={cn(
                            "py-3 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
                            formData.gender === "أنثى"
                              ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-500/25 dark:to-teal-500/25 dark:text-cyan-300 border-[#161e35] dark:border-cyan-400 shadow-sm"
                              : "bg-black/[0.02] dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 border-[#d4a373]/20 dark:border-white/10 hover:border-black/20"
                          )}
                        >
                          <span className="text-base">👧</span>
                          <span>أنثى (مرشدة)</span>
                          {formData.gender === "أنثى" && <Check size={16} className="mr-auto text-[#d4a373] dark:text-cyan-300" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Phone Number (اتصال) */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Phone size={16} className="text-[#161e35] dark:text-cyan-400" />
                          رقم الهاتف (اتصال)
                          <span className="text-red-500">*</span>
                        </span>
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">للمكالمات الهاتفية</span>
                      </label>
                      <input 
                        name="phone" 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all text-right placeholder:text-gray-400 font-mono text-sm sm:text-base" 
                        placeholder="01xxxxxxxxx" 
                        dir="ltr" 
                      />
                    </div>

                    {/* WhatsApp Number (واتساب) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-bold text-[#0b1a30] dark:text-gray-300 flex items-center gap-2">
                          <MessageSquare size={16} className="text-green-600 dark:text-green-400" />
                          رقم الواتساب
                          <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleSameAsPhoneToggle}
                          className={cn(
                            "text-xs px-2.5 py-1 rounded-lg border transition-all font-semibold flex items-center gap-1",
                            sameAsPhone 
                              ? "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400 font-bold" 
                              : "bg-black/5 dark:bg-white/5 border-transparent text-gray-500 hover:text-black dark:hover:text-white"
                          )}
                        >
                          <Check size={12} className={sameAsPhone ? "opacity-100" : "opacity-0"} />
                          نفس رقم الهاتف
                        </button>
                      </div>
                      <input 
                        name="whatsapp" 
                        required 
                        type="tel" 
                        disabled={sameAsPhone}
                        value={sameAsPhone ? formData.phone : formData.whatsapp}
                        onChange={handleChange}
                        className={cn(
                          "w-full rounded-2xl px-4 py-3.5 transition-all text-right font-mono text-sm sm:text-base focus:outline-none",
                          sameAsPhone
                            ? "bg-black/[0.01] dark:bg-black/20 border border-dashed border-[#d4a373]/30 dark:border-white/10 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                            : "bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 text-[#0b1a30] dark:text-white focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 placeholder:text-gray-400"
                        )}
                        placeholder="01xxxxxxxxx" 
                        dir="ltr" 
                      />
                      {sameAsPhone && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                          سيتم استخدام نفس رقم الهاتف لمراسلتك عبر واتساب. اضغط على الزر أعلاه إذا كان رقم الواتساب مختلفاً.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Academic Info & Department */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Academic Year */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                        <GraduationCap size={16} className="text-[#161e35] dark:text-cyan-400" />
                        الفرقة الدراسية
                        <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="academicYear" 
                        required 
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-4 text-[#0b1a30] dark:text-gray-200 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all cursor-pointer text-sm sm:text-base"
                      >
                        <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2" value="إعدادي">إعدادي</option>
                        <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2" value="الفرقة الأولى">الفرقة الأولى</option>
                        <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2" value="الفرقة الثانية">الفرقة الثانية</option>
                        <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2" value="الفرقة الثالثة">الفرقة الثالثة</option>
                        <option className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2" value="الفرقة الرابعة">الفرقة الرابعة</option>
                      </select>
                    </div>

                    {/* Program Type */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center gap-2">
                        <GraduationCap size={16} className="text-[#161e35] dark:text-cyan-400" />
                        نوع الدراسة
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="programType"
                        required
                        value={formData.programType}
                        onChange={handleChange}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-4 text-[#0b1a30] dark:text-gray-200 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all cursor-pointer text-sm sm:text-base"
                      >
                        <option value="mainstream" className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white">Mainstream</option>
                        <option value="credit" className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white">Credit</option>
                      </select>
                    </div>

                    {/* Department / Specialization (التخصص) */}
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Building2 size={16} className="text-[#161e35] dark:text-cyan-400" />
                          التخصص / القسم الأكاديمي
                          <span className="text-red-500">*</span>
                        </span>
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">هندسة عين شمس</span>
                      </label>
                      
                      <select 
                        name="departmentSelect"
                        value={ASU_DEPARTMENTS.includes(formData.department) ? formData.department : "أخرى (تحديد يدوي)"}
                        onChange={handleDepartmentChange}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-4 text-[#0b1a30] dark:text-gray-200 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all cursor-pointer text-sm sm:text-base"
                      >
                        {ASU_DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept} className="bg-white dark:bg-[#0f172a] text-[#0b1a30] dark:text-white py-2">
                            {dept}
                          </option>
                        ))}
                      </select>

                      {/* If "أخرى (تحديد يدوي)" is chosen, show custom input */}
                      {(!ASU_DEPARTMENTS.includes(formData.department) || formData.department === "أخرى (تحديد يدوي)") && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3"
                        >
                          <input
                            type="text"
                            placeholder="اكتب اسم تخصصك أو برنامجك الأكاديمي (مثال: CCE / BME / هندسة...)"
                            value={customDept}
                            onChange={handleCustomDeptChange}
                            required
                            className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/40 dark:border-cyan-500/30 rounded-2xl px-4 py-3.5 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 text-sm"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Scouting Interests */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-[#0b1a30] dark:text-gray-300 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Sparkles size={16} className="text-[#161e35] dark:text-cyan-400" />
                          مجالات الاهتمام والهوايات
                        </span>
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">اختياري</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        اختر الشارات التي تعبر عن اهتماماتك أو اكتبها بحرية في الصندوق بالأسفل:
                      </p>

                      {/* Quick Tag Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {INTEREST_TAGS.map((tag) => {
                          const isSelected = formData.interests.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleInterestTag(tag)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                                isSelected
                                  ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-500/30 dark:to-teal-500/30 dark:text-cyan-300 border-[#161e35] dark:border-cyan-400 shadow-sm scale-105"
                                  : "bg-black/[0.03] dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-[#d4a373]/20 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                              )}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>

                      <textarea 
                        name="interests" 
                        value={formData.interests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-black/[0.03] dark:bg-black/40 border border-[#d4a373]/30 dark:border-white/10 rounded-2xl px-4 py-3 text-[#0b1a30] dark:text-white focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#161e35] dark:focus:ring-cyan-400 transition-all placeholder:text-gray-400 resize-none text-sm" 
                        placeholder="التخييم، الفنون، الرياضة، الميديا، التصميم، البرمجة، الخدمة العامة..." 
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Interview Slots (المواعيد المتاحة) */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-bold text-[#0b1a30] dark:text-gray-300 flex items-center gap-2">
                          <CalendarCheck size={16} className="text-[#161e35] dark:text-cyan-400" />
                          اختر المواعيد المناسبة لك للإنترفيو (Slots)
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        حدد الأيام والفترات التي تكون فيها متاحاً بالكلية لإجراء المقابلة الشخصية (يمكنك اختيار أكثر من موعد):
                      </p>
                    </div>

                    {/* Days Navigation Tabs */}
                    <div className="flex gap-1.5 p-1 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl border border-[#d4a373]/20 dark:border-white/5 overflow-x-auto scrollbar-none">
                      {INTERVIEW_DAYS.map((day) => {
                        const count = getSelectedCountForDay(day.name);
                        const isDayActive = selectedDayId === day.id;
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => setSelectedDayId(day.id)}
                            className={cn(
                              "flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all relative flex flex-col items-center gap-1",
                              isDayActive
                                ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-500/25 dark:to-teal-500/25 dark:text-cyan-300 shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            )}
                          >
                            <span>{day.name}</span>
                            {count > 0 && (
                              <span className="w-5 h-5 rounded-full bg-[#d4a373] text-[#0b1a30] dark:bg-cyan-400 dark:text-[#080b10] text-[10px] font-black flex items-center justify-center">
                                {count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Slots for current selected day */}
                    <div className="bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-2xl border border-[#d4a373]/20 dark:border-white/5">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5 dark:border-white/5">
                        <span className="font-bold text-sm text-[#0b1a30] dark:text-white flex items-center gap-1.5">
                          <Calendar size={15} className="text-[#d4a373] dark:text-cyan-400" />
                          فترات يوم {currentDay.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleAllSlotsForDay(currentDay.name)}
                          className="text-xs text-[#8c5e2d] dark:text-cyan-400 font-bold hover:underline"
                        >
                          تحديد / إلغاء كل فترات اليوم
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TIME_SLOTS.map((slot) => {
                          const slotIdentifier = `${currentDay.name}: ${slot.label}`;
                          const isSelected = formData.interviewSlots.includes(slotIdentifier);
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => toggleSlot(currentDay.name, slot.label)}
                              className={cn(
                                "p-3 rounded-xl border text-right transition-all flex items-center justify-between active:scale-95 group",
                                isSelected
                                  ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-500/25 dark:to-teal-500/25 dark:text-cyan-300 border-[#161e35] dark:border-cyan-400 shadow-sm"
                                  : "bg-white/60 dark:bg-black/30 text-gray-700 dark:text-gray-300 border-[#d4a373]/20 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={cn(
                                  "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                                  isSelected
                                    ? "bg-[#d4a373] border-[#d4a373] text-[#0b1a30] dark:bg-cyan-400 dark:border-cyan-400 dark:text-black font-black"
                                    : "border-black/20 dark:border-white/20 group-hover:border-black/40"
                                )}>
                                  {isSelected && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className="text-xs sm:text-sm font-bold">{slot.label}</span>
                              </div>
                              <span className={cn(
                                "text-[11px] px-2 py-0.5 rounded-md",
                                isSelected 
                                  ? "bg-white/15 dark:bg-cyan-500/20 text-white dark:text-cyan-200" 
                                  : "bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                              )}>
                                {slot.period}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Summary of Selected Slots */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#0b1a30] dark:text-gray-300">
                          المواعيد المحددة: ({formData.interviewSlots.length})
                        </span>
                        {formData.interviewSlots.length === 0 && (
                          <span className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                            ⚠️ برجاء اختيار موعد واحد على الأقل
                          </span>
                        )}
                      </div>

                      {formData.interviewSlots.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                          {formData.interviewSlots.map((slot) => (
                            <span 
                              key={slot} 
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#161e35]/10 dark:bg-cyan-500/15 text-[#161e35] dark:text-cyan-300 border border-[#161e35]/20 dark:border-cyan-500/30"
                            >
                              <Clock size={12} />
                              {slot}
                              <button
                                type="button"
                                onClick={() => removeSlot(slot)}
                                className="hover:bg-red-500/20 hover:text-red-500 rounded p-0.5 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-2 text-xs text-gray-400 border border-dashed border-black/10 dark:border-white/10 rounded-xl">
                          لم يتم تحديد أي موعد بعد. اضغط على الفترات بالأعلى لتحديدها.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="flex gap-4 mt-8 pt-4 border-t border-black/5 dark:border-white/5">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex-1 bg-black/5 hover:bg-black/10 text-[#0b1a30] dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-95 border border-black/5 dark:border-white/5 text-sm sm:text-base"
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
                  className="flex-1 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(22,30,53,0.25)] dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 text-sm sm:text-base"
                >
                  التالي
                  <ChevronLeft size={18} />
                </button>
              ) : (
                <button 
                  disabled={pending || !canGoNext()} 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:brightness-105 text-[#0b1a30] dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(212,163,115,0.35)] dark:shadow-[0_0_20px_rgba(45,212,191,0.45)] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 text-sm sm:text-base"
                >
                  {pending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      تأكيد وإرسال الطلب
                      <Send size={18} className="rotate-180" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
