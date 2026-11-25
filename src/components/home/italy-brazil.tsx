import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Dictionary } from "@/i18n/dictionaries";

type ItalyBrazilProps = {
  content: Dictionary["home"]["italyBrazil"];
};

/** Ponte decorativa entre dois pontos (Itália ↔ Brasil). */
function Bridge() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 120"
      fill="none"
      className="w-full max-w-md text-gold"
    >
      <path
        d="M20 100 C 90 0, 230 0, 300 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <circle cx="20" cy="100" r="9" className="fill-sage" />
      <circle cx="20" cy="100" r="3" className="fill-cream" />
      <circle cx="300" cy="100" r="9" className="fill-sage" />
      <circle cx="300" cy="100" r="3" className="fill-cream" />
    </svg>
  );
}

export function ItalyBrazil({ content }: ItalyBrazilProps) {
  return (
    <Section tone="forest" width="wide" aria-labelledby="italia-brasil">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <SectionHeading
            id="italia-brasil"
            title={content.title}
            tone="dark"
          />
          <p className="font-heading text-2xl leading-snug text-gold italic sm:text-3xl">
            {content.lead}
          </p>
          <Bridge />
        </Reveal>
        <Reveal delay={120}>
          <Prose
            paragraphs={content.paragraphs}
            size="lg"
            className="text-cream/85 [&>p:first-child]:text-cream"
          />
        </Reveal>
      </div>
    </Section>
  );
}
