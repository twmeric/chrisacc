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

        <div className="space-y-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]"
            >
              {/* Card Header — dark navy with icon */}
              <div className="flex items-center gap-5 bg-brand-navy px-6 py-6 md:px-10 md:py-8">
                {item.icon && (
                  <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-brand-gold/15">
                    <i className={`${item.icon} text-[30px] text-brand-gold`} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">{item.title}</h3>
                  {item.subtitle && (
                    <p className="mt-1 text-sm text-white/70 md:text-base">{item.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-6 md:px-10 md:py-8">
                {item.body && (
                  <p className="mb-6 text-sm leading-relaxed text-text-light md:text-[15px]">
                    {item.body}
                  </p>
                )}
                {item.features.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {item.features.map((ft, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-md bg-brand-cream p-4"
                      >
                        <i className="fas fa-check mt-0.5 text-lg text-brand-gold" />
                        <span className="text-sm leading-relaxed text-text-dark">{ft}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
