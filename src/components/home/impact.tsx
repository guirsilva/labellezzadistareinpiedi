import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Dictionary } from "@/i18n/dictionaries";

type ImpactProps = {
  content: Dictionary["home"]["impact"];
};

export function Impact({ content }: ImpactProps) {
  return (
    <Section tone="forest" width="wide" aria-labelledby="impacto">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:col-span-6">
          <SectionHeading id="impacto" title={content.title} tone="dark" />
          <p className="font-heading text-2xl leading-snug text-cream italic sm:text-3xl">
            {content.lead}
          </p>
        </Reveal>
        <Reveal delay={100} className="flex items-end lg:col-span-6">
          <p className="text-lg leading-relaxed text-cream/85">
            {content.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item, index) => (
          <li key={item}>
            <Reveal
              delay={index * 110}
              className="group flex h-full flex-col justify-between gap-8 rounded-3xl border border-cream/15 bg-cream/[0.04] p-6 transition-colors duration-300 hover:border-gold/60 hover:bg-cream/[0.07]"
            >
              <span
                aria-hidden="true"
                className="font-label text-sm font-bold tracking-[0.2em] text-gold"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading text-xl leading-snug text-cream">
                {item}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 max-w-3xl">
        <p className="text-lg leading-relaxed text-cream/85">
          {content.closing}
        </p>
      </Reveal>
    </Section>
  );
}
