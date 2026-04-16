import { Locale } from "@/lib/i18n-config";
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

const titles: Record<Locale, string> = {
  "zh-hant": "關於我們",
  "zh-hans": "关于我们",
  en: "About Us",
};

const ctaCopy: Record<Locale, { title: string; desc: string; btn: string }> = {
  "zh-hant": {
    title: "與我們攜手合作",
    desc: "無論您的企業規模大小，我們都能為您提供專業、可靠的財務解決方案",
    btn: "立即聯絡我們",
  },
  "zh-hans": {
    title: "与我们携手合作",
    desc: "无论您的企业规模大小，我们都能为您提供专业、可靠的财务解决方案",
    btn: "立即联络我们",
  },
  en: {
    title: "Partner with Us",
    desc: "Regardless of your business size, we can provide professional and reliable financial solutions",
    btn: "Contact Us Now",
  },
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const cta = ctaCopy[lang];

  return (
    <>
      <PageBanner lang={lang} title={titles[lang]} />
      <WhyChoose lang={lang} />
      <AboutIntro lang={lang} />
      <MissionVision lang={lang} />
      <CoreValues lang={lang} />
      <TeamSection lang={lang} />
      <TimelineSection lang={lang} />
      <CTASection lang={lang} title={cta.title} description={cta.desc} primaryBtn={cta.btn} />
    </>
  );
}
