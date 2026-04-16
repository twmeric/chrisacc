interface MapSectionProps {
  lang: string;
  data: {
    title: string;
    address: string;
    embedUrl: string;
  };
}

export default function MapSection({ lang, data }: MapSectionProps) {
  return (
    <section className="bg-brand-cream">
      <div className="relative h-[350px] w-full bg-gray-300 md:h-[450px]">
        <iframe
          src={data.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
        <div className="absolute bottom-6 left-1/2 z-10 w-[90%] max-w-md -translate-x-1/2 rounded-2xl bg-white p-5 text-center shadow-[0_15px_40px_rgba(0,0,0,0.15)] md:bottom-8 md:p-6">
          <h3 className="mb-1 text-lg font-bold text-brand-navy md:text-xl">{data.title}</h3>
          <p className="text-sm text-text-light">{data.address}</p>
        </div>
      </div>
    </section>
  );
}
