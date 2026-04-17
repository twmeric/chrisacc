import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import PageBanner from "@/components/ui/PageBanner";
import ServicesIntro from "@/components/sections/ServicesIntro";
import ServicesDetails from "@/components/sections/ServicesDetails";
import WhyChooseV2 from "@/components/sections/WhyChooseV2";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

interface ServicesPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);
  const t = cms.services;

  return (
    <>
      <PageBanner lang={lang} title={t.pageTitle} />
      <ServicesIntro title={t.introTitle} desc={t.introDesc} />
      <ServicesDetails lang={lang} items={t.serviceDetails} />
      <WhyChooseV2
        title={t.whyChoose.title}
        desc={t.whyChoose.desc}
        items={t.whyChoose.items}
      />
      <ProcessSection
        title={t.process.title}
        subtitle={t.process.subtitle}
        steps={t.process.steps}
      />
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
