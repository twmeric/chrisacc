"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/services/services.css";

export default function ConsultingPageZh() {
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
            <Link href="/zh">首頁</Link> / <Link href="/zh/services">我們的服務</Link> / <span>企業顧問</span>
          </p>
          <h1>企業顧問</h1>
          <p className="tagline">&ldquo;優化營運，掌控未來&rdquo;</p>
          <p className="description">
            業務成功需要的不僅是合規，更需要策略性洞察和營運卓越。我們的企業顧問服務幫助企業提升效率、簡化流程並最大化企業價值。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>推動營運卓越</h2>
              <p>在競爭激烈的商業環境中，企業需要不斷優化營運以保持領先地位。我們的企業顧問服務幫助組織識別效率改進機會、簡化複雜流程並實現可衡量的績效提升。</p>
              <p>無論是為首次公開招股準備的財務健康檢查，還是設計全新的ERP系統控制框架，我們的專業團隊都能為您提供實用的解決方案。</p>
              <div className="highlight-box">
                <p>&ldquo;我們將複雜問題轉化為可執行的策略，幫助您的企業在變革中蓬勃發展。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">流程</div>
                <div className="label">優化改造</div>
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
            <p>全面的企業顧問解決方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-tasks"></i></div>
              <div>
                <h3>營運評估及流程優化</h3>
                <p>IPO準備及改進</p>
              </div>
            </div>
            <div className="card-body">
              <p>無論是為首次公開招股準備的財務健康檢查，還是設計全新的ERP系統控制框架，我們識別效率改進機會並推動可衡量的績效提升。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>IPO準備財務健康檢查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>ERP系統控制框架設計</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>效率改進機會識別</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>績效提升策略</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-clipboard-check"></i></div>
              <div>
                <h3>內部控制及合規</h3>
                <p>健全的控制環境</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們評估並記錄影響財務報告的業務流程中的控制環境。我們協助設計預防性和檢查性控制以緩解風險，為您的業務奠定穩固基礎。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>控制環境評估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>流程控制記錄</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>預防性控制設計</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>檢查性控制機制</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-calculator"></i></div>
              <div>
                <h3>估值及模擬測試</h3>
                <p>公正估值服務</p>
              </div>
            </div>
            <div className="card-body">
              <p>我們提供公司、商譽及金融工具的公正估值，用於財務報告、融資或策略規劃目的。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>公司整體估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>商譽估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>金融工具估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>策略規劃支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>中國及香港法規合規</h3>
                <p>跨境合規專長</p>
              </div>
            </div>
            <div className="card-body">
              <p>對於在兩個地區營運的企業，我們橋接會計、公司秘書及監管要求方面的差距。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>中港會計準則協調</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>公司秘書合規</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>監管要求導航</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>為何選擇 LT CPA 的企業顧問</h2>
            <p>我們的差異化優勢</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-lightbulb"></i></div>
              <h4>實用建議</h4>
              <p>我們提供可立即實施的實用建議，而非紙上談兵。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-sync-alt"></i></div>
              <h4>跨領域專長</h4>
              <p>我們結合會計、稅務及法律專長，提供全方位解決方案。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <h4>成果導向</h4>
              <p>我們專注於可衡量的成果，確保您的投資獲得回報。</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon"><i className="fas fa-handshake"></i></div>
              <h4>長期夥伴</h4>
              <p>我們致力於與客戶建立長期合作關係，持續提供支援。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要企業顧問支援？</h2>
          <p>讓我們的專業團隊協助您優化營運並實現業務目標</p>
          <Link href="/zh/contact" className="cta-btn">聯絡我們</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
