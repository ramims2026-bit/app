"use client";

import React, { useState } from 'react';
import { Sun, Moon, Upload, CheckCircle2, Building2, Phone, Mail, User } from 'lucide-react';

export default function TrialPage() {
  const [isDark, setIsDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-black tracking-tighter italic">
          Saban<span className="text-blue-500">OS</span>
        </div>
        <button 
          onClick={toggleTheme}
          className={`p-3 rounded-2xl transition-all shadow-lg ${isDark ? 'bg-white/5 hover:bg-white/10 text-yellow-400' : 'bg-black/5 hover:bg-black/10 text-blue-600'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            הצטרפו למהפכת ה-<span className="text-blue-500">AI</span>
          </h1>
          <p className={`text-lg opacity-70 max-w-2xl mx-auto`}>
            השאירו פרטים ותוך דקות נקים עבורכם עוזר אישי חכם המותאם בדיוק לצרכי העסק שלכם.
          </p>
        </div>

        <div className={`rounded-[2.5rem] p-8 md:p-12 shadow-2xl border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          {isSuccess ? (
            <div className="text-center py-12 animate-in fade-in zoom-in">
              <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
              <h2 className="text-3xl font-bold mb-4">נרשמת בהצלחה!</h2>
              <p className="opacity-70">אנחנו כבר עובדים על סביבת העבודה החדשה שלך.</p>
            </div>
          ) : (
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* שם מלא */}
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <User size={16} /> שם מלא
                  </label>
                  <input type="text" className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-black'}`} placeholder="ישראל ישראלי" />
                </div>

                {/* שם העסק */}
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <Building2 size={16} /> שם העסק
                  </label>
                  <input type="text" className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-black'}`} placeholder="העסק שלי בע״מ" />
                </div>

                {/* טלפון */}
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <Phone size={16} /> טלפון נייד
                  </label>
                  <input type="tel" className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-black'}`} placeholder="050-0000000" />
                </div>

                {/* אימייל */}
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <Mail size={16} /> דוא״ל עסקי
                  </label>
                  <input type="email" className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-black'}`} placeholder="office@business.com" />
                </div>
              </div>

              {/* העלאת לוגו */}
              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center gap-2">
                  <Upload size={16} /> לוגו העסק
                </label>
                <div className={`border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer hover:border-blue-500 group ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-300 bg-slate-50'}`}>
                  <Upload className="mx-auto mb-4 opacity-30 group-hover:scale-110 transition-transform" size={40} />
                  <p className="text-sm opacity-50">גררו לכאן את הלוגו או לחצו לבחירה</p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setIsSuccess(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 transform transition hover:-translate-y-1 active:scale-95"
              >
                התחלת תקופת ניסיון חינם
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-10 text-center opacity-30 text-xs">
        © 2026 SabanOS Intelligence Systems. All rights reserved.
      </footer>
    </div>
  );
}
