interface WhyChooseServiceV2Props {
  title: string;
  subtitle: string;
  items: { icon: string; title: string; desc: string }[];
}

export default function WhyChooseServiceV2({ title, subtitle, items }: WhyChooseServiceV2Props) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-light">{subtitle}</p>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-brand-cream p-6 text-center transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              {item.icon && (
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-accent text-xl text-white">
                  <i className={item.icon} />
                </div>
              )}
              <h4 className="mb-2 text-base font-bold text-brand-navy md:text-lg">{item.title}</h4>
              <p className="text-sm leading-relaxed text-text-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
