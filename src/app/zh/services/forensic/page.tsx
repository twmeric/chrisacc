"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./forensic.css";

export default function ForensicPageZh() {
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
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>法證會計</span>
          </p>
          <h1>法證會計</h1>
          <p className="tagline">&ldquo;當複雜性呼喚清晰&rdquo;</p>
          <p className="description">
            財務爭議、欺詐指控及監管調查需要無懈可擊的專業知識。我們的法證會計團隊專門負責將複雜的財務數據轉化為清晰、可信的證據。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>專業法證會計服務</h2>
              <p>財務爭議、欺詐指控及監管調查需要無懈可擊的專業知識。我們的法證會計團隊專門負責將複雜的財務數據轉化為清晰、可信的證據，用於爭議解決、監管程序及內部調查。</p>
              <p>我們的專業團隊結合審計、法律及調查技能，能夠應對最複雜的財務挑戰。無論是股東糾紛、舞弊調查還是訴訟支援，我們都能提供清晰、客觀且具說服力的分析。</p>
              <div className="highlight-box">
                <p>&ldquo;我們的調查員是經驗豐富的審計師、法律分析及財務建模師，為您提供全方位的法證支援。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-search-dollar"></i>
              </div>
              <div className="stat-card top-right">
                <div className="number">證據</div>
                <div className="label">具約束力</div>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">法院</div>
                <div className="label">訴訟支援</div>
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
            <p>全面法證會計解決方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>爭議解決及股東糾紛</h3>
                <p>可靠且可辯護的評估</p>
              </div>
            </div>
            <div className="card-body">
              <p>當關係惡化時，對公司、股份或業務的公允價值進行可靠且可辯護的評估至關重要。我們的專家證人具備提供具約束力證據及出庭作證的資格。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>公司股份估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>業務公允價值評估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>專家證人服務</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法庭訴訟支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-user-secret"></i></div>
              <div>
                <h3>舞弊調查</h3>
                <p>內部及外部調查</p>
              </div>
            </div>
            <div className="card-body">
              <p>從供應商及員工舞弊到管理層欺詐，我們進行敏感的內部及外部調查。我們追溯可疑交易，識別隱藏的資產轉移，並為監管機構或法庭程序記錄證據鏈。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>供應商舞弊調查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>員工欺詐調查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>管理層欺詐</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>隱藏資產追查</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-coins"></i></div>
              <div>
                <h3>追蹤及資產追回</h3>
                <p>跨境資產追蹤</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們在涉及資金流經香港及國際實體的複雜案件中追蹤資金，協助追回通過複雜法律結構隱藏的資產。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>資金流追蹤</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>複雜法律結構分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>資產追回支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-gavel"></i></div>
              <div>
                <h3>訴訟支援</h3>
                <p>全方位法律支援</p>
              </div>
            </div>
            <div className="card-body">
              <p>從計算損失到分析複雜的財務數據，我們的法律訴訟支援服務幫助律師事務所和企業在法律程序中建立有力的財務論據。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>損失計算</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>複雜財務數據分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法律程序財務論證</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Process */}
      <section className="section process-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>調查流程</h2>
            <p>我們的法證調查方法論</p>
          </div>
          <div className="forensic-timeline">
            <div className="process-step fade-in">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>初期評估</h4>
                <p>了解事件背景，確定調查範圍和目標</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>數據收集</h4>
                <p>獲取相關財務記錄和文件</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>深入分析</h4>
                <p>進行詳細的財務和法證分析</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">04</div>
              <div className="step-content">
                <h4>報告及證據</h4>
                <p>撰寫可呈堂的專家報告</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要法證會計協助？</h2>
          <p>讓我們的專業團隊為您提供清晰可靠的法證分析</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
