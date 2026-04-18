"use client";

import * as Icons from "lucide-react";

interface StatItem {
  number: string;
  label: string;
  position?: "top" | "bottom";
}

interface ServiceOverviewV2Props {
  title: string;
  paragraphs: string[];
  highlight: string;
  stat: { number: string; label: string } | null;
  stats?: StatItem[];
  icon?: string;
  image: string;
}

export default function ServiceOverviewV2({
  title,
  paragraphs,
  highlight,
  stat,
  stats,
  icon,
  image,
}: ServiceOverviewV2Props) {
  // Merge legacy single stat with new stats array
  const allStats: StatItem[] = stats?.length
    ? stats
    : stat
      ? [{ ...stat, position: "bottom" }]
      : [];

  const IconComponent = icon
    ? ((Icons as unknown) as Record<string, React.ComponentType<any>>)[icon]
    : null;

  const topStat = allStats.find((s) => s.position === "top");
  const bottomStat = allStats.find((s) => s.position !== "top");

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="relative mb-6 inline-block text-2xl font-bold text-brand-navy md:mb-8 md:text-3xl">
              {title}
              <span className="absolute -bottom-2 left-0 h-[2px] w-16 bg-brand-gold" />
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-dark md:text-lg">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            {highlight && (
              <div className="mt-6 rounded-xl border-l-4 border-brand-gold bg-brand-cream p-5 md:mt-8 md:p-6">
                <p className="text-base font-medium italic text-brand-navy md:text-lg">
                  {highlight}
                </p>
              </div>
            )}
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-2xl object-cover shadow-lg"
                />
              ) : (
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-accent shadow-lg">
                  {IconComponent && (
                    <IconComponent className="h-32 w-32 text-brand-gold/30 md:h-40 md:w-40" strokeWidth={1} />
                  )}
                </div>
              )}

              {/* Top-right stat card */}
              {topStat && (
                <div className="absolute -top-3 -right-2 rounded-xl bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:-top-5 md:-right-5 md:px-6 md:py-5">
                  <div className="text-xl font-bold text-brand-navy md:text-2xl">{topStat.number}</div>
                  <div className="text-xs text-text-light md:text-sm">{topStat.label}</div>
                </div>
              )}

              {/* Bottom-left stat card */}
              {bottomStat && (
                <div className="absolute -bottom-5 -left-2 rounded-xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:-left-5 md:px-6 md:py-5">
                  <div className="text-2xl font-bold text-brand-navy md:text-3xl">{bottomStat.number}</div>
                  <div className="text-sm text-text-light">{bottomStat.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
