import Link from "next/link";
import { Locale } from "@/lib/i18n-config";

interface ContactCTAProps {
  lang: Locale;
}

const copy: Record<Locale, { title: string; desc: string; btn: string }> = {
  "zh-hant": {
    title: "準備好開始合作了嗎？",
    desc: "立即聯絡我們，讓專業團隊為您提供最佳的財務解決方案",
    btn: "聯絡我們",
  },
  "zh-hans": {
    title: "准备好开始合作了吗？",
    desc: "立即联络我们，让专业团队为您提供最佳的财务解决方案",
    btn: "联络我们",
  },
  en: {
    title: "Ready to Start Working Together?",
    desc: "Contact us today and let our professional team provide the best financial solutions for you",
    btn: "Contact Us",
  },
};

export default function ContactCTA({ lang }: ContactCTAProps) {
  const t = copy[lang];
  return (
    <section className="bg-brand-cream px-4 py-20 text-center md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-brand-navy md:text-4xl">{t.title}</h2>
        <p className="mb-8 text-lg text-text-light">{t.desc}</p>
        <Link
          href={`/${lang}/contact/`}
          className="inline-block rounded-full bg-brand-gold px-10 py-4 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-brand-navy hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          {t.btn}
        </Link>
      </div>
    </section>
  );
}
