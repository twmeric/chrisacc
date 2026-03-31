"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../contact/contact.css";

const faqs = [
  {
    question: "如何预约免费咨询？",
    answer: "您可以透过本页的联络表格、直接致电 +852 3987 1008 或发送电邮至 info@ltgroupcpa.com 预约免费咨询。我们的团队将在24小时内回复，安排您的会面时间。",
  },
  {
    question: "你们服务哪些类型的客户？",
    answer: "我们服务多元化的客户群，包括中小型企业、初创公司、跨国企业、非牟利机构及个人客户。我们的服务会因应每位客户的独特需求而量身定制。",
  },
  {
    question: "审计服务的收费是多少？",
    answer: "我们的审计费用取决于您业务的复杂程度、公司规模及具体要求。我们提供具竞争力的价格，会在初步咨询了解您的需求后提供详细报价。",
  },
  {
    question: "完成审计报告需要多长时间？",
    answer: "完成审计报告的时间通常为2至6星期，具体取决于您机构的规模、财务报表的复杂程度，以及您能够框供所需文件的速度。",
  },
];

export default function ContactPageCn() {
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
    alert('感谢您的查询！我们将尽快与您联络。');
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
          <h1>联络我们</h1>
          <div className="breadcrumb">
            <Link href="/cn">首页</Link> / 联络我们
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
              <p>专业会计师事务所</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>办公室地址</h3>
              <p>香港金钟力宝中心第2座503室</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>电话</h3>
              <p>+852 3987 1008</p>
            </div>
            <div className="contact-card fade-in">
              <div className="card-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>电邮</h3>
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
                <h2>免费咨询</h2>
                <p>填写以下表格，我们将尽快回复您。</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>姓名 <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="您的姓名" />
                  </div>
                  <div className="form-group">
                    <label>公司名称</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="您的公司" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>电话 <span className="required">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="您的电话号码" />
                  </div>
                  <div className="form-group">
                    <label>电邮 <span className="required">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="您的电邮地址" />
                  </div>
                </div>

                <div className="form-group">
                  <label>服务类型</label>
                  <select name="service" value={formData.service} onChange={handleInputChange}>
                    <option value="">选择服务</option>
                    <option value="audit">审计及鉴证</option>
                    <option value="tax">税务服务</option>
                    <option value="accounting">会计及簿记</option>
                    <option value="advisory">商业咨询</option>
                    <option value="company">公司成立</option>
                    <option value="payroll">薪资服务</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>讯息 <span className="required">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="我们如何为您效劳？" />
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  提交查询
                </button>
              </form>
            </div>

            <div className="contact-details fade-in">
              <h2>客户联络资讯</h2>

              <div className="detail-items">
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-phone"></i></div>
                  <div><h4>电话</h4><p>+852 3987 1008</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-envelope"></i></div>
                  <div><h4>电邮</h4><p>info@ltgroupcpa.com</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div><h4>地址</h4><p>香港金钟力宝中心第2座503室</p></div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-clock"></i></div>
                  <div><h4>营业时间</h4><p>星期一至五: 上午9时至下午6时<br />星期六: 上午9时至下午1时<br />星期日: 休息</p></div>
                </div>
              </div>

              <div className="social-section">
                <h4>关注我们</h4>
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
            <h4>亲临我们的办公室</h4>
            <p>香港金钟力宝中心第2座503室</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header fade-in">
            <h2>常见问题</h2>
            <p>常见问题的快速解答</p>
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
