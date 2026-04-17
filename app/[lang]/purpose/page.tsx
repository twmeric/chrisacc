import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import ServiceHero from "@/components/sections/ServiceHero";
import AccordionCards from "@/components/sections/AccordionCards";
import CTASection from "@/components/sections/CTASection";

interface PurposePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PurposePage({ params }: PurposePageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);
  const t = cms.purpose;

  return (
    <>
      <ServiceHero
        lang={lang}
        pageTitle={t.pageTitle}
        heroTitle={t.heroTitle}
        heroSubtitle={t.heroSubtitle}
        heroQuote={t.heroQuote}
      />
      <section className="bg-brand-cream px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <AccordionCards items={t.items} />
        </div>
      </section>
      <CTASection
        lang={lang}
        title={t.cta.title}
        description={t.cta.desc}
        primaryBtn={t.cta.btn}
        href={t.cta.href}
      />
    </>
  );
}
