import { CtaGroup } from "@/components/shared/cta-group";
import { Reveal } from "@/components/shared/reveal";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type FinalCtaProps = {
  locale: Locale;
  content: Dictionary["home"]["finalCta"];
};

export function FinalCta({ locale, content }: FinalCtaProps) {
  return (
    <section
      aria-labelledby="cta-final"
      className="relative isolate overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div aria-hidden="true" className="-z-10">
        <div className="absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/25" />
        <div className="absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
      </div>
      <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <h2
          id="cta-final"
          className="font-heading text-3xl leading-tight font-medium text-forest sm:text-5xl"
        >
          {content.title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-forest/85">
          {content.text}
        </p>
        <CtaGroup
          align="center"
          className="w-full sm:w-auto"
          ctas={[
            {
              label: content.ctaHelpUs,
              href: href(locale, "donate"),
              variant: "gold",
            },
            {
              label: content.ctaStories,
              href: href(locale, "stories"),
              variant: "outline-forest",
            },
          ]}
        />
      </Reveal>
    </section>
  );
}
