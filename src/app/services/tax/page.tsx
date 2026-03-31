"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TaxPage() {
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
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Tax Advisory</span>
          </p>
          <h1>Tax Advisory</h1>
          <p className="tagline">&ldquo;Optimise efficiency, protect legacy.&rdquo;</p>
          <p className="description">
            Tax law is dynamic and often shifts with geopolitical trends. Our tax advisory team acts as your strategic navigator, ensuring your tax position aligns with your business goals while maintaining strict compliance. We go beyond simple reporting to deliver proactive planning.
          </p>
        </div>
      </section>

      {/* Overview Section - 严格按照原稿 */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Strategic Tax Planning</h2>
              <p>In today&apos;s increasingly complex international tax environment, businesses need more than compliant filings—they need forward-looking strategic planning. The global minimum tax regime, the BEPS Action Plan and the advance of anti-avoidance measures across jurisdictions are all placing new demands on corporate tax strategy.</p>
              <p>LT CPA&apos;s tax advisory team brings together Hong Kong and international tax specialists. We have in-depth knowledge of tax legislation in Hong Kong, Mainland China and other major markets, providing comprehensive tax solutions for our clients.</p>
              <div className="highlight-box">
                <p>&ldquo;We help you design compliant pricing policies for intangibles, management services and financing, reducing adjustment and penalty risk under BEPS.&rdquo;</p>
              </div>
              <p>We work with high-net-worth individuals to protect their legacies. Our services include trust structures, estate tax planning and tax-efficient family migration strategies across jurisdictions.</p>
            </div>
            <div className="overview-visual">
              <div className="main-image">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <div className="stat-card bottom-left">
                <div className="number">Multi</div>
                <div className="label">International Tax Structures</div>
              </div>
              <div className="stat-card top-right">
                <div className="number">TP</div>
                <div className="label">Transfer Pricing</div>
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
            <p>Comprehensive tax advisory for corporates and individuals</p>
          </div>
          
          {/* Card 1 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-globe"></i>
              </div>
              <div>
                <h3>International Tax Structure</h3>
                <p>Cross-Border Solutions</p>
              </div>
            </div>
            <div className="card-body">
              <p>We design efficient holding structures for outbound investment and cross-border trade. Whether you are a Chinese enterprise expanding into Australia or a global fund investing in Asia, we analyse the impact of double tax treaties, withholding taxes and permanent establishment risk to optimise your global effective tax rate.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Cross-border investment structure design</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Double tax treaty application</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Withholding tax optimisation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Permanent establishment risk assessment</span></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <div>
                <h3>Transfer Pricing (TP)</h3>
                <p>BEPS Compliant</p>
              </div>
            </div>
            <div className="card-body">
              <p>As global tax authorities intensify scrutiny of related-party pricing, we provide robust transfer pricing documentation and benchmarking. We help you design compliant pricing policies for intangibles, management services and financing to reduce adjustment and penalty risk under BEPS.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Transfer pricing documentation</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Benchmarking analysis</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Advance pricing arrangements</span></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <i className="fas fa-home"></i>
              </div>
              <div>
                <h3>Private Client &amp; Family Office</h3>
                <p>Wealth Preservation</p>
              </div>
            </div>
            <div className="card-body">
              <p>We work with high-net-worth individuals to protect their legacies. Our services include trust structures, estate tax planning and tax-efficient family migration strategies across jurisdictions.</p>
              <div className="features-list">
                <div className="feature-item"><i className="fas fa-check"></i><span>Trust structures</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Estate tax planning</span></div>
                <div className="feature-item"><i className="fas fa-check"></i><span>Tax-efficient migration</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios Section - 严格按照原稿 */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Application Scenarios</h2>
            <p>How we support different types of clients</p>
          </div>
          <div className="scenarios-grid">
            <div className="scenario-card">
              <h4>Multinationals</h4>
              <p>Design tax-efficient holding structures for global groups, manage global tax risk, ensure compliance across jurisdictions and optimise overall tax burden.</p>
            </div>
            <div className="scenario-card">
              <h4>Pre-IPO Companies</h4>
              <p>Pre-IPO tax health checks, identification of tax risks and restructuring to meet listing requirements.</p>
            </div>
            <div className="scenario-card">
              <h4>Private Equity Funds</h4>
              <p>Tax-efficient fund structures, exit tax planning and carried interest tax treatment.</p>
            </div>
            <div className="scenario-card">
              <h4>High-net-worth Families</h4>
              <p>Wealth succession planning, family trust establishment, cross-generation wealth transfer and pre- and post-immigration tax arrangements.</p>
            </div>
            <div className="scenario-card">
              <h4>Outbound Expansion</h4>
              <p>Support Hong Kong businesses going global: analyse target market tax environment, design investment structures and manage cross-border tax risk.</p>
            </div>
            <div className="scenario-card">
              <h4>M&amp;A Parties</h4>
              <p>Tax due diligence, transaction structure optimisation and support for buyers and sellers to maximise tax efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - 严格按照原稿 */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Why Choose LT CPA for Tax</h2>
            <p>Our differentiators</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-globe-asia"></i>
              </div>
              <h4>Global Tax Network</h4>
              <p>We work closely with tax experts in major markets to deliver one-stop tax solutions for cross-border operations.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-binoculars"></i>
              </div>
              <h4>Forward-looking Planning</h4>
              <p>We monitor international tax developments and help clients identify opportunities and risks and plan ahead.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Risk-aware Approach</h4>
              <p>We optimise tax efficiency while rigorously assessing compliance risk so that arrangements stand up to scrutiny.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <i className="fas fa-comments"></i>
              </div>
              <h4>Practical Communication</h4>
              <p>We translate complex tax concepts into clear business language to support informed management decisions.</p>
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
              <h4>Deals &amp; M&amp;A</h4>
              <p>Financial due diligence, valuation and transaction support for informed investment decisions.</p>
              <Link href="/services/deals">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Audit &amp; Assurance</h4>
              <p>Independent audit services to enhance credibility and meet regulatory requirements.</p>
              <Link href="/services/audit">Learn more →</Link>
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
          <h2>Need Tax Advisory?</h2>
          <p>Let our tax experts optimise your tax structure and ensure compliance</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
