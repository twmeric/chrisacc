"use client";

import { useState } from "react";
import * as Icons from "lucide-react";

interface AccordionItem {
  icon: string;
  title: string;
  desc: string;
}

interface AccordionCardsProps {
  items: AccordionItem[];
}

export default function AccordionCards({ items }: AccordionCardsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const IconComponent =
          ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string }>>)[
            item.icon
          ] || Icons.Circle;
        return (
          <div
            key={idx}
            className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
                <IconComponent className="h-5 w-5" />
              </div>
              <h4 className="flex-1 text-lg font-semibold text-brand-navy">
                {item.title}
              </h4>
              <span
                className={`text-2xl font-light text-brand-navy transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-0 text-base leading-relaxed text-text-dark">
                  {item.desc}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
