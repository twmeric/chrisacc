import Link from "next/link";
import { Locale } from "@/lib/i18n-config";

interface ContactCTAProps {
  lang: Locale;
  data: { title: string; desc: string; btn: string; href: string };
}

export default function ContactCTA({ lang, data }: ContactCTAProps) {
  return (
    <section className="bg-brand-cream px-4 py-20 text-center md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-brand-navy md:text-4xl">{data.title}</h2>
        <p className="mb-8 text-lg text-text-light">{data.desc}</p>
        <Link
          href={`/${lang}${data.href}`}
          className="inline-block rounded-full bg-brand-gold px-10 py-4 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-brand-navy hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          {data.btn}
        </Link>
      </div>
    </section>
  );
}
