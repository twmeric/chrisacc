"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, X, Globe } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

// Traditional Chinese navigation
const navItemsZh: NavItem[] = [
  { label: "首頁", href: "/zh" },
  {
    label: "關於我們",
    href: "/zh/about",
    submenu: [
      { label: "關於概覽", href: "/zh/about" },
      { label: "我們的願景", href: "/zh/about/purpose" },
      { label: "核心價值", href: "/zh/about/value" },
      { label: "我們的承諾", href: "/zh/about/commitment" },
    ],
  },
  {
    label: "服務範圍",
    href: "/zh/services",
    submenu: [
      { label: "服務概覽", href: "/zh/services" },
      { label: "審計及鑑證", href: "/zh/services/audit" },
      { label: "稅務諮詢", href: "/zh/services/tax" },
      { label: "風險諮詢", href: "/zh/services/risk" },
      { label: "法證會計", href: "/zh/services/forensic" },
      { label: "企業顧問", href: "/zh/services/consulting" },
      { label: "交易及併購", href: "/zh/services/deals" },
    ],
  },
  { label: "聯絡我們", href: "/zh/contact" },
];

// Simplified Chinese navigation
const navItemsCn: NavItem[] = [
  { label: "首页", href: "/cn" },
  {
    label: "关于我们",
    href: "/cn/about",
    submenu: [
      { label: "关于概览", href: "/cn/about" },
      { label: "我们的愿景", href: "/cn/about/purpose" },
      { label: "核心价值", href: "/cn/about/value" },
      { label: "我们的承诺", href: "/cn/about/commitment" },
    ],
  },
  {
    label: "服务范围",
    href: "/cn/services",
    submenu: [
      { label: "服务概览", href: "/cn/services" },
      { label: "审计及鉴证", href: "/cn/services/audit" },
      { label: "税务咨询", href: "/cn/services/tax" },
      { label: "风险咨询", href: "/cn/services/risk" },
      { label: "法证会计", href: "/cn/services/forensic" },
      { label: "企业顾问", href: "/cn/services/consulting" },
      { label: "交易及并购", href: "/cn/services/deals" },
    ],
  },
  { label: "联络我们", href: "/cn/contact" },
];

