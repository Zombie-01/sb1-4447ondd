import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { formatTranslation, getTranslation, Language } from "../lib/i18";

export function useTranslation() {
  const [language, setLanguage] = useLocalStorage<Language>("language", "en");

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const translation = getTranslation(language, key);
      return params ? formatTranslation(translation, params) : translation;
    },
    [language]
  );

  return {
    t,
    language,
    setLanguage
  };
}
