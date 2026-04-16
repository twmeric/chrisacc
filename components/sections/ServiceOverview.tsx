interface ServiceOverviewProps {
  title: string;
  paragraphs: string[];
}

export default function ServiceOverview({ title, paragraphs }: ServiceOverviewProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-navy md:text-3xl">{title}</h2>
        <div className="space-y-5 text-base leading-relaxed text-text-dark md:text-lg">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
