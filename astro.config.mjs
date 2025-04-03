import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://amelliya.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "dracula" },
  },
  experimental: {
    svg: true,
  },
});
