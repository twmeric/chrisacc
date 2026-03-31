"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../services/services.css";

const servicesNav = [
  { label: "審計及鑑證", id: "audit" },
  { label: "稅務諮詢", id: "tax" },
  { label: "風險及合規", id: "risk" },
  { label: "法證服務", id: "forensic" },
  { label: "諮詢服務", id: "consulting" },
  { label: "交易及併購", id: "deals" },
];

const serviceDetails = [
  {
    id: "audit",
    title: "審計及鑑證",
    slogan: "「為資本市場注入信心」",
    description: "在全球金融環境波動不定的今天，持份者所需的不僅是數字，而是數字背後的真相。我們的審計及鑑證服務是信任的基石。我們不將審計視為商品，而是驗證財務健康並發現改進機會的關鍵診斷工具。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    features: [
      "法定審計及財務報表審計",
      "內部監控審閱及評估",
      "特別目的審計報告",
      "上市公司審計服務",
      "合規審閱"
    ],
    link: "/zh/services/audit"
  },
  {
    id: "tax",
    title: "稅務諮詢",
    slogan: "「優化效率，傳承基業」",
    description: "稅法瞬息萬變，常隨地緣政治趨勢而調整。我們的稅務諮詢團隊作為您的策略領航員，確保您的稅務狀況與商業目標一致，同時保持嚴格合規。我們超越單純的申報，提供主動的規劃。",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
    features: [
      "企業稅務規劃及優化",
      "跨境稅務諮詢",
      "轉讓定價策略",
      "稅務申報及合規",
      "稅務爭議解決"
    ],
    link: "/zh/services/tax"
  },
  {
    id: "risk",
    title: "風險及合規",
    slogan: "「從被動合規到策略韌性」",
    description: "在多重危機交織的時代——監管審查、地緣政治變動與科技顛覆交錯——韌性就是競爭優勢。我們協助機構從「打勾式」合規心態轉向能預見變革的整體風險管理策略。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    features: [
      "企業風險評估及管理",
      "內部監控系統發展",
      "監管合規諮詢",
      "反洗錢（AML）合規",
      "企業管治優化"
    ],
    link: "/zh/services/risk"
  },
  {
    id: "forensic",
    title: "法證服務",
    slogan: "「保障誠信與價值」",
    description: "當商業誠信受到欺詐、失當行為或糾紛威脅時，速度與精準至關重要。我們的法證團隊結合會計專業與調查嚴謹，確立事實、量化損失並重建信任。",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    features: [
      "欺詐調查及預防",
      "商業糾紛分析",
      "訴訟支援服務",
      "資產追踪",
      "專家證人服務"
    ],
    link: "/zh/services/forensic"
  },
  {
    id: "consulting",
    title: "諮詢服務",
    slogan: "「推動轉型與績效」",
    description: "成長往往帶來複雜性。我們的諮詢業務專注於轉變您的營運模式。我們與管理團隊緊密合作，現代化財務功能、精簡營運並為您的機構下一階段演進做好準備。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    features: [
      "業務流程優化",
      "財務管理諮詢",
      "企業策略規劃",
      "數碼轉型諮詢",
      "人力資源諮詢"
    ],
    link: "/zh/services/consulting"
  },
  {
    id: "deals",
    title: "交易及併購",
    slogan: "「在每個交易階段釋放價值」",
    description: "成功的交易需要領導力與清晰度。無論您是買方、賣方還是重組方，我們穿透噪音提供關鍵財務洞見，助您自信談判並完成交易。",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    features: [
      "併購策略諮詢",
      "財務盡職審查",
      "商業估值服務",
      "交易架構設計",
      "整合後支援"
    ],
    link: "/zh/services/deals"
  }
];

export default function ServicesPageZh() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      {/* Page Banner */}
      <section className="page-banner services-banner">
        <div>
          <h1>我們的服務</h1>
          <div className="breadcrumb">
            <Link href="/zh">首頁</Link> / 我們的服務
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section className="about-section">
        <div className="section-inner text-center">
          <div className="max-w-3xl mx-auto fade-in">
            <h2>全面專業服務</h2>
            <p className="text-lg text-gray-600 leading-relaxed">我們提供多元化的專業服務，包括審計、稅務、風險管理及商業諮詢。不論您的企業規模，我們都會度身定制解決方案，滿足您的特定需求並助您達成目標。</p>
          </div>
        </div>
      </section>

      {/* Services Nav */}
      <section className="services-nav-section">
        <div className="section-inner">
          <nav className="services-nav">
            {servicesNav.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="services-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service Details */}
      <section className="services-details-section">
        {serviceDetails.map((service, index) => (
          <section 
            key={service.id}
            id={service.id}
            className={`service-detail-item ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`}
            style={{ scrollMarginTop: '80px' }}
          >
            <div className="section-inner">
              <div className={`service-detail-grid ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-image fade-in">
                  <img 
                    src={service.image}
                    alt={service.title}
                  />
                </div>
                <div className="service-content fade-in">
                  <h3>{service.title}</h3>
                  <p className="slogan">{service.slogan}</p>
                  <p className="description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link} className="btn-primary">
                    了解更多 <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>為何選擇我們</h2>
            <p>我們致力為每位客戶提供卓越的專業服務</p>
          </div>
          <div className="why-grid">
            {[
              { icon: "fa-user-tie", title: "專家團隊", desc: "資深專業團隊，具備豐富行業經驗及專業資格" },
              { icon: "fa-cogs", title: "度身方案", desc: "為每位客戶設計符合特定需求的定制解決方案" },
              { icon: "fa-clock", title: "高效服務", desc: "以客戶為中心，確保及時交付高質素成果" },
              { icon: "fa-comments", title: "緊密溝通", desc: "與客戶保持密切聯繫，迅速回應需求及疑問" }
            ].map((item) => (
              <div key={item.title} className="why-card fade-in">
                <i className={`fas ${item.icon}`}></i>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>我們的流程</h2>
            <p>四個簡單步驟，提供專業服務</p>
          </div>
          <div className="process-simple">
            {[
              { number: "1", title: "初步諮詢", desc: "了解您的需求及業務狀況" },
              { number: "2", title: "方案設計", desc: "為您創建度身定制的服務計劃" },
              { number: "3", title: "執行實施", desc: "專業團隊高效交付服務" },
              { number: "4", title: "持續支援", desc: "提供跟進及持續支援服務" }
            ].map((item) => (
              <div key={item.number} className="process-item fade-in">
                <div className="process-number">{item.number}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="fade-in">需要專業會計服務？</h2>
          <p className="fade-in">立即聯絡我們，讓專業團隊為您提供最佳解決方案</p>
          <Link href="/zh/contact" className="cta-btn fade-in">
            免費諮詢
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
