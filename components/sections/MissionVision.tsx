import Link from "next/link";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bullseye: <Target className="h-9 w-9" />,
  Target: <Target className="h-9 w-9" />,
  Eye: <Eye className="h-9 w-9" />,
  Heart: <Heart className="h-9 w-9" />,
};

interface MissionVisionProps {
  lang: string;
  data: {
    items: { icon: string; title: string; desc: string; linkText?: string; href?: string }[];
  };
}

export default function MissionVision({ lang, data }: MissionVisionProps) {
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] md:p-10"
            >
              <span className="absolute left-0 top-0 h-1 w-full scale-x-0 bg-gradient-to-r from-brand-navy to-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mx-auto mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:from-brand-gold group-hover:to-brand-gold-light">
                {iconMap[item.icon] || <Target className="h-9 w-9" />}
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-navy md:text-2xl">{item.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-text-light md:text-base">{item.desc}</p>
              {item.linkText && item.href && (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-navy"
                >
                  {item.linkText} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
