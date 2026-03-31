"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DealsPage() {
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
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Deals &amp; M&amp;A</span>
          </p>
          <h1>Deals, Mergers and Acquisitions</h1>
          <p className="tagline">&ldquo;Unlocking Value at Every Stage of the Transaction.&rdquo;</p>
          <p className="description">
            A successful transaction requires leadership and clarity. Whether you are buying, selling, or restructuring, we cut through the noise to provide the critical financial insights needed to negotiate with confidence and close the deal.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content fade-in">
              <h2>Unlocking Value at Every Stage of the Deal</h2>
              <p>Successful deals require clarity and leadership. Whether you are buyer, seller or restructuring, we cut through the noise to deliver the critical financial insights needed to negotiate with confidence and close transactions.</p>
              <p>We conduct comprehensive buy-side and sell-side due diligence, going beyond verifying historical numbers to analyse earnings quality, working capital trends and hidden tax liabilities. Our reports give you the ammunition to adjust pricing or negotiate indemnities.</p>
              <div className="highlight-box">
                <p>&ldquo;We provide independent valuations of businesses, intangible assets and financial instruments. Whether for financial reporting (purchase price allocation), tax purposes or transaction pricing, our valuation models are robust, defensible and grounded in current market data.&rdquo;</p>
              </div>
              <p>We assist with the complex mechanics of corporate restructuring, including Pre-IPO group restructuring for spin-off listings and post-merger integration planning to ensure that realised synergies align with the deal thesis.</p>
            </div>
            <div className="overview-visual fade-in">
              <div className="main-image">
                <i className="fas fa-handshake"></i>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">DD</div>
                <div className="label">Due Diligence</div>
              </div>
              <div className="stat-card bottom-right">
                <div className="number">PPA</div>
                <div className="label">Purchase Price Allocation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Financial and Tax Due Diligence, Valuation Services, Corporate Restructuring and Integration</h2>
            <p>Comprehensive transaction support services to meet your M&amp;A needs</p>
          </div>
          
          {/* Card 1 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-search-dollar"></i>
              </div>
              <div>
                <h3>Financial &amp; Tax Due Diligence</h3>
                <p>Buy-Side &amp; Sell-Side</p>
              </div>
            </div>
            <div className="card-body">
              <p>We conduct comprehensive buy-side and sell-side due diligence. We go beyond verifying historical numbers to analyse earnings quality, working capital trends and hidden tax liabilities. Our reports give you the ammunition to adjust pricing or negotiate indemnities.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Financial due diligence (buy-side &amp; sell-side)</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Tax due diligence and structuring advice</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Quality of earnings analysis</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Working capital trend analysis</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Hidden liability identification</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Pricing adjustment recommendations</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card fade-in">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <h3>Valuation Services</h3>
                <p>Business, Intangibles &amp; Financial Instruments</p>
              </div>
            </div>
            <div className="card-body">
              <p>We provide independent valuations of businesses, intangible assets and financial instruments. Whether for financial reporting (purchase price allocation), tax purposes or transaction pricing, our valuation models are robust, defensible and grounded in current market data.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Business enterprise valuation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Intangible asset valuation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Purchase price allocation (PPA)</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Financial instrument valuation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Transaction pricing support</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Tax valuation for restructuring</span></div>
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
                <h3>Corporate Restructuring &amp; Integration</h3>
                <p>Pre-IPO &amp; Post-Merger</p>
              </div>
            </div>
            <div className="card-body">
              <p>We assist with the complex mechanics of corporate restructuring. This includes Pre-IPO group restructuring for spin-off listings and post-merger integration planning to ensure that realised synergies align with the deal thesis.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Pre-IPO group restructuring</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Spin-off listing preparation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Post-merger integration planning</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Synergy realisation assessment</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Deal thesis alignment review</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Integration execution support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Deals &amp; M&amp;A Process</h2>
            <p>A systematic approach to ensure quality and efficiency</p>
          </div>
          <div className="process-timeline deals-timeline">
            <div className="process-step fade-in">
              <div className="step-content">
                <h4>Planning &amp; Scoping</h4>
                <p>Understand deal objectives, scope due diligence and valuation; agree deliverables and timeline.</p>
              </div>
              <div className="step-number">1</div>
              <div className="step-spacer"></div>
            </div>
            <div className="process-step fade-in">
              <div className="step-spacer"></div>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Due Diligence &amp; Analysis</h4>
                <p>Execute financial, tax and commercial due diligence; analyse quality of earnings and working capital.</p>
              </div>
            </div>
            <div className="process-step fade-in">
              <div className="step-content">
                <h4>Valuation &amp; Reporting</h4>
                <p>Prepare valuation models and reports; document findings and recommendations for pricing and negotiation.</p>
              </div>
              <div className="step-number">3</div>
              <div className="step-spacer"></div>
            </div>
            <div className="process-step fade-in">
              <div className="step-spacer"></div>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Completion &amp; Integration</h4>
                <p>Support closing mechanics, PPA and post-merger integration planning to realise deal value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Why Choose LT CPA for Deals &amp; M&amp;A</h2>
            <p>Our differentiators</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-star"></i>
              </div>
              <h4>Professional Qualifications</h4>
              <p>Our team holds HKICPA and internationally recognised qualifications, ensuring services meet the highest professional standards.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Partner Involvement</h4>
              <p>Every engagement is supervised by a senior partner to ensure consistent quality and client service.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h4>Industry Expertise</h4>
              <p>Deep understanding of sector-specific issues and delivery of targeted approaches and valuable industry insights.</p>
            </div>
            <div className="why-card fade-in">
              <div className="icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Responsive Communication</h4>
              <p>Clear communication channels and timely updates for a smooth, efficient process.</p>
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
              <h4>Risk &amp; Regulatory</h4>
              <p>Help build robust internal control frameworks and meet regulatory compliance requirements.</p>
              <Link href="/services/risk">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Tax Advisory</h4>
              <p>Strategic tax planning and compliance to optimise your tax position.</p>
              <Link href="/services/tax">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Consulting</h4>
              <p>Finance function transformation, process optimisation and improved operational efficiency.</p>
              <Link href="/services/consulting">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Deals &amp; M&amp;A Support?</h2>
          <p>Unlock value at every stage of the deal—let our team help you get the transaction done</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
