interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export default function TimelineItem({ year, title, description, side }: TimelineItemProps) {
  return (
    <div className="relative mb-10 md:mb-14">
      {/* Dot on the timeline */}
      <span className="absolute left-5 top-[36px] z-10 h-6 w-6 -translate-x-1/2 rounded-full border-[5px] border-white bg-brand-gold shadow-lg md:left-1/2 md:-translate-x-1/2" />

      {/* Card row */}
      <div
        className={`flex justify-start pl-12 md:pl-0 ${
          side === "left" ? "md:justify-end md:pr-[50%]" : "md:justify-start md:pl-[50%]"
        }`}
      >
        <div className={`w-full md:w-[46%] ${side === "left" ? "md:pr-12" : "md:pl-12"}`}>
          <div
            className={`rounded-2xl bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.16)] sm:p-10 lg:p-12 ${
              side === "left" ? "md:text-right" : "md:text-left"
            }`}
          >
            <h4 className="mb-4 text-2xl font-bold text-brand-navy sm:text-3xl">{title}</h4>
            <p className="text-lg leading-relaxed text-text-light sm:text-xl">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
