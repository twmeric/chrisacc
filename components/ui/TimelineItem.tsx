interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export default function TimelineItem({ year, title, description, side }: TimelineItemProps) {
  return (
    <div className="relative mb-10 md:mb-12">
      {/* Dot on the timeline */}
      <span className="absolute left-5 top-[28px] z-10 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-brand-gold shadow md:left-1/2 md:-translate-x-1/2" />

      {/* Card row */}
      <div
        className={`flex justify-start pl-12 md:pl-0 ${
          side === "left" ? "md:justify-end md:pr-[50%]" : "md:justify-start md:pl-[50%]"
        }`}
      >
        <div className={`w-full md:w-[48%] ${side === "left" ? "md:pr-5" : "md:pl-5"}`}>
          <div
            className={`rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:p-8 ${
              side === "left" ? "md:text-right" : "md:text-left"
            }`}
          >
            <h4 className="mb-2 text-xl font-bold text-brand-navy sm:text-2xl">{title}</h4>
            <p className="text-base leading-relaxed text-text-light sm:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
