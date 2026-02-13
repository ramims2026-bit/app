"use client";

import React, { useState, useEffect } from "react";
import { businessLogics, BusinessType } from "../lib/businessLogics";
import { processBusinessRequest } from "../lib/actions/gemini-brain";

export default function ChatInterface() {
  const [selectedType, setSelectedType] = useState<BusinessType>('building_materials');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentLogic = businessLogics[selectedType];

  // אתחול הודעת פתיחה בכל פעם שסוג העסק משתנה
  useEffect(() => {
    setMessages([{ role: "assistant", content: currentLogic.welcomeMessage }]);
  }, [selectedType]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // שליחה ל-Gemini יחד עם ה-System Prompt הייחודי לסוג העסק
      const response = await processBusinessRequest(input, currentLogic.systemPrompt);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden" dir="rtl">
      {/* כותרת עם בחירת סוג עסק - המזהה הייחודי */}
      <div className="p-4 bg-white/10 border-b border-white/10 flex justify-between items-center">
        <span className="text-xs font-mono text-green-500">{currentLogic.id}</span>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as BusinessType)}
          className="bg-black text-white text-sm rounded-lg px-2 py-1 outline-none border border-white/20"
        >
          {Object.entries(businessLogics).map(([key, logic]) => (
            <option key={key} value={key}>{logic.displayName}</option>
          ))}
        </select>
      </div>

      {/* אזור ההודעות */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' ? 'bg-green-500 text-black font-bold' : 'bg-white/10 text-white'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-slate-500 animate-pulse">הבוט של {currentLogic.displayName} מקליד...</div>}
      </div>

      {/* שורת קלט */}
      <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
        <input 
          type="text"
          value={input}
          placeholder={currentLogic.inputPlaceholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500"
        />
        <button onClick={handleSend} className="bg-green-500 text-black px-6 py-2 rounded-xl font-bold hover:bg-green-400 transition-colors">
          שלח
        </button>
      </div>
    </div>
  );
}
