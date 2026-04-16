"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}

interface HeroSliderProps {
  lang: Locale;
  slides: Slide[];
  backgrounds?: string[];
}

export default function HeroSlider({ lang, slides, backgrounds }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const bgImages = backgrounds?.length ? backgrounds : ["/images/hero-bg-1.jpg"];

  return (
    <section className="relative mt-[72px] h-[80vh] min-h-[600px] overflow-hidden md:h-screen">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "z-[2] opacity-100" : "z-[1] opacity-0"}`}
        >
          <div
            className="absolute inset-0 animate-[zoom_8s_ease-out_forwards] bg-cover bg-center"
            style={{
              backgroundImage: `url('${bgImages[idx % bgImages.length]}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,58,92,0.88)] to-[rgba(30,50,70,0.75)]" />
        </div>
      ))}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-[90%] max-w-[900px] text-center text-white">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`${idx === current ? "block" : "hidden"}`}
            >
              <h2 className="mb-5 text-3xl font-bold text-white opacity-0 animate-[fadeInUp_0.8s_ease_forwards_0.3s] md:text-[52px]">
                {slide.title}
              </h2>
              <p className="mb-8 text-lg text-white opacity-0 animate-[fadeInUp_0.8s_ease_forwards_0.5s] md:text-xl">
                {slide.subtitle}
              </p>
              <Link
                href={`/${lang}${slide.href}`}
                className="inline-block bg-brand-gold px-8 py-4 text-base font-semibold text-white opacity-0 transition-all duration-300 animate-[fadeInUp_0.8s_ease_forwards_0.7s] hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-white hover:shadow-[0_6px_20px_rgba(201,162,39,0.45)] md:px-10 md:text-lg"
              >
                {slide.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Slider arrows */}
      <div className="absolute inset-y-0 z-10 flex w-full items-center justify-between px-4 md:px-8">
        <button
          onClick={() => setCurrent((i) => (i - 1 + slides.length) % slides.length)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:scale-110 hover:bg-brand-gold md:h-14 md:w-14"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrent((i) => (i + 1) % slides.length)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:scale-110 hover:bg-brand-gold md:h-14 md:w-14"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full border-2 border-white transition-all md:h-3.5 md:w-3.5 ${
              idx === current ? "scale-125 bg-brand-gold border-brand-gold" : "bg-transparent"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes zoom {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
