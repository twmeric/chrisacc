"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../contact/contact.css";

const faqs = [
  {
    question: "如何預約免費諮詢？",
    answer: "您可以透過本頁的聯絡表格、直接致電 +852 3987 1008 或發送電郵至 info@ltgroupcpa.com 預約免費諮詢。我們的團隊將在24小時內回覆，安排您的會面時間。",
  },
  {
    question: "你們服務哪些類型的客戶？",
    answer: "我們服務多元化的客戶群，包括中小型企業、初創公司、跨國企業、非牟利機構及個人客戶。我們的服務會因應每位客戶的獨特需求而量身定制。",
  },
  {
    question: "審計服務的收費是多少？",
    answer: "我們的審計費用取決於您業務的複雜程度、公司規模及具體要求。我們提供具競爭力的價格，會在初步諮詢了解您的需求後提供詳細報價。",
  },
  {
    question: "完成審計報告需要多長時間？",
    answer: "完成審計報告的時間通常為2至6星期，具體取決於您機構的規模、財務報表的複雜程度，以及您能夠提供所需文件的速庫。",
  },
];

export default function ContactPageZh() {
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
    alert('感謝您的查詢！我們將盡快與您聯絡。');
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
          <h1>聯絡我們</h1>
          <div className="breadcrumb">
            <Link href="/zh">首頁</Link> / 聯絡我們
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
              <p>專業會計師事務所</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>辦公室地址</h3>
              <p>香港金鐘力寶中心第2座503室</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>電話</h3>
              <p>+852 3987 1008</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>電郵</h3>
              <p>info@ltgroupcpa.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="about-intro-section">
        <div className="section-inner">
          <div className="contact-grid">
            <div className="contact-form-wrapper fade-in">
              <div className="form-header">
                <h2>免費諮詢</h2>
                <p>填寫以下表格，我們將盡快回覆您。</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>姓名 <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="您的姓名" />
                  </div>
                  <div className="form-group">
                    <label>公司名稱</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="您的公司" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>電話 <span className="required">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="您的電話號碼" />
                  </div>
                  <div className="form-group">
                    <label>電郵 <span className="required">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="您的電郵地址" />
                  </div>
                </div>

                <div className="form-group">
                  <label>服務類型</label>
                  <select name="service" value={formData.service} onChange={handleInputChange}>
                    <option value="">選擇服務</option>
                    <option value="audit">審計及鑑證</option>
                    <option value="tax">稅務服務</option>
                    <option value="accounting">會計及簿記</option>
                    <option value="advisory">商業諮詢</option>
                    <option value="company">公司成立</option>
                    <option value="payroll">薪資服務</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>訊息 <span className="required">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="我們如何為您效勞？" />
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  提交查詢
                </button>
              </form>
            </div>

            <div className="contact-details fade-in">
              <h2>客戶聯絡資訊</h2>

              <div className="detail-items">
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-phone"></i></div>
                  <div><h4>電話</h4><p>+852 3987 1008</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-envelope"></i></div>
                  <div><h4>電郵</h4><p>info@ltgroupcpa.com</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div><h4>地址</h4><p>香港金鐘力寶中心第2座503室</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-clock"></i></div>
                  <div><h4>營業時間</h4><p>星期一至五: 上午9時至下午6時<br />星期六: 上午9時至下午1時<br />星期日: 休息</p></div>
                </div>
              </div>

              <div className="social-section">
                <h4>關注我們</h4>
                <div className="social-links">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                  <a href="#" aria-label="WeChat"><i className="fab fa-weixin"></i></a>
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
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        />
        <div className="map-overlay-card">
          <div className="overlay-icon"><i className="fas fa-map-marker-alt"></i></div>
          <div>
            <h4>親臨我們的辦公室</h4>
            <p>香港金鐘力寶中心第2座503室</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>常見問題</h2>
            <p>常見問題的快速解答</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item fade-in">
                <button onClick={() => toggleFaq(index)} className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}>
                  <span>{faq.question}</span>
                  <i className={`fas fa-chevron-down ${openFaqIndex === index ? 'rotate' : ''}`}></i>
                </button>
                <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
