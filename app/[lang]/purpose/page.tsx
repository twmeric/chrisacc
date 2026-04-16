import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import PageBanner from "@/components/ui/PageBanner";
import CTASection from "@/components/sections/CTASection";
import { Target } from "lucide-react";

interface PurposePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PurposePage({ params }: PurposePageProps) {
  const { lang } = await params;
  const cms = getLocaleCMS(lang);
  const t = cms.purpose;

  return (
    <>
      <PageBanner lang={lang} title={t.pageTitle} />
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-brand-cream p-8 text-center md:p-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white md:h-24 md:w-24">
              <Target className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="mb-8 text-2xl font-bold text-brand-navy md:text-3xl">{t.pageTitle}</h2>
            <div className="space-y-5 text-left text-base leading-relaxed text-text-dark md:text-lg">
              {t.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection lang={lang} title={t.cta.title} description={t.cta.desc} primaryBtn={t.cta.btn} />
    </>
  );
}
