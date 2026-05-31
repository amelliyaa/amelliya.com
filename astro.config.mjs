import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const languages = {
  defaultLocale: "en",
  locales: {
    en: "en",
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://amelliya.com",
  adapter: cloudflare({
    experimentalStaticHeaders: true,
  }),
  security: {
    csp: true,
  },
  i18n: {
    defaultLocale: languages.defaultLocale,
    locales: Object.values(languages.locales),
  },
  integrations: [mdx(), sitemap({ i18n: languages })],
  markdown: {
    syntaxHighlight: "prism",
  },
  image: {
    layout: "constrained",
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Philosopher",
      cssVariable: "--typeface-logo",
      options: {
        variants: [
          {
            weight: "700",
            style: "normal",
            src: ["./src/assets/fonts/Philosopher-Bold.woff2"],
            fallback: ["sans-serif"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Merriweather Sans",
      cssVariable: "--typeface-display",
      options: {
        variants: [
          {
            weight: "500 900",
            style: "normal",
            src: ["./src/assets/fonts/MerriweatherSans-VariableFont_wght.woff2"],
            fallback: ["sans-serif"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Merriweather",
      cssVariable: "--typeface-body",
      options: {
        variants: [
          {
            weight: "200 600",
            style: "normal",
            src: ["./src/assets/fonts/Merriweather-VariableFont_opsz,wdth,wght.woff2"],
            fallback: ["serif"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--typeface-workhorse",
      options: {
        variants: [
          {
            weight: "200 600",
            style: "normal",
            src: ["./src/assets/fonts/Inter-VariableFont_opsz,wght.woff2"],
            fallback: ["sans-serif"],
          },
        ],
      },
    },
  ],
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
