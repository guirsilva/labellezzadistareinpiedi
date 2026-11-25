import { BadgeCheckIcon } from "lucide-react";
import { BulletList } from "@/components/shared/bullet-list";
import { CtaGroup } from "@/components/shared/cta-group";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StepList } from "@/components/shared/step-list";
import { href } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "transparency");
}

export default async function TransparencyPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { transparency } = getDictionary(locale);
  const { hero, official, resources, where, journey, follow, tax, questions } =
    transparency;

  return (
    <>
      {/* Abertura + dados oficiais */}
      <Section width="wide" className="pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex animate-reveal flex-col gap-6 lg:col-span-7">
            <SectionHeading level="h1" title={hero.title} />
            <Prose
              paragraphs={hero.paragraphs}
              size="lg"
              className="text-forest/85"
            />
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <section
              aria-labelledby="oficial"
              className="relative overflow-hidden rounded-3xl bg-forest p-6 text-cream sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 h-1 w-14 bg-gold sm:left-8"
              />
              <h2
                id="oficial"
                className="flex items-center gap-2 font-label text-sm font-bold tracking-[0.16em] text-gold uppercase"
              >
                <BadgeCheckIcon aria-hidden="true" className="size-5" />
                {official.title}
              </h2>
              <p className="mt-5 font-heading text-2xl leading-snug">
                {official.name}
              </p>
              <p className="mt-3 leading-relaxed text-cream/85">
                {official.description}
              </p>
              <dl className="mt-6 flex flex-col divide-y divide-cream/15 border-t border-cream/15">
                {official.items.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 py-3.5">
                    <dt className="font-label text-xs font-semibold tracking-[0.14em] text-cream/70 uppercase">
                      {item.label}
                    </dt>
                    <dd className="font-label text-lg font-semibold tracking-wide">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>
        </div>
      </Section>

      {/* Recursos + clínicas */}
      <Section tone="sand" width="wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading
              title={resources.title}
              className="[&_h2]:text-3xl sm:[&_h2]:text-4xl lg:[&_h2]:text-4xl"
            />
            <Prose
              paragraphs={resources.paragraphs}
              className="text-forest/85"
            />
            <BulletList
              items={resources.list}
              className="rounded-2xl bg-card p-5 font-heading text-lg text-forest sm:p-6"
            />
            <Prose paragraphs={resources.after} className="text-forest/85" />
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <SectionHeading
              title={where.title}
              className="[&_h2]:text-3xl sm:[&_h2]:text-4xl lg:[&_h2]:text-4xl"
            />
            <p className="leading-relaxed text-forest/85">{where.intro}</p>
            <p className="rounded-2xl border border-sage/40 bg-card px-5 py-6 text-center font-heading text-2xl text-forest sm:text-3xl">
              {where.clinics}
            </p>
            <Prose paragraphs={where.paragraphs} className="text-forest/85" />
          </Reveal>
        </div>
      </Section>

      {/* Da doação à jornada */}
      <Section tone="forest" width="default" aria-labelledby="jornada">
        <Reveal>
          <SectionHeading id="jornada" title={journey.title} tone="dark" />
        </Reveal>
        <StepList
          steps={journey.steps}
          tone="dark"
          headingLevel="h3"
          className="mt-12 max-w-3xl"
        />
      </Section>

      {/* Acompanhar */}
      <Section width="default" aria-labelledby="acompanhar">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-6">
            <SectionHeading id="acompanhar" title={follow.title} />
            <Prose
              paragraphs={follow.paragraphs}
              size="lg"
              className="text-forest/85"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6 lg:col-span-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <p className="font-label text-sm font-bold tracking-[0.16em] text-navy uppercase">
                {follow.listIntro}
              </p>
              <ol className="mt-5 flex flex-col gap-3">
                {follow.list.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 font-heading text-xl text-forest"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage/15 font-label text-sm font-bold"
                    >
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <p className="leading-relaxed text-forest/85 italic">
              {follow.closing}
            </p>
            <CtaGroup
              ctas={[
                {
                  label: follow.ctaStories,
                  href: href(locale, "stories"),
                  variant: "forest",
                },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* Benefício fiscal + dúvidas */}
      <Section tone="sand" width="prose" aria-labelledby="beneficio">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading id="beneficio" title={tax.title} />
          <Prose paragraphs={tax.paragraphs} className="text-forest/85" />
          <CtaGroup
            ctas={[
              {
                label: tax.ctaDonate,
                href: href(locale, "donate"),
                variant: "gold",
              },
            ]}
          />
        </Reveal>

        <hr className="my-14 border-forest/15 sm:my-16" />

        <Reveal className="flex flex-col gap-5">
          <h2 className="font-heading text-2xl text-forest sm:text-3xl">
            {questions.title}
          </h2>
          <p className="leading-relaxed text-forest/85">{questions.text}</p>
          <CtaGroup
            ctas={[
              {
                label: questions.ctaContact,
                href: href(locale, "contact"),
                variant: "outline-forest",
              },
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
