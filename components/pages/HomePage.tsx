import { Locale } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import HeroSlider from "@/components/sections/HeroSlider";
import ServiceCard from "@/components/ui/ServiceCard";
import ContactCTA from "@/components/sections/ContactCTA";
import SectionHeader from "@/components/ui/SectionHeader";

interface HomePageProps {
  lang: Locale;
}

const serviceSlugs = ["audit", "tax", "risk", "forensic", "consulting", "deals"];

const backgrounds = ["/images/hero-bg-1.jpg", "/images/hero-bg-2.jpg", "/images/hero-bg-3.jpg"];

const heroSlides: Record<Locale, { title: string; subtitle: string; cta: string; href: string }[]> = {
  "zh-hant": [
    { title: "專業會計服務", subtitle: "提供全面的審計、稅務及顧問服務，助您的業務穩健發展", cta: "了解更多", href: "/services/" },
    { title: "值得信賴的合作夥伴", subtitle: "憑藉豐富的專業知識和經驗，我們協助企業在香港及國際市場蓬勃發展", cta: "聯絡我們", href: "/contact/" },
    { title: "策略性商業顧問", subtitle: "為您的企業提供量身訂造的財務解決方案，創造可持續的商業價值", cta: "免費諮詢", href: "/contact/" },
  ],
  "zh-hans": [
    { title: "专业会计服务", subtitle: "提供全面的审计、税务及顾问服务，助您的业务稳健发展", cta: "了解更多", href: "/services/" },
    { title: "值得信赖的合作伙伴", subtitle: "凭借丰富的专业知识和经验，我们协助企业在香港及国际市场蓬勃发展", cta: "联络我们", href: "/contact/" },
    { title: "策略性商业顾问", subtitle: "为您的企业量身订造的财务解决方案，创造可持续的商业价值", cta: "免费咨询", href: "/contact/" },
  ],
  en: [
    { title: "Professional Accounting Services", subtitle: "Comprehensive audit, tax, and advisory services to help your business thrive", cta: "Learn More", href: "/services/" },
    { title: "Trusted Partner", subtitle: "With extensive expertise, we help businesses grow in Hong Kong and global markets", cta: "Contact Us", href: "/contact/" },
    { title: "Strategic Business Advisory", subtitle: "Tailored financial solutions to create sustainable commercial value for your business", cta: "Free Consultation", href: "/contact/" },
  ],
};

const sectionCopy: Record<Locale, { servicesTitle: string; servicesSubtitle: string }> = {
  "zh-hant": {
    servicesTitle: "服務範圍",
    servicesSubtitle: "我們提供全面的專業會計及顧問服務，滿足您不同的業務需求",
  },
  "zh-hans": {
    servicesTitle: "服务范围",
    servicesSubtitle: "我们提供全面的专业会计及顾问服务，满足您不同的业务需求",
  },
  en: {
    servicesTitle: "Our Services",
    servicesSubtitle: "We provide comprehensive professional accounting and advisory services to meet your business needs",
  },
};

export default function HomePage({ lang }: HomePageProps) {
  const services = getAllMarkdownFiles("services", lang).filter((s) => serviceSlugs.includes(s.slug));
  const copy = sectionCopy[lang];

  return (
    <>
      <HeroSlider lang={lang} slides={heroSlides[lang]} backgrounds={backgrounds} />

      <section className="bg-brand-cream px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title={copy.servicesTitle} subtitle={copy.servicesSubtitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard
                key={svc.slug}
                lang={lang}
                slug={svc.slug}
                title={svc.data.title as string}
                description={svc.data.short_description as string}
                iconName={getServiceIcon(svc.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA lang={lang} />
    </>
  );
}

function getServiceIcon(slug: string) {
  const map: Record<string, string> = {
    audit: "fa-clipboard-check",
    tax: "fa-calculator",
    risk: "fa-shield-alt",
    forensic: "fa-search-dollar",
    consulting: "fa-chart-line",
    deals: "fa-handshake",
  };
  return map[slug] || "fa-chart-line";
}
