import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  lang: Locale;
  slug: string;
  title: string;
  description: string;
  iconName?: string;
}

export default function ServiceCard({ lang, slug, title, description, iconName = "fa-chart-line" }: ServiceCardProps) {
  return (
    <Link
      href={`/${lang}/services/${slug}/`}
      className="group block overflow-hidden rounded-xl bg-white text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="relative p-8 md:p-10">
        <span className="absolute left-0 top-0 h-1 w-full scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-3xl text-white transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-gradient-to-br group-hover:from-brand-gold group-hover:to-brand-gold-light">
          <i className={`fas ${iconName}`} />
        </div>
        <h3 className="mb-3 text-xl font-bold text-brand-navy">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-text-light">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold">
          {lang === "en" ? "Learn More" : "了解更多"} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
