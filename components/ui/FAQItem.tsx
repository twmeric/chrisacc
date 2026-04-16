"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mb-4 overflow-hidden rounded-xl bg-brand-cream transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${open ? "shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-brand-navy transition-colors hover:text-brand-accent md:px-8 md:text-lg"
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-brand-gold transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 pb-6 text-sm leading-relaxed text-text-light md:px-8 md:text-base" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}
