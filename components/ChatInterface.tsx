"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { processBusinessRequest } from "@/app/actions/gemini-brain";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "model", content: "היי! אני הסוכן החכם של SabanOS. איך אני יכול לעזור לך לייעל את העסק היום?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // שליחת ההיסטוריה והקונטקסט לפונקציה החדשה שלך
      const aiResponse = await processBusinessRequest(input, messages, {
        name: "SabanOS",
        industry: "Automation & AI"
      });

      setMessages((prev) => [...prev, { role: "model", content: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", content: "סליחה, המוח שלי יצא להפסקה קלה. נסה שוב?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col h-[500px]" dir="rtl">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"} items-end gap-2 animate-in fade-in slide-in-from-bottom-2`}>
            {msg.role === "user" && <div className="p-2 bg-green-500 rounded-full"><User size={16} /></div>}
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-white/10 text-white rounded-br-none" : "bg-green-600 text-white rounded-bl-none"}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
            {msg.role === "model" && <div className="p-2 bg-white/10 rounded-full"><Bot size={16} /></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end items-center gap-2">
            <div className="bg-white/5 p-4 rounded-2xl animate-pulse text-xs text-slate-400">מעבד נתונים...</div>
            <Loader2 className="animate-spin text-green-500" size={16} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="כתוב הודעה..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-2xl transition-all hover:scale-105 active:scale-95"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
