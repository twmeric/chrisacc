import { CMSData, LocaleCMSData } from "./cms-types";
import cmsJson from "@/src/data/cms.json";
import { defaultCMSData } from "./cms-defaults";

function mergeSimplePage(
  def: LocaleCMSData["purpose"],
  loaded?: Partial<LocaleCMSData["purpose"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    cta: { ...def.cta, ...(loaded?.cta || {}) },
  } as LocaleCMSData["purpose"];
}

export function getCMSData(): CMSData {
  // At build time, cmsJson is the fetched backup.
  // At runtime on client, cmsJson is whatever was built.
  // We deep-merge with defaults so missing fields still work.
  const loaded = ((cmsJson as unknown) as CMSData) || {};

  const merged: CMSData = {
    "zh-hant": {
      ...defaultCMSData["zh-hant"],
      ...(loaded["zh-hant"] || {}),
      purpose: mergeSimplePage(
        defaultCMSData["zh-hant"].purpose,
        (loaded["zh-hant"] || {}).purpose
      ),
      value: mergeSimplePage(
        defaultCMSData["zh-hant"].value,
        (loaded["zh-hant"] || {}).value
      ),
      commitment: mergeSimplePage(
        defaultCMSData["zh-hant"].commitment,
        (loaded["zh-hant"] || {}).commitment
      ),
    } as LocaleCMSData,
    "zh-hans": {
      ...defaultCMSData["zh-hans"],
      ...(loaded["zh-hans"] || {}),
      purpose: mergeSimplePage(
        defaultCMSData["zh-hans"].purpose,
        (loaded["zh-hans"] || {}).purpose
      ),
      value: mergeSimplePage(
        defaultCMSData["zh-hans"].value,
        (loaded["zh-hans"] || {}).value
      ),
      commitment: mergeSimplePage(
        defaultCMSData["zh-hans"].commitment,
        (loaded["zh-hans"] || {}).commitment
      ),
    } as LocaleCMSData,
    en: {
      ...defaultCMSData.en,
      ...(loaded.en || {}),
      purpose: mergeSimplePage(
        defaultCMSData.en.purpose,
        (loaded.en || {}).purpose
      ),
      value: mergeSimplePage(
        defaultCMSData.en.value,
        (loaded.en || {}).value
      ),
      commitment: mergeSimplePage(
        defaultCMSData.en.commitment,
        (loaded.en || {}).commitment
      ),
    } as LocaleCMSData,
  };
  return merged;
}

export function getLocaleCMS(locale: string): LocaleCMSData {
  return getCMSData()[locale as keyof CMSData] || defaultCMSData["zh-hant"];
}
