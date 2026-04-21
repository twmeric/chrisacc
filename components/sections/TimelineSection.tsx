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
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {data.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-light">{data.subtitle}</p>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-brand-gold md:left-1/2" />
          {data.events.map((event, idx) => (
            <TimelineItem
              key={idx}
              year={event.year}
              title={event.title}
              description={event.desc}
              side={idx % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
