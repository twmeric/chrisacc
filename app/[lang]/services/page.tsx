import { Locale } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import PageBanner from "@/components/ui/PageBanner";
import ServiceCard from "@/components/ui/ServiceCard";
import WhyChoose from "@/components/sections/WhyChoose";
import CTASection from "@/components/sections/CTASection";

interface ServicesPageProps {
  params: Promise<{ lang: Locale }>;
}

const copy: Record<Locale, { introTitle: string; introDesc: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  "zh-hant": {
    introTitle: "專業服務，全面涵蓋",
    introDesc: "櫪韜會計師事務所有限公司提供全方位的專業會計及商業顧問服務，協助企業應對複雜的商業環境，實現可持續發展。",
    ctaTitle: "需要專業諮詢？",
    ctaDesc: "讓我們的專家團隊為您提供量身訂造的解決方案",
    ctaBtn: "免費諮詢",
  },
  "zh-hans": {
    introTitle: "专业服务，全面涵盖",
    introDesc: "櫪韬会计师事务所有限公司提供全方位的专业会计及商业顾问服务，协助企业应对复杂的商业环境，实现可持续发展。",
    ctaTitle: "需要专业咨询？",
    ctaDesc: "让我们的专家团队为您提供量身订造的解决方案",
    ctaBtn: "免费咨询",
  },
  en: {
    introTitle: "Comprehensive Professional Services",
    introDesc: "LT CPA Limited provides a full range of professional accounting and business advisory services to help enterprises navigate complex business environments and achieve sustainable growth.",
    ctaTitle: "Need Professional Advice?",
    ctaDesc: "Let our expert team provide you with tailored solutions",
    ctaBtn: "Free Consultation",
  },
};

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
  const t = copy[lang];
  const services = getAllMarkdownFiles("services", lang).filter((s) =>
    ["audit", "tax", "risk", "forensic", "consulting", "deals"].includes(s.slug)
  );

  return (
    <>
      <PageBanner lang={lang} title={lang === "en" ? "Services" : lang === "zh-hans" ? "服务范围" : "服務範圍"} />
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
      <WhyChoose lang={lang} />
      <CTASection lang={lang} title={t.ctaTitle} description={t.ctaDesc} primaryBtn={t.ctaBtn} />
    </>
  );
}
