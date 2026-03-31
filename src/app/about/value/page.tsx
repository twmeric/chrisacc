"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./value.css";

const valueCards = [
  {
    icon: "fa-building",
    title: "Redefining the Boutique Experience",
    description: "We challenge the conventional definition of a boutique firm. While we maintain the personalized attention and agility of a boutique practice, we deliver the capabilities, resources, and global reach typically associated with larger organizations.",
    highlights: [
      { title: "Personalized Attention", desc: "Every client receives dedicated partner-level engagement" },
      { title: "Agile Response", desc: "Quick decision-making and adaptive solutions" },
      { title: "Enterprise Capabilities", desc: "Full-service offerings across all major financial domains" },
    ],
  },
  {
    icon: "fa-balance-scale",
    title: "Setting the Standard for Cross-Border Fluency",
    description: "In an increasingly interconnected world, we pride ourselves on our ability to navigate complex cross-border transactions and regulatory frameworks. Our multilingual team combines local expertise with global perspective.",
    highlights: [
      { title: "Multi-Jurisdictional Expertise", desc: "Deep knowledge of regulatory environments across key markets" },
      { title: "Cultural Intelligence", desc: "Understanding nuances that drive international business success" },
      { title: "Integrated Networks", desc: "Strategic partnerships with leading firms worldwide" },
    ],
  },
  {
    icon: "fa-rocket",
    title: "Empowering the Next Generation",
    description: "We believe in investing in tomorrow's leaders today. Our firm is committed to developing the next generation of accounting and advisory professionals through mentorship, continuous learning, and meaningful career opportunities.",
    highlights: [
      { title: "Mentorship Programs", desc: "Structured guidance from experienced professionals" },
      { title: "Continuous Learning", desc: "Ongoing training and professional development initiatives" },
      { title: "Innovation Culture", desc: "Encouraging new ideas and modern approaches" },
    ],
  },
];

const differentiators = [
  { stat: "98%", label: "Client Retention Rate", desc: "Long-term partnerships built on trust" },
  { stat: "24h", label: "Response Time", desc: "Rapid communication and support" },
  { stat: "15+", label: "Countries Served", desc: "Global reach with local expertise" },
  { stat: "50+", label: "Industry Specialists", desc: "Deep sector-specific knowledge" },
];

export default function ValuePage() {
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

      {/* Page Banner */}
      <section className="page-banner value-banner">
        <div>
          <h1>Our Value</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/about">About Us</Link> / Our Value
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content fade-in">
            <span className="section-label">The Future We Build</span>
            <h2>What Sets Us Apart</h2>
            <p>Our value proposition extends beyond traditional accounting services. We combine the best attributes of boutique personalization with the capabilities of global enterprises, creating a unique service experience that delivers exceptional results.</p>
          </div>
          <div className="about-image-wrapper fade-in">
            <div className="about-image value-hero-image">
              <i className="fas fa-gem"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Value Cards */}
      <section className="about-intro-section">
        <div className="section-inner">
          {valueCards.map((card, index) => (
            <div key={index} className={`value-detail-card fade-in ${index % 2 === 1 ? 'reverse' : ''}`}>
              <div className="card-visual">
                <div className="visual-bg">
                  <i className={`fas ${card.icon}`}></i>
                  <span className="visual-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="highlights-grid">
                  {card.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="highlight-item">
                      <h4>{highlight.title}</h4>
                      <p>{highlight.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="core-values-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Key Differentiators</h2>
            <p>Why Clients Choose Us</p>
          </div>
          <div className="differentiators-grid">
            {differentiators.map((item, index) => (
              <div key={index} className="differentiator-item fade-in">
                <span className="diff-stat">{item.stat}</span>
                <span className="diff-label">{item.label}</span>
                <p className="diff-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Our Vision</h2>
            <p>Where we are headed</p>
          </div>
          <div className="vision-content fade-in">
            <p className="vision-text">
              To be the preeminent boutique professional services firm in the Asia-Pacific region, recognized for our unwavering commitment to client success, our innovative approach to complex challenges, and our dedication to developing the next generation of industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="about-nav-section">
        <div className="section-inner">
          <Link href="/about" className="nav-back">
            <i className="fas fa-arrow-left"></i> Back to About Us
          </Link>
          <div className="nav-links">
            <Link href="/about/purpose" className="nav-link">
              Our Purpose <i className="fas fa-arrow-right"></i>
            </Link>
            <Link href="/about/commitment" className="nav-link">
              Our Commitment <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
