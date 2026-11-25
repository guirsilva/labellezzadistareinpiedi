export const locales = ["it", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const pageKeys = [
  "home",
  "donate",
  "transparency",
  "stories",
  "contact",
  "partners",
  "help",
] as const;
export type PageKey = (typeof pageKeys)[number];
type InnerPageKey = Exclude<PageKey, "home">;

/** Slug público (traduzido) de cada página. A pasta interna em `app/[lang]` usa a chave. */
export const slugs: Record<Locale, Record<InnerPageKey, string>> = {
  it: {
    donate: "dona",
    transparency: "trasparenza",
    stories: "storie",
    contact: "contatti",
    partners: "partner",
    help: "richiedi-aiuto",
  },
  pt: {
    donate: "doe",
    transparency: "transparencia",
    stories: "historias",
    contact: "contato",
    partners: "parceiros",
    help: "preciso-de-ajuda",
  },
};

const innerKeys = pageKeys.filter((key): key is InnerPageKey => key !== "home");

export function href(locale: Locale, key: PageKey, hash?: string): string {
  const path =
    key === "home" ? `/${locale}` : `/${locale}/${slugs[locale][key]}`;
  return hash ? `${path}#${hash}` : path;
}

/** Encontra a página a partir de um segmento (slug de qualquer idioma ou chave interna). */
export function pageKeyFromSegment(segment: string): InnerPageKey | null {
  for (const key of innerKeys) {
    if (segment === key) return key;
    if (locales.some((locale) => slugs[locale][key] === segment)) return key;
  }
  return null;
}

/** Identifica a página atual a partir do pathname do navegador (ex.: `/it/dona`). */
export function pageKeyFromPathname(pathname: string): PageKey | null {
  const [, second] = pathname.split("/").filter(Boolean);
  if (!second) return "home";
  return pageKeyFromSegment(second);
}
