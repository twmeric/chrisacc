interface TimelineItemProps {
  title: string;
  description: string;
}

export default function TimelineItem({ title, description }: TimelineItemProps) {
  return (
    <div className="group flex flex-col justify-center rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:p-8 lg:p-10">
      <h4 className="mb-3 text-xl font-bold text-brand-navy sm:text-2xl lg:text-[26px]">{title}</h4>
      <p className="text-base leading-relaxed text-text-light sm:text-lg">{description}</p>
    </div>
  );
}
