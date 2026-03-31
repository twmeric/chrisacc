"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./forensic.css";

export default function ForensicPage() {
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
    <main className="min-h-screen">
      <Header />

      {/* Service Hero */}
      <section className="service-hero forensic-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Forensic Services</span>
          </p>
          <h1>Forensic Services</h1>
          <p className="tagline">&ldquo;Uncover the truth, protect value.&rdquo;</p>
          <p className="description">
            When fraud, disputes, or complex controversies arise, our forensic specialists 
            bring clarity to challenging situations. We combine investigative expertise with 
            financial acumen to uncover facts, analyze evidence, and provide actionable insights.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper fade-in">
            <div className="about-image">
              <i className="fas fa-search-dollar"></i>
            </div>
          </div>
          <div className="about-content fade-in">
            <h2>Protecting Integrity and Value</h2>
            <p>In today&apos;s complex business environment, organizations face increasing risks from fraud, financial crime, and commercial disputes. Our forensic services help you navigate these challenges with confidence.</p>
            <p>Whether you&apos;re dealing with suspected misconduct, regulatory investigations, or complex litigation support, our team delivers independent, objective analysis that stands up to scrutiny.</p>
            <div className="about-features forensic-features">
              <div className="about-feature">
                <i className="fas fa-shield-alt"></i>
                <span>AML Compliance</span>
              </div>
              <div className="about-feature">
                <i className="fas fa-lock"></i>
                <span>Counter-Terrorist Financing</span>
              </div>
              <div className="about-feature">
                <i className="fas fa-user-secret"></i>
                <span>Fraud Investigation</span>
              </div>
              <div className="about-feature">
                <i className="fas fa-balance-scale"></i>
                <span>Dispute Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Our Forensic Expertise</h2>
            <p>Comprehensive forensic services tailored to your specific situation</p>
          </div>

          <div className="forensic-services-grid">
            {/* Card 1 */}
            <div className="forensic-service-card fade-in">
              <div className="card-icon">
                <i className="fas fa-user-times"></i>
              </div>
              <h3>Fraud & Misconduct Investigation</h3>
              <p>Thorough investigation of alleged fraud, corruption, and misconduct. We uncover facts, trace assets, and provide evidence that supports legal proceedings.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> Employee fraud</li>
                <li><i className="fas fa-check"></i> Asset misappropriation</li>
                <li><i className="fas fa-check"></i> Corruption investigations</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="forensic-service-card fade-in">
              <div className="card-icon blue">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Commercial Dispute Resolution</h3>
              <p>Expert support in commercial disputes, providing quantum of damages calculations, financial analysis, and expert witness testimony.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> Damages quantification</li>
                <li><i className="fas fa-check"></i> Contract disputes</li>
                <li><i className="fas fa-check"></i> Expert witness services</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="forensic-service-card fade-in">
              <div className="card-icon dark">
                <i className="fas fa-unlock-alt"></i>
              </div>
              <h3>Financial Crime Compliance (AML/CTF)</h3>
              <p>Comprehensive anti-money laundering and counter-terrorist financing services, from risk assessments to regulatory response.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> AML program assessment</li>
                <li><i className="fas fa-check"></i> Transaction monitoring</li>
                <li><i className="fas fa-check"></i> Regulatory examination support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Investigation Process</h2>
            <p>A systematic approach to uncovering facts and delivering clarity</p>
          </div>

          <div className="process-timeline forensic-timeline">
            {[
              { step: '01', icon: 'fa-search', title: 'Initial Assessment', desc: 'Rapid evaluation of the situation to understand scope and risks' },
              { step: '02', icon: 'fa-database', title: 'Evidence Preservation', desc: 'Secure collection and protection of relevant documents and data' },
              { step: '03', icon: 'fa-chart-bar', title: 'In-depth Analysis', desc: 'Forensic examination of financial records and digital evidence' },
              { step: '04', icon: 'fa-users', title: 'Interviews & Investigation', desc: 'Conducting interviews and gathering witness testimony' },
              { step: '05', icon: 'fa-file-alt', title: 'Report & Action', desc: 'Comprehensive reporting with actionable recommendations' },
            ].map((item, index) => (
              <div key={index} className="process-step fade-in">
                <div className="step-spacer"></div>
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <i className={`fas ${item.icon}`}></i>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="core-values-section">
        <div className="section-header fade-in">
          <h2>Common Case Types</h2>
          <p>We handle a wide range of forensic investigations across industries</p>
        </div>
        <div className="cases-grid">
          {[
            { icon: 'fa-user-times', title: 'Employee Fraud', desc: 'Theft, expense manipulation, payroll fraud, and conflicts of interest' },
            { icon: 'fa-exclamation-triangle', title: 'Financial Statement Fraud', desc: 'Revenue recognition issues, improper disclosures, and accounting irregularities' },
            { icon: 'fa-briefcase', title: 'Management Misconduct', desc: 'Breach of fiduciary duty, self-dealing, and corporate governance failures' },
            { icon: 'fa-handshake', title: 'Commercial Bribery', desc: 'Corruption, kickbacks, and improper payments to officials or agents' },
            { icon: 'fa-truck', title: 'Supplier/Customer Fraud', desc: 'Bid rigging, overbilling schemes, and fraudulent invoicing' },
            { icon: 'fa-laptop', title: 'Cyber Fraud', desc: 'Business email compromise, data theft, and digital asset misappropriation' },
          ].map((item, index) => (
            <div key={index} className="case-card fade-in">
              <i className={`fas ${item.icon}`}></i>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Confidentiality Section */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Confidentiality Commitment</h2>
            <p>We understand the sensitive nature of forensic investigations</p>
          </div>
          <div className="values-grid">
            {[
              { icon: 'fa-eye-slash', title: 'Strict Confidentiality', desc: 'All investigations conducted with the highest level of discretion' },
              { icon: 'fa-server', title: 'Secure Data Handling', desc: 'Enterprise-grade security protocols for all sensitive information' },
              { icon: 'fa-key', title: 'Need-to-know Access', desc: 'Restricted access to investigation details on need-to-know basis' },
              { icon: 'fa-balance-scale', title: 'Legal Privilege', desc: 'We structure engagements to maximize legal privilege protections' },
            ].map((item, index) => (
              <div key={index} className="value-item fade-in">
                <i className={`fas ${item.icon}`}></i>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Why Choose Our Forensic Team</h2>
            <p>Experience, expertise, and commitment to delivering results</p>
          </div>
          <div className="why-grid">
            {[
              { icon: 'fa-user-secret', title: 'Investigation Background', desc: 'Team includes former law enforcement, regulators, and forensic accountants' },
              { icon: 'fa-chart-bar', title: 'Data Analytics', desc: 'Advanced forensic data analytics and e-discovery capabilities' },
              { icon: 'fa-globe', title: 'Cross-border Network', desc: 'Global reach through international forensic networks and partnerships' },
              { icon: 'fa-bolt', title: 'Rapid Response', desc: '24/7 availability for urgent situations requiring immediate action' },
            ].map((item, index) => (
              <div key={index} className="why-card fade-in">
                <div className="icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
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
              <h4>Risk & Regulatory</h4>
              <p>Compliance and risk management solutions.</p>
              <Link href="/services/risk">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Deals & M&A</h4>
              <p>Transaction advisory and due diligence.</p>
              <Link href="/services/deals">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Consulting</h4>
              <p>Strategic business consulting services.</p>
              <Link href="/services/consulting">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Forensic Services?</h2>
          <p>Our forensic specialists are ready to help. Contact us for a confidential consultation.</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
