import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { ArrowRight } from "lucide-react";

interface RelatedServicesProps {
  lang: Locale;
  currentSlug: string;
  services: { slug: string; title: string; desc: string }[];
  title: string;
}

export default function RelatedServices({ lang, currentSlug, services, title }: RelatedServicesProps) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/${lang}/services/${s.slug}/`}
              className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{s.title}</h4>
              <p className="mb-4 text-sm text-text-light line-clamp-2">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold group-hover:underline">
                {lang === "en" ? "Learn More" : "了解更多"} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
