import type { Metadata } from "next";
import { i18n, Locale } from "@/lib/i18n-config";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "LTCPA | Professional Accounting Services",
  description: "櫪韜會計師事務所有限公司 - LT CPA Limited provides audit, tax, risk, and business advisory services in Hong Kong.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || i18n.defaultLocale;

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header lang={locale} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} />
      </body>
    </html>
  );
}
