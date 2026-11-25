"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { errorId, FieldShell } from "./field-shell";
import { OtherInput, type OtherOption } from "./other-input";

export type ChoiceOption = { value: string; label: string };

type RadioFieldProps = {
  name: string;
  label: string;
  options: readonly ChoiceOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  /** Opções curtas (SIM/NÃO) ficam lado a lado. */
  inline?: boolean;
  other?: OtherOption;
  idPrefix?: string;
  className?: string;
};

export const choiceCardClass =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-input bg-card px-4 py-3 text-[0.95rem] leading-snug text-forest transition-colors hover:border-sage has-[[data-state=checked]]:border-forest has-[[data-state=checked]]:bg-sage/10 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50";

export const choiceControlClass =
  "size-5 border-forest/50 bg-card data-checked:border-forest data-checked:bg-forest data-checked:text-cream";

/** Escolha única, com opções em formato de cartão (área de toque confortável). */
export function RadioField({
  name,
  label,
  options,
  value,
  onValueChange,
  error,
  inline = false,
  other,
  idPrefix = "f",
  className,
}: RadioFieldProps) {
  const id = `${idPrefix}-${name}`;
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      asLegend
      className={className}
    >
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onValueChange}
        data-field={name}
        aria-required="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        className={cn(
          "gap-2.5",
          inline ? "grid-cols-2 sm:max-w-sm" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={choiceCardClass}
            >
              <RadioGroupItem
                id={optionId}
                value={option.value}
                className={cn(
                  choiceControlClass,
                  "[&_[data-slot=radio-group-indicator]_span]:bg-cream",
                )}
              />
              {option.label}
            </label>
          );
        })}
      </RadioGroup>
      {other && value === other.value ? (
        <OtherInput other={other} idPrefix={idPrefix} />
      ) : null}
    </FieldShell>
  );
}
