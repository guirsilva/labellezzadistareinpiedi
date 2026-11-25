"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, type Locale, pageKeyFromPathname } from "@/i18n/config";
import { markNextNavigationAsReplace } from "@/lib/navigation-history";
import { cn } from "@/lib/utils";

/** Ordem de exibição do script: PT/IT. */
const displayOrder: Locale[] = ["pt", "it"];

type LanguageSwitcherProps = {
  current: Locale;
  groupLabel: string;
  shortLabels: Record<Locale, string>;
  fullNames: Record<Locale, string>;
  className?: string;
};

/** Seletor PT/IT: troca o idioma mantendo a mesma página. */
export function LanguageSwitcher({
  current,
  groupLabel,
  shortLabels,
  fullNames,
  className,
}: LanguageSwitcherProps) {
  const pageKey = pageKeyFromPathname(usePathname()) ?? "home";

  return (
    <nav
      aria-label={groupLabel}
      className={cn(
        "flex items-center rounded-full bg-sage/40 p-0.5 ring-1 ring-sage",
        className,
      )}
    >
      {displayOrder.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={href(locale, pageKey)}
            replace
            scroll={false}
            hrefLang={locale}
            lang={locale}
            aria-label={fullNames[locale]}
            aria-current={active ? "true" : undefined}
            onClick={active ? undefined : markNextNavigationAsReplace}
            className={cn(
              "flex h-8 min-w-9 items-center justify-center rounded-full px-2 font-label text-xs font-bold tracking-wider transition-colors",
              active
                ? "bg-cream text-forest shadow-sm"
                : "text-cream hover:bg-cream/15",
            )}
          >
            {shortLabels[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
