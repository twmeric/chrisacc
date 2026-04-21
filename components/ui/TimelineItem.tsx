interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

export default function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <div className="relative flex flex-col rounded-xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] md:p-6">
      {/* Year badge */}
      <span className="mb-3 inline-block w-fit rounded-full bg-brand-gold px-3 py-1 text-sm font-bold text-white">
        {year}
      </span>
      <h4 className="mb-2 text-lg font-bold text-brand-navy">{title}</h4>
      <p className="text-sm leading-relaxed text-text-light">{description}</p>
    </div>
  );
}
