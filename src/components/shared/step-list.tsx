import { cn } from "@/lib/utils";
import { BulletList } from "./bullet-list";
import { Prose } from "./prose";
import { Reveal } from "./reveal";

export type Step = {
  title: string;
  /** Texto curto (uma frase). */
  text?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Parágrafos depois dos marcadores. */
  after?: readonly string[];
};

type StepListProps = {
  steps: readonly Step[];
  tone?: "light" | "dark";
  /** Nível do título de cada etapa, para manter a hierarquia da página. */
  headingLevel?: "h3" | "h4";
  className?: string;
};

/** Linha do tempo numerada (Como funciona, Como uma doação se transforma em jornada…). */
export function StepList({
  steps,
  tone = "light",
  headingLevel = "h4",
  className,
}: StepListProps) {
  const dark = tone === "dark";
  const Heading = headingLevel;
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-5 sm:gap-7">
            {/* trilho */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full font-label text-lg font-bold sm:size-12",
                  dark ? "bg-gold text-forest" : "bg-forest text-cream",
                )}
              >
                {index + 1}
              </span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-px flex-1",
                    dark ? "bg-cream/20" : "bg-sage/50",
                  )}
                />
              ) : null}
            </div>

            <Reveal
              className={cn(
                "min-w-0 flex-1",
                isLast ? "pb-0" : "pb-10 sm:pb-12",
              )}
            >
              <Heading
                className={cn(
                  "pt-1.5 font-heading text-xl leading-snug sm:pt-2 sm:text-2xl",
                  dark ? "text-cream" : "text-forest",
                )}
              >
                {step.title}
              </Heading>
              <div
                className={cn(
                  "mt-3 flex flex-col gap-4",
                  dark ? "text-cream/85" : "text-forest/85",
                )}
              >
                {step.text ? (
                  <p className="leading-relaxed">{step.text}</p>
                ) : null}
                {step.paragraphs ? (
                  <Prose paragraphs={step.paragraphs} />
                ) : null}
                {step.bullets ? (
                  <BulletList items={step.bullets} tone={tone} />
                ) : null}
                {step.after ? <Prose paragraphs={step.after} /> : null}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
