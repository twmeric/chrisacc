import Image from "next/image";

interface AboutIntroProps {
  lang: string;
  data: {
    title: string;
    titleAccent: string;
    subtitle?: string;
    paragraphs: string[];
    quote: string;
    image?: string;
    badge?: { value: string; label: string };
  };
}

export default function AboutIntro({ lang, data }: AboutIntroProps) {
  const imageSrc = data.image || "/images/about-team.jpg";
  const hasParagraphs = data.paragraphs && data.paragraphs.length > 0;

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Left: Image with floating circular badge and gold border decoration */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Image
                src={imageSrc}
                alt={data.title}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
            {/* Gold border decoration */}
            <div className="absolute -left-5 -top-5 -z-10 h-full w-full rounded-xl border-[5px] border-brand-gold" />
            {data.badge && (
              <div className="absolute -bottom-8 -right-6 flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full bg-brand-gold text-center text-white shadow-[0_10px_30px_rgba(201,162,39,0.4)] md:bottom-8 md:right-8">
                <div className="text-4xl font-bold leading-none md:text-[48px]">{data.badge.value}</div>
                <div className="px-2 text-sm font-medium leading-tight">{data.badge.label}</div>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="mb-4 text-3xl font-bold leading-snug text-brand-navy md:text-[38px]">
              {data.title} <span className="text-brand-gold">{data.titleAccent}</span>
            </h2>
            {data.subtitle && (
              <p className="mb-6 text-base text-text-light md:text-lg">{data.subtitle}</p>
            )}
            {hasParagraphs && (
              <div className="mb-6 space-y-4">
                {data.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-base leading-relaxed text-text-dark md:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <blockquote className="border-l-4 border-brand-gold bg-brand-cream p-5 text-base italic text-brand-navy md:text-lg">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
