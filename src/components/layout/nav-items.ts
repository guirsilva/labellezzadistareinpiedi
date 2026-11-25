import { href, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type NavItem = {
  key: PageKey;
  label: string;
  href: string;
};

const regularKeys = [
  "home",
  "transparency",
  "stories",
  "contact",
  "partners",
] as const satisfies readonly PageKey[];

/** Links normais da navbar e os dois botões em destaque (Doe, Preciso de ajuda). */
export function buildNavItems(locale: Locale, nav: Dictionary["nav"]) {
  const regular: NavItem[] = regularKeys.map((key) => ({
    key,
    label: nav[key],
    href: href(locale, key),
  }));
  const donate: NavItem = {
    key: "donate",
    label: nav.donate,
    href: href(locale, "donate"),
  };
  const help: NavItem = {
    key: "help",
    label: nav.help,
    href: href(locale, "help"),
  };
  return { regular, donate, help };
}
