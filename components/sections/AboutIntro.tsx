interface AboutIntroProps {
  lang: string;
  data: {
    title: string;
    titleAccent: string;
    paragraphs: string[];
    quote: string;
    stats: { value: string; label: string }[];
  };
}

export default function AboutIntro({ lang, data }: AboutIntroProps) {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold text-brand-navy md:text-[40px]">
            {data.title} <span className="text-brand-gold">{data.titleAccent}</span>
          </h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {data.paragraphs.map((p, idx) => (
              <p key={idx} className="mb-5 text-base leading-relaxed text-text-dark md:text-lg">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 border-l-4 border-brand-gold bg-brand-cream p-5 text-base italic text-brand-navy md:text-lg">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {data.stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-5 text-center text-white shadow-lg md:p-8"
              >
                <div className="mb-1 text-3xl font-bold text-brand-gold md:text-4xl">{s.value}</div>
                <div className="text-sm opacity-90 md:text-base">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
