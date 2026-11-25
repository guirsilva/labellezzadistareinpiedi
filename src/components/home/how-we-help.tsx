import { CtaGroup } from "@/components/shared/cta-group";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StepList } from "@/components/shared/step-list";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type HowWeHelpProps = {
  locale: Locale;
  content: Dictionary["home"]["howWeHelp"];
};

export function HowWeHelp({ locale, content }: HowWeHelpProps) {
  const { intro, howItWorks } = content;

  return (
    <Section width="wide" aria-labelledby="como-ajudamos">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <Reveal>
            <SectionHeading id="como-ajudamos" title={content.title} />
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-col gap-5 lg:sticky lg:top-28"
          >
            <h3 className="font-heading text-2xl leading-snug italic sm:text-3xl">
              {intro.title}
            </h3>
            <Prose paragraphs={intro.paragraphs} className="text-forest/85" />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <h3 className="mb-8 font-label text-sm font-bold tracking-[0.18em] text-navy uppercase">
              {howItWorks.title}
            </h3>
          </Reveal>
          <StepList steps={howItWorks.steps} />
          <Reveal className="mt-12">
            <CtaGroup
              ctas={[
                {
                  label: content.ctaStories,
                  href: href(locale, "stories"),
                  variant: "forest",
                },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
