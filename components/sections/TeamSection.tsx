import { Linkedin, Mail } from "lucide-react";

interface TeamSectionProps {
  lang: string;
}

const content: Record<string, { title: string; subtitle: string; members: { name: string; role: string; image: string }[] }> = {
  "zh-hant": {
    title: "專業團隊",
    subtitle: "我們擁有經驗豐富的專業團隊，致力於為客戶提供最優質的服務",
    members: [
      { name: "陳大文", role: "創辦人及執行董事", image: "/images/team-1.jpg" },
      { name: "李美琪", role: "審計總監", image: "/images/team-2.jpg" },
      { name: "張志偉", role: "稅務合夥人", image: "/images/team-3.jpg" },
      { name: "王曉明", role: "諮詢總監", image: "/images/team-4.jpg" },
    ],
  },
  "zh-hans": {
    title: "专业团队",
    subtitle: "我们拥有经验丰富的专业团队，致力于为客户提供最优质的服务",
    members: [
      { name: "陈大文", role: "创办人及执行董事", image: "/images/team-1.jpg" },
      { name: "李美琪", role: "审计总监", image: "/images/team-2.jpg" },
      { name: "张志伟", role: "税务合伙人", image: "/images/team-3.jpg" },
      { name: "王晓明", role: "咨询总监", image: "/images/team-4.jpg" },
    ],
  },
  en: {
    title: "Professional Team",
    subtitle: "We have an experienced professional team dedicated to providing the best service to our clients",
    members: [
      { name: "David Chan", role: "Founder & Executive Director", image: "/images/team-1.jpg" },
      { name: "Maggie Lee", role: "Audit Director", image: "/images/team-2.jpg" },
      { name: "Peter Cheung", role: "Tax Partner", image: "/images/team-3.jpg" },
      { name: "Raymond Wong", role: "Advisory Director", image: "/images/team-4.jpg" },
    ],
  },
};

export default function TeamSection({ lang }: TeamSectionProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {t.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-light">{t.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.members.map((m, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 bg-gradient-to-t from-[rgba(26,58,92,0.9)] to-transparent p-4 opacity-0 transition-all duration-300 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy transition hover:bg-brand-gold hover:text-white">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy transition hover:bg-brand-gold hover:text-white">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-5 text-center">
                <h4 className="text-lg font-bold text-brand-navy">{m.name}</h4>
                <span className="text-sm font-medium text-brand-gold">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
