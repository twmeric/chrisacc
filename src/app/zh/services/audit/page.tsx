"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function AuditPageZh() {
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
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>審計及鑑證</span>
          </p>
          <h1>審計及鑑證</h1>
          <p className="tagline">&ldquo;為資本市場注入信心&rdquo;</p>
          <p className="description">
            在全球金融環境波動不定的今天，持份者所需的不僅是數字，而是數字背後的真相。我們的審計及鑑證服務是信任的基石。我們不將審計視為商品，而是驗證財務健康並發現改進機會的關鍵診斷工具。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>您可以信賴的專業審計</h2>
              <p>在當今複雜的商業環境中，財務報表的準確性和可靠性對於維持投資者信心、符合監管要求及支持策略決策至關重要。</p>
              <p>LT CPA 的審計及鑑證團隊由經驗豐富的專業人士組成。我們精通香港審計準則（HKSA）及國際審計準則（ISA），致力為客戶提供高質素的審計服務。</p>
              <div className="highlight-box">
                <p>&ldquo;我們的風險導向審計方法專注於對您業務最重要的領域，確保高效且有價值的審計流程。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-check-double"></i>
              </div>
              <div className="stat-card bottom">
                <div className="number">98%</div>
                <div className="label">客戶滿意度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>服務概覽</h2>
            <p>全面審計及鑑證服務，滿足您的需求</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-file-invoice"></i></div>
              <div>
                <h3>法定及非法定審計</h3>
                <p>符合HKSA及ISA</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們按照香港及國際審計準則執行嚴謹的財務報表審計。我們的風險導向方法專注於您行業特定的關鍵驅動因素及高風險領域，確保高效流程並最大程度減少營運干擾。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>年度法定財務報表審計</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>中期財務報表審閱</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>特別目的審計報告</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>合規審計及協定程序</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <h3>資本市場交易</h3>
                <p>上市及債券發行</p>
              </div>
            </div>
            <div className="card-body">
              <p>作為申報會計師，我們擔任尋求在香港或其他主要交易所上市的公司的財務把關者。我們與保薦人及法律顧問合作，提供會計師報告、備考財務資料及上市所需的安慰函。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>上市會計師報告</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>備考財務資料</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>盈利預測審閱</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>安慰函</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <div>
                <h3>跨境報告及合併</h3>
                <p>多司法管轄區</p>
              </div>
            </div>
            <div className="card-body">
              <p>對於跨國集團，我們橋接本地法定要求與國際報告框架之間的差距。我們協調各司法管轄區的組成部分審計師，提供無縫合併財務報表，清晰一致地呈現集團表現。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>集團合併財務報表審計</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>國際財務報告準則轉換</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>多司法管轄區審計協調</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>海外子公司審計管理</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>為何選擇 LT CPA 進行審計</h2>
            <p>我們的差異化優勢</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-star"></i></div>
              <h4>專業資格</h4>
              <p>我們的團隊持有香港會計師公會及國際認可資格，確保服務符合最高專業標準。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h4>合夥人參與</h4>
              <p>每個審計項目均由資深合夥人監督，確保審計質素和客戶服務的一致性。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-cogs"></i></div>
              <h4>行業專長</h4>
              <p>深入理解行業特定問題，提供針對性的審計方法及寶貴的行業洞見。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-clock"></i></div>
              <h4>快速回應</h4>
              <p>清晰的溝通渠道及時的審計進度更新，確保流程順暢高效。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要專業審計服務？</h2>
          <p>讓我們的專家團隊為您提供高質素審計解決方案</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
