import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { getLocaleCMS } from "@/lib/cms-data";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const t = getLocaleCMS(lang).footer;

  return (
    <footer className="section-dark mt-auto bg-brand-navy pt-14 text-white md:pt-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-xl font-bold text-brand-gold">{t.aboutTitle}</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/80">{t.aboutDesc}</p>
            <div className="flex gap-3">
              <a href={t.social.facebook || "#"} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={t.social.instagram || "#"} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={t.social.linkedin || "#"} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-gold">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.linksTitle}</h4>
            <ul className="space-y-2.5">
              {t.quickLinks.map((item) => (
                <li key={item.url}>
                  <Link href={`/${lang}${item.url}`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.servicesTitle}</h4>
            <ul className="space-y-2.5">
              {t.services.map((s) => (
                <li key={s.url}>
                  <Link href={`/${lang}${s.url}`} className="text-sm text-white/80 transition hover:pl-1 hover:text-brand-gold">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-gold">{t.contactTitle}</h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>{t.contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>{t.contact.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>{t.contact.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-5 text-center text-xs text-white/60 md:text-sm space-y-1">
          <p>{t.rights}</p>
          <p>
            Powered by{" "}
            <a href="https://jkdcoding.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
              JKDCoding
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
