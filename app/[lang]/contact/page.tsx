import { Suspense } from "react";
import { Locale } from "@/lib/i18n-config";
import PageBanner from "@/components/ui/PageBanner";
import ContactCards from "@/components/sections/ContactCards";
import ContactForm from "@/components/sections/ContactForm";
import MapSection from "@/components/sections/MapSection";
import FAQSection from "@/components/sections/FAQSection";

interface ContactPageProps {
  params: Promise<{ lang: Locale }>;
}

const titles: Record<Locale, string> = {
  "zh-hant": "聯絡我們",
  "zh-hans": "联络我们",
  en: "Contact Us",
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  return (
    <>
      <PageBanner lang={lang} title={titles[lang]} />
      <ContactCards lang={lang} />
      <Suspense fallback={<div className="px-4 py-16 md:py-24"><div className="mx-auto max-w-6xl h-64 animate-pulse rounded-xl bg-gray-100" /></div>}>
        <ContactForm lang={lang} />
      </Suspense>
      <MapSection lang={lang} />
      <FAQSection lang={lang} />
    </>
  );
}
