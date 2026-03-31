"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function TaxPageZh() {
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
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>稅務諮詢</span>
          </p>
          <h1>稅務諮詢</h1>
          <p className="tagline">&ldquo;優化效率，傳承基業&rdquo;</p>
          <p className="description">
            稅法瞬息萬變，常隨地緣政治趨勢而調整。我們的稅務諮詢團隊作為您的策略領航員，確保您的稅務狀況與商業目標一致，同時保持嚴格合規。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>策略性稅務規劃</h2>
              <p>在當今日益複雜的國際稅務環境中，企業需要的不僅是合規申報——他們需要前瞻性的策略規劃。</p>
              <p>LT CPA 的稅務諮詢團隊匯聚香港及國際稅務專家。我們深入掌握香港、中國內地及其他主要市場的稅務法規，為客戶提供全面的稅務解決方案。</p>
              <div className="highlight-box">
                <p>&ldquo;我們協助您設計合規的無形資產、管理服務及融資定價政策，減少BEPS下的調整及罰款風險。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">多國</div>
                <div className="label">國際稅務架構</div>
              </div>
              <div className="stat-card top-right">
                <div className="number">TP</div>
                <div className="label">轉讓定價</div>
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
            <p>為企業及個人提供全面稅務諮詢</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <div>
                <h3>國際稅務架構</h3>
                <p>跨境解決方案</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們為對外投資及跨境貿易設計高效的控股架構。無論您是進軍澳洲的中國企業還是投資亞洲的全球基金，我們分析雙重徵稅協定、預扣稅及常設機構風險的影響，優化您的全球實際稅率。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>跨境投資架構設計</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>雙重徵稅協定應用</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>預扣稅優化</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>常設機構風險評估</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>轉讓定價（TP）</h3>
                <p>符合BEPS要求</p>
              </div>
            </div>
            <div className="card-body">
              <p>隨著全球稅務機關加強對關聯方定價的審查，我們提供穩健的轉讓定價文件及基準分析。我們協助您為無形資產、管理服務及融資設計合規的定價政策，減少BEPS下的調整及罰款風險。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>轉讓定價文件</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>基準分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>預先定價安排</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-home"></i></div>
              <div>
                <h3>私人客戶及家族辦公室</h3>
                <p>財富傳承</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們與高淨值人士合作，保護他們的傳承。我們的服務包括信託架構、遺產稅規劃及跨司法管轄區的稅務效率家族移民策略。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>信託架構</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>遺產稅規劃</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>稅務效率移民</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要稅務諮詢？</h2>
          <p>讓我們的稅務專家優化您的稅務架構並確保合規</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
