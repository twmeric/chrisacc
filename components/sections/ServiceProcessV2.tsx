interface ServiceProcessV2Props {
  title: string;
  subtitle: string;
  steps: { number: string; title: string; desc: string }[];
}

export default function ServiceProcessV2({ title, subtitle, steps }: ServiceProcessV2Props) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light">{subtitle}</p>
          )}
        </div>

        <div className="relative">
          {/* Central line - hidden on mobile */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-brand-gold/30 md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content side */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="rounded-xl bg-brand-cream p-5 transition hover:shadow-md md:p-6">
                      <h4 className="mb-2 text-lg font-bold text-brand-navy">{step.title}</h4>
                      <p className="text-sm leading-relaxed text-text-light">{step.desc}</p>
                    </div>
                  </div>

                  {/* Number circle center */}
                  <div className="absolute left-1/2 top-0 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-brand-gold text-lg font-bold text-white shadow-md md:flex">
                    {step.number}
                  </div>

                  {/* Mobile number */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-base font-bold text-white md:hidden">
                    {step.number}
                  </div>

                  {/* Spacer side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
