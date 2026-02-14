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
        {/* הזרקה ידנית של ה-CSS לכל הדפים למקרה של בעיות ניתוב */}
        <link rel="stylesheet" href="/_next/static/css/tailwind.css" />
      </head>
  <body className={`${inter.className} antialiased bg-[#020617] text-white min-h-screen`}>
  {children}
   </body>
    </html>
  );
}
