"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
import { Locale, localeLabels } from "@/lib/i18n-config";

interface NavItem { label: string; url: string; children?: { label: string; url: string }[]; }
interface HeaderProps {
  lang: Locale;
  navItems?: NavItem[];
  siteName?: string;
  siteTagline?: string;
  logoUrl?: string;
}

export default function Header({ lang, navItems, siteName, siteTagline, logoUrl }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, "") || "";
  const items = navItems || [];
  const otherLocales = (["zh-hant", "zh-hans", "en"] as Locale[]).filter((l) => l !== lang);

  function switchLocaleUrl(target: Locale) {
    const segments = pathname?.split("/") || [];
    if (segments[1] === lang) segments[1] = target;
    else segments.splice(1, 0, target);
    return segments.join("/") || "/";
  }

  const displayName = siteName || (lang === "en" ? "LT CPA Limited" : lang === "zh-hans" ? "櫪韬会计师事务所" : "櫪韜會計師事務所");
  const displayTagline = siteTagline || (lang === "en" ? "Professional Accounting" : "Professional Services");

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/95 backdrop-blur shadow-[0_1px_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link href={lang === "en" ? "/" : `/${lang}/`} className="flex shrink-0 items-center">
          {logoUrl ? (
            <img src={logoUrl} alt={displayName} className="h-10 w-auto md:h-12" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center bg-brand-navy text-lg font-bold text-white md:h-12 md:w-12 md:text-2xl">LT</div>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {items.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => item.children && setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={`/${lang}${item.url}`} className={`group relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors lg:text-base ${normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`) ? "text-brand-navy" : "text-text-dark hover:text-brand-navy"}`}>
                {item.label}
                {item.children && item.children.length > 0 && <ChevronDown className="h-4 w-4" />}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all ${normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full min-w-[200px] rounded-md border-t-2 border-brand-gold border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.url.startsWith("http") ? child.url : `/${lang}${child.url}`} className="block px-5 py-2.5 text-sm text-text-dark transition hover:bg-brand-cream hover:text-brand-navy">{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="group relative hidden md:block">
            <button className="flex items-center gap-1.5 text-sm font-medium text-text-dark hover:text-brand-navy">
              <Globe className="h-4 w-4 text-brand-navy" />
              <span className="hidden lg:inline">{localeLabels[lang]}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-full z-20 hidden min-w-[130px] rounded-md border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)] group-hover:block hover:block">
              {otherLocales.map((locale) => (
                <Link key={locale} href={switchLocaleUrl(locale)} className="block px-4 py-2 text-sm text-text-dark transition hover:bg-brand-cream hover:text-brand-navy">{localeLabels[locale]}</Link>
              ))}
            </div>
          </div>
          <button className="hidden items-center gap-1.5 text-sm font-medium text-text-dark transition hover:text-brand-navy md:flex">
            <Search className="h-4 w-4 text-brand-navy" />
            <span className="hidden lg:inline">{lang === "en" ? "Search" : "搜尋"}</span>
          </button>
          <button className="flex h-6 w-8 flex-col justify-between md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`block h-0.5 bg-brand-navy transition-transform ${mobileOpen ? "translate-y-[10px] rotate-45" : ""}`} />
            <span className={`block h-0.5 bg-brand-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-brand-navy transition-transform ${mobileOpen ? "-translate-y-[10px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-x-0 top-[72px] z-40 border-t border-gray-100 bg-white shadow-lg transition-all md:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto p-4">
          <nav className="space-y-1">
            {items.map((item) => (
              <div key={item.label}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <div className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium ${normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`) ? "bg-brand-cream text-brand-navy" : "text-text-dark hover:bg-gray-50"}`}>
                      <Link href={`/${lang}${item.url}`} onClick={() => setMobileOpen(false)} className="flex-1">
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="p-1"
                        aria-label={openDropdown === item.label ? "Collapse" : "Expand"}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {openDropdown === item.label && (
                      <div className="mt-1 space-y-1 border-l-2 border-brand-gold bg-gray-50 py-1 pl-4">
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.url.startsWith("http") ? child.url : `/${lang}${child.url}`} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-text-dark hover:bg-white hover:text-brand-navy">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/${lang}${item.url}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium ${normalizedPathname.startsWith(`/${lang}${item.url.replace(/\/$/, "")}`) ? "bg-brand-cream text-brand-navy" : "text-text-dark hover:bg-gray-50"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="mb-2 text-xs font-semibold text-text-light uppercase">{lang === "en" ? "Language" : "語言"}</div>
            <div className="flex flex-wrap gap-2">
              {otherLocales.map((locale) => (
                <Link key={locale} href={switchLocaleUrl(locale)} onClick={() => setMobileOpen(false)} className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-text-dark hover:border-brand-navy hover:text-brand-navy">
                  {localeLabels[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
