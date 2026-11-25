import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InertLinkProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Link visual que ainda não leva a lugar nenhum (ex.: Política de Privacidade).
 * Quando a página existir, troque por um `<Link href=...>`.
 */
export function InertLink({ children, className }: InertLinkProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline cursor-pointer p-0 text-left underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current",
        className,
      )}
    >
      {children}
    </button>
  );
}
