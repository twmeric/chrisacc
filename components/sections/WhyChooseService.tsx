import { Award, Clock, Shield, Users } from "lucide-react";

interface WhyChooseServiceProps {
  lang: string;
  title: string;
  items: { icon: React.ReactNode; title: string; desc: string }[];
}

const defaults: Record<string, { title: string; items: { icon: React.ReactNode; title: string; desc: string }[] }> = {
  "zh-hant": {
    title: "為何選擇 LT CPA 服務",
    items: [
      { icon: <Award className="h-8 w-8" />, title: "專業資質", desc: "團隊成員均持有香港會計師公會及國際認可專業資格，確保服務符合最高標準。" },
      { icon: <Clock className="h-8 w-8" />, title: "準時高效", desc: "我們重視項目進度管理，確保在約定期限內交付高質素的工作成果。" },
      { icon: <Shield className="h-8 w-8" />, title: "獨立客觀", desc: "堅守獨立性原則，以客觀、公正的態度為客戶提供專業意見。" },
      { icon: <Users className="h-8 w-8" />, title: "客戶為本", desc: "深入了解客戶業務，提供切合實際需要的建議，建立長期合作關係。" },
    ],
  },
  "zh-hans": {
    title: "为何选择 LT CPA 服务",
    items: [
      { icon: <Award className="h-8 w-8" />, title: "专业资质", desc: "团队成员均持有香港会计师公会及国际认可专业资格，确保服务符合最高标准。" },
      { icon: <Clock className="h-8 w-8" />, title: "准时高效", desc: "我们重视项目进度管理，确保在约定期限内交付高质量的工作成果。" },
      { icon: <Shield className="h-8 w-8" />, title: "独立客观", desc: "坚守独立性原则，以客观、公正的态度为客户提供专业意见。" },
      { icon: <Users className="h-8 w-8" />, title: "客户为本", desc: "深入了解客户业务，提供切合实际需要的建议，建立长期合作关系。" },
    ],
  },
  en: {
    title: "Why Choose LT CPA",
    items: [
      { icon: <Award className="h-8 w-8" />, title: "Professional Qualifications", desc: "Our team members hold HKICPA and internationally recognized qualifications, ensuring services meet the highest standards." },
      { icon: <Clock className="h-8 w-8" />, title: "Timely & Efficient", desc: "We value project management to ensure high-quality deliverables within agreed deadlines." },
      { icon: <Shield className="h-8 w-8" />, title: "Independent & Objective", desc: "We uphold independence principles, providing professional advice with an objective and impartial attitude." },
      { icon: <Users className="h-8 w-8" />, title: "Client-Centric", desc: "We deeply understand your business and provide practical advice to build long-term partnerships." },
    ],
  },
};

export default function WhyChooseService({ lang, title, items }: WhyChooseServiceProps) {
  const t = defaults[lang] || defaults["zh-hant"];
  const displayTitle = title || t.title;
  const displayItems = items?.length ? items.map((it, i) => ({ ...it, icon: t.items[i]?.icon || <Award className="h-8 w-8" /> })) : t.items;

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {displayTitle}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-brand-cream p-6 text-center transition hover:-translate-y-1 hover:shadow-md md:p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white">
                {item.icon}
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{item.title}</h4>
              <p className="text-sm leading-relaxed text-text-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
