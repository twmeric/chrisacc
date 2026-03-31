"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./forensic.css";

export default function ForensicPageCn() {
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
            <Link href="/cn">首页</Link> / <Link href="/cn/services">我们的服务</Link> / <span>法证会计</span>
          </p>
          <h1>法证会计</h1>
          <p className="tagline">&ldquo;当复杂性呼唤清晰&rdquo;</p>
          <p className="description">
            财务争议、欺诈指控及监管调查需要无懈可击的专业知识。我们的法证会计团队专门负责将复杂的财务数据转化为清晰、可信的证据。
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>专业法证会计服务</h2>
              <p>财务争议、欺诈指控及监管调查需要无懈可击的专业知识。我们的法证会计团队专门负责将复杂的财务数据转化为清晰、可信的证据，用于争议解决、监管程序及内部调查。</p>
              <p>我们的专业团队结合审计、法律及调查技能，能够应对最复杂的财务挑战。无论是股东纠纷、舞弊调查还是诉讼支援，我们都能提供清晰、客观且具说服力的分析。</p>
              <div className="highlight-box">
                <p>&ldquo;我们的调查员是经验丰富的审计师、法律分析及财务建模师，为您提供全方位的法证支援。&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-search-dollar"></i>
              </div>
              <div className="stat-card top-right">
                <div className="number">证据</div>
                <div className="label">具约束力</div>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">法院</div>
                <div className="label">诉讼支援</div>
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
            <p>全面法证会计解决方案</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-balance-scale"></i></div>
              <div>
                <h3>争议解决及股东纠纷</h3>
                <p>可靠且可辩护的评估</p>
              </div>
            </div>
            <div className="card-body">
              <p>当关系恶化时，对公司、股份或业务的公允价值进行可靠且可辩护的评估至关重要。我们的专家证人具备提供具约束力证据及出庭作证的资格。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>公司股份估值</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>业务公允价值评估</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>专家证人服务</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法庭诉讼支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-user-secret"></i></div>
              <div>
                <h3>舞弊调查</h3>
                <p>内部及外部调查</p>
              </div>
            </div>
            <div className="card-body">
              <p>从供应商及员工舞弊到管理层欺诈，我们进行敏感的内部及外部调查。我们追溯可疑交易，识别隐藏的资产转移，并为监管机构或法庭程序记录证据链。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>供应商舞弊调查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>员工欺诈调查</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>管理层欺诈</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>隐藏资产追查</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-coins"></i></div>
              <div>
                <h3>追踪及资产追回</h3>
                <p>跨境资产追踪</p>
              </div>
            </div>
            <div className="card-body">
              <p>我们在涉及资金流经香港及国际实体的复杂案件中追踪资金，协助追回通过复杂法律结构隐藏的资产。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>资金流追踪</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>复杂法律结构分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>资产追回支援</span></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon"><i className="fas fa-gavel"></i></div>
              <div>
                <h3>诉讼支援</h3>
                <p>全方位法律支援</p>
              </div>
            </div>
            <div className="card-body">
              <p>从计算损失到分析复杂的财务数据，我们的法律诉讼支援服务帮助律师事务所在法律程序中建立有力的财务论据。</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>损失计算</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>复杂财务数据分析</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>法律程序财务论证</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Process */}
      <section className="section process-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>调查流程</h2>
            <p>我们的法证调查方法论</p>
          </div>
          <div className="forensic-timeline">
            <div className="process-step fade-in">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>初期评估</h4>
                <p>了解事件背景，确定调查范围和目标</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>数据收集</h4>
                <p>获取相关财务记录和文件</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>深入分析</h4>
                <p>进行详细的财务和法证分析</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-number">04</div>
              <div className="step-content">
                <h4>报告及证据</h4>
                <p>撰写可呈堂的专家报告</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>需要法证会计协助？</h2>
          <p>让我们的专业团队为您提供清晰可靠的法证分析</p>
          <Link href="/cn/contact" className="cta-btn">联络我们</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
