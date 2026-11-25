import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-cream text-forest",
  sand: "bg-sand text-forest",
  forest: "bg-forest text-cream",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Largura do conteúdo: `prose` para textos longos, `wide` para grades. */
  width?: "prose" | "default" | "wide";
  "aria-labelledby"?: string;
};

const widths = {
  prose: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
} as const;

/** Bloco de página com respiro vertical e container centralizado. */
export function Section({
  children,
  tone = "cream",
  id,
  className,
  containerClassName,
  width = "default",
  "aria-labelledby": labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], "py-16 sm:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6",
          widths[width],
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
