interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export default function TimelineItem({ year, title, description, side }: TimelineItemProps) {
  return (
    <div className={`relative mb-8 flex md:mb-12 ${side === "left" ? "justify-end pr-0 md:pr-[50%]" : "justify-start pl-0 md:pl-[50%]"}`}>
      <div className={`relative w-full md:w-[45%] ${side === "left" ? "md:pr-8" : "md:pl-8"}`}>
        <div className={`rounded-xl bg-white p-6 shadow-md md:p-8 ${side === "left" ? "md:text-right" : "md:text-left"}`}>
          <span className="mb-2 inline-block text-2xl font-bold text-brand-gold md:text-3xl">{year}</span>
          <h4 className="mb-2 text-lg font-bold text-brand-navy">{title}</h4>
          <p className="text-sm leading-relaxed text-text-light">{description}</p>
        </div>
        <span
          className={`absolute top-6 hidden h-4 w-4 rounded-full border-4 border-white bg-brand-gold shadow md:block ${
            side === "left" ? "right-[-6px]" : "left-[-6px]"
          }`}
        />
      </div>
      <span className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-brand-gold shadow md:block" />
    </div>
  );
}
