export const i18n = {
  defaultLocale: "zh-hant",
  locales: ["zh-hant", "zh-hans", "en"] as const,
};

export type Locale = (typeof i18n.locales)[number];

export const localeLabels: Record<Locale, string> = {
  "zh-hant": "繁體中文",
  "zh-hans": "简体中文",
  en: "English",
};
