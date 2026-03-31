"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConsultingPage() {
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
      <section className="service-hero consulting-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Consulting</span>
          </p>
          <h1>Consulting</h1>
          <p className="tagline">&ldquo;Turn finance into a strategic driver.&rdquo;</p>
          <p className="description">
            The finance function should not be limited to bookkeeping and reporting. Our consulting services help organisations transform the finance team into a powerful analytics engine and strategic partner.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>Driving Transformation and Performance</h2>
              <p>Growth often brings complexity. Our consulting practice is dedicated to the transformation of your operating model. We work alongside management to modernise the finance function, streamline operations and prepare your organisation for its next phase of evolution.</p>
              <p>We help traditional finance functions evolve into strategic business partners. This includes automating manual reconciliation processes, shortening the financial close cycle and implementing cloud-based ERP systems.</p>
              <div className="highlight-box">
                <p>&ldquo;For fast-growing SMEs and IPO-bound companies, we provide interim finance support and senior finance strategy, effectively filling the gap before a full-time CFO is appointed.&rdquo;</p>
              </div>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-cogs"></i>
              </div>
              <div className="stat-card bottom">
                <div className="number">ERP</div>
                <div className="label">System Implementation</div>
              </div>
              <div className="stat-card" style={{ top: "-20px", right: "-20px" }}>
                <div className="number">CFO</div>
                <div className="label">Finance Advisory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Our Consulting Services</h2>
            <p>Finance function transformation, finance support and business process re-engineering</p>
          </div>

          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <div>
                <h3>Finance Function Transformation</h3>
                <p>Strategic Business Partner</p>
              </div>
            </div>
            <div className="card-body">
              <p>We help traditional finance functions evolve into strategic business partners. This includes automating manual reconciliation processes, shortening the financial close cycle and implementing cloud-based ERP systems.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Process automation and optimisation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Financial close cycle reduction</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Cloud-based ERP implementation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Real-time dashboard and reporting</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div>
                <h3>Finance Support & Advisory</h3>
                <p>Interim CFO & Strategy</p>
              </div>
            </div>
            <div className="card-body">
              <p>For fast-growing SMEs and IPO-bound companies, we provide interim finance support and senior finance strategy. We assist with budgeting, forecasting and investor presentation materials.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Interim CFO services</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Budgeting and forecasting</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Investor presentation materials</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>IPO financial readiness</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <div>
                <h3>Business Process Re-engineering</h3>
                <p>Process Optimisation</p>
              </div>
            </div>
            <div className="card-body">
              <p>We analyse your core business workflows—from procurement to sales—to identify bottlenecks and inefficiencies. Through redesigning these processes, we help you reduce operating costs and increase agility.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>End-to-end process mapping</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Bottleneck identification</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Operating cost reduction</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Agility enhancement</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Finance Transformation Journey</h2>
            <p>From traditional finance to strategic partner</p>
          </div>
          <div className="journey-container">
            <div className="journey-phase fade-in">
              <div className="phase-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h4>Recorder</h4>
              <p>Traditional finance focused on transaction processing and compliance reporting</p>
            </div>
            <div className="journey-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="journey-phase fade-in">
              <div className="phase-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h4>Reporter</h4>
              <p>Standardised financial reporting with focus on data accuracy and timeliness</p>
            </div>
            <div className="journey-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="journey-phase fade-in">
              <div className="phase-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Analyst</h4>
              <p>Deep analysis of business data, trend insights and performance analysis</p>
            </div>
            <div className="journey-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="journey-phase fade-in">
              <div className="phase-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4>Strategic Partner</h4>
              <p>Involved in business decisions, forward-looking advice and value creation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CFO Services Section */}
      <section className="section cfo-services-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Outsourced CFO Services</h2>
            <p>Flexible finance leadership for growing businesses</p>
          </div>
          <div className="cfo-grid">
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Financial Strategy & Planning</h4>
              <p>Annual financial plans, budgeting, capital structure optimisation and long-term financial strategy.</p>
            </div>
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-wallet"></i>
              </div>
              <h4>Funding & Capital Markets</h4>
              <p>Preparation of fundraising materials, investor communication and Pre-IPO financial readiness.</p>
            </div>
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h4>Cash Flow Management</h4>
              <p>Cash flow forecasting, working capital optimisation, receivables and payables management.</p>
            </div>
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h4>Board Reporting</h4>
              <p>Board and management reporting to present financial position to stakeholders professionally.</p>
            </div>
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Risk & Internal Control</h4>
              <p>Financial risk management framework and internal control systems for compliant operations.</p>
            </div>
            <div className="cfo-card fade-in">
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Team Development</h4>
              <p>Coaching and training for in-house finance teams to build sustainable finance capability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section tech-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Technology Partners</h2>
            <p>Mainstream ERP and finance systems we work with</p>
          </div>
          <div className="tech-grid">
            <div className="tech-card fade-in">
              <div className="tech-category">Enterprise ERP</div>
              <h4>SAP</h4>
              <p>Comprehensive enterprise resource planning for large organisations</p>
            </div>
            <div className="tech-card fade-in">
              <div className="tech-category">Cloud ERP</div>
              <h4>Oracle</h4>
              <p>Cloud-based business applications and database solutions</p>
            </div>
            <div className="tech-card fade-in">
              <div className="tech-category">Integrated ERP</div>
              <h4>Microsoft D365</h4>
              <p>Unified business management solution for SMBs to enterprises</p>
            </div>
            <div className="tech-card fade-in">
              <div className="tech-category">Cloud Finance</div>
              <h4>NetSuite</h4>
              <p>Cloud ERP/financials for fast-growing businesses</p>
            </div>
            <div className="tech-card fade-in">
              <div className="tech-category">SME Accounting</div>
              <h4>Xero</h4>
              <p>User-friendly cloud accounting for small businesses</p>
            </div>
            <div className="tech-card fade-in">
              <div className="tech-category">Small Business</div>
              <h4>QuickBooks</h4>
              <p>Popular accounting software for entrepreneurs and SMBs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Client Types We Serve</h2>
            <p>Businesses we work with</p>
          </div>
          <div className="clients-grid">
            <div className="client-card fade-in">
              <div className="icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4>Start-ups</h4>
              <p>Fast-growing but not yet ready for a full-time CFO; need professional finance guidance.</p>
            </div>
            <div className="client-card fade-in">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Growth-stage Companies</h4>
              <p>Expansion has made finance processes more complex; need system upgrades and optimisation.</p>
            </div>
            <div className="client-card fade-in">
              <div className="icon">
                <i className="fas fa-globe"></i>
              </div>
              <h4>Cross-border Subsidiaries</h4>
              <p>Hong Kong subsidiaries of overseas parents; need local finance support and group reporting.</p>
            </div>
            <div className="client-card fade-in">
              <div className="icon">
                <i className="fas fa-layer-group"></i>
              </div>
              <h4>PE Portfolio Companies</h4>
              <p>Portfolio companies of private equity funds; need professional finance oversight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Why Choose LT CPA for Consulting</h2>
            <p>Our differentiators</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h4>Practical Experience</h4>
              <p>Our team has held finance leadership roles in industry and understands real business challenges.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h4>Technology Neutral</h4>
              <p>As independent advisers we recommend the best fit for your needs, not a particular vendor.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h4>Flexible Engagement</h4>
              <p>From project-based to long-term outsourcing, we adapt to your needs and budget.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-layer-group"></i>
              </div>
              <h4>Integrated Services</h4>
              <p>Consulting works alongside our audit, tax and other services for end-to-end support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section related-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Related Services</h2>
          </div>
          <div className="related-grid">
            <div className="related-card">
              <h4>Audit & Assurance</h4>
              <p>Professional audit services to build confidence in your financial reporting.</p>
              <Link href="/services/audit">Learn more <i className="fas fa-chevron-right text-xs"></i></Link>
            </div>
            <div className="related-card">
              <h4>Risk & Regulatory</h4>
              <p>Help build robust internal control frameworks and meet regulatory compliance.</p>
              <Link href="/services/risk">Learn more <i className="fas fa-chevron-right text-xs"></i></Link>
            </div>
            <div className="related-card">
              <h4>Tax Advisory</h4>
              <p>Strategic tax planning and compliance to optimise your tax position.</p>
              <Link href="/services/tax">Learn more <i className="fas fa-chevron-right text-xs"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Consulting Services?</h2>
          <p>Let our advisory team drive your transformation and performance</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
