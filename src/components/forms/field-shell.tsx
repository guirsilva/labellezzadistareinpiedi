import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 rounded-xl border-input bg-card px-4 text-base md:text-base shadow-xs placeholder:text-forest/45 focus-visible:border-sage";

type FieldShellProps = {
  id: string;
  label: string;
  /** Ex.: "Opcional" — mostrado ao lado do rótulo. */
  optionalLabel?: string;
  error?: string;
  /** Conteúdo abaixo do campo, à direita (ex.: contador de caracteres). */
  aside?: ReactNode;
  /** Quando o rótulo é de um grupo (radio/checkbox), usar `legend`. */
  asLegend?: boolean;
  className?: string;
  children: ReactNode;
};

export function errorId(id: string) {
  return `${id}-error`;
}

/** Rótulo + campo + mensagem de erro, com ligação acessível entre eles. */
export function FieldShell({
  id,
  label,
  optionalLabel,
  error,
  aside,
  asLegend = false,
  className,
  children,
}: FieldShellProps) {
  const labelContent = (
    <>
      {label}
      {optionalLabel ? (
        <span className="ml-2 font-label text-xs font-semibold tracking-wider text-forest/60 uppercase">
          {optionalLabel}
        </span>
      ) : null}
    </>
  );
  const labelClass = "text-[0.95rem] leading-snug font-medium text-forest";

  const footer =
    error || aside ? (
      <div className="flex items-start justify-between gap-3 text-sm">
        {error ? (
          <p id={errorId(id)} className="font-medium text-destructive">
            {error}
          </p>
        ) : (
          <span />
        )}
        {aside}
      </div>
    ) : null;

  if (asLegend) {
    return (
      <fieldset className={cn("flex flex-col gap-3", className)}>
        <legend className={cn(labelClass, "mb-3")}>{labelContent}</legend>
        {children}
        {footer}
      </fieldset>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelClass}>
        {labelContent}
      </label>
      {children}
      {footer}
    </div>
  );
}
