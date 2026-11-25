"use client";

import { type FormEvent, useState } from "react";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { FileField } from "@/components/forms/file-field";
import { SuccessMessage } from "@/components/forms/success-message";
import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  type FieldErrors,
  type FieldRule,
  focusFirstError,
  hasErrors,
  validateFields,
  withoutError,
} from "@/lib/forms";

type ReceiptRequestProps = {
  ctaLabel: string;
  form: Dictionary["donate"]["italy"]["receiptForm"];
};

const rules: FieldRule[] = [
  { name: "firstName", required: true },
  { name: "lastName", required: true },
  { name: "fiscalCode", required: true },
  { name: "email", required: true, email: true },
  { name: "amount", required: true },
  { name: "date", required: true },
];

/** Botão "Richiedi la ricevuta" que abre um formulário curto (envio simulado). */
export function ReceiptRequest({ ctaLabel, form }: ReceiptRequestProps) {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SuccessMessage
        title={form.success.title}
        paragraphs={[form.success.text]}
      />
    );
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="forest"
        size="cta"
        aria-expanded={false}
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto"
      >
        {ctaLabel}
      </Button>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) return;
    const formElement = event.currentTarget;
    const nextErrors = validateFields(
      new FormData(formElement),
      rules,
      form.ui,
    );
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      focusFirstError(formElement, nextErrors);
      return;
    }
    // Envio ainda não implementado: apenas simula o sucesso.
    setSent(true);
  };

  const { fields } = form;
  const common = { idPrefix: "ricevuta" } as const;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onInput={(event) => {
        const name = (event.target as HTMLInputElement).name;
        if (name) setErrors((current) => withoutError(current, name));
      }}
      className="flex animate-in flex-col gap-5 duration-500 fade-in slide-in-from-top-2"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          {...common}
          name="firstName"
          label={fields.firstName}
          autoComplete="given-name"
          error={errors.firstName}
        />
        <TextField
          {...common}
          name="lastName"
          label={fields.lastName}
          autoComplete="family-name"
          error={errors.lastName}
        />
      </div>
      <TextField
        {...common}
        name="fiscalCode"
        label={fields.fiscalCode}
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={16}
        className="[&_input]:uppercase"
        error={errors.fiscalCode}
      />
      <TextField
        {...common}
        name="email"
        type="email"
        label={fields.email}
        autoComplete="email"
        inputMode="email"
        error={errors.email}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          {...common}
          name="amount"
          label={fields.amount}
          inputMode="decimal"
          error={errors.amount}
        />
        <TextField
          {...common}
          name="date"
          type="date"
          label={fields.date}
          error={errors.date}
        />
      </div>
      <FileField
        {...common}
        name="attachment"
        label={fields.attachment}
        chooseLabel={form.ui.chooseFile}
        emptyLabel={form.ui.noFile}
        accept="image/*,application/pdf"
      />
      <ConsentCheckbox
        id="ricevuta-consent"
        text={form.consent}
        checked={consent}
        onCheckedChange={setConsent}
      />
      <Button
        type="submit"
        variant="gold"
        size="cta"
        disabled={!consent}
        className="w-full sm:w-auto sm:self-start"
      >
        {form.submit}
      </Button>
    </form>
  );
}
