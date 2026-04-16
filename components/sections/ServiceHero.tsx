import Link from "next/link";
import { Locale } from "@/lib/i18n-config";

interface ServiceHeroProps {
  lang: Locale;
  title: string;
  tagline: string;
}

export default function ServiceHero({ lang, title, tagline }: ServiceHeroProps) {
  return (
    <section
      className="relative mt-[72px] flex min-h-[320px] items-center justify-center bg-cover bg-center text-center text-white md:min-h-[400px]"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.9), rgba(49, 130, 206, 0.85)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80')`,
      }}
    >
      <div className="relative z-10 px-4">
        <div className="mb-3 text-sm opacity-90">
          <Link href={`/${lang}/`} className="hover:text-brand-gold">
            {lang === "en" ? "Home" : lang === "zh-hans" ? "首页" : "首頁"}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/services/audit/`} className="hover:text-brand-gold">
            {lang === "en" ? "Services" : lang === "zh-hans" ? "服务范围" : "服務範圍"}
          </Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg italic text-brand-gold md:text-xl">「{tagline}」</p>
      </div>
    </section>
  );
}
