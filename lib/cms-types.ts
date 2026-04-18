export type CMSLocale = "zh-hant" | "zh-hans" | "en";

export interface CMSData {
  "zh-hant": LocaleCMSData;
  "zh-hans": LocaleCMSData;
  en: LocaleCMSData;
}

export interface LocaleCMSData {
  site: SiteData;
  header: HeaderData;
  footer: FooterData;
  home: HomeData;
  about: AboutData;
  services: ServicesPageData;
  servicePages: Record<string, ServiceDetailPageData>;
  contact: ContactPageData;
  purpose: SimpleContentPageData;
  value: SimpleContentPageData;
  commitment: SimpleContentPageData;
}

export interface SiteData {
  name: string;
  tagline: string;
  logo: string;
  jkdcodingLogo?: string;
  jkdcodingUrl?: string;
}

export interface HeaderData {
  navItems: NavItem[];
}

export interface NavItem {
  label: string;
  url: string;
  children?: { label: string; url: string }[];
}

export interface FooterData {
  aboutTitle: string;
  aboutDesc: string;
  linksTitle: string;
  servicesTitle: string;
  contactTitle: string;
  rights: string;
  services: { label: string; url: string }[];
  quickLinks: { label: string; url: string }[];
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface HomeData {
  hero: {
    slides: { title: string; subtitle: string; cta: string; href: string }[];
    backgrounds: string[];
  };
  services: {
    title: string;
    subtitle: string;
    cards: { slug: string; title: string; desc: string; icon: string; linkText: string; href: string }[];
  };
  cta: {
    title: string;
    desc: string;
    btn: string;
    href: string;
  };
}

export interface AboutData {
  pageTitle: string;
  whyChoose: {
    title: string;
    desc: string;
    image?: string;
    paragraphs?: string[];
    features?: { icon: string; label: string }[];
    items: { icon: string; title: string; desc: string }[];
  };
  intro: {
    title: string;
    titleAccent: string;
    subtitle?: string;
    paragraphs: string[];
    quote: string;
    image?: string;
    badge?: { value: string; label: string };
    stats?: { value: string; label: string }[];
  };
  missionVision: {
    items: { icon: string; title: string; desc: string; linkText?: string; href?: string }[];
  };
  pillars?: {
    purpose: PillarSection;
    value: PillarSection;
    commitment: PillarSection;
  };
  coreValues: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string }[];
  };
  team: {
    title: string;
    subtitle: string;
    members: { name: string; role: string; image: string }[];
  };
  timeline: {
    title: string;
    subtitle: string;
    events: { year: string; title: string; desc: string }[];
  };
  cta: {
    title: string;
    desc: string;
    btn: string;
    href: string;
  };
}

export interface PillarSection {
  title: string;
  subtitle: string;
  quote: string;
  items: { icon: string; title: string; desc: string }[];
}

export interface ServicesPageData {
  pageTitle: string;
  introTitle: string;
  introDesc: string;
  serviceDetails: {
    slug: string;
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    features: string[];
    linkText: string;
    href: string;
  }[];
  whyChoose: {
    title: string;
    desc: string;
    items: { icon: string; title: string; desc: string }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
  };
  cta: {
    title: string;
    desc: string;
    btn: string;
    href: string;
  };
}

export interface ServiceDetailPageData {
  tagline: string;
  heroDesc: string;
  overviewTitle: string;
  overview: string[];
  overviewHighlight: string;
  overviewStat: { number: string; label: string } | null;
  overviewStats?: { number: string; label: string; position?: "top" | "bottom" }[];
  overviewIcon?: string;
  overviewImage: string;
  scopeTitle: string;
  scopeSubtitle: string;
  scopeItems: {
    title: string;
    subtitle: string;
    icon: string;
    body: string;
    features: string[];
  }[];
  processTitle: string;
  processSubtitle: string;
  processSteps: { number: string; title: string; desc: string }[];
  scenariosTitle: string;
  scenarios: { title: string; desc: string; features: string[] }[];
  scenarios2Title: string;
  scenarios2: { title: string; desc: string; features: string[] }[];
  whyTitle: string;
  whySubtitle: string;
  whyItems: { title: string; desc: string; icon: string }[];
  relatedServicesTitle: string;
  relatedItems: { title: string; desc: string; href: string; linkText: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  ctaBtn2: string;
  // Extra sections for pages like Forensic (confidentiality, fraud types) and Consulting (maturity, CFO, cases)
  extraSections?: {
    title: string;
    subtitle?: string;
    body?: string;
    items?: { title: string; desc: string; icon?: string }[];
    steps?: { number: string; title: string; desc: string }[];
    layout: "cards" | "steps" | "text" | "list";
  }[];
  // Legacy aliases for backward compatibility
  serviceScopeSubtitle?: string;
  serviceProcessSubtitle?: string;
}

export interface ContactPageData {
  pageTitle: string;
  cards: { icon: string; title: string; lines: string[] }[];
  form: {
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
    embedUrl: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
}

export interface SimpleContentPageData {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroQuote: string;
  items: { icon: string; title: string; desc: string }[];
  cta: {
    title: string;
    desc: string;
    btn: string;
    href: string;
  };
}
