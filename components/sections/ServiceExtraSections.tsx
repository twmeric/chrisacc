"use client";

import React from "react";
import * as Icons from "lucide-react";

interface ExtraSection {
  title: string;
  subtitle?: string;
  body?: string;
  items?: { title: string; desc: string; icon?: string }[];
  steps?: { number: string; title: string; desc: string }[];
  layout: "cards" | "steps" | "text" | "list";
}

export default function ServiceExtraSections({
  sections,
}: {
  sections: ExtraSection[];
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((sec, idx) => {
        const isDark = idx % 2 === 1;
        const bgClass = isDark
          ? "bg-gradient-to-br from-brand-navy to-[#2c5282] text-white"
          : "bg-brand-cream";
        const textClass = isDark ? "text-white" : "text-text-dark";
        const subtitleClass = isDark ? "text-white/70" : "text-text-light";
        const cardBg = isDark
          ? "bg-white/10 border-white/10"
          : "bg-white border-slate-100";
        const cardText = isDark ? "text-white/90" : "text-text-dark";
        const cardDesc = isDark ? "text-white/70" : "text-text-light";

        return (
          <section key={idx} className={`${bgClass} px-4 py-16 md:py-24`}>
            <div className="mx-auto max-w-6xl">
              {(sec.title || sec.subtitle) && (
                <div className="mb-10 text-center md:mb-14">
                  {sec.title && (
                    <h2
                      className={`text-3xl font-bold md:text-4xl ${
                        isDark ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {sec.title}
                    </h2>
                  )}
                  {sec.subtitle && (
                    <p className={`mt-3 ${subtitleClass}`}>{sec.subtitle}</p>
                  )}
                </div>
              )}

              {sec.body && sec.layout === "text" && (
                <div
                  className={`mx-auto max-w-4xl text-lg leading-relaxed ${textClass}`}
                >
                  {sec.body}
                </div>
              )}

              {sec.items && sec.layout === "cards" && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sec.items.map((item, i) => {
                    const IconComponent = item.icon
                      ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon]
                      : null;
                    return (
                      <div
                        key={i}
                        className={`rounded-xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${cardBg}`}
                      >
                        {IconComponent && (
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/10">
                            <IconComponent className="h-6 w-6 text-brand-navy" />
                          </div>
                        )}
                        <h4 className={`mb-2 text-lg font-semibold ${cardText}`}>
                          {item.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${cardDesc}`}>
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {sec.items && sec.layout === "list" && (
                <div className="mx-auto max-w-4xl space-y-4">
                  {sec.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 rounded-xl border p-5 ${cardBg}`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${cardText}`}>
                          {item.title}
                        </h4>
                        <p className={`mt-1 text-sm leading-relaxed ${cardDesc}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {sec.steps && sec.layout === "steps" && (
                <div className="mx-auto max-w-4xl">
                  <div className="relative">
                    <div
                      className={`absolute left-6 top-0 hidden h-full w-0.5 md:block ${
                        isDark ? "bg-white/20" : "bg-brand-navy/10"
                      }`}
                    />
                    <div className="space-y-8">
                      {sec.steps.map((step, i) => (
                        <div
                          key={i}
                          className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8"
                        >
                          <div
                            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                              isDark
                                ? "bg-brand-gold text-brand-navy"
                                : "bg-brand-navy text-white"
                            }`}
                          >
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h4
                              className={`text-xl font-semibold ${
                                isDark ? "text-white" : "text-brand-navy"
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p
                              className={`mt-2 leading-relaxed ${subtitleClass}`}
                            >
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
