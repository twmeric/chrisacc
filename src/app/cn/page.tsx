"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const slides = [
  {
    id: 0,
    bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80",
    title: "专业会计服务",
    description: "审计、税务及咨询服务，助您的业务稳健发展",
    cta: "了解更多",
    link: "/cn/services",
  },
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    title: "您可信赖的合作伙伴",
    description: "以丰富经验和专业知识，提供优质金融解决方案",
    cta: "了解更多",
    link: "/cn/about",
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80",
    title: "战略性商业顾问",
    description: "从税务规划到并购交易，全力支持您的商业决策",
    cta: "联系我们",
    link: "/cn/contact",
  },
];

const services = [
  {
    icon: "fa-search-dollar",
    title: "审计及鉴证",
    description: "法定审计、内部审计及各类鉴证服务，确保财务报表的准确性及合规性。",
    link: "/cn/services/audit",
  },
  {
    icon: "fa-file-invoice-dollar",
    title: "税务咨询",
    description: "专业税务规划及申报服务，助您合法节税并优化税务结构。",
    link: "/cn/services/tax",
  },
  {
    icon: "fa-shield-alt",
    title: "风险及合规",
    description: "协助企业识别及管理风险，确保营运符合监管要求。",
    link: "/cn/services/risk",
  },
  {
    icon: "fa-user-secret",
    title: "法证服务",
    description: "专业调查及法证会计服务，协助处理商业纠纷及欺诈调查。",
    link: "/cn/services/forensic",
  },
  {
    icon: "fa-lightbulb",
    title: "咨询服务",
    description: "从商业策略到营运优化，提供全面专业顾问服务。",
    link: "/cn/services/consulting",
  },
  {
    icon: "fa-handshake",
    title: "交易及并购",
    description: "以专业知识协助并购交易、尽职审查及商业估值。",
    link: "/cn/services/deals",
  },
];

export default function HomeCn() {
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
            <h2>我们的服务</h2>
            <p>提供全面专业的会计及顾问服务，满足您多元的商業需求</p>
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
          <h2 className="fade-in">准备开始了吗？</h2>
          <p className="fade-in">立即联络我们，让专业团队为您提供最佳的金融解决方案</p>
          <Link href="/cn/contact" className="btn fade-in">
            联系我们
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
