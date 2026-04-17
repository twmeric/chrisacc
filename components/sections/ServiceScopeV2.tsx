interface ServiceScopeV2Props {
  title: string;
  subtitle: string;
  items: {
    title: string;
    subtitle: string;
    icon: string;
    body: string;
    features: string[];
  }[];
}

export default function ServiceScopeV2({ title, subtitle, items }: ServiceScopeV2Props) {
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light">{subtitle}</p>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                {item.icon && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-lg text-white">
                    <i className={item.icon} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-text-light">{item.subtitle}</p>
                  )}
                </div>
              </div>
              {item.body && (
                <p className="mb-4 text-sm leading-relaxed text-text-dark">{item.body}</p>
              )}
              {item.features.length > 0 && (
                <div className="space-y-2">
                  {item.features.map((ft, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-dark">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
