"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function DealsPageZh() {
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
      <section className="service-hero deals-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>交易及併購</span>
          </p>
          <h1>交易、併購及重組</h1>
          <p className="tagline">&ldquo;在每個交易階段釋放價值&rdquo;</p>
          <p className="description">
            成功的交易需要領導力與清晰度。無論您是買方、賣方還是重組方，我們穿透噪音提供關鍵財務洞見，助您自信談判並完成交易。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>在每個交易階段釋放價值</h2>
              <p>成功的交易需要清晰度與領導力。無論您是買方、賣方還是重組方，我們穿透噪音提供關鍵財務洞見，助您自信談判並完成交易。</p>
              <p>我們進行全面的買方及賣方盡職審查，超越驗證歷史數字，深入分析盈利質素、營運資金趨勢及隱藏稅務負債。我們的報告為您提供調整定價或協商彌償的彈藥。</p>
              <div className="highlight-box">
                <p>&ldquo;我們提供商業、無形資產及金融工具的獨立估值。無論是財務報告（收購價格分攤）、稅務目的還是交易定價，我們的估值模型穩健、可捍衛並基於當前市場數據。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-handshake"></i>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">DD</div>
                <div className="label">盡職審查</div>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">PPA</div>
                <div className="label">收購價格分攤</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>財務及稅務盡職審查、估值服務、企業重組及整合</h2>
            <p>全面交易支援服務，滿足您的併購需求</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-search-dollar"></i></div>
              <div>
                <h3>財務及稅務盡職審查</h3>
                <p>買方及賣方</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們進行全面的買方及賣方盡職審查。我們超越驗證歷史數字，深入分析盈利質素、營運資金趨勢及隱藏稅務負債。我們的報告為您提供調整定價或協商彌償的彈藥。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>財務盡職審查（買方及賣方）</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>稅務盡職審查及架構建議</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>盈利質素分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>營運資金趨勢分析</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <h3>估值服務</h3>
                <p>商業、無形資產及金融工具</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們提供商業、無形資產及金融工具的獨立估值。無論是財務報告（收購價格分攤）、稅務目的還是交易定價，我們的估值模型穩健、可捍衛並基於當前市場數據。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>企業整體估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>無形資產估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>收購價格分攤（PPA）</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>金融工具估值</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-project-diagram"></i></div>
              <div>
                <h3>企業重組及整合</h3>
                <p>上市前及併購後</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們協助處理企業重組的複雜機制。這包括上市前集團重組以進行分拆上市，以及併購後整合規劃以確保實現的協同效應與交易理據一致。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>上市前集團重組</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>分拆上市準備</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>併購後整合規劃</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>協同效應實現評估</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要交易及併購支援？</h2>
          <p>在每個交易階段釋放價值——讓我們的團隊協助您完成交易</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
