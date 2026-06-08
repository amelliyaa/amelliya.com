import { i18n } from "astro:config/client";
import { parse } from "yaml";

const rawMessages = import.meta.glob("./messages/*.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const getLocaleFileContents = (locale: string | { path: string; codes: [string, ...string[]] }) => {
  const localeCode = typeof locale === "string" ? locale : locale.path;
  const fileKey = `./messages/${localeCode}.yml`;

  const rawText = rawMessages[fileKey];
  if (!rawText) {
    throw new Error(`Could not find translation file: ${fileKey}`);
  }

  return parse(rawText);
};

export default Object.fromEntries(
  i18n!.locales.map((locale) => [locale, getLocaleFileContents(locale)]),
);
