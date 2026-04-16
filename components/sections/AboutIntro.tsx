interface AboutIntroProps {
  lang: string;
}

const content: Record<string, { title: string; titleAccent: string; paragraphs: string[]; quote: string; stats: { value: string; label: string }[] }> = {
  "zh-hant": {
    title: "您值得信賴的",
    titleAccent: "財務夥伴",
    paragraphs: [
      "櫪韜會計師事務所有限公司成立於2005年，是香港領先的專業會計事務所之一。多年來，我們一直堅守專業、誠信、創新的核心價值，為各行各業的客戶提供高質素的審計、稅務及商業諮詢服務。",
      "我們的專業團隊由多位資深會計師組成，擁有豐富的本地及國際經驗。無論您是初創企業、中小型公司，還是跨國企業，我們都能為您提供切合需要的專業服務，協助您在香港及全球市場上穩步發展。",
    ],
    quote: "我們的成功建基於客戶的信任與滿意，這是我們不斷追求卓越服務的動力。",
    stats: [
      { value: "20+", label: "年專業經驗" },
      { value: "500+", label: "滿意客戶" },
      { value: "50+", label: "專業團隊" },
      { value: "99%", label: "客戶滿意度" },
    ],
  },
  "zh-hans": {
    title: "您值得信赖的",
    titleAccent: "财务伙伴",
    paragraphs: [
      "櫪韬会计师事务所有限公司成立于2005年，是香港领先的专业会计事务所之一。多年来，我们一直坚守专业、诚信、创新的核心价值，为各行各业的客户提供高质素的审计、税务及商业咨询服务。",
      "我们的专业团队由多位资深会计师组成，拥有丰富的本地及国际经验。无论您是初创企业、中小型公司，还是跨国企业，我们都能为您提供切合需要的专业服务，协助您在香港及全球市场上稳步发展。",
    ],
    quote: "我们的成功建基于客户的信任与满意，这是我们不断追求卓越服务的动力。",
    stats: [
      { value: "20+", label: "年专业经验" },
      { value: "500+", label: "满意客户" },
      { value: "50+", label: "专业团队" },
      { value: "99%", label: "客户满意度" },
    ],
  },
  en: {
    title: "Your Trusted",
    titleAccent: "Financial Partner",
    paragraphs: [
      "Founded in 2005, LT CPA Limited is one of Hong Kong's leading professional accounting firms. Over the years, we have adhered to the core values of professionalism, integrity, and innovation, providing high-quality audit, tax, and business advisory services to clients across various industries.",
      "Our professional team comprises several senior accountants with extensive local and international experience. Whether you are a startup, an SME, or a multinational corporation, we can provide tailored professional services to help you develop steadily in Hong Kong and global markets.",
    ],
    quote: "Our success is built on our clients' trust and satisfaction, which drives us to continuously pursue service excellence.",
    stats: [
      { value: "20+", label: "Years Experience" },
      { value: "500+", label: "Happy Clients" },
      { value: "50+", label: "Professional Team" },
      { value: "99%", label: "Satisfaction" },
    ],
  },
};

export default function AboutIntro({ lang }: AboutIntroProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold text-brand-navy md:text-[40px]">
            {t.title} <span className="text-brand-gold">{t.titleAccent}</span>
          </h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {t.paragraphs.map((p, idx) => (
              <p key={idx} className="mb-5 text-base leading-relaxed text-text-dark md:text-lg">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 border-l-4 border-brand-gold bg-brand-cream p-5 text-base italic text-brand-navy md:text-lg">
              "{t.quote}"
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {t.stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-5 text-center text-white shadow-lg md:p-8"
              >
                <div className="mb-1 text-3xl font-bold text-brand-gold md:text-4xl">{s.value}</div>
                <div className="text-sm opacity-90 md:text-base">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
