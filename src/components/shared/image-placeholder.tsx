import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Texto alternativo da futura foto. */
  label: string;
  /** Proporção CSS, ex.: "4 / 5", "3 / 4", "16 / 9". */
  ratio?: string;
  className?: string;
};

/** Espaço reservado cinza enquanto a foto real não chega. Nunca usar banco de imagens. */
export function ImagePlaceholder({
  label,
  ratio = "4 / 5",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-3xl bg-placeholder",
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-10 text-forest/25" />
    </div>
  );
}
