import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";

interface ServiceHeroV2Props {
  lang: Locale;
  title: string;
  tagline: string;
  description: string;
}

export default function ServiceHeroV2({ lang, title, tagline, description }: ServiceHeroV2Props) {
  const cms = getLocaleCMS(lang);
  const homeLabel = cms.header.navItems[0]?.label || (lang === "en" ? "Home" : lang === "zh-hans" ? "首页" : "首頁");
  const servicesItem = cms.header.navItems.find((i) => i.url === "/services/");
  const servicesLabel = servicesItem?.label || (lang === "en" ? "Services" : lang === "zh-hans" ? "服务范围" : "服務範圍");

  return (
    <section
      className="section-dark relative mt-[72px] flex min-h-[400px] items-center justify-center bg-cover bg-center px-4 py-20 text-center text-white md:min-h-[500px] md:py-28"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.95), rgba(49, 130, 206, 0.9)), url('/images/service-hero-bg.jpg')`,
      }}
    >
      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-4 text-sm opacity-90">
          <Link href={`/${lang}/`} className="hover:text-brand-gold">
            {homeLabel}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/services/`} className="hover:text-brand-gold">
            {servicesLabel}
          </Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg italic text-brand-gold md:text-xl">
          {tagline}
        </p>
        {description && (
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
