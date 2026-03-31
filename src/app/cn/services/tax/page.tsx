"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function TaxPageCn() {
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
            <Link href="/cn">首页</Link> / <Link href="/cn/services">我们的服务</Link> / <span>税务咨询</span>
          </p>
          <h1>税务咨询</h1>
          <p className="tagline">&ldquo;优化效率，传承基业&rdquo;</p>
          <p className="description">
            税法瞬息万变，常随地缘政治趋势而调整。我们的税务咨询团队作为您的策略领航员，确保您的税务状况与商业目标一致，同时保持严格合规。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>策略性税务规划</h2>
              <p>在当今日益复杂的国际税务环境中，企业需要的不只是合规申报——他们需要前瞻性的策略规划。</p>
              <p>LT CPA 的税务咨询团队汇聚香港及国际税务专家。我们深入掌握香港、中国内地及其他主要市场的税务法规，为客户提供全面的税务解决方案。</p>
              <div className="highlight-box">
                <p>&ldquo;我们协助您设计合规的无形资产、管理服务及融资定价政策，减少BEPS下的调整及罚款风险。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">多国</div>
                <div className="label">国际税务架构</div>
              </div>
              <div className="stat-card top-right">
                <div className="number">TP</div>
                <div className="label">转让定价</div>
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
            <p>为企业及个人提供全面税务咨询</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <div>
                <h3>国际税务架构</h3>
                <p>跨境解决方案</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们为对外投资及跨境贸易设计高效的控股架构。无论您是进军澳洲的中国企业还是投资亚洲的全球基金，我们分析双重征税协定、预扣税及常设机构风险的影响，优化您的全球实际税率。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>跨境投资架构设计</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>双重征税协定应用</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>预扣税优化</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>常设机构风险评估</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>转让定价（TP）</h3>
                <p>符合BEPS要求</p>
              </div>
            </div>
            <div className="card-body">
              <p>随着全球税务机关加强对关联方定价的审查，我们提供稳健的转让定价文件及基准分析。我们协助您为无形资产、管理服务及融资设计合规的定价政策，减少BEPS下的调整及罚款风险。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>转让定价文件</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>基准分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>预先定价安排</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-home"></i></div>
              <div>
                <h3>私人客户及家族办公室</h3>
                <p>财富传承</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们与高净值人士合作，保护他们的传承。我们的服务包括信托架构、遗产税规划及跨司法管辖区的税务效率家族移民策略。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>信托架构</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>遗产税规划</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>税务效率移民</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要税务咨询？</h2>
          <p>让我们的税务专家优化您的税务架构并确保合规</p>
          <Link href="/cn/contact" className="cta-btn">联络我们</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
