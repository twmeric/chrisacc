import { Locale } from "@/lib/i18n-config";
import PageBanner from "@/components/ui/PageBanner";
import CTASection from "@/components/sections/CTASection";
import { Eye } from "lucide-react";

interface ValuePageProps {
  params: Promise<{ lang: Locale }>;
}

const titles: Record<Locale, string> = {
  "zh-hant": "我們的願景",
  "zh-hans": "我们的愿景",
  en: "Our Vision",
};

const content: Record<Locale, { paragraphs: string[]; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  "zh-hant": {
    paragraphs: [
      "成為香港及亞太區領先的專業會計及商業顧問服務機構，以創新思維及專業精神，為客戶創造卓越價值。",
      "我們期望透過持續的專業發展與數碼轉型，不斷提升服務質素與效率，讓客戶無論身處何地，都能獲得世界級的專業支援。",
      "我們的願景是建立一個以誠信、創新及卓越為基石的專業平台，匯聚最優秀的人才，為企業及社會創造長遠的正面影響。",
    ],
    ctaTitle: "與我們攜手合作",
    ctaDesc: "讓我們成為您企業成長路上的專業夥伴",
    ctaBtn: "立即聯絡我們",
  },
  "zh-hans": {
    paragraphs: [
      "成为香港及亚太区领先的专业会计及商业顾问服务机构，以创新思维及专业精神，为客户创造卓越价值。",
      "我们期望透过持续的专业发展与数码转型，不断提升服务质素与效率，让客户无论身处何地，都能获得世界级的专业支援。",
      "我们的愿景是建立一个以诚信、创新及卓越为基石的专业平台，汇聚最优秀的人才，为企业及社会创造长远的正面影响。",
    ],
    ctaTitle: "与我们携手合作",
    ctaDesc: "让我们成为您企业成长路上的专业伙伴",
    ctaBtn: "立即联络我们",
  },
  en: {
    paragraphs: [
      "To become a leading professional accounting and business advisory firm in Hong Kong and the Asia-Pacific region, creating exceptional value for clients through innovative thinking and professionalism.",
      "We aspire to continuously enhance service quality and efficiency through ongoing professional development and digital transformation, ensuring our clients receive world-class professional support wherever they are.",
      "Our vision is to build a professional platform founded on integrity, innovation, and excellence, bringing together the finest talent to create lasting positive impact for businesses and society.",
    ],
    ctaTitle: "Partner with Us",
    ctaDesc: "Let us become your professional partner on the path to business growth",
    ctaBtn: "Contact Us Now",
  },
};

export default async function ValuePage({ params }: ValuePageProps) {
  const { lang } = await params;
  const t = content[lang];

  return (
    <>
      <PageBanner lang={lang} title={titles[lang]} />
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-brand-cream p-8 text-center md:p-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white md:h-24 md:w-24">
              <Eye className="h-10 w-10 md:h-12 md:w-12" />
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
