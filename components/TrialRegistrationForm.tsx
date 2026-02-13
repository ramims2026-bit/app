"use client";

import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function TrialRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    industry: "building_materials"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // שמירה ל-Firestore
      await addDoc(collection(db, "trial_requests"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("חלה שגיאה בשמירת הנתונים. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/5 border border-green-500/30 p-8 rounded-3xl text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">נרשמת בהצלחה!</h3>
        <p className="text-slate-400">אנחנו ניצור איתך קשר תוך 24 שעות להפעלת הבוט.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
      <div>
        <label className="block text-sm font-medium mb-2 text-right">שם העסק</label>
        <input
          required
          type="text"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-right outline-none focus:border-green-500 transition-colors"
          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-right">שם איש קשר</label>
        <input
          required
          type="text"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-right outline-none focus:border-green-500 transition-colors"
          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-right">מספר טלפון (וואטסאפ)</label>
        <input
          required
          type="tel"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-right outline-none focus:border-green-500 transition-colors"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : "התחל 10 ימי התנסות חינם"}
      </button>
    </form>
  );
}
