"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function ConsultingPageCn() {
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
            <Link href="/cn">首页</Link> / <Link href="/cn/services">我们的服务</Link> / <span>企业顾问</span>
          </p>
          <h1>企业顾问</h1>
          <p className="tagline">&ldquo;优化营运，掌控未来&rdquo;</p>
          <p className="description">
            业务成功需要的不只是合规，更需要策略性洞察和营运卓越。我们的企业顾问服务帮助企业提升效率、简化流程并最大化企业价值。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>推动营运卓越</h2>
              <p>在竞争激烈的商业环境中，企业需要不断优化营运以保持领先地位。我们的企业顾问服务帮助组织识别效率改进机会、简化复杂流程并实现可衡量的绩效提升。</p>
              <p>无论是为首次公开招股准备的财务健康检查，还是设计全新的ERP系统控制框架，我们的专业团队都能为您提供实用的解决方案。</p>
              <div className="highlight-box">
                <p>&ldquo;我们将复杂问题转化为可执行的策略，帮助您的企业在变革中蓬勃发展。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">流程</div>
                <div className="label">优化改造</div>
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
            <p>全面的企业顾问解决方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-tasks"></i></div>
              <div>
                <h3>营运评估及流程优化</h3>
                <p>IPO准备及改进</p>
              </div>
            </div>
            <div className="card-body">
              <p>无论是为首次公开招股准备的财务健康检查，还是设计全新的ERP系统控制框架，我们识别效率改进机会并推动可衡量的绩效提升。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>IPO准备财务健康检查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>ERP系统控制框架设计</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>效率改进机会识别</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>绩效提升策略</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-clipboard-check"></i></div>
              <div>
                <h3>内部控制及合规</h3>
                <p>健全的控制环境</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们评估并记录影响财务报告的业务流程中的控制环境。我们协助设计预防性和检查性控制以缓解风险，为您的业务奠定稳固基础。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>控制环境评估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>流程控制记录</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>预防性控制设计</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>检查性控制机制</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-calculator"></i></div>
              <div>
                <h3>估值及模拟测试</h3>
                <p>公正估值服务</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们提供公司、商誉及金融工具的公正估值，用于财务报告、融资或策略规划目的。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>公司整体估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>商誉估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>金融工具估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>策略规划支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>中国及香港法规合规</h3>
                <p>跨境合规专长</p>
              </div>
            </div>
            <div className="card-body">
              <p>对于在两个地区营运的企业，我们桥接会计、公司秘书及监管要求方面的差距。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>中港会计准则协调</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>公司秘书合规</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>监管要求导航</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>为何选择 LT CPA 的企业顾问</h2>
            <p>我们的差异化优势</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-lightbulb"></i></div>
              <h4>实用建议</h4>
              <p>我们提供可立即实施的实用建议，而非纸上谈兵。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-sync-alt"></i></div>
              <h4>跨领域专长</h4>
              <p>我们结合会计、税务及法律专长，提供全方位解决方案。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <h4>成果导向</h4>
              <p>我们专注于可衡量的成果，确保您的投资获得回报。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-handshake"></i></div>
              <h4>长期伙伴</h4>
              <p>我们致力于与客户建立长期合作关系，持续提供支援。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要企业顾问支援？</h2>
          <p>让我们的专业团队协助您优化营运并实现业务目标</p>
          <Link href="/cn/contact" className="cta-btn">联络我们</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
