import { MapPin, Phone, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="h-8 w-8" />,
  Phone: <Phone className="h-8 w-8" />,
  Mail: <Mail className="h-8 w-8" />,
};

interface ContactCardsProps {
  lang: string;
  data: { icon: string; title: string; lines: string[] }[];
}

export default function ContactCards({ lang, data }: ContactCardsProps) {
  return (
    <section className="bg-brand-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-3">
          {data.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg md:p-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white transition-all group-hover:from-brand-gold group-hover:to-brand-gold-light">
                {iconMap[card.icon] || <Mail className="h-8 w-8" />}
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
