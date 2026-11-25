import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorId, FieldShell, inputClass } from "./field-shell";

type TextFieldProps = {
  name: string;
  label: string;
  error?: string;
  optionalLabel?: string;
  /** Prefixo para gerar ids únicos quando há mais de um formulário na página. */
  idPrefix?: string;
  className?: string;
} & Omit<ComponentProps<"input">, "name" | "id" | "className">;

export function TextField({
  name,
  label,
  error,
  optionalLabel,
  idPrefix = "f",
  className,
  type = "text",
  ...inputProps
}: TextFieldProps) {
  const id = `${idPrefix}-${name}`;
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      optionalLabel={optionalLabel}
      className={className}
    >
      <Input
        id={id}
        name={name}
        type={type}
        data-field={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        aria-required={optionalLabel ? undefined : true}
        className={cn(inputClass)}
        {...inputProps}
      />
    </FieldShell>
  );
}
