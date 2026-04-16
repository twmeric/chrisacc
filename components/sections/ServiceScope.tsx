import { CheckCircle } from "lucide-react";

interface ServiceScopeProps {
  lang: "zh-hant" | "zh-hans" | "en";
  title: string;
  items: { title: string; desc: string; points: string[] }[];
}

export default function ServiceScope({ lang, title, items }: ServiceScopeProps) {
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light">
            {lang === "en" ? "Comprehensive services to meet all your needs" : lang === "zh-hans" ? "全方位的专业服务，满足您的各种需求" : "全方位的專業服務，滿足您的各種需求"}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8">
              <h3 className="mb-3 text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="mb-4 text-sm text-text-light">{item.desc}</p>
              <ul className="space-y-2">
                {item.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-dark">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
