"use client";

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { pageKeyFromPathname } from "@/i18n/config";
import { hasPreviousPage } from "@/lib/navigation-history";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  label: string;
  homeHref: string;
  className?: string;
};

/** Seta de voltar (todas as páginas, exceto a Home). */
export function BackButton({ label, homeHref, className }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (pageKeyFromPathname(pathname) === "home") return null;

  const handleClick = () => {
    if (hasPreviousPage()) router.back();
    else router.push(homeHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "group inline-flex size-11 items-center justify-center rounded-full border border-forest/15 bg-card/80 text-forest shadow-sm backdrop-blur transition-all hover:-translate-x-0.5 hover:border-forest/40 hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <ArrowLeftIcon
        aria-hidden="true"
        className="size-5 transition-transform group-hover:-translate-x-0.5"
      />
    </button>
  );
}
