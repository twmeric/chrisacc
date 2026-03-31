"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./commitment.css";

const commitmentCards = [
  {
    icon: "fa-crown",
    title: "Leadership",
    subtitle: "Pioneering Excellence in Professional Services",
    description: "We commit to thought leadership and industry innovation. Our professionals actively contribute to shaping accounting standards, regulatory frameworks, and best practices.",
    points: [
      "Active participation in industry associations",
      "Contributions to regulatory consultations",
      "Publication of thought leadership content",
      "Speaking engagements at major conferences",
    ],
  },
  {
    icon: "fa-link",
    title: "Linkage",
    subtitle: "Building Bridges Across Borders",
    description: "Our commitment to linkage means creating meaningful connections between clients, markets, and opportunities. We leverage our extensive network to facilitate introductions and partnerships.",
    points: [
      "Strategic partnership facilitation",
      "Cross-border business introductions",
      "Investor and funding connections",
      "Market entry strategy support",
    ],
  },
  {
    icon: "fa-infinity",
    title: "Legacy",
    subtitle: "Sustainable Impact for Future Generations",
    description: "We are committed to building a lasting legacy that extends beyond financial success. This includes environmental sustainability, social responsibility, and governance excellence.",
    points: [
      "Sustainable business practices advocacy",
      "ESG reporting and advisory services",
      "Community investment initiatives",
      "Long-term value creation focus",
    ],
  },
  {
    icon: "fa-cogs",
    title: "Technicality",
    subtitle: "Mastery of Complex Financial Disciplines",
    description: "Technical excellence is non-negotiable. We maintain rigorous standards in all our technical work, ensuring accuracy, compliance, and optimization.",
    points: [
      "Regular technical training programs",
      "Quality assurance protocols",
      "Multi-disciplinary expertise",
      "Cutting-edge technology adoption",
    ],
  },
  {
    icon: "fa-shield-alt",
    title: "Trust",
    subtitle: "The Foundation of Every Client Relationship",
    description: "Trust is earned through consistent integrity, transparency, and reliability. We protect client confidentiality with utmost care and provide honest, objective advice.",
    points: [
      "Strict confidentiality protocols",
      "Independent and objective advice",
      "Transparent fee structures",
      "Ethical conduct in all dealings",
    ],
  },
  {
    icon: "fa-sync-alt",
    title: "Transformation",
    subtitle: "Embracing Change and Driving Innovation",
    description: "We commit to continuous transformation—of our own capabilities, our service delivery, and our clients' businesses. We embrace digital innovation and process improvement.",
    points: [
      "Digital transformation advisory",
      "Process optimization services",
      "Innovation workshops and training",
      "Agile methodology adoption",
    ],
  },
];

const clientPromises = [
  "Proactive communication and regular updates",
  "Dedicated team with deep understanding of your business",
  "Timely delivery of all commitments",
  "Continuous improvement of our services",
  "Respect for your time, resources, and confidentiality",
  "Honest advice, even when it's not what you want to hear",
];

export default function CommitmentPage() {
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
      <section className="page-banner commitment-banner">
        <div>
          <h1>Our Commitment</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/about">About Us</Link> / Our Commitment
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content fade-in">
            <span className="section-label">The Promise We Keep</span>
            <h2>Six Pillars of Commitment</h2>
            <p>Our commitments define who we are and guide every decision we make. These six pillars represent our solemn promise to our clients, our people, and the communities we serve.</p>
          </div>
          <div className="about-image-wrapper fade-in">
            <div className="about-image commitment-hero-image">
              <i className="fas fa-handshake"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Cards */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="commitment-grid">
            {commitmentCards.map((card, index) => (
              <div key={index} className="commitment-card fade-in">
                <div className="card-header-row">
                  <div className="card-icon">
                    <i className={`fas ${card.icon}`}></i>
                  </div>
                  <div className="card-title-group">
                    <h3>{card.title}</h3>
                    <span className="card-subtitle">{card.subtitle}</span>
                  </div>
                </div>
                <p className="card-description">{card.description}</p>
                <ul className="commitment-list">
                  {card.points.map((point, pointIndex) => (
                    <li key={pointIndex}>
                      <i className="fas fa-check"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Manifesto */}
      <section className="core-values-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Our Pledge</h2>
            <p>The LT CPA Commitment Manifesto</p>
          </div>
          <div className="manifesto-box fade-in">
            <div className="manifesto-item">
              <strong>We commit to excellence</strong>
              <span>— in every engagement, every interaction, and every deliverable.</span>
            </div>
            <div className="manifesto-item">
              <strong>We commit to integrity</strong>
              <span>— doing what is right, not what is easy.</span>
            </div>
            <div className="manifesto-item">
              <strong>We commit to innovation</strong>
              <span>— embracing change and seeking better ways to serve our clients.</span>
            </div>
            <div className="manifesto-item">
              <strong>We commit to partnership</strong>
              <span>— treating our clients' success as our own.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Client Promise */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Client Promise</h2>
            <p>What You Can Expect From Us</p>
          </div>
          <div className="promise-grid fade-in">
            <div className="promise-list-container">
              {clientPromises.map((item, index) => (
                <div key={index} className="promise-item">
                  <span className="promise-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="promise-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="promise-cta">
              <div className="cta-box">
                <h3>Ready to Experience Our Commitment?</h3>
                <p>Let us demonstrate how our six pillars of commitment can make a difference for your organization.</p>
                <Link href="/contact" className="btn-primary">
                  Schedule a Consultation <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
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
            <Link href="/about/value" className="nav-link">
              Our Value <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
