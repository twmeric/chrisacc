"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import defaultCMSData from "@/data/cms.json";

type Language = "" | "Zh" | "Cn";

interface Service {
  id: string;
  icon: string;
  title: string;
  titleZh: string;
  titleCn: string;
  description: string;
  descriptionZh: string;
  descriptionCn: string;
  features: string[];
  featuresZh: string[];
  featuresCn: string[];
}

interface Stat {
  number: string;
  label: string;
  labelZh: string;
  labelCn: string;
}

interface AboutSection {
  title: string;
  titleZh: string;
  titleCn: string;
  content: string;
  contentZh: string;
  contentCn: string;
}

interface CMSData {
  site: {
    name: string;
    nameZh: string;
    nameCn: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
  nav: {
    home: string;
    homeZh: string;
    homeCn: string;
    about: string;
    aboutZh: string;
    aboutCn: string;
    services: string;
    servicesZh: string;
    servicesCn: string;
    contact: string;
    contactZh: string;
    contactCn: string;
  };
  aboutSubmenu: {
    mission: string;
    missionZh: string;
    missionCn: string;
    vision: string;
    visionZh: string;
    visionCn: string;
    commitment: string;
    commitmentZh: string;
    commitmentCn: string;
  };
  servicesSubmenu: {
    audit: string;
    auditZh: string;
    auditCn: string;
    tax: string;
    taxZh: string;
    taxCn: string;
    risk: string;
    riskZh: string;
    riskCn: string;
    forensic: string;
    forensicZh: string;
    forensicCn: string;
    consulting: string;
    consultingZh: string;
    consultingCn: string;
    ma: string;
    maZh: string;
    maCn: string;
  };
  hero: {
    title: string;
    titleZh: string;
    titleCn: string;
    subtitle: string;
    subtitleZh: string;
    subtitleCn: string;
    description: string;
    descriptionZh: string;
    descriptionCn: string;
    ctaPrimary: string;
    ctaPrimaryZh: string;
    ctaPrimaryCn: string;
    ctaSecondary: string;
    ctaSecondaryZh: string;
    ctaSecondaryCn: string;
  };
  about: {
    title: string;
    titleZh: string;
    titleCn: string;
    subtitle: string;
    subtitleZh: string;
    subtitleCn: string;
    description: string;
    descriptionZh: string;
    descriptionCn: string;
    imageAlt: string;
    imageAltZh: string;
    imageAltCn: string;
    stats: Stat[];
    mission: AboutSection;
    vision: AboutSection;
    commitment: AboutSection;
  };
  services: {
    title: string;
    titleZh: string;
    titleCn: string;
    subtitle: string;
    subtitleZh: string;
    subtitleCn: string;
    description: string;
    descriptionZh: string;
    descriptionCn: string;
    items: Service[];
  };
  contact: {
    title: string;
    titleZh: string;
    titleCn: string;
    subtitle: string;
    subtitleZh: string;
    subtitleCn: string;
    description: string;
    descriptionZh: string;
    descriptionCn: string;
    phone: string;
    phoneZh: string;
    phoneCn: string;
    email: string;
    emailZh: string;
    emailCn: string;
    address: string;
    addressZh: string;
    addressCn: string;
    hours: string;
    hoursZh: string;
    hoursCn: string;
    hoursValue: string;
    hoursValueZh: string;
    hoursValueCn: string;
    cta: string;
    ctaZh: string;
    ctaCn: string;
  };
  footer: {
    copyright: string;
    copyrightZh: string;
    copyrightCn: string;
    tagline: string;
    taglineZh: string;
    taglineCn: string;
  };
}

interface CMSContextType {
  cmsData: CMSData;
  language: Language;
  setLanguage: (lang: Language) => void;
  updateCMSData: (newData: Partial<CMSData>) => void;
  updateSection: (section: keyof CMSData, data: any) => void;
  updateService: (serviceId: string, data: Partial<Service>) => void;
  resetToDefault: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData as CMSData);
  const [language, setLanguage] = useState<Language>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("chrisacc_cms_data");
      const savedLang = localStorage.getItem("chrisacc_language") as Language;
      
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setCmsData({ ...defaultCMSData, ...parsed } as CMSData);
        } catch (e) {
          console.error("Failed to parse CMS data:", e);
        }
      }
      
      if (savedLang) {
        setLanguage(savedLang);
      }
      
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("chrisacc_cms_data", JSON.stringify(cmsData));
      localStorage.setItem("chrisacc_last_updated", new Date().toISOString());
    }
  }, [cmsData, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("chrisacc_language", language);
    }
  }, [language, isLoaded]);

  const updateCMSData = (newData: Partial<CMSData>) => {
    setCmsData((prev) => ({ ...prev, ...newData }));
  };

  const updateSection = (section: keyof CMSData, data: any) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const updateService = (serviceId: string, data: Partial<Service>) => {
    setCmsData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((item) =>
          item.id === serviceId ? { ...item, ...data } : item
        ),
      },
    }));
  };

  const resetToDefault = () => {
    if (typeof window !== "undefined") {
      if (confirm("確定要重置所有內容為預設值嗎？此操作無法撤銷。")) {
        setCmsData(defaultCMSData as CMSData);
        setLanguage("");
        localStorage.removeItem("chrisacc_cms_data");
        localStorage.removeItem("chrisacc_language");
      }
    }
  };

  const exportData = () => {
    return JSON.stringify(cmsData, null, 2);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      setCmsData({ ...defaultCMSData, ...parsed } as CMSData);
      return true;
    } catch (e) {
      console.error("Failed to import CMS data:", e);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        language,
        setLanguage,
        updateCMSData,
        updateSection,
        updateService,
        resetToDefault,
        exportData,
        importData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
