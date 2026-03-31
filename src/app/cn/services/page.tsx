"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../services/services.css";

const servicesNav = [
  { label: "审计及鉴证", id: "audit" },
  { label: "税务咨询", id: "tax" },
  { label: "风险及合规", id: "risk" },
  { label: "法证服务", id: "forensic" },
  { label: "咨询服务", id: "consulting" },
  { label: "交易及并购", id: "deals" },
];

const serviceDetails = [
  {
    id: "audit",
    title: "审计及鉴证",
    slogan: "「为资本市场注入信心」",
    description: "在全球金融环境波动不定的今天，持份者所需的不仅是数字，而是数字背后的真相。我们的审计及鉴证服务是信任的基石。我们不将审计视为商品，而是验证财务健康并发现改进机会的关键诊断工具。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    features: [
      "法定审计及财务报表审计",
      "内部监控审阅及评估",
      "特别目的审计报告",
      "上市公司审计服务",
      "合规审阅"
    ],
    link: "/cn/services/audit"
  },
  {
    id: "tax",
    title: "税务咨询",
    slogan: "「优化效率，传承基业」",
    description: "税法瞬息万变，常随地缘政治趋势而调整。我们的税务咨询团队作为您的策略领航员，确保您的税务状况与商业目标一致，同时保持严格合规。我们超越单纯的申报，提供主动的规划。",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
    features: [
      "企业税务规划及优化",
      "跨境税务咨询",
      "转让定价策略",
      "税务申报及合规",
      "税务争议解决"
    ],
    link: "/cn/services/tax"
  },
  {
    id: "risk",
    title: "风险及合规",
    slogan: "「从被动合规到策略韧性」",
    description: "在多重危机交织的时代——监管审查、地缘政治变动与科技颠覆交错——韧性就是竞争优势。我们协助机构从「打勾式」合规心态转向能预见变革的整体风险管理策略。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    features: [
      "企业风险评估及管理",
      "内部监控系统发展",
      "监管合规咨询",
      "反洗钱（AML）合规",
      "企业管治优化"
    ],
    link: "/cn/services/risk"
  },
  {
    id: "forensic",
    title: "法证服务",
    slogan: "「保障诚信与价值」",
    description: "当商业诚信受到欺诈、失当行为或纠纷威胁时，速度与精准至关重要。我们的法证团队结合会计专业与调查严谨，确立事实、量化损失并重建信任。",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    features: [
      "欺诈调查及预防",
      "商业纠纷分析",
      "诉讼支援服务",
      "资产追踪",
      "专家证人服务"
    ],
    link: "/cn/services/forensic"
  },
  {
    id: "consulting",
    title: "咨询服务",
    slogan: "「推动转型与绩效」",
    description: "成长往往带来复杂性。我们的咨询业务专注于转变您的营运模式。我们与管理团队紧密合作，现代化财务功能、精简营运并为您的机构下一阶段演进做好准备。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    features: [
      "业务流程优化",
      "财务管理咨询",
      "企业策略规划",
      "数码转型咨询",
      "人力资源咨询"
    ],
    link: "/cn/services/consulting"
  },
  {
    id: "deals",
    title: "交易及并购",
    slogan: "「在每个交易阶段释放价值」",
    description: "成功的交易需要领导力与清晰度。无论您是买方、卖方还是重组方，我们穿透噪音提供关键财务洞见，助您自信谈判并完成交易。",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    features: [
      "并购策略咨询",
      "财务尽职审查",
      "商业估值服务",
      "交易架构设计",
      "整合后支援"
    ],
    link: "/cn/services/deals"
  }
];

export default function ServicesPageCn() {
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
          <h1>我们的服务</h1>
          <div className="breadcrumb">
            <Link href="/cn">首页</Link> / 我们的服务
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section className="about-section">
        <div className="section-inner text-center">
          <div className="max-w-3xl mx-auto fade-in">
            <h2>全面专业服务</h2>
            <p className="text-lg text-gray-600 leading-relaxed">我们提供多元化的专业服务，包括审计、税务、风险管理及商业咨询。不论您的企业规模，我们都会度身定制解决方案，满足您的特定需求并助您达成目标。</p>
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
            <h2>为何选择我们</h2>
            <p>我们致力为每位客户提供卓越的专业服务</p>
          </div>
          <div className="why-grid">
            {[
              { icon: "fa-user-tie", title: "专家团队", desc: "资深专业团队，具备丰富行业经验及专业资格" },
              { icon: "fa-cogs", title: "度身方案", desc: "为每位客户设计符合特定需求的定制解决方案" },
              { icon: "fa-clock", title: "高效服务", desc: "以客户为中心，确保及时交付高质素成果" },
              { icon: "fa-comments", title: "紧密沟通", desc: "与客户保持密切联系，迅速回应需求及疑问" }
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
            <h2>我们的流程</h2>
            <p>四个简单步骤，提供专业服务</p>
          </div>
          <div className="process-simple">
            {[
              { number: "1", title: "初步咨询", desc: "了解您的需求及业务状况" },
              { number: "2", title: "方案设计", desc: "为您创建度身定制的服务计划" },
              { number: "3", title: "执行实施", desc: "专业团队高效交付服务" },
              { number: "4", title: "持续支援", desc: "提供跟进及持续支援服务" }
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
          <h2 className="fade-in">需要专业会计服务？</h2>
          <p className="fade-in">立即联络我们，让专业团队为您提供最佳解决方案</p>
          <Link href="/cn/contact" className="cta-btn fade-in">
            免费咨询
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
