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

const sansFallbackStack = [
  "Merriweather Sans",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Yu Gothic",
  "Meiryo",
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "Apple SD Gothic Neo",
  "Malgun Gothic",
  "sans-serif",
];

const serifFallbackStack = [
  "Georgia",
  "Times New Roman",
  "Hiragino Mincho ProN",
  "Yu Mincho",
  "MS PMincho",
  "Songti SC",
  "STSong",
  "SimSun",
  "AppleMyungjo",
  "Batang",
  "serif",
];

// https://astro.build/config
export default defineConfig({
  site: "https://amelliya.com",
  adapter: cloudflare({
    experimentalStaticHeaders: true,
    imageService: "compile",
  }),
  i18n: {
    defaultLocale: languages.defaultLocale,
    locales: Object.values(languages.locales),
  },
  integrations: [mdx(), sitemap({ i18n: languages })],
  markdown: {
    shikiConfig: { theme: "dracula" },
  },
  image: {
    layout: "constrained",
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Merriweather Sans",
      cssVariable: "--typeface-display",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/MerriweatherSans.woff2"],
            fallback: sansFallbackStack,
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
            src: ["./src/assets/fonts/Merriweather-Light.woff2"],
            fallback: serifFallbackStack,
          },
          {
            src: ["./src/assets/fonts/Merriweather-LightItalic.woff2"],
            fallback: serifFallbackStack,
          },
          {
            src: ["./src/assets/fonts/Merriweather-SemiBold.woff2"],
            fallback: serifFallbackStack,
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
            src: ["./src/assets/fonts/Inter.woff2"],
            fallback: sansFallbackStack,
          },
        ],
      },
    },
  ],
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
