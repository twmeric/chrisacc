import TimelineItem from "@/components/ui/TimelineItem";

interface TimelineSectionProps {
  lang: string;
  data: {
    title: string;
    subtitle: string;
    events: { year: string; title: string; desc: string }[];
  };
}

export default function TimelineSection({ lang, data }: TimelineSectionProps) {
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {data.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-light">{data.subtitle}</p>
        </div>
        {/* Responsive grid: 1 col mobile, 2 col tablet, 3-5 col desktop */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.events.map((event, idx) => (
            <TimelineItem
              key={idx}
              year={event.year}
              title={event.title}
              description={event.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
