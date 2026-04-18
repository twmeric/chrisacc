import type { Metadata } from "next";
import { i18n, Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import SetHtmlLang from "@/components/SetHtmlLang";
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
  const cms = getLocaleCMS(locale);

  const bodyFont = locale === "en"
    ? '"Inter", system-ui, sans-serif'
    : '"Inter", "Noto Sans TC", "Noto Sans SC", system-ui, sans-serif';
  const headingFont = locale === "en"
    ? '"Inter", system-ui, sans-serif'
    : '"Playfair Display", Georgia, serif';

  return (
    <>
      <SetHtmlLang lang={locale} />
      <style>{`
        body { font-family: ${bodyFont}; }
        h1, h2, h3, h4, h5, h6 { font-family: ${headingFont}; }
      `}</style>
      <AnalyticsTracker />
      <Header
        lang={locale}
        navItems={cms.header.navItems}
        siteName={cms.site.name}
        siteTagline={cms.site.tagline}
        logoUrl={cms.site.logo}
      />
      <main className="flex-1">{children}</main>
      <Footer lang={locale} />
    </>
  );
}
