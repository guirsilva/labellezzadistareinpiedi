import type { ComponentProps } from "react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";
import { errorId, FieldShell, inputClass } from "./field-shell";

type TextAreaFieldProps = {
  name: string;
  label: string;
  error?: string;
  optionalLabel?: string;
  idPrefix?: string;
  className?: string;
  /** Com `maxLength` + `counterTemplate` ("{count}/{max} caracteres"), mostra um contador. */
  counterTemplate?: string;
  /** Valor atual (para o contador). */
  value?: string;
} & Omit<ComponentProps<"textarea">, "name" | "id" | "className" | "value">;

export function TextAreaField({
  name,
  label,
  error,
  optionalLabel,
  idPrefix = "f",
  className,
  counterTemplate,
  value,
  maxLength,
  ...textareaProps
}: TextAreaFieldProps) {
  const id = `${idPrefix}-${name}`;
  const counterId = `${id}-counter`;
  const showCounter = counterTemplate !== undefined && maxLength !== undefined;
  const count = value?.length ?? 0;

  const describedBy =
    [error ? errorId(id) : null, showCounter ? counterId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      optionalLabel={optionalLabel}
      className={className}
      aside={
        showCounter ? (
          <p
            id={counterId}
            className={cn(
              "shrink-0 font-label text-xs font-semibold tracking-wide tabular-nums",
              count >= maxLength ? "text-destructive" : "text-forest/60",
            )}
          >
            {format(counterTemplate, { count, max: maxLength })}
          </p>
        ) : undefined
      }
    >
      <Textarea
        id={id}
        name={name}
        data-field={name}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={optionalLabel ? undefined : true}
        className={cn(inputClass, "h-auto min-h-32 py-3 leading-relaxed")}
        {...textareaProps}
      />
    </FieldShell>
  );
}
