interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export default function TimelineItem({ year, title, description, side }: TimelineItemProps) {
  return (
    <div className="relative mb-6 md:mb-8">
      {/* Dot on the timeline */}
      <span className="absolute left-5 top-[24px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-brand-gold shadow md:left-1/2 md:-translate-x-1/2" />

      {/* Card row */}
      <div
        className={`flex justify-start pl-12 md:pl-0 ${
          side === "left" ? "md:justify-end md:pr-[50%]" : "md:justify-start md:pl-[50%]"
        }`}
      >
        <div className={`w-full md:w-[45%] ${side === "left" ? "md:pr-8" : "md:pl-8"}`}>
          <div
            className={`rounded-lg bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] ${
              side === "left" ? "md:text-right" : "md:text-left"
            }`}
          >
            <span className="mb-1 inline-block text-sm font-bold text-brand-gold">{year}</span>
            <h4 className="mb-1 text-base font-bold text-brand-navy">{title}</h4>
            <p className="text-sm leading-relaxed text-text-light">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
