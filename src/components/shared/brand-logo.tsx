import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Logo em um selo arredondado. O PNG atual tem fundo verde sólido; quando
 * houver uma versão transparente, basta trocar o arquivo em /public/images.
 */
export function BrandLogo({ alt, className, priority }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative block size-11 overflow-hidden rounded-xl ring-1 ring-cream/20 lg:size-12",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt={alt}
        fill
        sizes="96px"
        priority={priority}
        className="scale-[1.45] object-cover"
      />
    </span>
  );
}
