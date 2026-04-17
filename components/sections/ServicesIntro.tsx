interface ServicesIntroProps {
  title: string;
  desc: string;
}

export default function ServicesIntro({ title, desc }: ServicesIntroProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-brand-navy md:text-[40px]">{title}</h2>
        <p className="text-lg leading-relaxed text-text-light md:text-xl">{desc}</p>
      </div>
    </section>
  );
}
