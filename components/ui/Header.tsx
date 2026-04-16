"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
import { Locale, localeLabels } from "@/lib/i18n-config";

interface NavItem {
  label: string;
  url: string;
  children?: { label: string; url: string }[];
}

interface HeaderProps {
  lang: Locale;
  navItems?: NavItem[];
}

const defaultNav: Record<Locale, NavItem[]> = {
  "zh-hant": [
    { label: "首頁", url: "/" },
    {
      label: "關於我們",
      url: "/about/",
      children: [
        { label: "我們的使命", url: "/about/#mission" },
        { label: "我們的願景", url: "/about/#vision" },
        { label: "我們的承諾", url: "/about/#commitment" },
      ],
    },
    { label: "服務範圍", url: "/services/audit/" },
    { label: "聯絡我們", url: "/contact/" },
  ],
  "zh-hans": [
    { label: "首页", url: "/" },
    {
      label: "关于我们",
      url: "/about/",
      children: [
        { label: "我们的使命", url: "/about/#mission" },
        { label: "我们的愿景", url: "/about/#vision" },
        { label: "我们的承诺", url: "/about/#commitment" },
      ],
    },
    { label: "服务范围", url: "/services/audit/" },
    { label: "联络我们", url: "/contact/" },
  ],
  en: [
    { label: "Home", url: "/" },
    {
      label: "About Us",
      url: "/about/",
      children: [
        { label: "Our Mission", url: "/about/#mission" },
        { label: "Our Vision", url: "/about/#vision" },
        { label: "Our Commitment", url: "/about/#commitment" },
      ],
    },
    { label: "Services", url: "/services/audit/" },
    { label: "Contact", url: "/contact/" },
  ],
};

export default function Header({ lang, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const normalizedPathname = pathname?.replace(/\/$/, "") || "";
  const items = navItems || defaultNav[lang];
  const otherLocales = (["zh-hant", "zh-hans", "en"] as Locale[]).filter((l) => l !== lang);

  function switchLocaleUrl(target: Locale) {
    const segments = pathname?.split("/") || [];
    if (segments[1] === lang) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join("/") || "/";
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-[0_2px_20px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href={`/${lang}/`} className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-navy to-brand-accent text-lg font-bold text-white md:h-12 md:w-12 md:text-2xl">
            LT
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-lg font-bold leading-tight text-brand-navy md:text-[22px]">
              {lang === "en" ? "LT CPA Limited" : "櫪韜會計師事務所"}
            </span>
            <span className="text-[10px] tracking-[2px] text-text-light md:text-xs">
              {lang === "en" ? "PROFESSIONAL ACCOUNTING" : "PROFESSIONAL SERVICES"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={`/${lang}${item.url}`}
                className={`group relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors lg:text-base ${
                  normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`)
                    ? "text-brand-navy"
                    : "text-text-dark hover:text-brand-navy"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="h-4 w-4" />}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all ${
                    normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full min-w-[200px] rounded-md border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={`/${lang}${child.url}`}
                      className="block px-5 py-2.5 text-sm text-text-dark transition hover:bg-brand-cream hover:text-brand-navy"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Language */}
          <div className="relative hidden md:block">
            <button className="flex items-center gap-1.5 text-sm font-medium text-text-dark hover:text-brand-navy">
              <Globe className="h-4 w-4 text-brand-navy" />
              <span className="hidden lg:inline">{localeLabels[lang]}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-full z-20 hidden min-w-[130px] rounded-md border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)] group-hover:block hover:block">
              {otherLocales.map((locale) => (
                <Link
                  key={locale}
                  href={switchLocaleUrl(locale)}
                  className="block px-4 py-2 text-sm text-text-dark transition hover:bg-brand-cream hover:text-brand-navy"
                >
                  {localeLabels[locale]}
                </Link>
              ))}
            </div>
          </div>

          {/* Search */}
          <button className="hidden items-center gap-1.5 text-sm font-medium text-text-dark transition hover:text-brand-navy md:flex">
            <Search className="h-4 w-4 text-brand-navy" />
            <span className="hidden lg:inline">{lang === "en" ? "Search" : "搜尋"}</span>
          </button>

          {/* Mobile toggle */}
          <button
            className="flex h-6 w-8 flex-col justify-between md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-full origin-center rounded-sm bg-brand-navy transition-all ${
                mobileOpen ? "translate-y-[11px] rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-full rounded-sm bg-brand-navy transition-all ${mobileOpen ? "scale-x-0 opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-full origin-center rounded-sm bg-brand-navy transition-all ${
                mobileOpen ? "-translate-y-[11px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[-1] bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-[72px] w-full border-t border-gray-100 bg-white px-4 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:hidden">
            <nav className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.label}>
                  <Link
                    href={`/${lang}${item.url}`}
                    className="block py-2 text-base font-medium text-text-dark hover:text-brand-navy"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 flex flex-col gap-1 border-l-2 border-brand-gold/30 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={`/${lang}${child.url}`}
                          className="py-1.5 text-sm text-text-light hover:text-brand-navy"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-wrap gap-3 border-t border-gray-100 pt-4 text-sm">
                {(["zh-hant", "zh-hans", "en"] as Locale[]).map((locale) => (
                  <Link
                    key={locale}
                    href={switchLocaleUrl(locale)}
                    className={`rounded px-2 py-1 ${locale === lang ? "bg-brand-navy text-white" : "text-text-dark hover:bg-brand-cream"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {localeLabels[locale]}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
