"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./services.css";

const servicesNav = [
  { label: "Audit & Assurance", id: "audit" },
  { label: "Tax Advisory", id: "tax" },
  { label: "Risk & Regulatory", id: "risk" },
  { label: "Forensic Services", id: "forensic" },
  { label: "Consulting", id: "consulting" },
  { label: "Deals & M&A", id: "deals" },
];

const serviceDetails = [
  {
    id: "audit",
    title: "Audit & Assurance",
    slogan: "\"Instilling Confidence in Capital Markets.\"",
    description: "In a global financial landscape characterized by volatility, stakeholders demand more than just numbers—they demand the truth behind them. Our Audit & Assurance practice is the cornerstone of trust.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    features: [
      "Statutory audit and financial statement audit",
      "Internal control review and assessment",
      "Special purpose audit reports",
      "Listed company audit services",
      "Compliance review"
    ],
    link: "/services/audit"
  },
  {
    id: "tax",
    title: "Tax Advisory",
    slogan: "\"Optimizing Efficiency, Preserving Legacy.\"",
    description: "Tax laws are dynamic, often shifting with geopolitical tides. Our Tax Advisory team acts as your strategic navigator, ensuring that your tax position aligns with your commercial objectives while maintaining strict compliance.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
    features: [
      "Corporate tax planning and optimization",
      "Cross-border tax advisory",
      "Transfer pricing strategy",
      "Tax filing and compliance",
      "Tax dispute resolution"
    ],
    link: "/services/tax"
  },
  {
    id: "risk",
    title: "Risk & Regulatory",
    slogan: "\"From Reactive Compliance to Strategic Resilience.\"",
    description: "In an era of polycrisis—where regulatory scrutiny, geopolitical shifts, and technological disruption intersect—resilience is a competitive advantage. We help organizations move from a tick-the-box compliance mentality to a holistic risk management strategy.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    features: [
      "Enterprise risk assessment and management",
      "Internal control system development",
      "Regulatory compliance advisory",
      "Anti-money laundering (AML) compliance",
      "Corporate governance optimization"
    ],
    link: "/services/risk"
  },
  {
    id: "forensic",
    title: "Forensic Services",
    slogan: "\"Safeguarding Integrity and Value.\"",
    description: "When business integrity is threatened by fraud, misconduct, or dispute, speed and precision are paramount. Our Forensic team combines accounting acumen with investigative rigor to establish the facts, quantify losses, and restore trust.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    features: [
      "Fraud investigation and prevention",
      "Commercial dispute analysis",
      "Litigation support services",
      "Asset tracing",
      "Expert witness services"
    ],
    link: "/services/forensic"
  },
  {
    id: "consulting",
    title: "Consulting",
    slogan: "\"Driving Transformation and Performance.\"",
    description: "Growth often brings complexity. Our Consulting practice focuses on transforming your operating model. We work closely with management teams to modernize finance functions, streamline operations, and prepare your organization for its next stage of evolution.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    features: [
      "Business process optimization",
      "Financial management advisory",
      "Corporate strategy planning",
      "Digital transformation advisory",
      "Human resources consulting"
    ],
    link: "/services/consulting"
  },
  {
    id: "deals",
    title: "Deals & M&A",
    slogan: "\"Unlocking Value at Every Stage of the Transaction.\"",
    description: "A successful transaction requires leadership and clarity. Whether you are buying, selling, or restructuring, we cut through the noise to provide the critical financial insights needed to negotiate confidently and close deals.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    features: [
      "M&A strategy advisory",
      "Financial due diligence",
      "Business valuation services",
      "Transaction structure design",
      "Post-integration support"
    ],
    link: "/services/deals"
  }
];

export default function ServicesPage() {
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

      {/* Page Banner */}
      <section className="page-banner services-banner">
        <div>
          <h1>Our Services</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Services
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section className="about-section">
        <div className="section-inner text-center">
          <div className="max-w-3xl mx-auto fade-in">
            <h2>Comprehensive Professional Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">We offer a diverse range of professional services including audit, tax, risk management, and business advisory. Regardless of your business size, we tailor solutions to meet your specific needs and help you achieve your objectives.</p>
          </div>
        </div>
      </section>

      {/* Services Nav */}
      <section className="services-nav-section">
        <div className="section-inner">
          <nav className="services-nav">
            {servicesNav.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="services-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service Details */}
      <section className="services-details-section">
        {serviceDetails.map((service, index) => (
          <section 
            key={service.id}
            id={service.id}
            className={`service-detail-item ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`}
            style={{ scrollMarginTop: '80px' }}
          >
            <div className="section-inner">
              <div className={`service-detail-grid ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-image fade-in">
                  <img 
                    src={service.image}
                    alt={service.title}
                  />
                </div>
                <div className="service-content fade-in">
                  <h3>{service.title}</h3>
                  <p className="slogan">{service.slogan}</p>
                  <p className="description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link} className="btn-primary">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Why Choose Us</h2>
            <p>We are committed to delivering exceptional professional services to every client</p>
          </div>
          <div className="why-grid">
            {[
              { icon: "fa-user-tie", title: "Expert Team", desc: "A team of seasoned professionals with extensive industry experience and professional qualifications" },
              { icon: "fa-cogs", title: "Tailored Solutions", desc: "Customized solutions designed to meet the specific needs of each client" },
              { icon: "fa-clock", title: "Efficient Service", desc: "Client-focused approach ensuring timely delivery of high-quality results" },
              { icon: "fa-comments", title: "Close Communication", desc: "Maintaining close contact with clients and responding promptly to needs and questions" }
            ].map((item) => (
              <div key={item.title} className="why-card fade-in">
                <i className={`fas ${item.icon}`}></i>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Our Process</h2>
            <p>Four simple steps to professional service delivery</p>
          </div>
          <div className="process-simple">
            {[
              { number: "1", title: "Initial Consultation", desc: "Understanding your needs and business situation" },
              { number: "2", title: "Solution Design", desc: "Creating a tailored service plan for you" },
              { number: "3", title: "Execution", desc: "Professional team delivering efficient service" },
              { number: "4", title: "Ongoing Support", desc: "Providing follow-up and continuous support" }
            ].map((item) => (
              <div key={item.number} className="process-item fade-in">
                <div className="process-number">{item.number}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="fade-in">Need Professional Accounting Services?</h2>
          <p className="fade-in">Contact us today and let our professional team provide you with the best solutions</p>
          <Link href="/contact" className="cta-btn fade-in">
            Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
