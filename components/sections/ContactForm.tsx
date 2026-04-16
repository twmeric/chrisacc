"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Facebook, Instagram, Linkedin } from "lucide-react";

interface ContactFormProps {
  lang: string;
  data: {
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
    successMsg: string;
    errorMsg: string;
    infoTitle: string;
    hoursTitle: string;
    hours: { day: string; time: string }[];
    follow: string;
    servicesList: { value: string; label: string }[];
  };
  map: {
    title: string;
    address: string;
  };
}

const INQUIRY_API_URL = process.env.NEXT_PUBLIC_INQUIRY_API_URL || "/api/submit-inquiry/";

export default function ContactForm({ lang, data, map }: ContactFormProps) {
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
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(INQUIRY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            <h2 className="mb-2 text-2xl font-bold text-brand-navy md:text-3xl">{data.formTitle}</h2>
            <p className="mb-6 text-text-light">{data.formDesc}</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{data.name}</label>
                  <input name="name" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{data.company}</label>
                  <input name="company" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{data.phone}</label>
                  <input name="phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-dark">{data.email}</label>
                  <input name="email" type="email" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-dark">{data.service}</label>
                <select
                  name="service"
                  value={preselectedService}
                  onChange={(e) => setPreselectedService(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                >
                  {data.servicesList.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-dark">{data.message}</label>
                <textarea name="message" rows={5} className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-block rounded-full bg-brand-gold px-10 py-4 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-brand-navy disabled:opacity-60"
              >
                {loading ? data.submitting : data.submit}
              </button>
              {status === "success" && <p className="text-sm font-medium text-green-600">{data.successMsg}</p>}
              {status === "error" && <p className="text-sm font-medium text-red-600">{data.errorMsg}</p>}
            </form>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-6 text-white md:p-8">
            <h3 className="mb-5 text-xl font-bold text-white">{data.infoTitle}</h3>
            <div className="mb-6 space-y-3 text-sm opacity-90">
              <p>{map.title}</p>
              <p>{map.address}</p>
            </div>
            <div className="mb-6 border-t border-white/10 pt-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                <Clock className="h-4 w-4 text-brand-gold" /> {data.hoursTitle}
              </h4>
              <div className="space-y-2 text-sm opacity-90">
                {data.hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-5">
              <h4 className="mb-3 font-semibold">{data.follow}</h4>
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
