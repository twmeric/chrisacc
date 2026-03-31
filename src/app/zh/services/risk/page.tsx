"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function RiskPageZh() {
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
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>風險諮詢</span>
          </p>
          <h1>風險諮詢</h1>
          <p className="tagline">&ldquo;保護價值，推動韌性&rdquo;</p>
          <p className="description">
            面對日益嚴峻的網絡安全威脅、監管複雜性及ESG（環境、社會及管治）壓力，企業韌性至關重要。我們的風險諮詢服務將風險管理從被動的合規程序轉化為主動的策略優勢。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>前瞻性風險管理</h2>
              <p>現代企業面臨前所未有的風險挑戰——從網絡安全威脅到ESG合規要求，從監管變化到營運中斷。LT CPA 的風險諮詢服務幫助您識別、評估及管理這些風險。</p>
              <p>我們的風險專業團隊結合深厚的行業知識與創新的方法論，為您提供可行的風險管理策略，將潛在威脅轉化為競爭優勢。</p>
              <div className="highlight-box">
                <p>&ldquo;我們不只是找出問題——我們幫助您建立能夠預測、預防並抵禦干擾的彈性系統。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">ISO</div>
                <div className="label">合規認證</div>
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
            <p>全面風險管理解決方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-lock"></i></div>
              <div>
                <h3>網絡安全與數據合規</h3>
                <p>ISO27001及國際</p>
              </div>
            </div>
            <div className="card-body">
              <p>數碼轉型開啟新風險：網絡攻擊、數據洩露及合規違規。我們根據ISO27001及其他框架進行差距分析及控制評估。我們協助您的組織符合中國網絡安全法及個人信息保護法，管理跨境數據流。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>ISO27001差距分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>控制評估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>中國網絡安全法合規</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>跨境數據流管理</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <h3>企業管治與風險</h3>
                <p>ESG管治與企業風險</p>
              </div>
            </div>
            <div className="card-body">
              <p>投資者及監管機構要求提高透明度。我們協助您設計董事會監督職能，確保獨立性及有效性。我們將ESG標準整合到您的企業風險管理框架中，確保您應對報告要求同時建立問責及韌性文化。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>董事會設計與監督</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>獨立性與有效性評估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>ESG整合風險管理</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-network-wired"></i></div>
              <div>
                <h3>跨境監管協調</h3>
                <p>複雜監管環境</p>
              </div>
            </div>
            <div className="card-body">
              <p>在多司法管轄區營運的公司面臨相互衝突的監管要求。我們在合規複雜性中導航，將特定於國家的要求協調為一致、可持續的管治模式。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>多司法管轄區合規導航</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法規協調策略</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>可持續管治模式</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要風險管理支援？</h2>
          <p>讓我們的專家協助您建立韌性風險管理框架</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
