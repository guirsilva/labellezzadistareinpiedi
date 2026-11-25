import { CtaGroup } from "@/components/shared/cta-group";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { href } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "stories");
}

export default async function StoriesPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { stories, ui } = getDictionary(locale);
  const { hero, follow } = stories;

  return (
    <>
      <Section width="prose" className="pt-24 sm:pt-28">
        <div className="flex animate-reveal flex-col gap-6">
          <SectionHeading level="h1" title={hero.title} />
          <Prose
            paragraphs={hero.paragraphs}
            size="lg"
            className="text-forest/85"
          />
          <p className="font-heading text-2xl text-forest italic sm:text-3xl">
            {hero.closing}
          </p>
        </div>
      </Section>

      <Section tone="sand" width="wide" aria-labelledby="jornadas">
        <Reveal>
          <SectionHeading id="jornadas" title={stories.listTitle} />
        </Reveal>

        <ul className="mt-12 flex flex-col gap-16 sm:mt-16 sm:gap-24">
          {stories.people.map((person, index) => {
            const reversed = index % 2 === 1;
            return (
              <li key={person.name}>
                <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
                  <Reveal
                    className={cn(
                      "md:col-span-5",
                      reversed && "md:order-2 md:col-start-8",
                    )}
                  >
                    <ImagePlaceholder
                      label={format(ui.photoOf, { name: person.name })}
                      ratio="4 / 5"
                      className="mx-auto max-w-sm md:max-w-none"
                    />
                  </Reveal>
                  <Reveal
                    delay={120}
                    className={cn(
                      "flex flex-col gap-5 md:col-span-7",
                      reversed && "md:order-1 md:col-span-6 md:col-start-1",
                    )}
                  >
                    <span aria-hidden="true" className="h-px w-12 bg-gold" />
                    <h3 className="font-heading text-3xl text-forest sm:text-4xl">
                      {person.name}
                    </h3>
                    <Prose
                      paragraphs={person.paragraphs}
                      className="text-forest/85"
                    />
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="forest" width="prose" aria-labelledby="fazer-parte">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            id="fazer-parte"
            title={follow.title}
            tone="dark"
            align="center"
          />
          <Prose
            paragraphs={follow.paragraphs}
            size="lg"
            className="text-cream/85"
          />
          <CtaGroup
            align="center"
            className="mt-2 w-full sm:w-auto"
            ctas={[
              {
                label: follow.ctaHelpUs,
                href: href(locale, "donate"),
                variant: "gold",
              },
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
