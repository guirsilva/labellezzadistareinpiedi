import { cn } from "@/lib/utils";

type BulletListProps = {
  items: readonly string[];
  /** `dark` quando sobre fundo verde-institucional. */
  tone?: "light" | "dark";
  className?: string;
};

/** Lista com marcadores discretos (losango dourado sobre escuro, verde sobre claro). */
export function BulletList({
  items,
  tone = "light",
  className,
}: BulletListProps) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-[0.6em] size-1.5 shrink-0 rotate-45",
              tone === "dark" ? "bg-gold" : "bg-sage",
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
