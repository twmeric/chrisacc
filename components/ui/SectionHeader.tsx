interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <h2 className={`relative inline-block text-3xl font-bold md:text-[40px] ${light ? "text-white" : "text-brand-navy"}`}>
        {title}
        <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-6 max-w-[600px] text-lg ${light ? "text-white/90" : "text-text-light"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
