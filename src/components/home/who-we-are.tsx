import type { ReactNode } from "react";
import { BulletList } from "@/components/shared/bullet-list";
import { CtaGroup } from "@/components/shared/cta-group";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Prose } from "@/components/shared/prose";
import { PullQuote } from "@/components/shared/pull-quote";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/lib/format";

type WhoWeAreProps = {
  locale: Locale;
  content: Dictionary["home"]["whoWeAre"];
  photoOf: string;
};

/** Bloco editorial: título à esquerda (fixo no desktop), texto à direita. */
function Chapter({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
      <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <h3 className="font-heading text-2xl leading-snug sm:text-3xl">
          {title}
        </h3>
      </Reveal>
      <Reveal
        delay={100}
        className="flex flex-col gap-6 text-forest/85 lg:col-span-8"
      >
        {children}
      </Reveal>
    </div>
  );
}

export function WhoWeAre({ locale, content, photoOf }: WhoWeAreProps) {
  const { story, purpose, moreThan, network, founder, beauty } = content;

  return (
    <>
      <Section width="wide" aria-labelledby="quem-somos">
        <Reveal>
          <SectionHeading id="quem-somos" title={content.title} />
        </Reveal>

        <div className="mt-12 flex flex-col gap-14 lg:mt-16 lg:gap-20">
          <Chapter title={story.title}>
            <Prose paragraphs={story.paragraphs} size="lg" />
            <PullQuote text={story.question} />
          </Chapter>

          <Chapter title={purpose.title}>
            <Prose paragraphs={purpose.paragraphs} size="lg" />
            <p className="font-heading text-2xl leading-snug text-forest">
              {purpose.closing}
            </p>
          </Chapter>

          <Chapter title={moreThan.title}>
            <p className="text-lg leading-relaxed">{moreThan.intro}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {moreThan.meanings.map((meaning, index) => (
                <li key={meaning}>
                  <Reveal
                    delay={index * 90}
                    className="h-full rounded-2xl border border-border bg-card p-5 font-heading text-lg leading-snug text-forest transition-colors hover:border-sage/60"
                  >
                    {meaning}
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="text-lg leading-relaxed">{moreThan.text}</p>
          </Chapter>

          <Reveal>
            <PullQuote text={moreThan.quote} variant="panel" />
          </Reveal>

          <Chapter title={network.title}>
            <Prose paragraphs={network.paragraphs} size="lg" />
            <p className="font-label text-sm font-bold tracking-[0.16em] text-navy uppercase">
              {network.rolesIntro}
            </p>
            <BulletList
              items={network.roles}
              className="gap-4 text-lg leading-relaxed"
            />
          </Chapter>

          {/* Fundadora: foto ao lado do texto */}
          <div className="grid items-center gap-10 border-t border-border pt-10 md:grid-cols-12 lg:gap-16 lg:pt-14">
            <Reveal className="md:col-span-5">
              <ImagePlaceholder
                label={format(photoOf, { name: founder.photoName })}
                ratio="4 / 5"
                className="mx-auto max-w-sm md:max-w-none"
              />
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-5 md:col-span-7">
              <h3 className="font-label text-sm font-bold tracking-[0.16em] text-navy uppercase">
                {founder.title}
              </h3>
              <div>
                <p className="font-heading text-3xl leading-tight sm:text-4xl">
                  {founder.name}
                </p>
                <p className="mt-2 font-label text-base font-semibold tracking-wide text-forest/80">
                  {founder.role}
                </p>
              </div>
              <span aria-hidden="true" className="h-px w-12 bg-gold" />
              <Prose
                paragraphs={founder.paragraphs}
                size="lg"
                className="text-forest/85"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="sand" width="prose" aria-labelledby="beleza-seguir">
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            id="beleza-seguir"
            level="h3"
            title={beauty.title}
            align="center"
            className="[&_h3]:text-3xl sm:[&_h3]:text-5xl"
          />
          <Prose
            paragraphs={beauty.paragraphs}
            size="lg"
            className="mt-8 text-forest/85"
          />
        </Reveal>
        <ul className="mt-10 flex flex-col items-center gap-3 text-center">
          {beauty.list.map((item, index) => (
            <li key={item}>
              <Reveal
                delay={index * 120}
                className="font-heading text-3xl leading-tight text-forest italic sm:text-4xl"
              >
                {item}
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col items-center gap-10 text-center">
          <p className="max-w-xl text-lg leading-relaxed text-forest/85 sm:text-xl">
            {beauty.closing}
          </p>
          <CtaGroup
            align="center"
            className="w-full sm:w-auto"
            ctas={[
              {
                label: beauty.ctaHelpUs,
                href: href(locale, "donate"),
                variant: "gold",
              },
              {
                label: beauty.ctaStories,
                href: href(locale, "stories"),
                variant: "outline-forest",
              },
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
