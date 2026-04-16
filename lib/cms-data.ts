import { CMSData, LocaleCMSData } from "./cms-types";
import cmsJson from "@/src/data/cms.json";
import { defaultCMSData } from "./cms-defaults";

export function getCMSData(): CMSData {
  // At build time, cmsJson is the fetched backup.
  // At runtime on client, cmsJson is whatever was built.
  // We deep-merge with defaults so missing fields still work.
  const loaded = (cmsJson as CMSData) || {};
  const merged: CMSData = {
    "zh-hant": { ...defaultCMSData["zh-hant"], ...(loaded["zh-hant"] || {}) } as LocaleCMSData,
    "zh-hans": { ...defaultCMSData["zh-hans"], ...(loaded["zh-hans"] || {}) } as LocaleCMSData,
    en: { ...defaultCMSData.en, ...(loaded.en || {}) } as LocaleCMSData,
  };
  return merged;
}

export function getLocaleCMS(locale: string): LocaleCMSData {
  return getCMSData()[locale as keyof CMSData] || defaultCMSData["zh-hant"];
}
