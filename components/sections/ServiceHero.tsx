import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";

interface ServiceHeroProps {
  lang: Locale;
  // New pillar page props
  pageTitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroQuote?: string;
  // Existing service page props
  title?: string;
  tagline?: string;
}

const aboutUsLabels: Record<string, string> = {
  en: "About Us",
  "zh-hant": "關於我們",
  "zh-hans": "关于我们",
};

const homeLabels: Record<string, string> = {
  en: "Home",
  "zh-hant": "首頁",
  "zh-hans": "首页",
};

export default function ServiceHero({
  lang,
  pageTitle,
  heroTitle,
  heroSubtitle,
  heroQuote,
  title,
  tagline,
}: ServiceHeroProps) {
  // Existing service detail hero
  if (title && tagline) {
    const cms = getLocaleCMS(lang);
    const homeLabel = cms.header.navItems[0]?.label || homeLabels[lang] || homeLabels.en;
    const servicesItem = cms.header.navItems.find((i) => i.url === "/services/");
    const servicesLabel =
      servicesItem?.label ||
      (lang === "en" ? "Services" : lang === "zh-hans" ? "服务范围" : "服務範圍");

    return (
      <section
        className="relative mt-[72px] flex min-h-[320px] items-center justify-center bg-cover bg-center text-center text-white md:min-h-[400px]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.9), rgba(49, 130, 206, 0.85)), url('/images/service-hero-bg.jpg')`,
        }}
      >
        <div className="relative z-10 px-4">
          <div className="mb-3 text-sm opacity-90">
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
          <p className="mx-auto max-w-2xl text-lg italic text-brand-gold md:text-xl">
            「{tagline}」
          </p>
        </div>
      </section>
    );
  }

  // New pillar page hero (purpose / value / commitment)
  const homeHref = lang === "en" ? "/" : `/${lang}/`;
  const aboutLabel = aboutUsLabels[lang] || aboutUsLabels.en;
  const homeLabel = homeLabels[lang] || homeLabels.en;

  return (
    <section
      className="relative mt-[72px] px-4 py-16 text-center text-white md:py-24"
      style={{
        backgroundImage: "linear-gradient(135deg, #1a3a5c, #2c5282)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <nav className="mb-4 text-sm text-white/80">
          <Link href={homeHref} className="transition hover:text-brand-gold">
            {homeLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{aboutLabel}</span>
          <span className="mx-2">/</span>
          <span className="text-white">{pageTitle}</span>
        </nav>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{heroTitle}</h1>
        <p className="mb-6 text-xl italic text-brand-gold md:text-2xl">
          {heroSubtitle}
        </p>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
          {heroQuote}
        </p>
      </div>
    </section>
  );
}
