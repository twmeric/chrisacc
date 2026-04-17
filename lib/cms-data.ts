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

function mergeFooter(
  def: LocaleCMSData["footer"],
  loaded?: Partial<LocaleCMSData["footer"]>
) {
  // Helper: use loaded string only if it's non-empty, otherwise fallback to default
  const str = (loadedVal?: string, defVal?: string) =>
    (loadedVal && loadedVal.trim()) ? loadedVal : (defVal || "");

  // If loaded services array is shorter than default, it means old KV data missing new items
  const services =
    (loaded?.services?.length || 0) >= def.services.length
      ? loaded!.services
      : def.services;
  const quickLinks =
    (loaded?.quickLinks?.length || 0) >= def.quickLinks.length
      ? loaded!.quickLinks
      : def.quickLinks;

  return {
    ...def,
    ...(loaded || {}),
    aboutTitle: str(loaded?.aboutTitle, def.aboutTitle),
    aboutDesc: str(loaded?.aboutDesc, def.aboutDesc),
    linksTitle: str(loaded?.linksTitle, def.linksTitle),
    servicesTitle: str(loaded?.servicesTitle, def.servicesTitle),
    contactTitle: str(loaded?.contactTitle, def.contactTitle),
    rights: str(loaded?.rights, def.rights),
    contact: {
      address: str(loaded?.contact?.address, def.contact.address),
      phone: str(loaded?.contact?.phone, def.contact.phone),
      email: str(loaded?.contact?.email, def.contact.email),
    },
    social: {
      ...def.social,
      ...(loaded?.social || {}),
    },
    services,
    quickLinks,
  } as LocaleCMSData["footer"];
}

function mergeHeader(
  def: LocaleCMSData["header"],
  loaded?: Partial<LocaleCMSData["header"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    navItems: loaded?.navItems?.length ? loaded.navItems : def.navItems,
  } as LocaleCMSData["header"];
}

function mergeSite(
  def: LocaleCMSData["site"],
  loaded?: Partial<LocaleCMSData["site"]>
) {
  return {
    ...def,
    ...(loaded || {}),
  } as LocaleCMSData["site"];
}

function mergeContact(
  def: LocaleCMSData["contact"],
  loaded?: Partial<LocaleCMSData["contact"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    cards: loaded?.cards?.length ? loaded.cards : def.cards,
    form: {
      ...def.form,
      ...(loaded?.form || {}),
      hours: loaded?.form?.hours?.length ? loaded.form.hours : def.form.hours,
      servicesList: loaded?.form?.servicesList?.length ? loaded.form.servicesList : def.form.servicesList,
    },
    map: { ...def.map, ...(loaded?.map || {}) },
    faq: {
      ...def.faq,
      ...(loaded?.faq || {}),
      items: loaded?.faq?.items?.length ? loaded.faq.items : def.faq.items,
    },
  } as LocaleCMSData["contact"];
}

function mergeHome(
  def: LocaleCMSData["home"],
  loaded?: Partial<LocaleCMSData["home"]>
) {
  return {
    ...def,
    ...(loaded || {}),
    hero: {
      ...def.hero,
      ...(loaded?.hero || {}),
      slides: loaded?.hero?.slides || def.hero.slides,
      backgrounds: loaded?.hero?.backgrounds || def.hero.backgrounds,
    },
    services: {
      ...def.services,
      ...(loaded?.services || {}),
      cards: loaded?.services?.cards || def.services.cards,
    },
    cta: { ...def.cta, ...(loaded?.cta || {}) },
  } as LocaleCMSData["home"];
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
        extraSections: (l.extraSections && l.extraSections.length > 0) ? l.extraSections : d.extraSections,
      };
    }
  }
  return merged;
}

function mergeAbout(
  def: LocaleCMSData["about"],
  loaded?: Partial<LocaleCMSData["about"]>
) {
  // Use default intro paragraphs if loaded has none or is empty
  const introParagraphs =
    (loaded?.intro?.paragraphs && loaded.intro.paragraphs.length > 0)
      ? loaded.intro.paragraphs
      : def.intro.paragraphs;
  // Use default missionVision items if loaded has none
  const mvItems =
    (loaded?.missionVision?.items && loaded.missionVision.items.length > 0)
      ? loaded.missionVision.items
      : def.missionVision.items;
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
      paragraphs: introParagraphs,
      badge: loaded?.intro?.badge || def.intro.badge,
    },
    missionVision: {
      ...def.missionVision,
      items: mvItems,
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
      site: mergeSite(
        defaultCMSData["zh-hant"].site,
        (loaded["zh-hant"] || {}).site
      ),
      header: mergeHeader(
        defaultCMSData["zh-hant"].header,
        (loaded["zh-hant"] || {}).header
      ),
      footer: mergeFooter(
        defaultCMSData["zh-hant"].footer,
        (loaded["zh-hant"] || {}).footer
      ),
      home: mergeHome(
        defaultCMSData["zh-hant"].home,
        (loaded["zh-hant"] || {}).home
      ),
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
      contact: mergeContact(
        defaultCMSData["zh-hant"].contact,
        (loaded["zh-hant"] || {}).contact
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
      site: mergeSite(
        defaultCMSData["zh-hans"].site,
        (loaded["zh-hans"] || {}).site
      ),
      header: mergeHeader(
        defaultCMSData["zh-hans"].header,
        (loaded["zh-hans"] || {}).header
      ),
      footer: mergeFooter(
        defaultCMSData["zh-hans"].footer,
        (loaded["zh-hans"] || {}).footer
      ),
      home: mergeHome(
        defaultCMSData["zh-hans"].home,
        (loaded["zh-hans"] || {}).home
      ),
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
      contact: mergeContact(
        defaultCMSData["zh-hans"].contact,
        (loaded["zh-hans"] || {}).contact
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
      site: mergeSite(
        defaultCMSData.en.site,
        (loaded.en || {}).site
      ),
      header: mergeHeader(
        defaultCMSData.en.header,
        (loaded.en || {}).header
      ),
      footer: mergeFooter(
        defaultCMSData.en.footer,
        (loaded.en || {}).footer
      ),
      home: mergeHome(
        defaultCMSData.en.home,
        (loaded.en || {}).home
      ),
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
      contact: mergeContact(
        defaultCMSData.en.contact,
        (loaded.en || {}).contact
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
