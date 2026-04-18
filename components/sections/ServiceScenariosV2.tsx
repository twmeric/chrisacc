interface ServiceScenariosV2Props {
  title: string;
  items: { title: string; desc: string; features?: string[]; icon?: string }[];
}

export default function ServiceScenariosV2({ title, items }: ServiceScenariosV2Props) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-6"
            >
              {item.icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/10">
                  {item.icon.length <= 2 ? (
                    <span className="text-xl font-bold text-brand-navy">{item.icon}</span>
                  ) : (
                    <i className={`${item.icon} text-xl text-brand-navy`} />
                  )}
                </div>
              )}
              <h3 className="mb-2 text-base font-bold text-brand-navy md:text-lg">{item.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-text-light">{item.desc}</p>
              {item.features && item.features.length > 0 && (
                <ul className="space-y-1">
                  {item.features.map((ft, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-dark">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                      <span>{ft}</span>
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
