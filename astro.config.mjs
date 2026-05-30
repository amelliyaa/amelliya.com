import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const languages = {
  defaultLocale: "en",
  locales: ["en"],
};

// https://astro.build/config
export default defineConfig({
  site: "https://amelliya.com",
  i18n: {
    ...languages,
  },
  integrations: [mdx(), sitemap({ i18n: languages })],
  markdown: {
    shikiConfig: { theme: "dracula" },
  },
  image: {
    experimentalLayout: "constrained",
  },
  experimental: {
    responsiveImages: true,
  },
});
