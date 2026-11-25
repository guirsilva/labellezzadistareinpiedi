"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type FieldErrors,
  type FieldRule,
  focusFirstError,
  hasErrors,
  type ValidationMessages,
  validateFields,
  withoutError,
} from "@/lib/forms";
import { cn } from "@/lib/utils";
import { type ChoiceOption, RadioField } from "./radio-field";
import { SuccessMessage } from "./success-message";
import { TextAreaField } from "./text-area-field";
import { TextField } from "./text-field";

export type SimpleFieldSpec =
  | {
      kind: "text";
      name: string;
      label: string;
      type?: "text" | "email" | "tel";
      autoComplete?: string;
      /** Ocupa meia largura a partir de `sm`. */
      half?: boolean;
    }
  | { kind: "textarea"; name: string; label: string }
  | {
      kind: "radio";
      name: string;
      label: string;
      options: readonly ChoiceOption[];
    };

type SimpleFormProps = {
  idPrefix: string;
  fields: readonly SimpleFieldSpec[];
  submitLabel: string;
  successMessage: string;
  messages: ValidationMessages;
  className?: string;
};

/**
 * Formulário simples (Contato, Parceiros): todos os campos obrigatórios,
 * envio simulado e mensagem de confirmação no lugar dos campos.
 */
export function SimpleForm({
  idPrefix,
  fields,
  submitLabel,
  successMessage,
  messages,
  className,
}: SimpleFormProps) {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  if (sent)
    return <SuccessMessage title={successMessage} className={className} />;

  const rules: FieldRule[] = fields
    .filter((field) => field.kind !== "radio")
    .map((field) => ({
      name: field.name,
      required: true,
      email: field.kind === "text" && field.type === "email",
    }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateFields(new FormData(form), rules, messages);
    for (const field of fields) {
      if (field.kind === "radio" && !choices[field.name]) {
        nextErrors[field.name] = messages.required;
      }
    }
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      focusFirstError(form, nextErrors);
      return;
    }
    // Envio ainda não implementado: apenas simula o sucesso.
    setSent(true);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onInput={(event) => {
        const name = (event.target as HTMLInputElement).name;
        if (name) setErrors((current) => withoutError(current, name));
      }}
      className={cn(
        "grid gap-6 rounded-3xl border border-border bg-card p-5 shadow-sm shadow-forest/5 sm:grid-cols-2 sm:p-8",
        className,
      )}
    >
      {fields.map((field) => {
        switch (field.kind) {
          case "text":
            return (
              <TextField
                key={field.name}
                idPrefix={idPrefix}
                name={field.name}
                label={field.label}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                inputMode={
                  field.type === "email"
                    ? "email"
                    : field.type === "tel"
                      ? "tel"
                      : undefined
                }
                error={errors[field.name]}
                className={field.half ? undefined : "sm:col-span-2"}
              />
            );
          case "textarea":
            return (
              <TextAreaField
                key={field.name}
                idPrefix={idPrefix}
                name={field.name}
                label={field.label}
                error={errors[field.name]}
                className="sm:col-span-2"
              />
            );
          case "radio":
            return (
              <RadioField
                key={field.name}
                idPrefix={idPrefix}
                name={field.name}
                label={field.label}
                options={field.options}
                value={choices[field.name] ?? ""}
                onValueChange={(value) => {
                  setChoices((current) => ({
                    ...current,
                    [field.name]: value,
                  }));
                  setErrors((current) => withoutError(current, field.name));
                }}
                error={errors[field.name]}
                className="sm:col-span-2"
              />
            );
          default:
            return null;
        }
      })}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="gold"
          size="cta"
          className="w-full sm:w-auto"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
