import { Award, Handshake, Lightbulb, Users } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-10 w-10" />,
  Handshake: <Handshake className="h-10 w-10" />,
  Lightbulb: <Lightbulb className="h-10 w-10" />,
  Users: <Users className="h-10 w-10" />,
};

interface CoreValuesProps {
  lang: string;
  data: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string }[];
  };
}

export default function CoreValues({ lang, data }: CoreValuesProps) {
  return (
    <section className="section-dark bg-gradient-to-br from-brand-navy to-brand-navy-light px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold md:text-[40px]">
            {data.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-white/90">{data.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/20 md:p-8"
            >
              <div className="mb-5 text-brand-gold">{iconMap[item.icon] || <Award className="h-10 w-10" />}</div>
              <h4 className="mb-3 text-xl font-bold">{item.title}</h4>
              <p className="text-sm leading-relaxed opacity-85 md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
