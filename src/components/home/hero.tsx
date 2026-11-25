import { BrandLogo } from "@/components/shared/brand-logo";
import { CtaGroup } from "@/components/shared/cta-group";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["home"]["hero"];
  logoAlt: string;
};

export function Hero({ locale, hero, logoAlt }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest text-cream">
      {/* formas decorativas muito sutis */}
      <div aria-hidden="true" className="-z-10">
        <div className="absolute -top-32 -right-40 size-[34rem] rounded-full border border-sage/25" />
        <div className="absolute -top-16 -right-24 size-[26rem] rounded-full border border-sage/15" />
        <div className="absolute -bottom-40 -left-24 size-[22rem] rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-12 lg:pt-28 lg:pb-32">
        <div className="animate-reveal lg:col-span-8">
          <span aria-hidden="true" className="mb-8 block h-px w-16 bg-gold" />
          <h1 className="font-heading text-[2.5rem] leading-[1.08] font-medium text-balance sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            {hero.subtitle}
          </p>
          <CtaGroup
            className="mt-10"
            ctas={[
              {
                label: hero.ctaHelpUs,
                href: href(locale, "donate"),
                variant: "gold",
              },
              {
                label: hero.ctaNeedHelp,
                href: href(locale, "help"),
                variant: "outline-cream",
              },
            ]}
          />
        </div>

        <div className="hidden animate-reveal [animation-delay:150ms] lg:col-span-4 lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] border border-gold/60"
            />
            <BrandLogo
              alt={logoAlt}
              className="size-full rounded-[2.5rem] ring-0 lg:size-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
