import { Linkedin, Mail } from "lucide-react";

interface TeamSectionProps {
  lang: string;
  data: {
    title: string;
    subtitle: string;
    members: { name: string; role: string; image: string }[];
  };
}

export default function TeamSection({ lang, data }: TeamSectionProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {data.title}
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-light">{data.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.members.map((m, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 bg-gradient-to-t from-[rgba(26,58,92,0.9)] to-transparent p-4 opacity-0 transition-all duration-300 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy transition hover:bg-brand-gold hover:text-white">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy transition hover:bg-brand-gold hover:text-white">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-5 text-center">
                <h4 className="text-lg font-bold text-brand-navy">{m.name}</h4>
                <span className="text-sm font-medium text-brand-gold">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
