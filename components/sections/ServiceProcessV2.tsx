interface ServiceProcessV2Props {
  title: string;
  subtitle: string;
  steps: { number: string; title: string; desc: string }[];
}

export default function ServiceProcessV2({ title, subtitle, steps }: ServiceProcessV2Props) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
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
          {/* Central gray line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="relative flex gap-6 md:gap-10"
                  style={{ marginBottom: idx < steps.length - 1 ? '40px' : '0' }}
                >
                  {/* Mobile: number on left, content to the right */}
                  {/* Desktop: alternating layout */}

                  {/* Content — left on even, right on odd (desktop) */}
                  <div
                    className={`md:w-1/2 ${
                      isEven
                        ? 'order-1 md:pr-12 md:text-right'
                        : 'order-3 md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="rounded-lg bg-brand-cream p-6 md:p-8">
                      <h4 className="mb-2 text-lg font-bold text-brand-navy">
                        {step.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-text-light md:text-[15px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Number circle — always center on desktop, left on mobile */}
                  <div
                    className={`order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-lg font-bold text-brand-gold shadow-md md:absolute md:left-1/2 md:h-[50px] md:w-[50px] md:-translate-x-1/2`}
                    style={{ zIndex: 1 }}
                  >
                    {step.number}
                  </div>

                  {/* Spacer — right on even, left on odd (desktop) */}
                  <div
                    className={`hidden md:block md:w-1/2 ${
                      isEven ? 'order-3' : 'order-1'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
