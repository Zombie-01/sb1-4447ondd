import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Language } from "../../lib/i18";

const languages: Record<Language, string> = {
  en: "English",
  mn: "Монгол"
};

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
