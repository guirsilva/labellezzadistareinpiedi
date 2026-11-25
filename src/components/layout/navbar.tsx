import Link from "next/link";
import { Suspense } from "react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { buildNavItems } from "./nav-items";
import { NavLinks } from "./nav-links";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Navbar fixa no topo, fundo #0E4B34.
 * Desktop: links + Doe + Preciso de ajuda + PT/IT.
 * Mobile: logo + Doe + PT/IT (sempre visíveis) + hambúrguer.
 */
export function Navbar({ locale, dict }: NavbarProps) {
  const { nav, ui } = dict;
  const { regular, donate, help } = buildNavItems(locale, nav);

  const switcher = (
    <LanguageSwitcher
      current={locale}
      groupLabel={ui.language}
      shortLabels={nav.languages}
      fullNames={ui.languageNames}
    />
  );

  return (
    <header className="sticky top-0 z-40 bg-forest text-cream shadow-[0_1px_0_rgb(248_243_227/0.08)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:px-6 lg:h-20">
        <Link
          href={href(locale, "home")}
          className="shrink-0 rounded-xl transition-opacity hover:opacity-90"
        >
          <BrandLogo alt={ui.logoAlt} priority />
        </Link>

        <nav aria-label={ui.mainNav} className="ml-auto hidden lg:block">
          <Suspense fallback={null}>
            <NavLinks items={regular} />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Button asChild variant="gold" size="cta-sm">
            <Link href={donate.href}>{donate.label}</Link>
          </Button>
          <Button
            asChild
            variant="gold"
            size="cta-sm"
            className="hidden lg:inline-flex"
          >
            <Link href={help.href}>{help.label}</Link>
          </Button>
          <Suspense fallback={null}>{switcher}</Suspense>
          <Suspense fallback={null}>
            <MobileMenu
              items={regular}
              highlighted={[donate, help]}
              labels={{
                open: ui.openMenu,
                close: ui.closeMenu,
                title: ui.mainNav,
              }}
              className="lg:hidden"
            />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
