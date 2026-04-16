import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  lang: Locale;
}

const content: Record<Locale, { aboutTitle: string; aboutDesc: string; linksTitle: string; servicesTitle: string; contactTitle: string; rights: string }> = {
  "zh-hant": {
    aboutTitle: "櫪韜會計師事務所",
    aboutDesc: "專業會計、審計、稅務及商業顧問服務，為您的企業穩健發展保駕護航。",
    linksTitle: "快速連結",
    servicesTitle: "服務範圍",
    contactTitle: "聯絡我們",
    rights: "© 2025 櫪韜會計師事務所有限公司. 保留所有權利.",
  },
  "zh-hans": {
    aboutTitle: "櫪韬会计师事务所",
    aboutDesc: "专业会计、审计、税务及商业顾问服务，为您的企业稳健发展保驾护航。",
    linksTitle: "快速链接",
    servicesTitle: "服务范围",
    contactTitle: "联络我们",
    rights: "© 2025 櫪韬会计师事务所有限公司. 保留所有权利.",
  },
  en: {
    aboutTitle: "LT CPA Limited",
    aboutDesc: "Professional accounting, audit, tax, and business advisory services to support your company's steady growth.",
    linksTitle: "Quick Links",
    servicesTitle: "Services",
    contactTitle: "Contact Us",
    rights: "© 2025 LT CPA Limited. All rights reserved.",
  },
};

export default function Footer({ lang }: FooterProps) {
  const t = content[lang];
  const services = [
    { label: lang === "en" ? "Audit & Assurance" : lang === "zh-hans" ? "审计及核证" : "審計及核證", url: "/services/audit/" },
    { label: lang === "en" ? "Tax Advisory" : lang === "zh-hans" ? "税务咨询" : "稅務諮詢", url: "/services/tax/" },
    { label: lang === "en" ? "Risk & Compliance" : lang === "zh-hans" ? "风险及合规" : "風險及合規", url: "/services/risk/" },
    { label: lang === "en" ? "Business Advisory" : lang === "zh-hans" ? "商业咨询" : "商業諮詢", url: "/services/consulting/" },
  ];

  return (
    <footer className="mt-auto bg-brand-navy pt-14 text-white md:pt-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-xl font-bold text-brand-gold">{t.aboutTitle}</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/80">{t.aboutDesc}</p>
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.linksTitle}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${lang}/`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                  {lang === "en" ? "Home" : lang === "zh-hans" ? "首页" : "首頁"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about/`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                  {lang === "en" ? "About Us" : lang === "zh-hans" ? "关于我们" : "關於我們"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services/audit/`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                  {lang === "en" ? "Services" : lang === "zh-hans" ? "服务范围" : "服務範圍"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact/`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                  {lang === "en" ? "Contact" : lang === "zh-hans" ? "联络我们" : "聯絡我們"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.servicesTitle}</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.url}>
                  <Link href={`/${lang}${s.url}`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.contactTitle}</h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>+852 1234 5678</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>info@ltcpa.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-5 text-center text-xs text-white/60 md:text-sm">
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
