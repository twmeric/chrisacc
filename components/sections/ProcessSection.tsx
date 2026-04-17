interface ProcessSectionProps {
  title: string;
  subtitle: string;
  steps: { number: string; title: string; desc: string }[];
}

export default function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-light">{subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-brand-cream p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-xl font-bold text-white md:h-16 md:w-16 md:text-2xl">
                {step.number}
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{step.title}</h4>
              <p className="text-sm leading-relaxed text-text-light md:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
