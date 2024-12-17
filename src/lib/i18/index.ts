import { en } from "./locales/en";
import { mn } from "./locales/mn";

export type Language = "en" | "mn";
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  mn
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let translation: any = translations[lang];

  for (const k of keys) {
    if (!translation[k]) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
      return key;
    }
    translation = translation[k];
  }

  return translation;
}

export function formatTranslation(
  translation: string,
  params?: Record<string, string | number>
): string {
  if (!params) return translation;

  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`{{${key}}}`, String(value)),
    translation
  );
}
