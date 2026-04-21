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
    body?: string;
  };
}

export default function AboutIntro({ lang, data }: AboutIntroProps) {
  const imageSrc = data.image || "/images/about-team.jpg";
  const displayBody = data.body || (data.paragraphs ? data.paragraphs.join("\n\n") : "");

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        {/* Full-width image */}
        <div className="mb-12 overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={imageSrc}
            alt={data.title}
            width={1600}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
        {/* Text content below image */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold leading-snug text-brand-navy md:text-[40px]">
            {data.title} <span className="text-brand-gold">{data.titleAccent}</span>
          </h2>
          {data.subtitle && (
            <p className="mb-8 text-lg text-text-light">{data.subtitle}</p>
          )}
          {displayBody && (
            <div className="mb-8 whitespace-pre-line text-base leading-relaxed text-text-dark md:text-lg">
              {displayBody}
            </div>
          )}
          <blockquote className="border-l-4 border-brand-gold bg-brand-cream p-6 text-base italic text-brand-navy md:text-lg">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
