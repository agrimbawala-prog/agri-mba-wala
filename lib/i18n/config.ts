export const locales = ["en", "mr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  mr: "मराठी",
};

export function hasLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
