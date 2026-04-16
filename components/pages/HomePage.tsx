import { Locale } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import { getLocaleCMS } from "@/lib/cms-data";
import HeroSlider from "@/components/sections/HeroSlider";
import ServiceCard from "@/components/ui/ServiceCard";
import ContactCTA from "@/components/sections/ContactCTA";
import SectionHeader from "@/components/ui/SectionHeader";

interface HomePageProps {
  lang: Locale;
}

const serviceSlugs = ["audit", "tax", "risk", "forensic", "consulting", "deals"];

function getServiceIcon(slug: string) {
  const map: Record<string, string> = {
    audit: "fa-clipboard-check",
    tax: "fa-calculator",
    risk: "fa-shield-alt",
    forensic: "fa-search-dollar",
    consulting: "fa-chart-line",
    deals: "fa-handshake",
  };
  return map[slug] || "fa-chart-line";
}

export default function HomePage({ lang }: HomePageProps) {
  const cms = getLocaleCMS(lang);
  const services = getAllMarkdownFiles("services", lang).filter((s) => serviceSlugs.includes(s.slug));

  return (
    <>
      <HeroSlider lang={lang} slides={cms.home.hero.slides} backgrounds={cms.home.hero.backgrounds} />

      <section className="bg-brand-cream px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title={cms.home.services.title} subtitle={cms.home.services.subtitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard
                key={svc.slug}
                lang={lang}
                slug={svc.slug}
                title={svc.data.title as string}
                description={svc.data.short_description as string}
                iconName={getServiceIcon(svc.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA lang={lang} data={cms.home.cta} />
    </>
  );
}
