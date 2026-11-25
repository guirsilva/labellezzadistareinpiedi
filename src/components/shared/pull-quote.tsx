import { cn } from "@/lib/utils";

type PullQuoteProps = {
  text: string;
  /** `panel`: bloco verde-institucional; `line`: filete dourado à esquerda. */
  variant?: "panel" | "line";
  className?: string;
};

/** Frase de destaque em Lora itálico. */
export function PullQuote({
  text,
  variant = "line",
  className,
}: PullQuoteProps) {
  if (variant === "panel") {
    return (
      <blockquote
        className={cn(
          "relative overflow-hidden rounded-3xl bg-forest px-6 py-10 text-cream sm:px-12 sm:py-14",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 left-6 h-1 w-16 bg-gold sm:left-12"
        />
        <p className="font-heading text-2xl leading-snug italic sm:text-4xl">
          {text}
        </p>
      </blockquote>
    );
  }
  return (
    <blockquote
      className={cn("border-l-2 border-gold pl-5 sm:pl-7", className)}
    >
      <p className="font-heading text-2xl leading-snug text-forest italic sm:text-3xl">
        {text}
      </p>
    </blockquote>
  );
}
