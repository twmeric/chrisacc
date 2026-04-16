"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Facebook, Instagram, Linkedin } from "lucide-react";

interface ContactFormProps {
  lang: string;
}

const INQUIRY_API_URL = process.env.NEXT_PUBLIC_INQUIRY_API_URL || "/api/submit-inquiry/";

const servicesList = [
  { value: "", label: { "zh-hant": "請選擇服務", "zh-hans": "请选择服务", en: "Select a service" } },
  { value: "audit", label: { "zh-hant": "審計及核證", "zh-hans": "审计及核证", en: "Audit & Assurance" } },
  { value: "tax", label: { "zh-hant": "稅務諮詢", "zh-hans": "税务咨询", en: "Tax Advisory" } },
  { value: "risk", label: { "zh-hant": "風險及合規", "zh-hans": "风险及合规", en: "Risk & Compliance" } },
  { value: "forensic", label: { "zh-hant": "法證會計", "zh-hans": "法证会计", en: "Forensic Accounting" } },
  { value: "consulting", label: { "zh-hant": "商業諮詢", "zh-hans": "商业咨询", en: "Business Advisory" } },
  { value: "deals", label: { "zh-hant": "併購服務", "zh-hans": "并购服务", en: "M&A Services" } },
];

const content: Record<string, {
  formTitle: string;
  formDesc: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submit: string;
  submitting: string;
  infoTitle: string;
  hoursTitle: string;
  hours: { day: string; time: string }[];
  follow: string;
}> = {
  "zh-hant": {
    formTitle: "免費諮詢",
    formDesc: "請填寫以下表格，我們的專業顧問將盡快與您聯繫，為您提供最適合的解決方案。",
    name: "姓名 *",
    company: "公司名稱 *",
    phone: "電話",
    email: "電郵 *",
    service: "感興趣的服務",
    message: "訊息",
    submit: "提交查詢",
    submitting: "提交中...",
    infoTitle: "客人聯絡資料",
    hoursTitle: "辦公時間",
    hours: [
      { day: "星期一至星期五", time: "09:00 - 18:00" },
      { day: "星期六", time: "09:00 - 13:00" },
      { day: "星期日及公眾假期", time: "休息" },
    ],
    follow: "關注我們",
  },
  "zh-hans": {
    formTitle: "免费咨询",
    formDesc: "请填写以下表格，我们的专业顾问将尽快与您联系，为您提供最适合的解决方案。",
    name: "姓名 *",
    company: "公司名称 *",
    phone: "电话",
    email: "电邮 *",
    service: "感兴趣的服务",
    message: "讯息",
    submit: "提交查询",
    submitting: "提交中...",
    infoTitle: "客人联络资料",
    hoursTitle: "办公时间",
    hours: [
      { day: "星期一至星期五", time: "09:00 - 18:00" },
      { day: "星期六", time: "09:00 - 13:00" },
      { day: "星期日及公众假期", time: "休息" },
    ],
    follow: "关注我们",
  },
  en: {
    formTitle: "Free Consultation",
    formDesc: "Please fill out the form below and our professional consultants will contact you as soon as possible.",
    name: "Name *",
    company: "Company *",
    phone: "Phone",
    email: "Email *",
    service: "Service of Interest",
    message: "Message",
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    infoTitle: "Contact Info",
    hoursTitle: "Business Hours",
    hours: [
      { day: "Monday - Friday", time: "09:00 - 18:00" },
      { day: "Saturday", time: "09:00 - 13:00" },
      { day: "Sunday & Public Holidays", time: "Closed" },
    ],
    follow: "Follow Us",
  },
};

export default function ContactForm({ lang }: ContactFormProps) {
  const t = content[lang] || content["zh-hant"];
  const searchParams = useSearchParams();
  const [preselectedService, setPreselectedService] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const svc = searchParams.get("service") || "";
    setPreselectedService(svc);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      const res = await fetch(INQUIRY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setPreselectedService("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-brand-navy md:text-3xl">{t.formTitle}</h2>
            <p className="mb-6 text-text-light">{t.formDesc}</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{t.name}</label>
                  <input name="name" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{t.company}</label>
                  <input name="company" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{t.phone}</label>
                  <input name="phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{t.email}</label>
                  <input name="email" type="email" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-dark">{t.service}</label>
                <select
                  name="service"
                  value={preselectedService}
                  onChange={(e) => setPreselectedService(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                >
                  {servicesList.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label[lang as keyof typeof s.label] || s.label["zh-hant"]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-dark">{t.message}</label>
                <textarea name="message" rows={5} className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-block rounded-full bg-brand-gold px-10 py-4 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-brand-navy disabled:opacity-60"
              >
                {loading ? t.submitting : t.submit}
              </button>
              {status === "success" && (
                <p className="text-sm font-medium text-green-600">
                  {lang === "en" ? "Thank you! We will contact you soon." : "感謝您的查詢，我們會盡快與您聯繫。"}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-600">
                  {lang === "en" ? "Something went wrong. Please try again." : "提交失敗，請稍後再試。"}
                </p>
              )}
            </form>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-6 text-white md:p-8">
            <h3 className="mb-5 text-xl font-bold">{t.infoTitle}</h3>
            <div className="mb-6 space-y-3 text-sm opacity-90">
              <p>LT CPA Limited</p>
              <p>Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong</p>
              <p>+852 1234 5678</p>
              <p>info@ltcpa.com</p>
            </div>
            <div className="mb-6 border-t border-white/10 pt-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Clock className="h-4 w-4 text-brand-gold" /> {t.hoursTitle}
              </h4>
              <div className="space-y-2 text-sm opacity-90">
                {t.hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-5">
              <h4 className="mb-3 font-semibold">{t.follow}</h4>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
