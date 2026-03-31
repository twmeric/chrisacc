"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const slides = [
  {
    id: 0,
    bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80",
    title: "專業會計服務",
    description: "審計、稅務及諮詢服務，助您的業務穩健發展",
    cta: "了解更多",
    link: "/zh/services",
  },
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    title: "您可信賴的合作夥伴",
    description: "以豐富經驗和專業知識，提供優質金融解決方案",
    cta: "了解更多",
    link: "/zh/about",
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80",
    title: "策略性商業顧問",
    description: "從稅務規劃到併購交易，全力支持您的商業決策",
    cta: "聯絡我們",
    link: "/zh/contact",
  },
];

const services = [
  {
    icon: "fa-search-dollar",
    title: "審計及鑑證",
    description: "法定審計、內部審計及各類鑑證服務，確保財務報表的準確性及合規性。",
    link: "/zh/services/audit",
  },
  {
    icon: "fa-file-invoice-dollar",
    title: "稅務諮詢",
    description: "專業稅務規劃及申報服務，助您合法節稅並優化稅務結構。",
    link: "/zh/services/tax",
  },
  {
    icon: "fa-shield-alt",
    title: "風險及合規",
    description: "協助企業識別及管理風險，確保營運符合監管要求。",
    link: "/zh/services/risk",
  },
  {
    icon: "fa-user-secret",
    title: "法證服務",
    description: "專業調查及法證會計服務，協助處理商業糾紛及欺詐調查。",
    link: "/zh/services/forensic",
  },
  {
    icon: "fa-lightbulb",
    title: "諮詢服務",
    description: "從商業策略到營運優化，提供全面專業顧問服務。",
    link: "/zh/services/consulting",
  },
  {
    icon: "fa-handshake",
    title: "交易及併購",
    description: "以專業知識協助併購交易、盡職審查及商業估值。",
    link: "/zh/services/deals",
  },
];

export default function HomeZh() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Slider */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${currentSlide === index ? "active" : ""}`}
          >
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="slide-overlay" />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <Link href={slide.link} className="btn">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
        <div className="slider-nav">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={currentSlide === index ? "active" : ""}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <div className="slider-arrows">
          <button onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-[#f7fafc]">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>我們的服務</h2>
            <p>提供全面專業的會計及顧問服務，滿足您多元的商業需求</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.link}
                className="service-card-link fade-in block h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-card bg-white p-10 rounded-xl text-center transition-all duration-400 relative overflow-hidden group hover:-translate-y-2.5 hover:shadow-xl h-full flex flex-col">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#1a3a5c] to-[#3182ce] rounded-full flex items-center justify-center text-white text-3xl transition-all duration-400 group-hover:rotate-y-360 group-hover:from-[#c9a227] group-hover:to-[#d4af37]">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <h3 className="text-xl text-[#1a3a5c] mb-4 font-semibold">{service.title}</h3>
                  <p className="text-[#718096] text-[15px] leading-relaxed mb-4 flex-grow">{service.description}</p>
                  <span className="inline-block text-[#c9a227] font-semibold text-sm mt-auto">了解更多 &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section contact-cta">
        <div className="section-inner">
          <h2 className="fade-in">準備開始了嗎？</h2>
          <p className="fade-in">立即聯絡我們，讓專業團隊為您提供最佳的金融解決方案</p>
          <Link href="/zh/contact" className="btn fade-in">
            聯絡我們
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
