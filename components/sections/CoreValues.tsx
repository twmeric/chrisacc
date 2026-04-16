import { Award, Shield, Lightbulb, Users } from "lucide-react";

interface CoreValuesProps {
  lang: string;
}

const content: Record<string, { title: string; subtitle: string; items: { icon: React.ReactNode; title: string; desc: string }[] }> = {
  "zh-hant": {
    title: "核心價值",
    subtitle: "我們秉持的核心價值觀，指引著我們的每一項決策和行動",
    items: [
      { icon: <Award className="h-10 w-10" />, title: "專業卓越", desc: "持續提升專業能力，追求卓越服務品質" },
      { icon: <Shield className="h-10 w-10" />, title: "誠信正直", desc: "堅守職業道德，以誠信贏得客戶信賴" },
      { icon: <Lightbulb className="h-10 w-10" />, title: "創新思維", desc: "運用創新方法，為客戶創造更大價值" },
      { icon: <Users className="h-10 w-10" />, title: "團隊協作", desc: "發揮團隊力量，共同實現客戶目標" },
    ],
  },
  "zh-hans": {
    title: "核心价值",
    subtitle: "我们秉持的核心价值观，指引着我们的每一项决策和行动",
    items: [
      { icon: <Award className="h-10 w-10" />, title: "专业卓越", desc: "持续提升专业能力，追求卓越服务品质" },
      { icon: <Shield className="h-10 w-10" />, title: "诚信正直", desc: "坚守职业道德，以诚信赢得客户信赖" },
      { icon: <Lightbulb className="h-10 w-10" />, title: "创新思维", desc: "运用创新方法，为客户创造更大价值" },
      { icon: <Users className="h-10 w-10" />, title: "团队协作", desc: "发挥团队力量，共同实现客户目标" },
    ],
  },
  en: {
    title: "Core Values",
    subtitle: "The core values we uphold guide every decision and action we take",
    items: [
      { icon: <Award className="h-10 w-10" />, title: "Excellence", desc: "Continuously improving professional capabilities and pursuing service excellence" },
      { icon: <Shield className="h-10 w-10" />, title: "Integrity", desc: "Upholding professional ethics and winning client trust through integrity" },
      { icon: <Lightbulb className="h-10 w-10" />, title: "Innovation", desc: "Using innovative methods to create greater value for clients" },
      { icon: <Users className="h-10 w-10" />, title: "Teamwork", desc: "Harnessing team strength to achieve client goals together" },
    ],
  },
};

export default function CoreValues({ lang }: CoreValuesProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold md:text-[40px]">
            {t.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-white/90">{t.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/20 md:p-8"
            >
              <div className="mb-5 text-brand-gold">{item.icon}</div>
              <h4 className="mb-3 text-xl font-bold">{item.title}</h4>
              <p className="text-sm leading-relaxed opacity-85 md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
