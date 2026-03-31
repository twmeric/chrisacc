"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./purpose.css";

const purposeCards = [
  {
    icon: "fa-globe",
    title: "Delivering Borderless Assurance & Integrity",
    description: "We provide comprehensive audit and assurance services that transcend geographical boundaries. Our commitment to integrity ensures that every financial statement we review meets the highest standards of accuracy and compliance.",
    points: [
      "Global compliance standards adherence",
      "Multi-jurisdictional expertise",
      "Independent and objective assurance",
      "Risk-based audit methodologies",
    ],
  },
  {
    icon: "fa-chart-line",
    title: "Architecting Sustainable Growth Strategies",
    description: "Our advisory services go beyond traditional accounting. We work alongside businesses to design growth strategies that are not only profitable but sustainable.",
    points: [
      "Strategic business planning",
      "Market expansion advisory",
      "Operational efficiency optimization",
      "Sustainable business model design",
    ],
  },
  {
    icon: "fa-graduation-cap",
    title: "Cultivating a Culture of Technical Excellence",
    description: "We believe that excellence is a journey, not a destination. Our firm invests heavily in continuous professional development.",
    points: [
      "Continuous professional education",
      "Industry-specialized expertise",
      "Thought leadership contributions",
      "Mentorship and knowledge sharing",
    ],
  },
];

export default function PurposePage() {
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
      <section className="page-banner purpose-banner">
        <div>
          <h1>Our Purpose</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/about">About Us</Link> / Our Purpose
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content fade-in">
            <span className="section-label">The Path We Walk</span>
            <h2>Defining Our Purpose</h2>
            <blockquote className="highlight-quote">
              &ldquo;To anchor global ambition with professional precision, delivering assurance and strategic insight that empowers organizations to thrive in an interconnected world.&rdquo;
            </blockquote>
          </div>
          <div className="about-image-wrapper fade-in">
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
                alt="Our Purpose"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Cards */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Our Core Purpose Pillars</h2>
            <p>The foundation of everything we do</p>
          </div>
          <div className="purpose-grid">
            {purposeCards.map((card, index) => (
              <div key={index} className="purpose-card fade-in">
                <div className="card-accent"></div>
                <div className="card-icon">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul className="purpose-list">
                  {card.points.map((point, pointIndex) => (
                    <li key={pointIndex}>
                      <i className="fas fa-check-circle"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="core-values-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Our Mission</h2>
            <p>What drives us every day</p>
          </div>
          <div className="mission-content fade-in">
            <p className="mission-text">
              To provide exceptional professional services that create value for our clients, empower our people, and contribute positively to the communities we serve. We are committed to maintaining the highest standards of integrity, excellence, and innovation in everything we do.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Clients Worldwide</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Professionals</span>
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
            <Link href="/about/value" className="nav-link">
              Our Value <i className="fas fa-arrow-right"></i>
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
