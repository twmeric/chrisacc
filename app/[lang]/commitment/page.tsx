import { Locale } from "@/lib/i18n-config";
import PageBanner from "@/components/ui/PageBanner";
import CTASection from "@/components/sections/CTASection";
import { ShieldCheck } from "lucide-react";

interface CommitmentPageProps {
  params: Promise<{ lang: Locale }>;
}

const titles: Record<Locale, string> = {
  "zh-hant": "我們的承諾",
  "zh-hans": "我们的承诺",
  en: "Our Commitment",
};

const content: Record<Locale, { paragraphs: string[]; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  "zh-hant": {
    paragraphs: [
      "堅持誠信、專業、保密的原則，以客戶利益為先，確保每一項服務都達到最高標準，讓客戶安心信賴。",
      "我們承諾在任何情況下都恪守專業操守，不偏不倚地提供獨立意見。無論是審計報告還是稅務建議，我們都會以事實為依據、以法規為準繩。",
      "保密是我們服務的基石。我們承諾對客戶的所有資訊嚴格保密，並建立完善的安全措施，確保資料不會外洩。",
      "我們亦承諾持續進修，緊貼最新的會計準則、稅務法規及商業趨勢，確保客戶獲得的建議始終具備前瞻性與實用性。",
    ],
    ctaTitle: "與我們攜手合作",
    ctaDesc: "體驗以客戶為本、追求卓越的專業服務",
    ctaBtn: "立即聯絡我們",
  },
  "zh-hans": {
    paragraphs: [
      "坚持诚信、专业、保密的原则，以客户利益为先，确保每一项服务都达到最高标准，让客户安心信赖。",
      "我们承诺在任何情况下都恪守专业操守，不偏不倚地提供独立意见。无论是审计报告还是税务建议，我们都会以事实为依据、以法规为准绳。",
      "保密是我们服务的基石。我们承诺对客户的所有资讯严格保密，并建立完善的安全措施，确保资料不会外泄。",
      "我们亦承诺持续进修，紧贴最新的会计准则、税务法规及商业趋势，确保客户获得的建议始终具备前瞻性与实用性。",
    ],
    ctaTitle: "与我们携手合作",
    ctaDesc: "体验以客户为本、追求卓越的专业服务",
    ctaBtn: "立即联络我们",
  },
  en: {
    paragraphs: [
      "Upholding the principles of integrity, professionalism, and confidentiality, putting client interests first, and ensuring every service meets the highest standards.",
      "We commit to maintaining professional ethics under all circumstances and providing independent opinions without bias. Whether it is an audit report or tax advice, we rely on facts and adhere to regulations.",
      "Confidentiality is the cornerstone of our service. We promise to keep all client information strictly confidential and have established robust security measures to prevent data leakage.",
      "We also commit to continuous professional development, staying abreast of the latest accounting standards, tax regulations, and business trends to ensure our advice remains forward-looking and practical.",
    ],
    ctaTitle: "Partner with Us",
    ctaDesc: "Experience client-oriented professional services that pursue excellence",
    ctaBtn: "Contact Us Now",
  },
};

export default async function CommitmentPage({ params }: CommitmentPageProps) {
  const { lang } = await params;
  const t = content[lang];

  return (
    <>
      <PageBanner lang={lang} title={titles[lang]} />
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-brand-cream p-8 text-center md:p-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white md:h-24 md:w-24">
              <ShieldCheck className="h-10 w-10 md:h-12 md:w-12" />
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
