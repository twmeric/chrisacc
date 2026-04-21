interface TimelineItemProps {
  title: string;
  description: string;
}

export default function TimelineItem({ title, description }: TimelineItemProps) {
  return (
    <div className="group flex flex-col rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:p-8 lg:p-10">
      <h4 className="mb-3 text-lg font-bold text-brand-navy sm:text-xl lg:text-2xl">{title}</h4>
      <p className="text-sm leading-relaxed text-text-light sm:text-base lg:text-lg">{description}</p>
    </div>
  );
}
