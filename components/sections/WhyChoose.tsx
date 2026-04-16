import { Award, Users, Target, ThumbsUp } from "lucide-react";

interface WhyChooseProps {
  lang: string;
}

const content: Record<string, { title: string; desc: string; items: { icon: React.ReactNode; title: string; desc: string }[] }> = {
  "zh-hant": {
    title: "為何選擇我們？",
    desc: "櫪韜會計師事務所有限公司擁有經驗豐富的專業團隊，致力於為客戶提供優質的會計及顧問服務。我們深明每間企業的獨特性，因此會因應客戶的實際需要，量身訂造最合適的解決方案。",
    items: [
      { icon: <Users className="h-8 w-8" />, title: "專業團隊", desc: "由資深會計師及顧問組成，經驗豐富" },
      { icon: <Award className="h-8 w-8" />, title: "行業經驗", desc: "超過20年服務各類型企業的經驗" },
      { icon: <Target className="h-8 w-8" />, title: "度身方案", desc: "根據客戶需求提供個人化專業建議" },
      { icon: <ThumbsUp className="h-8 w-8" />, title: "優質服務", desc: "以客為本，追求卓越服務品質" },
    ],
  },
  "zh-hans": {
    title: "为何选择我们？",
    desc: "櫪韬会计师事务所有限公司拥有经验丰富的专业团队，致力于为客户提供优质的会计及顾问服务。我们深明每间企业的独特性，因此会因应客户的实际需要，量身订造最合适的解决方案。",
    items: [
      { icon: <Users className="h-8 w-8" />, title: "专业团队", desc: "由资深会计师及顾问组成，经验丰富" },
      { icon: <Award className="h-8 w-8" />, title: "行业经验", desc: "超过20年服务各类型企业的经验" },
      { icon: <Target className="h-8 w-8" />, title: "度身方案", desc: "根据客户需求提供个人化专业建议" },
      { icon: <ThumbsUp className="h-8 w-8" />, title: "优质服务", desc: "以客为本，追求卓越服务品质" },
    ],
  },
  en: {
    title: "Why Choose Us?",
    desc: "LT CPA Limited has an experienced professional team dedicated to providing quality accounting and advisory services. We understand the uniqueness of each business and tailor the most suitable solutions to meet our clients' actual needs.",
    items: [
      { icon: <Users className="h-8 w-8" />, title: "Professional Team", desc: "Comprised of seasoned accountants and consultants" },
      { icon: <Award className="h-8 w-8" />, title: "Industry Experience", desc: "Over 20 years serving all types of businesses" },
      { icon: <Target className="h-8 w-8" />, title: "Tailored Solutions", desc: "Personalized professional advice based on your needs" },
      { icon: <ThumbsUp className="h-8 w-8" />, title: "Quality Service", desc: "Customer-oriented, pursuing excellence" },
    ],
  },
};

export default function WhyChoose({ lang }: WhyChooseProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {t.title}
            <span className="absolute -bottom-3 left-1/2 h-[3px] w-16 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-light">{t.desc}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg md:p-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white">
                {item.icon}
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{item.title}</h4>
              <p className="text-sm text-text-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
