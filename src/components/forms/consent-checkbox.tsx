"use client";

import { InertLink } from "@/components/shared/inert-link";
import { Checkbox } from "@/components/ui/checkbox";

export type ConsentText = {
  before: string;
  link: string;
  after: string;
};

type ConsentCheckboxProps = {
  id: string;
  text: ConsentText;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

/** Checkbox de consentimento obrigatório, com link (ainda sem destino) para a política. */
export function ConsentCheckbox({
  id,
  text,
  checked,
  onCheckedChange,
}: ConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-sand/60 p-4 sm:p-5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        aria-required="true"
        className="mt-0.5 size-5 rounded-md border-forest/50 bg-card data-checked:border-forest data-checked:bg-forest data-checked:text-cream"
      />
      <label
        htmlFor={id}
        className="text-sm leading-relaxed text-forest/90 sm:text-[0.95rem]"
      >
        {text.before}
        <InertLink className="font-medium text-forest">{text.link}</InertLink>
        {text.after}
      </label>
    </div>
  );
}
