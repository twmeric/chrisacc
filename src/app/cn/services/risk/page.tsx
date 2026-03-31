"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function RiskPageCn() {
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

      {/* Service Hero */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/cn">首页</Link> / <Link href="/cn/services">我们的服务</Link> / <span>风险咨询</span>
          </p>
          <h1>风险咨询</h1>
          <p className="tagline">&ldquo;保护价值，推动韧性&rdquo;</p>
          <p className="description">
            面对日益严峻的网络安全威胁、监管复杂性及ESG（环境、社会及管治）压力，企业韧性至关重要。我们的风险咨询服务将风险管理从被动的合规程序转化为主动的策略优势。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>前瞻性风险管理</h2>
              <p>现代企业面临前所未有的风险挑战——从网络安全威胁到ESG合规要求，从监管变化到营运中断。LT CPA 的风险咨询服务帮助您识别、评估及管理这些风险。</p>
              <p>我们的风险专业团队结合深厚的行业知识与创新的方法论，为您提供可行的风险管理策略，将潜在威胁转化为竞争优势。</p>
              <div className="highlight-box">
                <p>&ldquo;我们不只是找出问题——我们帮助您建立能够预测、预防并抵御干扰的弹性系统。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">ISO</div>
                <div className="label">合规认证</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>服务概览</h2>
            <p>全面风险管理解决方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-lock"></i></div>
              <div>
                <h3>网络安全与数据合规</h3>
                <p>ISO27001及国际</p>
              </div>
            </div>
            <div className="card-body">
              <p>数码转型开启新风险：网络攻击、数据泄露及合规违规。我们根据ISO27001及其他框架进行差距分析及控制评估。我们协助您的组织符合中国网络安全法及个人信息保护法，管理跨境数据流。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>ISO27001差距分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>控制评估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>中国网络安全法合规</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>跨境数据流管理</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <h3>企业管治与风险</h3>
                <p>ESG管治与企业风险</p>
              </div>
            </div>
            <div className="card-body">
              <p>投资者及监管机构要求提高透明度。我们协助您设计董事会监督职能，确保独立性及有效性。我们将ESG标准整合到您的企业风险管理框架中，确保您应对报告要求同时建立问责及韧性文化。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>董事会设计与监督</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>独立性与有效性评估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>ESG整合风险管理</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-network-wired"></i></div>
              <div>
                <h3>跨境监管协调</h3>
                <p>复杂监管环境</p>
              </div>
            </div>
            <div className="card-body">
              <p>在多司法管辖区营运的公司面临相互冲突的监管要求。我们在合规复杂性中导航，将特定于国家的要求协调为一致、可持续的管治模式。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>多司法管辖区合规导航</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法规协调策略</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>可持续管治模式</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要风险管理支援？</h2>
          <p>让我们的专家协助您建立韧性风险管理框架</p>
          <Link href="/cn/contact" className="cta-btn">联络我们</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
