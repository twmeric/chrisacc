interface ServiceScenariosProps {
  lang: "zh-hant" | "zh-hans" | "en";
  title: string;
  items: { title: string; desc: string; points?: string[] }[];
}

export default function ServiceScenarios({ lang, title, items }: ServiceScenariosProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <h3 className="mb-3 text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-light">{item.desc}</p>
              {item.points && item.points.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {item.points.map((pt, i) => (
                    <li key={i} className="text-sm text-text-dark">
                      • {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
