import { i18n } from "astro:config/client";
import translations from "./translations.ts";

export const useTranslations = (locale: string) => {
  return function t(key: string) {
    return translations[locale][key] || translations[i18n!.defaultLocale][key];
  };
};

export const makeI18nStaticPathsGenerator = () => {
  return () =>
    i18n!.locales.map((lang) => {
      const showDefaultLang = i18n!.routing !== "manual" && i18n!.routing.prefixDefaultLocale;
      const slug = !showDefaultLang && lang === i18n!.defaultLocale ? undefined : lang;
      return { params: { locale: slug } };
    });
};
