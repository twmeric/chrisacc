import Link from "next/link";
import { Locale } from "@/lib/i18n-config";

interface PageBannerProps {
  lang: Locale;
  title: string;
}

export default function PageBanner({ lang, title }: PageBannerProps) {
  return (
    <section
      className="relative mt-[72px] flex h-[280px] items-center justify-center bg-cover bg-center text-center text-white md:h-[350px]"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.9), rgba(49, 130, 206, 0.85)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80')`,
      }}
    >
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="text-base opacity-90">
          <Link href={`/${lang}/`} className="hover:text-brand-gold">
            {lang === "en" ? "Home" : lang === "zh-hans" ? "首页" : "首頁"}
          </Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  );
}
