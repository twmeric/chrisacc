import { notFound } from "next/navigation";
import { Locale, i18n } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import { getLocaleCMS } from "@/lib/cms-data";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceOverview from "@/components/sections/ServiceOverview";
import ServiceScope from "@/components/sections/ServiceScope";
import ServiceProcess from "@/components/sections/ServiceProcess";
import WhyChooseService from "@/components/sections/WhyChooseService";
import RelatedServices from "@/components/sections/RelatedServices";
import CTASection from "@/components/sections/CTASection";

interface ServicePageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = ["audit", "tax", "risk", "forensic", "consulting", "deals"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of i18n.locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, slug } = await params;
  const cms = getLocaleCMS(lang);
  const data = cms.servicePages[slug];
  if (!data) return notFound();

  const allServices = getAllMarkdownFiles("services", lang)
    .filter((s) => ["audit", "tax", "risk", "forensic", "consulting", "deals"].includes(s.slug))
    .map((s) => ({ slug: s.slug, title: s.data.title as string, desc: s.data.short_description as string }));

  return (
    <>
      <ServiceHero lang={lang} title={allServices.find((s) => s.slug === slug)?.title || slug} tagline={data.tagline} />
      <ServiceOverview title={data.overviewTitle} paragraphs={data.overview} />
      <ServiceScope lang={lang} title={data.scopeTitle} subtitle={data.serviceScopeSubtitle} items={data.scopeItems} />
      <ServiceProcess lang={lang} title={data.processTitle} subtitle={data.serviceProcessSubtitle} steps={data.processSteps} />
      <WhyChooseService lang={lang} title={data.whyTitle} items={[]} />
      <RelatedServices lang={lang} currentSlug={slug} services={allServices} title={data.relatedServicesTitle} />
      <CTASection
        lang={lang}
        title={data.ctaTitle}
        description={data.ctaDesc}
        primaryBtn={data.ctaBtn}
        secondaryBtn={data.ctaBtn2}
      />
    </>
  );
}
