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

function mergeServices(
  def: LocaleCMSData["services"],
  loaded?: Partial<LocaleCMSData["services"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    whyChoose: {
      ...def.whyChoose,
      ...(loaded?.whyChoose || {}),
      items: loaded?.whyChoose?.items || def.whyChoose.items,
    },
    process: {
      ...def.process,
      ...(loaded?.process || {}),
      steps: loaded?.process?.steps || def.process.steps,
    },
    cta: { ...def.cta, ...(loaded?.cta || {}) },
    serviceDetails: loaded?.serviceDetails || def.serviceDetails,
  } as LocaleCMSData["services"];
}

function mergeServicePages(
  def: LocaleCMSData["servicePages"],
  loaded?: Partial<LocaleCMSData["servicePages"]>
) {
  const merged: LocaleCMSData["servicePages"] = { ...def };
  for (const key of Object.keys(def)) {
    const slug = key as keyof LocaleCMSData["servicePages"];
    const d = def[slug];
    const l = loaded?.[slug];
    if (l) {
      // Migrate old scopeItems (with points) to new format (with features/body/icon)
      const mergedScopeItems = (l.scopeItems || d.scopeItems).map((item: any, idx: number) => {
        const defItem = d.scopeItems[idx] || d.scopeItems[0] || {};
        return {
          title: item.title || '',
          subtitle: item.subtitle || item.desc || '',
          icon: item.icon || defItem.icon || '',
          body: item.body || defItem.body || '',
          features: item.features || item.points || defItem.features || [],
        };
      });

      // Migrate old scenarios (with points) to new format
      const mergedScenarios = (l.scenarios || d.scenarios || []).map((item: any, idx: number) => {
        const defItem = (d.scenarios || [])[idx] || {};
        return {
          title: item.title || '',
          desc: item.desc || '',
          features: item.features || item.points || defItem.features || [],
        };
      });

      const mergedScenarios2 = (l.scenarios2 || d.scenarios2 || []).map((item: any, idx: number) => {
        const defItem = (d.scenarios2 || [])[idx] || {};
        return {
          title: item.title || '',
          desc: item.desc || '',
          features: item.features || item.points || defItem.features || [],
        };
      });

      // Migrate old whyItems (without icon) to new format
      const mergedWhyItems = (l.whyItems || d.whyItems || []).map((item: any, idx: number) => {
        const defItem = (d.whyItems || [])[idx] || {};
        return {
          title: item.title || '',
          desc: item.desc || '',
          icon: item.icon || defItem.icon || '',
        };
      });

      merged[slug] = {
        ...d,
        ...l,
        overview: l.overview || d.overview,
        overviewStat: l.overviewStat ?? d.overviewStat,
        scopeItems: mergedScopeItems,
        processSteps: l.processSteps || d.processSteps,
        whyItems: mergedWhyItems,
        scenarios: mergedScenarios,
        scenarios2: mergedScenarios2,
        relatedItems: l.relatedItems || d.relatedItems,
      };
    }
  }
  return merged;
}

function mergeAbout(
  def: LocaleCMSData["about"],
  loaded?: Partial<LocaleCMSData["about"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    whyChoose: {
      ...def.whyChoose,
      ...(loaded?.whyChoose || {}),
      items: loaded?.whyChoose?.items || def.whyChoose.items,
      features: loaded?.whyChoose?.features || def.whyChoose.features,
      paragraphs: loaded?.whyChoose?.paragraphs || def.whyChoose.paragraphs,
    },
    intro: {
      ...def.intro,
      ...(loaded?.intro || {}),
      badge: loaded?.intro?.badge || def.intro.badge,
    },
    missionVision: {
      ...def.missionVision,
      items: loaded?.missionVision?.items || def.missionVision.items,
    },
    pillars: loaded?.pillars || def.pillars,
    coreValues: {
      ...def.coreValues,
      ...(loaded?.coreValues || {}),
      items: loaded?.coreValues?.items || def.coreValues.items,
    },
    team: {
      ...def.team,
      ...(loaded?.team || {}),
      members: loaded?.team?.members || def.team.members,
    },
    timeline: {
      ...def.timeline,
      ...(loaded?.timeline || {}),
      events: loaded?.timeline?.events || def.timeline.events,
    },
    cta: { ...def.cta, ...(loaded?.cta || {}) },
  } as LocaleCMSData["about"];
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
      about: mergeAbout(
        defaultCMSData["zh-hant"].about,
        (loaded["zh-hant"] || {}).about
      ),
      services: mergeServices(
        defaultCMSData["zh-hant"].services,
        (loaded["zh-hant"] || {}).services
      ),
      servicePages: mergeServicePages(
        defaultCMSData["zh-hant"].servicePages,
        (loaded["zh-hant"] || {}).servicePages
      ),
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
      about: mergeAbout(
        defaultCMSData["zh-hans"].about,
        (loaded["zh-hans"] || {}).about
      ),
      services: mergeServices(
        defaultCMSData["zh-hans"].services,
        (loaded["zh-hans"] || {}).services
      ),
      servicePages: mergeServicePages(
        defaultCMSData["zh-hans"].servicePages,
        (loaded["zh-hans"] || {}).servicePages
      ),
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
      about: mergeAbout(
        defaultCMSData.en.about,
        (loaded.en || {}).about
      ),
      services: mergeServices(
        defaultCMSData.en.services,
        (loaded.en || {}).services
      ),
      servicePages: mergeServicePages(
        defaultCMSData.en.servicePages,
        (loaded.en || {}).servicePages
      ),
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
