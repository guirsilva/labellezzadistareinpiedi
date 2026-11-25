import {
  HeartPulseIcon,
  type LucideIcon,
  RouteIcon,
  SettingsIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Dictionary } from "@/i18n/dictionaries";

type WhatWeDoProps = {
  content: Dictionary["home"]["whatWeDo"];
};

/** Ícones decorativos, na mesma ordem dos pilares do script. */
const pillarIcons: LucideIcon[] = [SettingsIcon, HeartPulseIcon, RouteIcon];

export function WhatWeDo({ content }: WhatWeDoProps) {
  return (
    <Section width="wide" aria-labelledby="o-que-fazemos">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="o-que-fazemos" title={content.title} />
        </Reveal>
        <Reveal delay={100} className="flex flex-col gap-5 lg:col-span-7">
          <p className="font-heading text-2xl leading-snug italic sm:text-3xl">
            {content.lead}
          </p>
          <p className="text-lg leading-relaxed text-forest/85">
            {content.text}
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
        {content.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? SettingsIcon;
          return (
            <li key={pillar.title}>
              <Reveal delay={index * 120} className="h-full">
                <article className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage/60 hover:shadow-lg hover:shadow-forest/5 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-sage/15 text-forest transition-colors group-hover:bg-sage group-hover:text-cream">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-label text-4xl font-bold text-sage/70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl">{pillar.title}</h3>
                  <p className="leading-relaxed text-forest/85">
                    {pillar.text}
                  </p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
