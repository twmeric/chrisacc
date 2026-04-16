import FAQItem from "@/components/ui/FAQItem";

interface FAQSectionProps {
  lang: string;
  data: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
}

export default function FAQSection({ lang, data }: FAQSectionProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-brand-navy md:text-4xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-text-light">{data.subtitle}</p>
        </div>
        <div>
          {data.items.map((item, idx) => (
            <FAQItem key={idx} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
