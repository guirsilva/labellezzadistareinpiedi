import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CtaVariant = "gold" | "forest" | "outline-forest" | "outline-cream";

export type Cta = {
  label: string;
  href: string;
  variant: CtaVariant;
};

type CtaGroupProps = {
  ctas: Cta[];
  align?: "left" | "center";
  className?: string;
};

/** Um ou mais botões-link; empilhados no celular, lado a lado a partir de `sm`. */
export function CtaGroup({ ctas, align = "left", className }: CtaGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
        align === "center" && "sm:justify-center",
        className,
      )}
    >
      {ctas.map((cta) => (
        <Button
          key={cta.href + cta.label}
          asChild
          variant={cta.variant}
          size="cta"
          className="w-full sm:w-auto"
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      ))}
    </div>
  );
}
