interface WhyChooseV2Props {
  title: string;
  desc: string;
  items: { icon: string; title: string; desc: string }[];
}

export default function WhyChooseV2({ title, desc, items }: WhyChooseV2Props) {
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-light">{desc}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="mb-4 text-4xl text-brand-gold">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h4 className="mb-2 text-lg font-bold text-brand-navy">{item.title}</h4>
              <p className="text-sm leading-relaxed text-text-light md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
