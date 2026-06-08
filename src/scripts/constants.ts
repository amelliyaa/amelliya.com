import { useTranslations } from "@i18n/utils.ts";

export const getMainNavLinks = (locale: string) => {
  const t = useTranslations(locale);
  return [
    {
      path: "blog/1",
      name: t("navigation.blog archives"),
    },
  ];
};

export const getSitemap = (locale: string) => {
  const t = useTranslations(locale);
  return [
    ...getMainNavLinks(locale),
    {
      path: "about",
      name: t("navigation.about page"),
    },
    {
      path: "privacy",
      name: t("navigation.privacy page"),
    },
  ];
};
