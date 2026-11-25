"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { errorId, FieldShell } from "./field-shell";
import { OtherInput, type OtherOption } from "./other-input";
import {
  type ChoiceOption,
  choiceCardClass,
  choiceControlClass,
} from "./radio-field";

type CheckboxGroupFieldProps = {
  name: string;
  label: string;
  options: readonly ChoiceOption[];
  values: readonly string[];
  onValuesChange: (values: string[]) => void;
  error?: string;
  other?: OtherOption;
  idPrefix?: string;
  className?: string;
};

/** Seleção múltipla, com opção "Outro" que abre um campo de texto. */
export function CheckboxGroupField({
  name,
  label,
  options,
  values,
  onValuesChange,
  error,
  other,
  idPrefix = "f",
  className,
}: CheckboxGroupFieldProps) {
  const id = `${idPrefix}-${name}`;

  const toggle = (value: string, checked: boolean) => {
    const next = checked
      ? [...values, value]
      : values.filter((current) => current !== value);
    // mantém a ordem das opções
    onValuesChange(
      options.map((option) => option.value).filter((v) => next.includes(v)),
    );
  };

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      asLegend
      className={className}
    >
      <div
        data-field={name}
        aria-describedby={error ? errorId(id) : undefined}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={choiceCardClass}
            >
              <Checkbox
                id={optionId}
                checked={values.includes(option.value)}
                onCheckedChange={(checked) =>
                  toggle(option.value, checked === true)
                }
                aria-invalid={error ? true : undefined}
                className={cn(choiceControlClass, "rounded-md")}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {other && values.includes(other.value) ? (
        <OtherInput other={other} idPrefix={idPrefix} />
      ) : null}
    </FieldShell>
  );
}
