import type { Metadata } from "next";
// 1. 引入雙字體：Inter 用於內文，Playfair Display 用於高階標題
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"; // 確保路徑正確
import { CMSProvider } from "@/context/CMSContext";

// 設定內文字體
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// 設定高階標題字體 (襯線體)
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LT CPA | Excellence in Professional Services",
  description: "Providing sophisticated audit, tax advisory, and strategic consulting for organizations that demand excellence and precision.",
  keywords: "audit, tax advisory, forensic accounting, consulting, M&A, Hong Kong accounting, professional services",
  // 增加高階感的 Icon 設定 (如果有圖標檔案)
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. 將兩個字體變數注入 HTML class
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-[#fdfdfb] text-slate-900 selection:bg-[#c5a059] selection:text-white">
        <CMSProvider>
          {children}
        </CMSProvider>
      </body>
    </html>
  );
}
