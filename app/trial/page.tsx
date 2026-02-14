"use client";

import React, { useState } from 'react';
import { Sun, Moon, Upload, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck, Zap } from 'lucide-react';

export default function TrialPage() {
  const [isDark, setIsDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      
      {/* Header */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto border-b border-white/5">
        <div className="text-3xl font-black tracking-tighter italic">
          Saban<span className="text-blue-500 underline decoration-blue-500/30">OS</span>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-2xl transition-all shadow-xl ${isDark ? 'bg-white/5 hover:bg-white/10 text-yellow-400' : 'bg-white border border-slate-200 text-blue-600'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Marketing Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
            <Zap size={14} /> המהפכה כבר כאן
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            הגיע הזמן לעבור ל-<span className="text-blue-500">AI</span> מלא.
          </h1>
          <p className="text-xl opacity-60 leading-relaxed max-w-lg">
            SabanOS בונה עבורכם מערכת אינטליגנטית שמנהלת לקוחות, פניות והזמנות - הכל באוטומציה מלאה. השאירו פרטים והתחילו עכשיו.
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 font-medium">
              <ShieldCheck className="text-green-500" /> אבטחת מידע בתקן בינלאומי
            </div>
            <div className="flex items-center gap-3 font-medium">
              <CheckCircle2 className="text-green-500" /> 14 ימי ניסיון ללא התחייבות
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className={`rounded-[3rem] p-8 md:p-12 shadow-2xl border transition-all duration-300 ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200'}`}>
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">הבקשה התקבלה!</h2>
              <p className="opacity-60 text-lg">אנחנו מכינים את הבוט הראשון שלכם. ניצור קשר תוך דקות.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }}>
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute right-4 top-4 opacity-40 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input required type="text" placeholder="שם מלא" className={`w-full pr-12 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-transparent'}`} />
                </div>

                <div className="relative group">
                  <Building2 className="absolute right-4 top-4 opacity-40 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input required type="text" placeholder="שם העסק" className={`w-full pr-12 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-transparent'}`} />
                </div>

                <div className="relative group">
                  <Phone className="absolute right-4 top-4 opacity-40 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input required type="tel" placeholder="טלפון נייד" className={`w-full pr-12 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-transparent'}`} />
                </div>
              </div>

              {/* Logo Upload Box */}
              <div className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all group hover:border-blue-500/50 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-300 bg-slate-50'}`}>
                <Upload className="mx-auto mb-3 opacity-20 group-hover:scale-110 transition-transform" size={32} />
                <p className="text-sm font-bold opacity-40">העלו לוגו לעסק (אופציונלי)</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-600/30 transform transition hover:-translate-y-1 active:scale-95"
              >
                התחלת תקופת ניסיון חינם
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-12 text-center opacity-20 text-sm tracking-widest">
        SABANOS INTELLIGENCE • TAYIBE • 2026
      </footer>
    </div>
  );
}
