import { cn } from "@/lib/utils";

type ProseProps = {
  paragraphs: readonly string[];
  className?: string;
  /** `lg` para textos de abertura. */
  size?: "base" | "lg";
};

/** Parágrafos vindos do JSON, com ritmo de leitura confortável. */
export function Prose({ paragraphs, className, size = "base" }: ProseProps) {
  if (paragraphs.length === 0) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-4 text-pretty",
        size === "lg"
          ? "text-lg leading-relaxed sm:text-xl"
          : "text-base leading-relaxed sm:text-[1.0625rem]",
        className,
      )}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
