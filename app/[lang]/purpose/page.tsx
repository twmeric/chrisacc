import { Locale } from "@/lib/i18n-config";
import PageBanner from "@/components/ui/PageBanner";
import CTASection from "@/components/sections/CTASection";
import { Target } from "lucide-react";

interface PurposePageProps {
  params: Promise<{ lang: Locale }>;
}

const titles: Record<Locale, string> = {
  "zh-hant": "我們的使命",
  "zh-hans": "我们的使命",
  en: "Our Mission",
};

const content: Record<Locale, { paragraphs: string[]; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  "zh-hant": {
    paragraphs: [
      "致力於為客戶提供最優質的專業服務，協助企業達成財務目標，創造可持續的商業價值，成為客戶最信賴的財務夥伴。",
      "我們的使命不只是數字與報表，而是透過專業的審計、稅務及顧問服務，為每一位客戶量身訂造解決方案，讓他們在複雜多變的商業環境中穩步前行。",
      "我們深信，優質的服務來自於對客戶需求的深刻理解。因此，我們始終以客戶的利益為先，確保每一項建議都切實可行、每一個方案都经得起考驗。",
    ],
    ctaTitle: "與我們攜手合作",
    ctaDesc: "無論您的企業規模大小，我們都能為您提供專業、可靠的財務解決方案",
    ctaBtn: "立即聯絡我們",
  },
  "zh-hans": {
    paragraphs: [
      "致力于为客户提供最优质的专业服务，协助企业达成财务目标，创造可持续的商业价值，成为客户最信赖的财务伙伴。",
      "我们的使命不只是数字与报表，而是透过专业的审计、税务及顾问服务，为每一位客户量身订造解决方案，让他们在复杂多变的商业环境中稳步前行。",
      "我们深信，优质的服务来自于对客户需求的深刻理解。因此，我们始终以客户的利益为先，确保每一项建议都切实可行、每一个方案都经得起考验。",
    ],
    ctaTitle: "与我们携手合作",
    ctaDesc: "无论您的企业规模大小，我们都能为您提供专业、可靠的财务解决方案",
    ctaBtn: "立即联络我们",
  },
  en: {
    paragraphs: [
      "Dedicated to providing clients with the highest quality professional services, helping businesses achieve financial goals, creating sustainable commercial value, and becoming the most trusted financial partner.",
      "Our mission goes beyond numbers and reports. Through professional audit, tax, and advisory services, we craft tailored solutions for every client, enabling them to move forward steadily in a complex and ever-changing business environment.",
      "We firmly believe that quality service stems from a deep understanding of our clients' needs. Therefore, we always put client interests first, ensuring that every recommendation is practical and every solution stands the test of time.",
    ],
    ctaTitle: "Partner with Us",
    ctaDesc: "Regardless of your business size, we can provide professional and reliable financial solutions",
    ctaBtn: "Contact Us Now",
  },
};

export default async function PurposePage({ params }: PurposePageProps) {
  const { lang } = await params;
  const t = content[lang];

  return (
    <>
      <PageBanner lang={lang} title={titles[lang]} />
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-brand-cream p-8 text-center md:p-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white md:h-24 md:w-24">
              <Target className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="mb-8 text-2xl font-bold text-brand-navy md:text-3xl">{titles[lang]}</h2>
            <div className="space-y-5 text-left text-base leading-relaxed text-text-dark md:text-lg">
              {t.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection lang={lang} title={t.ctaTitle} description={t.ctaDesc} primaryBtn={t.ctaBtn} />
    </>
  );
}
