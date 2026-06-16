import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import {
  remarkReadingTime,
  remarkModifiedTime,
  rehypeAutolinkHeadings,
} from "./markdown-plugins.mjs";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import compressor from "astro-compressor";

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
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  i18n: {
    defaultLocale: languages.defaultLocale,
    locales: Object.values(languages.locales),
  },
  integrations: [expressiveCode(), mdx(), sitemap({ i18n: languages }), compressor()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime, remarkModifiedTime],
      rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    }),
  },
  image: {
    layout: "constrained",
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Source Sans 3",
      cssVariable: "--astro-sans",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/SourceSans3.woff2"],
            fallback: ["Arial"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Laro",
      cssVariable: "--astro-serif",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Laro.woff2"],
            fallback: ["Georgia"],
          },
          {
            src: ["./src/assets/fonts/LaroItalics.woff2"],
            fallback: ["Georgia"],
          },
        ],
      },
    },
  ],
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
