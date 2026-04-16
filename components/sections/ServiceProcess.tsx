interface ServiceProcessProps {
  lang: "zh-hant" | "zh-hans" | "en";
  title: string;
  subtitle: string;
  steps: { number: string; title: string; desc: string }[];
}

export default function ServiceProcess({ lang, title, subtitle, steps }: ServiceProcessProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light">
            {subtitle}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative rounded-xl bg-brand-cream p-6 text-center md:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-xl font-bold text-white">
                {step.number}
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{step.title}</h4>
              <p className="text-sm leading-relaxed text-text-light">{step.desc}</p>
              {idx < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-brand-gold/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
