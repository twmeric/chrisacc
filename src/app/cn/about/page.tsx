"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../about/about.css";

const features = [
  { icon: "fa-award", title: "专业认证", desc: "我们的团队由持牌会计师及金融专家组成" },
  { icon: "fa-briefcase", title: "行业经验", desc: "多年服务各行业及领域的丰富经验" },
  { icon: "fa-lightbulb", title: "度身方案", desc: "为您独特需求定制的财务策略" },
  { icon: "fa-heart", title: "优质服务", desc: "致力为每位客户提供卓越服务体验" },
];

const missionCards = [
  { icon: "fa-target", title: "我们的使命", desc: "以专业精准锚定全球抱负，赋能企业清晰、合规、自信地驾驭国际金融环境的复杂性。", link: "/cn/about/purpose" },
  { icon: "fa-trending-up", title: "我们的价值", desc: "成为无国界商业卓越的明确桥梁——在全球获认可为寻求进入国际资本市场的动态企业的首选精品伙伴。", link: "/cn/about/value" },
  { icon: "fa-shield", title: "我们的承诺", desc: "以主动引导及技术专长引领，桥接您的全球抱负，为您的企业建立信任与转型的传承。", link: "/cn/about/commitment" },
];

const coreValues = [
  { title: "卓越", desc: "持续提升专业能力，提供优质服务，为客户创造最大价值" },
  { title: "诚信", desc: "恪守专业道德，以诚实透明态度对待每位客户" },
  { title: "创新", desc: "拥抱变革与创新，利用尖端科技提升服务效率" },
  { title: "协作", desc: "培养协作精神，整合专业资源，提供全面客户支援" },
];

const timeline = [
  { year: "2010", title: "公司成立", desc: "LT CPA Limited 于香港成立，开始为本地中小企提供专业会计服务的旅程。" },
  { year: "2013", title: "服务扩展", desc: "成功扩展至税务咨询及商业咨询服务，客户群突破100间公司。" },
  { year: "2016", title: "团队壮大", desc: "专业团队增至30人，服务扩展至并购及法证会计。" },
  { year: "2019", title: "数码转型", desc: "实施先进数码系统，提升服务效率，提供更无缝的客户体验。" },
  { year: "2024", title: "全球认可", desc: "服务超过500位客户，团队超过50名专业人士，持续致力为客户创造价值。" },
];

export default function AboutPageCn() {
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
          <h1>关于我们</h1>
          <div className="breadcrumb">
            <Link href="/cn">首页</Link> / 关于我们
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
                alt="专业团队"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="about-content fade-in">
            <h2>为何选择我们？</h2>
            <p>LT CPA Limited 拥有经验丰富的专业团队，致力提供优质会计及顾问服务。我们以客户为先，深入了解每位客户的独特需求，提供度身定制的解决方案。</p>
            <p>凭借多年行业经验，我们建立了广泛的专业网络，能够提供全面商业支援，助您在竞争激烈的市场中脱颖而出。</p>
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
          <h2>核心价值</h2>
          <p>我们秉持的价值观指引每个决定和行动</p>
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
          <h2>我们的历程</h2>
          <p>见证我们多年来的成长与蜕变</p>
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
          <h2 className="fade-in">无论您的企业规模，我们都能提供专业可靠的财务解决方案</h2>
          <Link href="/cn/contact" className="btn fade-in">
            立即联络我们
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
