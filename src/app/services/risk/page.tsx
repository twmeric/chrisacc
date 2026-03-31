"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Gavel, 
  ClipboardCheck, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Globe,
  Users,
  Target,
  Zap
} from "lucide-react";

export default function RiskPage() {
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

      {/* Service Hero Section */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Our Services</Link> / <span>Risk & Regulatory</span>
          </p>
          <h1>Risk & Regulatory</h1>
          <p className="tagline">&ldquo;Build resilience, ensure compliance.&rdquo;</p>
          <p className="description">
            Regulatory scrutiny is intensifying globally. Our risk and regulatory practice helps organisations build robust internal control frameworks, manage regulatory risk and respond proactively to growing ESG (environmental, social and governance) expectations—turning compliance cost into competitive advantage.
          </p>
        </div>
      </section>

      {/* Overview Section - Two Column */}
      <section className="section">
        <div className="section-inner">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>From Reactive Compliance to Strategic Resilience</h2>
              <p>In an era of &ldquo;polycrisis&rdquo;—where regulatory scrutiny, geopolitical change and technological disruption intersect—resilience is a competitive advantage. We help organisations move from a &ldquo;tick-box&rdquo; compliance mindset to a comprehensive risk management strategy that anticipates change.</p>
              <p>We guide licensed corporations and listed entities through the complex rulebooks of the SFC and HKEX. Our team assists with licence applications, ongoing compliance health checks, and interpretation of new regulations (such as ESG disclosure requirements and virtual asset licensing).</p>
              <div className="highlight-box">
                <p>&ldquo;We work with boards and audit committees to design tailored ERM frameworks, allocate resources effectively and protect enterprise value from unforeseen shocks.&rdquo;</p>
              </div>
              <p>For Pre-IPO candidates and listed companies, we conduct in-depth reviews of internal control systems (aligned with the COSO framework), identify control gaps and recommend practical remediation steps.</p>
            </div>
            <div className="overview-visual">
              <div className="main-image">
                <Shield className="w-32 h-32 text-[#c9a227] opacity-30" />
              </div>
              <div className="stat-card" style={{ top: '20px', right: '-20px' }}>
                <div className="number">ERM</div>
                <div className="label">Enterprise Risk Management</div>
              </div>
              <div className="stat-card bottom">
                <div className="number">ICFR</div>
                <div className="label">Internal Control Review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section - Light Gray Background */}
      <section className="section services-detail-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Regulatory compliance, enterprise risk management and internal control review</h2>
          </div>
          
          {/* Card 1 - Regulatory Compliance Advisory */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <Gavel className="w-8 h-8 text-[#c9a227]" />
              </div>
              <div>
                <h3>Regulatory Compliance Advisory</h3>
                <p>SFC & HKEX</p>
              </div>
            </div>
            <div className="card-body">
              <p>We guide licensed corporations and listed entities through the complex rulebooks of the SFC and HKEX. Our team assists with licence applications, ongoing compliance health checks, and interpretation of new regulations (such as ESG disclosure requirements and virtual asset licensing), ensuring you stay on the right side of regulators.</p>
            </div>
          </div>

          {/* Card 2 - Enterprise Risk Management */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <Shield className="w-8 h-8 text-[#c9a227]" />
              </div>
              <div>
                <h3>Enterprise Risk Management (ERM)</h3>
                <p>Tailored ERM Frameworks</p>
              </div>
            </div>
            <div className="card-body">
              <p>We work with boards and audit committees to design tailored ERM frameworks. By identifying, assessing and prioritising strategic, operational and financial risks, we help you allocate resources effectively and protect enterprise value from unforeseen shocks.</p>
            </div>
          </div>

          {/* Card 3 - Internal Control Review */}
          <div className="service-detail-card">
            <div className="card-header">
              <div className="icon">
                <ClipboardCheck className="w-8 h-8 text-[#c9a227]" />
              </div>
              <div>
                <h3>Internal Control Review (ICFR)</h3>
                <p>COSO-Aligned</p>
              </div>
            </div>
            <div className="card-body">
              <p>For Pre-IPO candidates and listed companies, we conduct in-depth reviews of internal control systems aligned with the COSO framework. We identify control gaps in financial reporting and operational processes, recommend practical remediation steps and support compliance with corporate governance code requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Section - White Background */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Regulatory Framework Expertise</h2>
            <p>Key regulators and frameworks we work with</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* SFC */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">SFC</h4>
              <p className="text-sm text-gray-500">Licensed corporation compliance, licensing, regulatory inspections, compliance monitoring</p>
            </div>
            {/* HKMA */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">HKMA</h4>
              <p className="text-sm text-gray-500">Banking supervision, authorised institution requirements, prudential standards</p>
            </div>
            {/* IA */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">IA</h4>
              <p className="text-sm text-gray-500">Insurance compliance, intermediary regulation, solvency requirements</p>
            </div>
            {/* HKEX */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">HKEX</h4>
              <p className="text-sm text-gray-500">Listing rules, corporate governance, ongoing disclosure</p>
            </div>
            {/* PDPO */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">PDPO</h4>
              <p className="text-sm text-gray-500">Personal data protection, privacy impact assessment, cross-border data transfer</p>
            </div>
            {/* International Standards */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1a3a5c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-[#1a3a5c]" />
              </div>
              <h4 className="text-base font-bold text-[#1a3a5c] mb-2">International Standards</h4>
              <p className="text-sm text-gray-500">COSO, ISO, COBIT, Basel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Section - Blue Gradient Background */}
      <section className="section bg-gradient-to-br from-[#1a3a5c] to-[#2c5282]">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="text-white">ESG Focus Areas</h2>
            <p className="text-white/70">Coverage across environment, social and governance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Environment */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-[#c9a227]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#c9a227]">E</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Environment</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Climate risk assessment and TCFD-aligned disclosures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Carbon footprint measurement and reduction strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Environmental compliance monitoring</span>
                </li>
              </ul>
            </div>
            {/* Social */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-[#c9a227]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#c9a227]">S</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Social</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Supply chain due diligence and human rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Employee wellbeing and diversity programmes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Community engagement and stakeholder management</span>
                </li>
              </ul>
            </div>
            {/* Governance */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-[#c9a227]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#c9a227]">G</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Governance</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Board effectiveness and director independence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>Ethics, anti-bribery and corruption programmes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227] mt-1">•</span>
                  <span>ESG governance structure and reporting frameworks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Blue Gradient */}
      <section className="section why-choose-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Our differentiators</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="icon">
                <Landmark className="w-7 h-7 text-[#c9a227]" />
              </div>
              <h4>Regulatory Background</h4>
              <p>Our team has experience from regulators and financial institutions&apos; compliance functions and understands regulatory intent and expectations.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <Target className="w-7 h-7 text-[#c9a227]" />
              </div>
              <h4>Practical Solutions</h4>
              <p>We deliver actionable advice, not just frameworks, so that compliance measures are workable and cost-effective.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <Users className="w-7 h-7 text-[#c9a227]" />
              </div>
              <h4>Risk-based Approach</h4>
              <p>We focus on the risks that matter most to your business and avoid one-size-fits-all compliance.</p>
            </div>
            <div className="why-card">
              <div className="icon">
                <Zap className="w-7 h-7 text-[#c9a227]" />
              </div>
              <h4>Rapid Response</h4>
              <p>When regulators ask questions or conduct inspections, we can mobilise quickly to support you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section - Light Gray */}
      <section className="section related-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Related Services</h2>
          </div>
          <div className="related-grid">
            <div className="related-card">
              <h4>Forensic Services</h4>
              <p>Fraud investigation, dispute resolution and forensic accounting expertise.</p>
              <Link href="/services/forensic">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Audit & Assurance</h4>
              <p>High-quality audit services that build trust and confidence.</p>
              <Link href="/services/audit">Learn more →</Link>
            </div>
            <div className="related-card">
              <h4>Consulting</h4>
              <p>Strategic advisory and operational transformation services.</p>
              <Link href="/services/consulting">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Gold */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Risk & Regulatory Advisory?</h2>
          <p>Let our team help you build resilience and ensure compliance</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
