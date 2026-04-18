import { notFound } from "next/navigation";
import { Locale, i18n } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import ServiceHeroV2 from "@/components/sections/ServiceHeroV2";
import ServiceOverviewV2 from "@/components/sections/ServiceOverviewV2";
import ServiceScopeV2 from "@/components/sections/ServiceScopeV2";
import ServiceProcessV2 from "@/components/sections/ServiceProcessV2";
import ServiceScenariosV2 from "@/components/sections/ServiceScenariosV2";
import WhyChooseServiceV2 from "@/components/sections/WhyChooseServiceV2";
import RelatedServicesV2 from "@/components/sections/RelatedServicesV2";
import ServiceExtraSections from "@/components/sections/ServiceExtraSections";
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

  const allServices = cms.services.serviceDetails
    .filter((s) => ["audit", "tax", "risk", "forensic", "consulting", "deals"].includes(s.slug))
    .map((s) => ({ slug: s.slug, title: s.title, desc: s.desc }));

  const title = allServices.find((s) => s.slug === slug)?.title || slug;

  return (
    <>
      <ServiceHeroV2 lang={lang} title={title} tagline={data.tagline} description={data.heroDesc} />
      <ServiceOverviewV2
        title={data.overviewTitle}
        paragraphs={data.overview}
        highlight={data.overviewHighlight}
        stat={data.overviewStat}
        stats={data.overviewStats}
        icon={data.overviewIcon}
        image={data.overviewImage}
      />
      <ServiceScopeV2
        title={data.scopeTitle}
        subtitle={data.scopeSubtitle || data.serviceScopeSubtitle || ""}
        items={data.scopeItems}
      />
      {data.processSteps && data.processSteps.length > 0 ? (
        <ServiceProcessV2
          title={data.processTitle}
          subtitle={data.processSubtitle || data.serviceProcessSubtitle || ""}
          steps={data.processSteps}
        />
      ) : data.scenarios && data.scenarios.length > 0 ? (
        <ServiceScenariosV2 title={data.scenariosTitle || data.processTitle} items={data.scenarios} />
      ) : null}

      {data.scenarios2 && data.scenarios2.length > 0 && (
        <ServiceScenariosV2 title={data.scenarios2Title} items={data.scenarios2} />
      )}

      <WhyChooseServiceV2 title={data.whyTitle} subtitle={data.whySubtitle} items={data.whyItems} />
      {data.extraSections && data.extraSections.length > 0 && (
        <ServiceExtraSections sections={data.extraSections} />
      )}
      <RelatedServicesV2
        lang={lang}
        currentSlug={slug}
        title={data.relatedServicesTitle}
        items={data.relatedItems}
      />
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
