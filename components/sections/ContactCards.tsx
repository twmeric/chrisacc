import { MapPin, Phone, Mail } from "lucide-react";

interface ContactCardsProps {
  lang: string;
}

const content: Record<string, { cards: { icon: React.ReactNode; title: string; lines: string[] }[] }> = {
  "zh-hant": {
    cards: [
      { icon: <MapPin className="h-8 w-8" />, title: "地址", lines: ["香港金鐘力寶中心2座5樓503室", "Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong"] },
      { icon: <Phone className="h-8 w-8" />, title: "電話", lines: ["+852 1234 5678", "星期一至五 09:00 - 18:00"] },
      { icon: <Mail className="h-8 w-8" />, title: "電郵", lines: ["info@ltcpa.com", "歡迎查詢及預約會面"] },
    ],
  },
  "zh-hans": {
    cards: [
      { icon: <MapPin className="h-8 w-8" />, title: "地址", lines: ["香港金钟力宝中心2座5楼503室", "Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong"] },
      { icon: <Phone className="h-8 w-8" />, title: "电话", lines: ["+852 1234 5678", "星期一至五 09:00 - 18:00"] },
      { icon: <Mail className="h-8 w-8" />, title: "电邮", lines: ["info@ltcpa.com", "欢迎查询及预约会面"] },
    ],
  },
  en: {
    cards: [
      { icon: <MapPin className="h-8 w-8" />, title: "Address", lines: ["Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong"] },
      { icon: <Phone className="h-8 w-8" />, title: "Phone", lines: ["+852 1234 5678", "Mon - Fri 09:00 - 18:00"] },
      { icon: <Mail className="h-8 w-8" />, title: "Email", lines: ["info@ltcpa.com", "Inquiries & appointments welcome"] },
    ],
  },
};

export default function ContactCards({ lang }: ContactCardsProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-brand-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-3">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg md:p-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white transition-all group-hover:from-brand-gold group-hover:to-brand-gold-light">
                {card.icon}
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{card.title}</h4>
              {card.lines.map((line, i) => (
                <p key={i} className={`text-sm ${i === 0 ? "font-medium text-text-dark" : "text-text-light"}`}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
