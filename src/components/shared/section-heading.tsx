import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  id?: string;
  /** Rótulo curto acima do título (League Spartan). */
  eyebrow?: string;
  /** `dark` quando a seção tem fundo verde-institucional. */
  tone?: "light" | "dark";
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
};

const sizes = {
  h1: "text-4xl leading-[1.1] sm:text-5xl lg:text-6xl",
  h2: "text-3xl leading-tight sm:text-4xl lg:text-5xl",
  h3: "text-2xl leading-snug sm:text-3xl",
} as const;

export function SectionHeading({
  title,
  id,
  eyebrow,
  tone = "light",
  level = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  const Heading = level;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "font-label text-sm font-bold tracking-[0.18em] uppercase",
            // dourado só sobre fundo escuro; no claro, azul profundo
            tone === "dark" ? "text-gold" : "text-navy",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-heading font-medium",
          sizes[level],
          tone === "dark" ? "text-cream" : "text-forest",
        )}
      >
        {title}
      </Heading>
    </div>
  );
}
