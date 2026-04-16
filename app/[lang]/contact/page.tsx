import { Suspense } from "react";
import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import PageBanner from "@/components/ui/PageBanner";
import ContactCards from "@/components/sections/ContactCards";
import ContactForm from "@/components/sections/ContactForm";
import MapSection from "@/components/sections/MapSection";
import FAQSection from "@/components/sections/FAQSection";

interface ContactPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);

  return (
    <>
      <PageBanner lang={lang} title={cms.contact.pageTitle} />
      <ContactCards lang={lang} data={cms.contact.cards} />
      <Suspense fallback={<div className="px-4 py-16 md:py-24"><div className="mx-auto max-w-6xl h-64 animate-pulse rounded-xl bg-gray-100" /></div>}>
        <ContactForm lang={lang} data={cms.contact.form} map={cms.contact.map} />
      </Suspense>
      <MapSection lang={lang} data={cms.contact.map} />
      <FAQSection lang={lang} data={cms.contact.faq} />
    </>
  );
}
