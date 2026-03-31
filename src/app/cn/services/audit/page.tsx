"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function AuditPageCn() {
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
            <Link href="/cn">首页</Link> / <Link href="/cn/services">我们的服务</Link> / <span>审计及鉴证</span>
          </p>
          <h1>审计及鉴证</h1>
          <p className="tagline">&ldquo;为资本市场注入信心&rdquo;</p>
          <p className="description">
            在全球金融环境波动不定的今天，持份者所需的不只是数字，而是数字背后的真相。我们的审计及鉴证服务是信任的基石。我们不将审计视为商品，而是验证财务健康并发现改进机会的关键诊断工具。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>您可以信赖的专业审计</h2>
              <p>在当今复杂的商业环境中，财务报表的准确性和可靠性对于维持投资者信心、符合监管要求及支持策略决策至关重要。</p>
              <p>LT CPA 的审计及鉴证团队由经验丰富的专业人士组成。我们精通香港审计准则（HKSA）及国际审计准则（ISA），致力为客户提供高质素的审计服务。</p>
              <div className="highlight-box">
                <p>&ldquo;我们的风险导向审计方法专注于对您业务最重要的领域，确保高效且有价值的审计流程。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-check-double"></i>
              </div>
              <div className="stat-card bottom">
                <div className="number">98%</div>
                <div className="label">客户满意度</div>
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
            <p>全面审计及鉴证服务，满足您的需求</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-file-invoice"></i></div>
              <div>
                <h3>法定及非法定审计</h3>
                <p>符合HKSA及ISA</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们按照香港及国际审计准则执行严谨的财务报表审计。我们的风险导向方法专注于您行业特定的关键驱动因素及高风险领域，确保高效流程并最大程度减少营运干扰。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>年度法定财务报表审计</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>中期财务报表审阅</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>特别目的审计报告</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>合规审计及协定程序</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <h3>资本市场交易</h3>
                <p>上市及债券发行</p>
              </div>
            </div>
            <div className="card-body">
              <p>作为申报会计师，我们担任寻求在香港或其他主要交易所上市的公司的财务把关者。我们与保荐人及法律顾问合作，提供会计师报告、备考财务资料及上市所需的安慰函。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>上市会计师报告</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>备考财务资料</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>盈利预测审阅</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>安慰函</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <div>
                <h3>跨境报告及合并</h3>
                <p>多司法管辖区</p>
              </div>
            </div>
            <div className="card-body">
              <p>对于跨国集团，我们桥接本地法定要求与国际报告框架之间的差距。我们协调各司法管辖区的组成部分审计师，提供无缝合并财务报表，清晰一致地呈现集团表现。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>集团合并财务报表审计</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>国际财务报告准则转换</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>多司法管辖区审计协调</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>海外子公司审计管理</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>为何选择 LT CPA 进行审计</h2>
            <p>我们的差异化优势</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-star"></i></div>
              <h4>专业资格</h4>
              <p>我们的团队持有香港会计师公会及国际认可资格，确保服务符合最高专业标准。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h4>合伙人参与</h4>
              <p>每个审计项目均由资深合伙人监督，确保审计质素和客户服务的一致性。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-cogs"></i></div>
              <h4>行业专长</h4>
              <p>深入理解行业特定问题，提供针对性的审计方法及宝贵的行业洞见。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-clock"></i></div>
              <h4>快速回应</h4>
              <p>清晰的沟通渠道及时的审计进度更新，确保流程顺畅高效。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要专业审计服务？</h2>
          <p>让我们的专家团队为您提供高质素审计解决方案</p>
          <Link href="/cn/contact" className="cta-btn">联络我们</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
