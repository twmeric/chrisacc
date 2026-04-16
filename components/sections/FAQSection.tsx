import FAQItem from "@/components/ui/FAQItem";

interface FAQSectionProps {
  lang: string;
}

const content: Record<string, { title: string; subtitle: string; items: { q: string; a: string }[] }> = {
  "zh-hant": {
    title: "常見問題",
    subtitle: "以下是客戶經常查詢的問題",
    items: [
      { q: "如何預約免費諮詢？", a: "您可以透過以上表格提交查詢、致電我們、或透過 WhatsApp / 電郵與我們聯繫，我們的顧問會盡快回覆您。" },
      { q: "服務收費是如何計算的？", a: "我們會根據服務範圍、企業規模及複雜程度提供度身報價。歡迎聯絡我們獲取免費估算。" },
      { q: "你們服務哪些行業的客戶？", a: "我們的客戶遍及各行各業，包括貿易、製造、科技、餐飲、物業管理、金融服務及非牟利機構等。" },
      { q: "首次合作需要提供什麼文件？", a: "一般需提供公司註冊文件、最近期財務報表、銀行月結單及相關合約文件。我們會在首次會面時詳細說明。" },
    ],
  },
  "zh-hans": {
    title: "常见问题",
    subtitle: "以下是客户经常查询的问题",
    items: [
      { q: "如何预约免费咨询？", a: "您可以透过以上表格提交查询、致电我们、或透过 WhatsApp / 电邮与我们联系，我们的顾问会尽快回覆您。" },
      { q: "服务收费是如何计算的？", a: "我们会根据服务范围、企业规模及复杂程度提供度身报价。欢迎联络我们获取免费估算。" },
      { q: "你们服务哪些行业的客户？", a: "我们的客户遍及各行各业，包括贸易、制造、科技、餐饮、物业管理、金融服务及非牟利机构等。" },
      { q: "首次合作需要提供什么文件？", a: "一般需提供公司注册文件、最近期财务报表、银行月结单及相关合约文件。我们会在首次会面时详细说明。" },
    ],
  },
  en: {
    title: "FAQ",
    subtitle: "Frequently asked questions from our clients",
    items: [
      { q: "How do I book a free consultation?", a: "You can submit an inquiry through the form above, call us, or contact us via WhatsApp / email. Our consultants will get back to you as soon as possible." },
      { q: "How are your fees calculated?", a: "We provide customized quotations based on the scope of service, business size, and complexity. Please contact us for a free estimate." },
      { q: "Which industries do you serve?", a: "Our clients span various industries including trading, manufacturing, technology, F&B, property management, financial services, and non-profit organizations." },
      { q: "What documents are needed for the first engagement?", a: "Generally, we need company registration documents, recent financial statements, bank statements, and relevant contracts. We will explain in detail during our first meeting." },
    ],
  },
};

export default function FAQSection({ lang }: FAQSectionProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-brand-navy md:text-4xl">{t.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-text-light">{t.subtitle}</p>
        </div>
        <div>
          {t.items.map((item, idx) => (
            <FAQItem key={idx} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
