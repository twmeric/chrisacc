import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";

interface PageBannerProps {
  lang: Locale;
  title: string;
}

export default function PageBanner({ lang, title }: PageBannerProps) {
  const cms = getLocaleCMS(lang);
  const homeLabel = cms.header.navItems[0]?.label || (lang === "en" ? "Home" : lang === "zh-hans" ? "首页" : "首頁");

  return (
    <section
      className="section-dark relative mt-[72px] flex h-[280px] items-center justify-center bg-cover bg-center text-center text-white md:h-[350px]"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.9), rgba(49, 130, 206, 0.85)), url('/images/banner-bg.jpg')`,
      }}
    >
      <div>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{title}</h1>
        <div className="text-base text-white/90">
          <Link href={lang === "en" ? "/" : `/${lang}/`} className="text-white hover:text-brand-gold">
            {homeLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </div>
      </div>
    </section>
  );
}
