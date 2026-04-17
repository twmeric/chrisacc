import {
  Globe,
  TrendingUp,
  GraduationCap,
  Building2,
  Scale,
  Rocket,
  Crown,
  Link,
  Infinity,
  Settings,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Building: <Building2 className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  Rocket: <Rocket className="h-6 w-6" />,
  Crown: <Crown className="h-6 w-6" />,
  Link: <Link className="h-6 w-6" />,
  Infinity: <Infinity className="h-6 w-6" />,
  Cog: <Settings className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
  ShieldAlt: <ShieldCheck className="h-6 w-6" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  SyncAlt: <RefreshCw className="h-6 w-6" />,
  RefreshCw: <RefreshCw className="h-6 w-6" />,
};

interface PillarItem {
  icon: string;
  title: string;
  desc: string;
}

interface PillarSectionData {
  title: string;
  subtitle: string;
  quote: string;
  items: PillarItem[];
}

interface PillarsSectionProps {
  lang: string;
  data?: {
    purpose: PillarSectionData;
    value: PillarSectionData;
    commitment: PillarSectionData;
  };
}

function PillarSubSection({
  section,
  bgClass,
}: {
  section: PillarSectionData;
  bgClass: string;
}) {
  return (
    <div className={`${bgClass} px-4 py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="relative mb-3 inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {section.title}
            <span className="absolute -bottom-2 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <h3 className="mb-4 text-lg font-semibold italic text-brand-gold md:text-xl">
            &ldquo;{section.subtitle}&rdquo;
          </h3>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-light md:text-lg">
            {section.quote}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {section.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                {iconMap[item.icon] || <Globe className="h-6 w-6" />}
              </div>
              <h4 className="mb-2 text-base font-bold text-brand-navy md:text-lg">{item.title}</h4>
              <p className="text-sm leading-relaxed text-text-light md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PillarsSection({ lang, data }: PillarsSectionProps) {
  if (!data) return null;

  return (
    <>
      <PillarSubSection section={data.purpose} bgClass="bg-white" />
      <PillarSubSection section={data.value} bgClass="bg-brand-cream" />
      <PillarSubSection section={data.commitment} bgClass="bg-white" />
    </>
  );
}
