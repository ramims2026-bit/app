"use client";

import React, { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [tailwindLoaded, setTailwindLoaded] = useState(false);
  const [cssPath, setCssPath] = useState("");

  useEffect(() => {
    // בדיקה האם Tailwind עובד (בדיקת צבע מחושב)
    const testElement = document.createElement('div');
    testElement.className = 'bg-red-500';
    document.body.appendChild(testElement);
    const color = window.getComputedStyle(testElement).backgroundColor;
    setTailwindLoaded(color === 'rgb(239, 68, 68)');
    document.body.removeChild(testElement);

    // בדיקה איזה קבצי CSS נטענו
    const links = Array.from(document.getElementsByTagName('link'));
    const cssFiles = links.map(l => l.href).join(', ');
    setCssPath(cssFiles);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', direction: 'rtl', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#3b82f6' }}>🔍 מלשינון אבחון SabanOS</h1>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '12px', backgroundColor: '#222' }}>
        <h2>מצב Tailwind:</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: tailwindLoaded ? '#22c55e' : '#ef4444' }}>
          {tailwindLoaded ? "✅ Tailwind פועל בהצלחה!" : "❌ Tailwind לא נטען בכלל!"}
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '12px' }}>
        <h2>נתיבי CSS שזוהו בדף:</h2>
        <code style={{ wordBreak: 'break-all', color: '#fbbf24' }}>
          {cssPath || "לא נמצאו קבצי CSS חיצוניים"}
        </code>
      </div>

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        <h3>צעדים לתיקון אם Tailwind אדום:</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li>וודא שב-Cloudflare ה-Build Output הוא <b>.vercel/output</b> (ולא static).</li>
          <li>בדוק אם קיים קובץ <b>tailwind.config.ts</b> בשורש הפרויקט.</li>
          <li>וודא שקובץ <b>app/globals.css</b> מכיל את שלוש שורות ה-@tailwind.</li>
        </ul>
      </div>
    </div>
  );
}
