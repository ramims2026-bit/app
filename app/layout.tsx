import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SabanOS | פלטפורמת AI לעסקים",
  description: "ניהול חכם מבוסס בינה מלאכותית לעסקים קטנים ובינוניים",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* קישור קריטי לעיצוב בכל הנתיבים באתר */}
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body className={`${inter.className} antialiased bg-[#020617] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
