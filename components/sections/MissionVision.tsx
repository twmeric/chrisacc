import { Target, Eye, ShieldCheck } from "lucide-react";

interface MissionVisionProps {
  lang: string;
}

const content: Record<string, { items: { icon: React.ReactNode; title: string; desc: string }[] }> = {
  "zh-hant": {
    items: [
      { icon: <Target className="h-9 w-9" />, title: "我們的使命", desc: "致力於為客戶提供最優質的專業服務，協助企業達成財務目標，創造可持續的商業價值，成為客戶最信賴的財務夥伴。" },
      { icon: <Eye className="h-9 w-9" />, title: "我們的願景", desc: "成為香港及亞太區領先的專業會計及商業顧問服務機構，以創新思維及專業精神，為客戶創造卓越價值。" },
      { icon: <ShieldCheck className="h-9 w-9" />, title: "我們的承諾", desc: "堅持誠信、專業、保密的原則，以客戶利益為先，確保每一項服務都達到最高標準，讓客戶安心信賴。" },
    ],
  },
  "zh-hans": {
    items: [
      { icon: <Target className="h-9 w-9" />, title: "我们的使命", desc: "致力于为客户提供最优质的专业服务，协助企业达成财务目标，创造可持续的商业价值，成为客户最信赖的财务伙伴。" },
      { icon: <Eye className="h-9 w-9" />, title: "我们的愿景", desc: "成为香港及亚太区领先的专业会计及商业顾问服务机构，以创新思维及专业精神，为客户创造卓越价值。" },
      { icon: <ShieldCheck className="h-9 w-9" />, title: "我们的承诺", desc: "坚持诚信、专业、保密的原则，以客户利益为先，确保每一项服务都达到最高标准，让客户安心信赖。" },
    ],
  },
  en: {
    items: [
      { icon: <Target className="h-9 w-9" />, title: "Our Mission", desc: "Dedicated to providing clients with the highest quality professional services, helping businesses achieve financial goals, creating sustainable commercial value, and becoming the most trusted financial partner." },
      { icon: <Eye className="h-9 w-9" />, title: "Our Vision", desc: "To become a leading professional accounting and business advisory firm in Hong Kong and the Asia-Pacific region, creating exceptional value for clients through innovative thinking and professionalism." },
      { icon: <ShieldCheck className="h-9 w-9" />, title: "Our Commitment", desc: "Upholding the principles of integrity, professionalism, and confidentiality, putting client interests first, and ensuring every service meets the highest standards." },
    ],
  },
};

export default function MissionVision({ lang }: MissionVisionProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] md:p-10"
            >
              <span className="absolute left-0 top-0 h-1 w-full scale-x-0 bg-gradient-to-r from-brand-navy to-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mx-auto mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:from-brand-gold group-hover:to-brand-gold-light">
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-navy md:text-2xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-light md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
