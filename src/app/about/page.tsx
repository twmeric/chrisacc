"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./about.css";
import {
  Award,
  Briefcase,
  Lightbulb,
  Heart,
  Target,
  TrendingUp,
  Shield,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Professionals",
    description: "Our team consists of certified accountants and financial experts",
  },
  {
    icon: Briefcase,
    title: "Industry Experience",
    description: "Years of experience serving diverse industries and sectors",
  },
  {
    icon: Lightbulb,
    title: "Tailored Solutions",
    description: "Customized financial strategies for your unique needs",
  },
  {
    icon: Heart,
    title: "Quality Service",
    description: "Committed to delivering exceptional client service",
  },
];

const missionCards = [
  {
    icon: Target,
    title: "Our Purpose",
    description: "To anchor global ambition with professional precision, empowering enterprises to navigate the complexities of the international financial landscape with clarity, compliance, and confidence.",
    link: "/about/purpose",
  },
  {
    icon: TrendingUp,
    title: "Our Value",
    description: "To be the definitive bridge for borderless business excellence—recognized globally as the premier boutique partner for dynamic enterprises seeking to access international capital markets and secure their financial legacy.",
    link: "/about/value",
  },
  {
    icon: Shield,
    title: "Our Commitment",
    description: "To lead with proactive guidance and technical mastery to bridge your global ambitions, building a legacy of trust and transformation for your business.",
    link: "/about/commitment",
  },
];

const coreValues = [
  {
    title: "Excellence",
    description: "Continuously enhancing our expertise to deliver outstanding service quality and create maximum value for clients",
  },
  {
    title: "Integrity",
    description: "Upholding professional ethics and treating every client with honesty and transparency",
  },
  {
    title: "Innovation",
    description: "Embracing change and innovation, leveraging cutting-edge technology to enhance service efficiency",
  },
  {
    title: "Teamwork",
    description: "Fostering collaboration and integrating professional resources to provide comprehensive client support",
  },
];

const timeline = [
  {
    year: "2010",
    title: "Company Founded",
    description: "LT CPA Limited was established in Hong Kong, beginning our journey serving local SMEs with professional accounting services.",
  },
  {
    year: "2013",
    title: "Service Expansion",
    description: "Successfully expanded into tax advisory and business consulting services, with client base exceeding 100 companies.",
  },
  {
    year: "2016",
    title: "Team Growth",
    description: "Professional team grew to 30 members, expanding services to include M&A and forensic accounting.",
  },
  {
    year: "2019",
    title: "Digital Transformation",
    description: "Implemented advanced digital systems to enhance service efficiency and deliver a more seamless client experience.",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Serving over 500 clients with a team of 50+ professionals, continuing our commitment to creating value for clients.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    // Fade-in animation on scroll
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
    <main className="min-h-screen about-page">
      <Header />
      
      {/* Page Banner */}
      <section className="page-banner">
        <div>
          <h1>About Us</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / About Us
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper fade-in">
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Professional Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="about-content fade-in">
            <h2>Why Choose Us?</h2>
            <p>LT CPA Limited has an experienced professional team dedicated to providing quality accounting and advisory services. We put clients first, deeply understanding each client&apos;s unique needs to deliver tailored solutions.</p>
            <p>With years of industry experience, we have built an extensive professional network that enables us to provide comprehensive business support, helping you stand out in a competitive market.</p>
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Intro Section */}
      <section className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-image-wrapper fade-in">
            <div className="about-intro-image">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="about-intro-content fade-in">
            <h2>Your Trusted <span>Financial Partner</span></h2>
            <p>The Pillars of LT: Grounding Ambition in Absolute Trust</p>
            <div className="highlight-box">
              <p>&ldquo;True ambition isn&apos;t a sprint; it&apos;s a marathon. We ensure your business has the stamina to go the distance by reinforcing your operations with rock-solid assurance and strategic foresight, turning rapid expansion into sustainable, long-term success.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          {missionCards.map((card, index) => (
            <div key={index} className="mv-card fade-in">
              <div className="mv-icon">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link href={card.link} className="mv-more">
                MORE <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="section-header fade-in">
          <h2>Core Values</h2>
          <p>The values we uphold guide every decision and action we take</p>
        </div>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-item fade-in">
              <i className={`fas fa-${['award', 'handshake', 'lightbulb', 'users'][index]}`}></i>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="section-header fade-in">
          <h2>Our Journey</h2>
          <p>Witness our growth and transformation over the years</p>
        </div>
        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`timeline-item fade-in ${index % 2 === 0 ? '' : 'reverse'}`}
            >
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-inner text-center">
          <h2 className="fade-in">Whatever the size of your business, we can provide professional and reliable financial solutions</h2>
          <Link href="/contact" className="btn fade-in">
            Contact Us Today
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
