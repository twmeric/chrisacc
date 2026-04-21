interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export default function TimelineItem({ year, title, description, side }: TimelineItemProps) {
  return (
    <div className="relative mb-16 md:mb-20">
      {/* Dot — floats above card on the center line */}
      <span className="absolute left-5 top-8 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-brand-gold shadow md:left-1/2 md:-translate-x-1/2" />

      {/* Card — 65% width, anchored to left or right */}
      <div
        className={`w-full ${
          side === "left" ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
        } md:w-[65%]`}
      >
        <div className="rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.1)] sm:p-8">
          <h4 className="mb-2 text-xl font-bold text-brand-navy sm:text-2xl">{title}</h4>
          <p className="text-base leading-relaxed text-text-light sm:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
