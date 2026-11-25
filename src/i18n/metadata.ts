import type { Metadata } from "next";
import { href, locales, type PageKey } from "./config";
import { getDictionary, resolveLocale } from "./dictionaries";

export type LangParams = { params: Promise<{ lang: string }> };

/** Título da aba = nome da página na navbar (o layout acrescenta o nome da Fundação). */
export async function buildPageMetadata(
  params: LangParams["params"],
  key: PageKey,
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return {
    title: key === "home" ? { absolute: dict.meta.siteName } : dict.nav[key],
    alternates: {
      canonical: href(locale, key),
      languages: Object.fromEntries(
        locales.map((other) => [other, href(other, key)]),
      ),
    },
  };
}
