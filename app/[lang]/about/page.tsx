import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import PageBanner from "@/components/ui/PageBanner";
import WhyChoose from "@/components/sections/WhyChoose";
import AboutIntro from "@/components/sections/AboutIntro";
import MissionVision from "@/components/sections/MissionVision";
import CoreValues from "@/components/sections/CoreValues";
import TeamSection from "@/components/sections/TeamSection";
import TimelineSection from "@/components/sections/TimelineSection";
import CTASection from "@/components/sections/CTASection";

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);

  return (
    <>
      <PageBanner lang={lang} title={cms.about.pageTitle} />
      <WhyChoose lang={lang} data={cms.about.whyChoose} />
      <AboutIntro lang={lang} data={cms.about.intro} />
      <MissionVision lang={lang} data={cms.about.missionVision} />
      <CoreValues lang={lang} data={cms.about.coreValues} />
      {cms.about.team.enabled && <TeamSection lang={lang} data={cms.about.team} />}
      <TimelineSection lang={lang} data={cms.about.timeline} />
      <CTASection lang={lang} title={cms.about.cta.title} description={cms.about.cta.desc} primaryBtn={cms.about.cta.btn} href={cms.about.cta.href} />
    </>
  );
}
