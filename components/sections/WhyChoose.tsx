import { Users, Award, Target, ThumbsUp } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-8 w-8" />,
  Award: <Award className="h-8 w-8" />,
  Target: <Target className="h-8 w-8" />,
  ThumbsUp: <ThumbsUp className="h-8 w-8" />,
};

interface WhyChooseProps {
  lang: string;
  data: {
    title: string;
    desc: string;
    paragraphs?: string[];
    features?: { icon: string; label: string }[];
    items: { icon: string; title: string; desc: string }[];
  };
}

export default function WhyChoose({ lang, data }: WhyChooseProps) {
  const hasParagraphs = data.paragraphs && data.paragraphs.length > 0;
  const hasFeatures = data.features && data.features.length > 0;

  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {data.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>

        {hasParagraphs && (
          <div className="mb-10 space-y-5 text-center">
            {data.paragraphs!.map((p, idx) => (
              <p key={idx} className="mx-auto max-w-4xl text-base leading-relaxed text-text-light md:text-lg">
                {p}
              </p>
            ))}
          </div>
        )}

        {hasFeatures && (
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {data.features!.map((f, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg bg-white/60 px-5 py-4">
                <i className="fas fa-check-circle text-brand-gold text-xl"></i>
                <span className="text-base font-medium text-brand-navy md:text-lg">{f.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg md:p-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-white">
                {iconMap[item.icon] || <Award className="h-8 w-8" />}
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
