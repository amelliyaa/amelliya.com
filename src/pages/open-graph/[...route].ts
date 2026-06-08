import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { i18n } from "astro:config/client";
import { useTranslations } from "@i18n/utils.ts";

const allPosts = await getCollection("posts");
const blogPosts = Object.fromEntries(
  allPosts.map((post) => [
    `post-${post.data.locale}-${post.data.translationId}`,
    { title: post.data.title, description: post.data.description },
  ]),
);

const staticPages: Record<string, any> = {};
i18n!.locales.forEach((locale) => {
  const t = useTranslations(locale as string);

  ["index", "about", "privacy", "blog"].forEach((page) => {
    staticPages[`${page}-${locale}`] = {
      title: t(`${page}.meta.title`),
      description: t(`${page}.meta.description`),
    };
  });
});

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",

  pages: {
    ...staticPages,
    ...blogPosts,
  },

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./src/assets/images/amelliya.png",
    },
    padding: 80,

    bgGradient: [
      [36, 29, 48],
      [61, 47, 79],
    ],

    border: {
      color: [207, 163, 239],
      width: 16,
    },

    font: {
      title: {
        color: [248, 232, 220],
        size: 72,
        weight: "Bold",
        lineHeight: 1.05,
        families: ["Merriweather Sans", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR"],
      },
      description: {
        color: [228, 228, 228],
        size: 34,
        weight: "Normal",
        lineHeight: 1.35,
        families: ["Inter", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR"],
      },
    },

    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/merriweather-sans:vf@latest/latin-wght-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc:vf@latest/latin-wght-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp:vf@latest/latin-wght-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr:vf@latest/latin-wght-normal.woff2",
    ],
  }),
});