// English navigation
const navItemsEn: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    submenu: [
      { label: "About Overview", href: "/about" },
      { label: "Our Purpose", href: "/about/purpose" },
      { label: "Our Value", href: "/about/value" },
      { label: "Our Commitment", href: "/about/commitment" },
    ],
  },
  {
    label: "Our Services",
    href: "/services",
    submenu: [
      { label: "Services Overview", href: "/services" },
      { label: "Audit & Assurance", href: "/services/audit" },
      { label: "Tax Advisory", href: "/services/tax" },
      { label: "Risk & Regulatory", href: "/services/risk" },
      { label: "Forensic Services", href: "/services/forensic" },
      { label: "Consulting", href: "/services/consulting" },
      { label: "Deals & M&A", href: "/services/deals" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// Language content
const langContent = {
  zh: {
    selectLang: "選擇語言",
    getInTouch: "聯絡我們",
    search: "搜尋",
  },
  cn: {
    selectLang: "选择语言",
    getInTouch: "联络我们",
    search: "搜索",
  },
  en: {
    selectLang: "Select Language",
    getInTouch: "Get in Touch",
    search: "Search",
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  const isZh = pathname.startsWith("/zh");
  const isCn = pathname.startsWith("/cn");
  const currentLang = isZh ? "Zh" : isCn ? "Cn" : "En";
  
  // Get current navigation items based on language
  const navItems = isZh ? navItemsZh : isCn ? navItemsCn : navItemsEn;
  
  // Get current language content
  const t = isZh ? langContent.zh : isCn ? langContent.cn : langContent.en;

  const getLogoSrc = () => {
    switch (currentLang) {
      case "Zh": return "/images/logo-zh.jpg";
      case "Cn": return "/images/logo-cn.jpg";
      default: return "/images/logo-en.jpg";
    }
  };

  const getLangPath = (lang: string) => {
    const pathWithoutLang = pathname.replace(/^\/(zh|cn)\//, "/").replace(/^\/(zh|cn)$/, "/");
    if (lang === "En") return pathWithoutLang;
    return `/${lang.toLowerCase()}${pathWithoutLang}`;
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/zh" || pathname === "/cn";
    if (href === "/zh") return pathname === "/zh";
    if (href === "/cn") return pathname === "/cn";
    return pathname.startsWith(href);
  };

  const toggleSubmenu = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        {/* Close Button */}
        <button
          className="mobile-menu-close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        {/* Decorative Line */}
        <div className="mobile-menu-divider" />

        {/* Navigation Items */}
        <nav className="mobile-nav">
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className={`mobile-nav-item ${isActive(item.href) ? "active" : ""}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="mobile-nav-header">
                <Link
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => !item.submenu && setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <button
                    className={`mobile-nav-toggle ${expandedItem === item.href ? "expanded" : ""}`}
                    onClick={() => toggleSubmenu(item.href)}
                    aria-label={expandedItem === item.href ? "Collapse menu" : "Expand menu"}
                  >
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              {/* Submenu with animation */}
              {item.submenu && (
                <div
                  className={`mobile-submenu ${expandedItem === item.href ? "expanded" : ""}`}
                >
                  <div className="mobile-submenu-inner">
                    {item.submenu.map((sub, subIndex) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`mobile-submenu-link ${pathname === sub.href ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ animationDelay: `${subIndex * 0.05}s` }}
                      >
                        <span className="mobile-submenu-dot" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mobile-menu-footer">
          <div className="mobile-menu-divider" />

          {/* Language Switcher */}
          <div className="mobile-lang-section">
            <div className="mobile-lang-label">
              <Globe size={16} strokeWidth={1.5} />
              <span>{t.selectLang}</span>
            </div>
            <div className="mobile-lang-options">
              <Link
                href={getLangPath("zh")}
                className={`mobile-lang-option ${currentLang === "Zh" ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                繁體
              </Link>
              <Link
                href={getLangPath("cn")}
                className={`mobile-lang-option ${currentLang === "Cn" ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                简体
              </Link>
              <Link
                href={getLangPath("en")}
                className={`mobile-lang-option ${currentLang === "En" ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                EN
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <Link
            href={isZh ? "/zh/contact" : isCn ? "/cn/contact" : "/contact"}
            className="mobile-contact-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.getInTouch}
          </Link>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="header-main">
          <div className="nav-container">
            <div className="header-left">
              <div className="header-logo">
                <Link href={isZh ? "/zh" : isCn ? "/cn" : "/"}>
                  <Image
                    src={getLogoSrc()}
                    alt="LT CPA Limited"
                    width={140}
                    height={50}
                    className="logo-img"
                    priority
                  />
                </Link>
              </div>
              <nav className="hidden lg:block">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.href} className={item.submenu ? "has-dropdown" : ""}>
                      <Link
                        href={item.href}
                        className={isActive(item.href) ? "active" : ""}
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <ul className="submenu">
                          {item.submenu.map((sub) => (
                            <li key={sub.href}>
                              <Link href={sub.href}>{sub.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <div className="header-actions">
                <div className="header-lang">
                  <span className="lang-current">
                    <i className="fa-solid fa-globe"></i>
                    <span>{currentLang}</span>
                    <i className="fa-solid fa-chevron-up" style={{ fontSize: 10 }}></i>
                  </span>
                  <ul className="lang-dropdown">
                    <li><Link href={getLangPath("zh")}>繁體</Link></li>
                    <li><Link href={getLangPath("cn")}>简体</Link></li>
                    <li><Link href={getLangPath("en")}>EN</Link></li>
                  </ul>
                </div>
                <Link href="#" className="header-search hidden sm:flex">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span>{t.search}</span>
                </Link>
              </div>
              <button
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
