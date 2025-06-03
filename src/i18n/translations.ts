import { i18n } from "astro:config/client";
import { parse } from "yaml";
import fs from "fs";
import path from "path";

const getLocaleFileContents = (locale: string | { path: string; codes: [string, ...string[]] }) =>
  parse(fs.readFileSync(path.resolve(import.meta.dirname, `./messages/${locale}.yml`), "utf8"));

export default Object.fromEntries(i18n!.locales.map((locale) => getLocaleFileContents(locale)));
