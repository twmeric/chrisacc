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
    stats: { value: string; label: string }[];
  };
}

export default function AboutIntro({ lang, data }: AboutIntroProps) {
  const imageSrc = data.image || "/images/about-team.jpg";

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image with floating badge */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={imageSrc}
                alt={data.title}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
            {data.badge && (
              <div className="absolute -bottom-6 -right-4 rounded-xl bg-brand-gold px-6 py-4 text-center text-white shadow-lg md:bottom-6 md:right-6">
                <div className="text-3xl font-bold md:text-4xl">{data.badge.value}</div>
                <div className="text-sm font-medium md:text-base">{data.badge.label}</div>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="mb-2 text-3xl font-bold text-brand-navy md:text-[40px]">
              {data.title} <span className="text-brand-gold">{data.titleAccent}</span>
            </h2>
            {data.subtitle && (
              <p className="mb-6 text-base italic text-text-light md:text-lg">{data.subtitle}</p>
            )}
            <div className="mb-6 space-y-4">
              {data.paragraphs.map((p, idx) => (
                <p key={idx} className="text-base leading-relaxed text-text-dark md:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="border-l-4 border-brand-gold bg-brand-cream p-5 text-base italic text-brand-navy md:text-lg">
              &ldquo;{data.quote}&rdquo;
            </blockquote>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6">
              {data.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-5 text-center text-white shadow-lg md:p-6"
                >
                  <div className="mb-1 text-2xl font-bold text-brand-gold md:text-3xl">{s.value}</div>
                  <div className="text-sm opacity-90 md:text-base">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
