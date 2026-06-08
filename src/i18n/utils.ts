import { i18n } from "astro:config/client";
import translations from "./translations.ts";

const getNestedValue = (obj: any, path: string): string | undefined => {
  if (!obj) return undefined;

  return path.split(".").reduce((acc, part) => {
    return acc && typeof acc === "object" ? acc[part] : undefined;
  }, obj);
};

/**
 * Custom i18n hook supporting both standard and rich text translation plus variable injection.
 * @param locale - The current locale
 */
export const useTranslations = (locale: string) => {
  /**
   * **Overload 1: Standard text and/or variable injection**
   *
   * Fetches the translation and injects values matching `{variableName}`.
   * @example
   * // key: "Text {variable}"
   * t("key", { variable: "value" })
   * // Resolves to "Text value"
   */
  function t(key: string, args?: Record<string, string | number | boolean>): string;

  /**
   * **Overload 2: Rich Text Component Injection**
   *
   * Fetches the translation and maps the rich text tags `<tag>text</tag>` with the passed
   * components.
   *
   * @example
   * // key: "Text <tag>content</tag>"
   * t("key", { tag: (text) => <Component>{text}</Component> })
   * // Resolves to ["Text ", <Component>content</Component>]
   */
  function t(key: string, args: Record<string, any>): any[];

  function t(key: string, args?: Record<string, any>): any {
    let text =
      getNestedValue(translations[locale], key) ??
      getNestedValue(translations[i18n?.defaultLocale || ""], key) ??
      key;

    if (args) {
      text = text.replace(/{(\w+)}/g, (match, keyName) => {
        const value = args[keyName];
        return value !== undefined && typeof value !== "function" ? String(value) : match;
      });
    }

    const richText = args && Object.values(args).some((v) => typeof v === "function");

    if (!richText) return text;

    const regex = /<(\w+)>(.*?)<\/\1>/g;
    const result: any[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, tagName, tagContent] = match;

      if (match.index > lastIndex) {
        result.push(text.substring(lastIndex, match.index));
      }

      result.push(args[tagName]?.(tagContent) ?? fullMatch);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result;
  }

  return t;
};

export const makeI18nStaticPathsGenerator = () => {
  return () =>
    i18n!.locales.map((lang) => {
      const showDefaultLang = i18n!.routing !== "manual" && i18n!.routing.prefixDefaultLocale;
      const slug = !showDefaultLang && lang === i18n!.defaultLocale ? undefined : lang;
      return { params: { locale: slug } };
    });
};
