import Link from "next/link";
import { Locale } from "@/lib/i18n-config";

interface CTASectionProps {
  lang: Locale;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn?: string;
}

export default function CTASection({ lang, title, description, primaryBtn, secondaryBtn }: CTASectionProps) {
  return (
    <section
      className="relative bg-cover bg-center px-4 py-20 text-center text-white md:py-24"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.92), rgba(44, 82, 130, 0.9)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80')`,
      }}
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mb-8 text-lg text-white/90">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${lang}/contact/`}
            className="inline-block rounded-full bg-brand-gold px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-brand-navy"
          >
            {primaryBtn}
          </Link>
          {secondaryBtn && (
            <Link
              href={`/${lang}/services/audit/`}
              className="inline-block rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:text-brand-navy"
            >
              {secondaryBtn}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
