interface MapSectionProps {
  lang: string;
}

export default function MapSection({ lang }: MapSectionProps) {
  const overlayTitle = lang === "en" ? "LT CPA Limited" : "櫪韜會計師事務所有限公司";
  const overlayAddress = lang === "en" ? "Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong" : "香港金鐘力寶中心2座5樓503室";

  return (
    <section className="bg-brand-cream">
      <div className="relative h-[350px] w-full bg-gray-300 md:h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.943648503026!2d114.16538231544394!3d22.27932798533504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404005a8b8e7c5b%3A0x7c5b8b8e7c5b8b8e!2sLippo%20Centre!5e0!3m2!1sen!2shk!4v1600000000000!5m2!1sen!2shk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
        <div className="absolute bottom-6 left-1/2 z-10 w-[90%] max-w-md -translate-x-1/2 rounded-2xl bg-white p-5 text-center shadow-[0_15px_40px_rgba(0,0,0,0.15)] md:bottom-8 md:p-6">
          <h3 className="mb-1 text-lg font-bold text-brand-navy md:text-xl">{overlayTitle}</h3>
          <p className="text-sm text-text-light">{overlayAddress}</p>
        </div>
      </div>
    </section>
  );
}
