import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SabanOS | פתרונות AI לעסקים",
  description: "העסק שלך עובד בשבילך - אוטומציה ובינה מלאכותית בוואטסאפ ובניהול העסק",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} antialiased bg-[#020617] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
