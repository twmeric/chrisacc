"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuditPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      {/* Service Hero - 严格按照原稿 */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Audit & Assurance</span>
          </p>
          <h1>Audit & Assurance</h1>
          <p className="tagline">&ldquo;Building confidence in capital markets.&rdquo;</p>
          <p className="description">
            In a global financial landscape characterised by volatility, stakeholders need not just numbers but the truth behind them. Our audit and assurance practice is the foundation of trust. We do not treat audit as a commodity but as a critical diagnostic tool to verify financial health and uncover opportunities for improvement.
          </p>
        </div>
      </section>

      {/* Overview Section - 严格按照原稿 */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Professional Audit You Can Trust</h2>
              <p>In today&apos;s complex business environment, the accuracy and reliability of financial statements are essential for maintaining investor confidence, meeting regulatory requirements and supporting strategic decisions.</p>
              <p>LT CPA&apos;s audit and assurance team comprises experienced professionals. We are well versed in Hong Kong Standards on Auditing (HKSA) and International Standards on Auditing (ISA), and are committed to delivering high-quality audit services to our clients.</p>
              <div className="highlight-box">
                <p>&ldquo;Our risk-based audit approach focuses on the areas that matter most to your business, ensuring an efficient and valuable audit process.&rdquo;</p>
              </div>
              <p>Our audits are more than compliance exercises—they are opportunities to deliver valuable insights to management. By gaining a deep understanding of your operations, we identify potential risks, uncover areas for improvement and provide practical recommendations.</p>
            </div>
            <div className="overview-visual">
              <div className="main-image">
                <i className="fas fa-check-double"></i>
              </div>
              <div className="stat-card bottom">
                <div className="number">98%</div>
                <div className="label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section - 严格按照原稿 */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Service Overview</h2>
            <p>Comprehensive audit and assurance services to meet your needs</p>
          </div>
          
          {/* Card 1 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <div>
                <h3>Statutory & Non-Statutory Audit</h3>
                <p>HKSA & ISA Compliant</p>
              </div>
            </div>
            <div className="card-body">
              <p>We perform rigorous financial statement audits in accordance with Hong Kong and International Standards on Auditing. Our risk-based approach focuses on your industry-specific key drivers and high-risk areas, ensuring an efficient process with minimal operational disruption.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Annual statutory financial statement audits</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Interim financial statement reviews</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Special purpose audit reports</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Compliance audits and agreed-upon procedures</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Non-profit organisation audits</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Government-funded project audits</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <h3>Capital Market Transactions</h3>
                <p>IPO & Bond Offerings</p>
              </div>
            </div>
            <div className="card-body">
              <p>As reporting accountants, we act as the financial gatekeeper for companies seeking to list on the Hong Kong or other major exchanges. We work with sponsors and legal counsel to deliver accountant&apos;s reports, pro forma financial information and comfort letters required for a successful IPO.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>IPO accountant&apos;s reports</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Pro forma financial information</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Profit forecast reviews</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Comfort letters</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Bond offering audit services</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Post-listing ongoing compliance support</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-globe"></i>
              </div>
              <div>
                <h3>Cross-Border Reporting & Consolidation</h3>
                <p>Multi-Jurisdiction</p>
              </div>
            </div>
            <div className="card-body">
              <p>For multinational groups, we bridge the gap between local statutory requirements and international reporting frameworks. We coordinate with component auditors across jurisdictions to deliver seamless consolidated financial statements that present group performance clearly and consistently.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Group consolidated financial statement audits</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>IFRS/HKFRS conversion</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Multi-jurisdiction audit coordination</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Overseas subsidiary audit management</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Related party transaction review</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Foreign currency translation</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - 严格按照原稿 */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Audit Process</h2>
            <p>A systematic approach to ensure quality and efficiency</p>
          </div>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-content">
                <h4>Planning & Risk Assessment</h4>
                <p>Deep dive into your business, industry environment and internal controls; identify areas of significant misstatement risk and develop a tailored audit strategy.</p>
              </div>
              <div className="step-number">1</div>
              <div className="step-spacer"></div>
            </div>
            <div className="process-step">
              <div className="step-spacer"></div>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Internal Control Testing</h4>
                <p>Evaluate the design and operating effectiveness of internal controls over key business processes; determine the nature, timing and extent of substantive procedures.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-content">
                <h4>Substantive Procedures</h4>
                <p>Perform analytical procedures and tests of details to obtain sufficient appropriate audit evidence to support the audit opinion.</p>
              </div>
              <div className="step-number">3</div>
              <div className="step-spacer"></div>
            </div>
            <div className="process-step">
              <div className="step-spacer"></div>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Completion & Reporting</h4>
                <p>Summarise audit findings, discuss significant matters with management, and issue the audit report and management letter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - 严格按照原稿 */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Why Choose LT CPA for Audit</h2>
            <p>Our differentiators</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-star"></i>
              </div>
              <h4>Professional Qualifications</h4>
              <p>Our team holds HKICPA and internationally recognised qualifications, ensuring services meet the highest professional standards.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Partner Involvement</h4>
              <p>Every audit is supervised by a senior partner to ensure consistent audit quality and client service.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h4>Industry Expertise</h4>
              <p>Deep understanding of sector-specific issues and delivery of targeted audit approaches and valuable industry insights.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Responsive Communication</h4>
              <p>Clear communication channels and timely updates on audit progress for a smooth, efficient process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - 严格按照原稿 */}
      <section className="section related-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Related Services</h2>
          </div>
          <div className="related-grid">
            <div className="related-card">
              <h4>Risk & Regulatory</h4>
              <p>Help build robust internal control frameworks and meet regulatory compliance requirements.</p>
              <Link href="/services/risk">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Deals & M&A</h4>
              <p>Financial due diligence, valuation and transaction support for informed investment decisions.</p>
              <Link href="/services/deals">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Consulting</h4>
              <p>Finance function transformation, process optimisation and improved operational efficiency.</p>
              <Link href="/services/consulting">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 严格按照原稿 */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Professional Audit Services?</h2>
          <p>Let our expert team deliver high-quality audit solutions for you</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
