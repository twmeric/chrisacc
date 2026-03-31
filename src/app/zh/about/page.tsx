"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../about/about.css";

const features = [
  { icon: "fa-award", title: "專業認證", desc: "我們的團隊由持牌會計師及金融專家組成" },
  { icon: "fa-briefcase", title: "行業經驗", desc: "多年服務各行業及領域的豐富經驗" },
  { icon: "fa-lightbulb", title: "度身方案", desc: "為您獨特需求定制的財務策略" },
  { icon: "fa-heart", title: "優質服務", desc: "致力為每位客戶提供卓越服務體驗" },
];

const missionCards = [
  { icon: "fa-target", title: "我們的使命", desc: "以專業精準錨定全球抱負，赋能企業清晰、合規、自信地駕馭國際金融環境的複雜性。", link: "/zh/about/purpose" },
  { icon: "fa-trending-up", title: "我們的價值", desc: "成為無國界商業卓越的明確橋樑——在全球獲認可為尋求進入國際資本市場的動態企業的首選精品夥伴。", link: "/zh/about/value" },
  { icon: "fa-shield", title: "我們的承諾", desc: "以主動引導及技術專長引領，橋接您的全球抱負，為您的企業建立信任與轉型的傳承。", link: "/zh/about/commitment" },
];

const coreValues = [
  { title: "卓越", desc: "持續提升專業能力，提供優質服務，為客戶創造最大價值" },
  { title: "誠信", desc: "恪守專業道德，以誠實透明態度對待每位客戶" },
  { title: "創新", desc: "擁抱變革與創新，利用尖端科技提升服務效率" },
  { title: "協作", desc: "培養協作精神，整合專業資源，提供全面客戶支援" },
];

const timeline = [
  { year: "2010", title: "公司成立", desc: "LT CPA Limited 於香港成立，開始為本地中小企提供專業會計服務的旅程。" },
  { year: "2013", title: "服務擴展", desc: "成功擴展至稅務諮詢及商業諮詢服務，客戶群突破100間公司。" },
  { year: "2016", title: "團隊壯大", desc: "專業團隊增至30人，服務擴展至併購及法證會計。" },
  { year: "2019", title: "數碼轉型", desc: "實施先進數碼系統，提升服務效率，提供更無縫的客戶體驗。" },
  { year: "2024", title: "全球認可", desc: "服務超過500位客戶，團隊超過50名專業人士，持續致力為客戶創造價值。" },
];

export default function AboutPageZh() {
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
    <main className="min-h-screen about-page">
      <Header />
      
      {/* Page Banner */}
      <section className="page-banner">
        <div>
          <h1>關於我們</h1>
          <div className="breadcrumb">
            <Link href="/zh">首頁</Link> / 關於我們
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper fade-in">
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="專業團隊"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="about-content fade-in">
            <h2>為何選擇我們？</h2>
            <p>LT CPA Limited 擁有經驗豐富的專業團隊，致力提供優質會計及顧問服務。我們以客戶為先，深入了解每位客戶的獨特需求，提供度身定制的解決方案。</p>
            <p>憑藉多年行業經驗，我們建立了廣泛的專業網絡，能夠提供全面商業支援，助您在競爭激烈的市場中脱穎而出。</p>
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Cards */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          {missionCards.map((card, index) => (
            <div key={index} className="mv-card fade-in">
              <div className="mv-icon">
                <i className={`fas ${card.icon} w-8 h-8 text-white`}></i>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <Link href={card.link} className="mv-more">
                更多 <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values-section">
        <div className="section-header fade-in">
          <h2>核心價值</h2>
          <p>我們秉持的價值觀指引每個決定和行動</p>
        </div>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-item fade-in">
              <i className={`fas fa-${['award', 'handshake', 'lightbulb', 'users'][index]}`}></i>
              <h4>{value.title}</h4>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="section-header fade-in">
          <h2>我們的歷程</h2>
          <p>見證我們多年來的成長與蛻變</p>
        </div>
        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div key={index} className={`timeline-item fade-in ${index % 2 === 0 ? '' : 'reverse'}`}>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-inner text-center">
          <h2 className="fade-in">無論您的企業規模，我們都能提供專業可靠的財務解決方案</h2>
          <Link href="/zh/contact" className="btn fade-in">
            立即聯絡我們
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
