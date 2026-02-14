"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { businessLogics, BusinessType } from "../lib/businessLogics";
import { processBusinessRequest } from "../lib/actions/gemini-brain";

// קומפוננטת הצ'אט הפנימית
function ChatContent() {
  const searchParams = useSearchParams();
  const bizParam = searchParams.get("biz") as BusinessType;

  // אם יש פרמטר ב-URL, נשתמש בו. אם לא, נלך על ברירת מחדל.
  const initialType: BusinessType = (bizParam && businessLogics[bizParam]) 
    ? bizParam 
    : 'building_materials';

  const [selectedType, setSelectedType] = useState<BusinessType>(initialType);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentLogic = businessLogics[selectedType];

  useEffect(() => {
    // מאפס את הצ'אט כשהסוג משתנה
    setMessages([{ role: "assistant", content: currentLogic.welcomeMessage }]);
  }, [selectedType]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // שליחה ל-Gemini עם הקונטקסט המלא של העסק
      const response = await processBusinessRequest(input, messages, currentLogic);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md" dir="rtl">
      {/* Header דינמי */}
      <div className="p-4 bg-white/10 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-bold text-white">{currentLogic.displayName}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{currentLogic.id}</span>
      </div>

      {/* הודעות */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-black font-semibold' 
                : 'bg-white/10 text-white border border-white/5'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-green-500/50 mr-2">הבוט בתהליך חשיבה...</div>}
      </div>

      {/* קלט */}
      <div className="p-4 bg-black/60 border-t border-white/10 flex gap-2">
        <input 
          type="text"
          value={input}
          placeholder={currentLogic.inputPlaceholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-500 transition-all"
        />
        <button onClick={handleSend} className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-xl font-bold transition-transform active:scale-95">
          שלח
        </button>
      </div>
    </div>
  );
}

// Wrapper בגלל ש-Next.js מחייב Suspense לשימוש ב-SearchParams
export default function ChatInterface() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">טוען מערכת...</div>}>
      <ChatContent />
    </Suspense>
  );
}
