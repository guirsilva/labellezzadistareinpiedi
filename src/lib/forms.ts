export type FieldErrors = Record<string, string>;

export type FieldRule = {
  name: string;
  required?: boolean;
  email?: boolean;
};

export type ValidationMessages = {
  required: string;
  invalidEmail: string;
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Valida campos de texto de um FormData, na ordem das regras. */
export function validateFields(
  data: FormData,
  rules: readonly FieldRule[],
  messages: ValidationMessages,
): FieldErrors {
  const errors: FieldErrors = {};
  for (const rule of rules) {
    const raw = data.get(rule.name);
    const value = typeof raw === "string" ? raw.trim() : "";
    if (rule.required && value === "") {
      errors[rule.name] = messages.required;
    } else if (rule.email && value !== "" && !isValidEmail(value)) {
      errors[rule.name] = messages.invalidEmail;
    }
  }
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Leva o foco ao primeiro campo com erro (na ordem do formulário). */
export function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  const elements = Array.from(
    form.querySelectorAll<HTMLElement>("[data-field]"),
  );
  const first = elements.find((element) => {
    const name = element.dataset.field;
    return name ? name in errors : false;
  });
  const focusable =
    first?.matches("input, textarea, button") === true
      ? first
      : first?.querySelector<HTMLElement>("input, textarea, button");
  focusable?.focus();
}

/** Remove o erro de um campo quando a pessoa volta a editá-lo. */
export function withoutError(errors: FieldErrors, name: string): FieldErrors {
  if (!(name in errors)) return errors;
  const { [name]: _removed, ...rest } = errors;
  return rest;
}
