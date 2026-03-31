"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./contact.css";

const faqs = [
  {
    question: "How do I book a free consultation?",
    answer: "You can book a free consultation by filling out the contact form on this page, calling us directly at +852 3987 1008, or sending an email to info@ltgroupcpa.com. Our team will respond within 24 hours to schedule your appointment.",
  },
  {
    question: "What types of clients do you serve?",
    answer: "We serve a diverse range of clients including small and medium-sized enterprises (SMEs), startups, multinational corporations, non-profit organizations, and individual clients. Our services are tailored to meet the unique needs of each client.",
  },
  {
    question: "What are your audit service fees?",
    answer: "Our audit fees depend on the complexity of your business, company size, and specific requirements. We offer competitive pricing and will provide a detailed quotation after understanding your needs during the initial consultation.",
  },
  {
    question: "How long does it take to complete an audit report?",
    answer: "The timeline for completing an audit report typically ranges from 2 to 6 weeks, depending on the size of your organization, the complexity of your financial statements, and how quickly you can provide the necessary documentation.",
  },
];

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your enquiry! We will contact you shortly.');
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    });
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="page-banner contact-banner">
        <div>
          <h1>Contact Us</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Contact Us
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="section-inner">
          <div className="contact-cards-grid">
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>LT CPA Limited</h3>
              <p>Professional Accounting Firm</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Office Address</h3>
              <p>Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Phone</h3>
              <p>+852 3987 1008</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>info@ltgroupcpa.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="contact-grid">
            {/* Left: Contact Form */}
            <div className="contact-form-wrapper fade-in">
              <div className="form-header">
                <h2>Free Consultation</h2>
                <p>Fill out the form below and we&apos;ll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone <span className="required">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Type</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="audit">Audit & Assurance</option>
                    <option value="tax">Tax Services</option>
                    <option value="accounting">Accounting & Bookkeeping</option>
                    <option value="advisory">Business Advisory</option>
                    <option value="company">Company Formation</option>
                    <option value="payroll">Payroll Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message <span className="required">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Submit Enquiry
                </button>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div className="contact-details fade-in">
              <h2>Customer Contact Information</h2>

              <div className="detail-items">
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+852 3987 1008</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>info@ltgroupcpa.com</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>Unit 503, Tower 2, Lippo Centre,<br />89 Queensway, Admiralty, Hong Kong</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" aria-label="WeChat">
                    <i className="fab fa-weixin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.075073775957!2d114.164929!3d22.279358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040056b04d25cd%3A0x6e9c7a65c4c66bc8!2sLippo%20Centre%2C%2089%20Queensway%2C%20Admiralty%2C%20Hong%20Kong!5e0!3m2!1sen!2sus!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="map-overlay-card">
          <div className="overlay-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <h4>Visit Our Office</h4>
            <p>Unit 503, Tower 2, Lippo Centre,<br />89 Queensway, Admiralty, Hong Kong</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item fade-in">
                <button
                  onClick={() => toggleFaq(index)}
                  className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                >
                  <span>{faq.question}</span>
                  <i className={`fas fa-chevron-down ${openFaqIndex === index ? 'rotate' : ''}`}></i>
                </button>
                <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta fade-in">
            <p>Still have questions? We&apos;re here to help.</p>
            <a href="mailto:info@ltgroupcpa.com">
              Contact Us Directly <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
