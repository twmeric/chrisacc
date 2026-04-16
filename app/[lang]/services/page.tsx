import { Locale } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import { getLocaleCMS } from "@/lib/cms-data";
import PageBanner from "@/components/ui/PageBanner";
import ServiceCard from "@/components/ui/ServiceCard";
import WhyChoose from "@/components/sections/WhyChoose";
import CTASection from "@/components/sections/CTASection";

interface ServicesPageProps {
  params: Promise<{ lang: Locale }>;
}

const iconMap: Record<string, string> = {
  audit: "fa-search-dollar",
  tax: "fa-calculator",
  risk: "fa-shield-alt",
  forensic: "fa-balance-scale",
  consulting: "fa-chart-line",
  deals: "fa-handshake",
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);
  const t = cms.services;
  const services = getAllMarkdownFiles("services", lang).filter((s) =>
    ["audit", "tax", "risk", "forensic", "consulting", "deals"].includes(s.slug)
  );

  return (
    <>
      <PageBanner lang={lang} title={t.pageTitle} />
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
              {t.introTitle}
              <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-light">{t.introDesc}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                lang={lang}
                slug={s.slug}
                title={s.data.title as string}
                description={s.data.short_description as string}
                iconName={iconMap[s.slug] || "fa-chart-line"}
              />
            ))}
          </div>
        </div>
      </section>
      <WhyChoose lang={lang} data={t.whyChoose} />
      <CTASection lang={lang} title={t.cta.title} description={t.cta.desc} primaryBtn={t.cta.btn} />
    </>
  );
}
