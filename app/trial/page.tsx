"use client";

import React, { useState } from 'react';
import { Sun, Moon, Upload, CheckCircle2, Building2, Phone, Mail, User } from 'lucide-react';

export default function TrialPage() {
  const [isDark, setIsDark] = useState(true);

  // סגנונות Inline שיעבדו ב-100% גם בלי קבצי CSS חיצוניים
  const theme = {
    bg: isDark ? '#020617' : '#f8fafc',
    card: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    text: isDark ? '#ffffff' : '#0f172a',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
    accent: '#3b82f6'
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', direction: 'rtl', transition: 'all 0.4s ease' }}>
      
      {/* Header */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>
          Saban<span style={{ color: theme.accent }}>OS</span>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)}
          style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: '10px', borderRadius: '14px', cursor: 'pointer', color: isDark ? '#fbbf24' : '#2563eb' }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '16px' }}>הצטרפו ל-<span style={{ color: theme.accent }}>SabanOS</span></h1>
          <p style={{ opacity: 0.6, fontSize: '18px' }}>מערכת הניהול החכמה של העסק שלך</p>
        </div>

        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '32px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} /> שם מלא
              </label>
              <input style={{ padding: '16px', borderRadius: '16px', border: `1px solid ${theme.border}`, background: 'rgba(0,0,0,0.2)', color: 'inherit', outline: 'none' }} placeholder="ישראל ישראלי" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={16} /> שם העסק
              </label>
              <input style={{ padding: '16px', borderRadius: '16px', border: `1px solid ${theme.border}`, background: 'rgba(0,0,0,0.2)', color: 'inherit', outline: 'none' }} placeholder="סבן חומרי בניין" />
            </div>

            <div style={{ border: `2px dashed ${theme.border}`, borderRadius: '20px', padding: '30px', textAlign: 'center', cursor: 'pointer' }}>
              <Upload size={32} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p style={{ fontSize: '14px', opacity: 0.5 }}>לחץ להעלאת לוגו</p>
            </div>

            <button 
              type="button"
              style={{ background: theme.accent, color: 'white', border: 'none', padding: '20px', borderRadius: '18px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', marginTop: '10px' }}
            >
              התחלת ניסיון חינם
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
