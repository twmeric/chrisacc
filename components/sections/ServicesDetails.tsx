"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceDetailItem {
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  features: string[];
  linkText: string;
  href: string;
}

interface ServicesDetailsProps {
  lang: string;
  items: ServiceDetailItem[];
}

const slugLabels: Record<string, Record<string, string>> = {
  en: {
    audit: "Audit & Assurance",
    tax: "Tax Advisory",
    risk: "Risk & Regulatory",
    forensic: "Forensic Services",
    consulting: "Consulting",
    deals: "Deals & M&A",
  },
  "zh-hant": {
    audit: "審計與鑑證",
    tax: "稅務諮詢",
    risk: "風險與監管",
    forensic: "法證服務",
    consulting: "企業諮詢",
    deals: "併購交易",
  },
  "zh-hans": {
    audit: "审计与鉴证",
    tax: "税务咨询",
    risk: "风险与监管",
    forensic: "法证服务",
    consulting: "企业咨询",
    deals: "并购交易",
  },
};

export default function ServicesDetails({ lang, items }: ServicesDetailsProps) {
  const labels = slugLabels[lang] || slugLabels.en;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white">
      {/* Detail Sections -- pill nav in ServiceCategoryNav replaces sticky nav */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              id={item.slug}
              key={item.slug}
              className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20"
            >
              <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
                <h3 className="mb-3 text-2xl font-bold text-brand-navy md:text-3xl">{item.title}</h3>
                {item.subtitle && (
                  <p className="mb-4 text-lg italic text-brand-gold md:text-xl">{item.subtitle}</p>
                )}
                <p className="mb-6 text-base leading-relaxed text-text-light md:text-lg">{item.desc}</p>
                {item.features.length > 0 && (
                  <ul className="mb-6 space-y-2">
                    {item.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-dark">
                        <i className="fas fa-check-circle mt-1 text-brand-gold"></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={item.href.startsWith("http") ? item.href : `/${lang}/services/${item.slug}/`}
                  className="inline-block rounded-full bg-brand-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
                >
                  {item.linkText || "Learn More"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
